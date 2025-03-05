import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addTask, updateTask, deleteTask } from "./Redux/userSlice";
import { Container, Form, Button, Card, Row, Col, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./taskDetail.css";
import CreateToast from "./createToast";
import { useMutation } from '@apollo/client';
import { ADD_PERSONA, DELETE_PERSONA,UPDATE_PERSONA } from './Mutation';

export default function TaskDetail() {
  const { user_id, id } = useParams();
  const tasks = useSelector((state) => state.userInfo.user.personas || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPersona] = useMutation(ADD_PERSONA);
  const [deletePersona] = useMutation(DELETE_PERSONA);
  const [updatePersona] = useMutation(UPDATE_PERSONA);

  const isNewTask = Number(id) === tasks.length;
  const ind = tasks.findIndex((task) => task.id == id);
  const originalTask = isNewTask
    ? {
        name: "",
        image: "https://via.placeholder.com/150",
        quotes: "",
        description: "",
        motivation: "",
        painPoints: "",
        needs: "",
        activities: "",
      }
    : tasks[ind] || {}; // Ensure default task if not found

  const [task, setTask] = useState(originalTask);
  const [previewImage, setPreviewImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isNewTask && tasks[ind]) {
      setTask(tasks[ind]);
      setPreviewImage(tasks[ind].image);
    }
  }, [ind, tasks]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      CreateToast({ message: "Please select a valid image file", type: "warning" });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setPreviewImage(base64Image);
      setTask({ ...task, image: base64Image });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage("");
  };

  const confirmImageChange = () => {
    setTask({ ...task, image: previewImage });
    setShowModal(false);
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value, field) => {
    setTask({ ...task, [field]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (task.name.trim() === "") {
      CreateToast({ message: "Name is required", type: "warning" });
      return;
    }

    if (isNewTask) {
      const { data, error } = await newPersona({
        variables: {
          userId: user_id,
          name: task.name,
          image: task.image,
          quotes: task.quotes,
          description: task.description,
          motivation: task.motivation,
          painPoints: task.painPoints,
          needs: task.needs,
          activities: task.activities
        }
      });

      if (error) {
        CreateToast({ message: error.message, type: "error" });
        return;
      }
      if (data) {
        CreateToast({ message: "Persona added successfully", type: "success" });
        dispatch(addTask(data.addPersona));
        navigate(`/${user_id}`);
      }

    } else {
      const {data,error}=await updatePersona({
        variables:{
          updatePersonaId:id,
          userId: user_id,
          name: task.name,
          image: task.image,
          quotes: task.quotes,
          description: task.description,
          motivation: task.motivation,
          painPoints: task.painPoints,
          needs: task.needs,
          activities: task.activities

        }
      })
      if(error){
        CreateToast({ message: error.message, type: "error" });
        return;
      }
      if(data){
        dispatch(updateTask({ index: ind, updatedTask: { ...task } }));
        navigate(`/${user_id}`);
      }
    }
  };

  const handleClose = () => {
    navigate(`/${user_id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const { data, error } = await deletePersona({
        variables: { deletePersonaId: id, userId: user_id }
      });

      if (error) {
        console.log("Error occurred");
        return;
      }

      if (data) {
        dispatch(deleteTask(ind));
      }
      navigate(`/${user_id}`);
    }
  };

  return (
    <Container fluid className="p-4">
      <Card className="shadow-lg mb-4 position-relative">
        <div
          className="position-relative"
          style={{ width: "100%", height: "300px", overflow: "hidden" }}
        >
          <Card.Img
            variant="top"
            src={task.image}
            alt={task.name}
            className="w-100"
            style={{
              height: "300px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            className="position-absolute w-100 d-flex justify-content-between align-items-center px-3"
            style={{
              bottom: "0",
              left: "0",
              padding: "10px",
              background: "rgba(0, 0, 0, 0.4)",
            }}
          >
            <div>
              <Form.Label className="text-white mb-1">
                Persona Name *
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="New Persona"
                value={task.name}
                onChange={handleChange}
                className="text-white"
                id="pername"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                  width: "250px",
                }}
              />
            </div>
            <div>
              <Button
                variant="dark"
                size="sm"
                onClick={() => setShowModal(true)}
              >
                Edit Image
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Modal show={showModal} onHide={() => { setShowModal(false); setPreviewImage(""); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={previewImage}
            alt="Preview"
            className="img-fluid mb-3"
            style={{ maxHeight: "250px" }}
          />
          <Form.Group className="mb-3">
            <Form.Label className="btn btn-primary">
              Upload Image
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="d-none"
              />
            </Form.Label>
          </Form.Group>
          {previewImage !== "" && (
            <Button variant="danger" onClick={removeImage} className="me-2">
              Remove Image
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={confirmImageChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Form onSubmit={handleUpdate}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label><strong>Notable Quote</strong></Form.Label>
              <Form.Control
                as="textarea"
                name="quotes"
                value={task.quotes}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label><strong>Description</strong></Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label><strong>Motivations</strong></Form.Label>
              <Form.Control
                as="textarea"
                name="motivation"
                value={task.motivation}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label><strong>Pain Points</strong></Form.Label>
              <ReactQuill
                theme="snow"
                value={task.painPoints}
                onChange={(value) => handleQuillChange(value, "painPoints")}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label><strong>Jobs/Needs</strong></Form.Label>
              <ReactQuill
                theme="snow"
                value={task.needs}
                onChange={(value) => handleQuillChange(value, "needs")}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label><strong>Activities</strong></Form.Label>
              <ReactQuill
                theme="snow"
                value={task.activities}
                onChange={(value) => handleQuillChange(value, "activities")}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-4">
          {(!isNewTask) && (
            <Button variant="outline-danger" onClick={handleDelete}>DELETE</Button>
          )}

          <div>
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              style={{ border: "none" }}
              className="me-2"
            >
              <strong>CLOSE</strong>
            </Button>
            <Button variant="primary" type="submit">
              {isNewTask ? <>CREATE PERSONA</> : <>UPDATE PERSONA</>}
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}

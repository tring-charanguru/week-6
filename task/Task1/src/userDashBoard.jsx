import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  setauth } from "./Redux/userSlice";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";

export default function UserDashboard() {
  const { user_id } = useParams();
  const userData = useSelector((state) => state.userInfo.user);
  // console.log(userData);
  const tasks=userData.personas||[];

  console.log(tasks)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddTask = () => {
    // const newTask = {
    //   name: "New Persona",
    //   image: "https://via.placeholder.com/150",
    //   quotes: "",
    //   description: "",
    //   motivation: "",
    //   painPoints: "",
    //   needs: "",
    //   activities: "",
    // };

    navigate(`/${user_id}/${tasks.length}`);
  };

  return (
    <div style={{backgroundColor:"#EDEADE",padding:"0",margin:"0 0 3% 0"}}>
    <Container fluid className="p-0" style={{maxWidth:"100vw",overflow:"hidden"}}>
      <div style={{backgroundColor:"#008080",height:"10%",width:"100%"}}>
      <Row className="mb-4 align-items-center">
        <Col md={6}>
        <img src="./tringapps-copy-2.png" alt="tringappsLogo" />
        </Col>
      </Row>
      <Row>
      <Col md={6}>
          <h5 className="fw-bold" style={{color:"	#F5F5DC"}}>Welcome , {`${userData.user_name.charAt(0).toUpperCase()}${userData.user_name.slice(1)}`}</h5>
        </Col>
        <Col md={6} className="text-end">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setauth(false));
            }}
            style={{border:"none"}}
          >
            <strong>LOGOUT</strong>
          </Button>
        </Col>
      </Row>
    </div>
      <div style={{margin: "3% 7%",border: "1px solid black",
        padding: "0% 5% 2% 5%",position: "relative",boxSizing: "border-box",
        backgroundColor: "#fff",borderRadius:"25px"}}>
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <Nav>
            <Nav.Item>
              <strong>Persona</strong>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={6} className="text-end">
          <Button
            variant="link"
            className="text-primary fw-bold small"
            onClick={handleAddTask}
          >
            + Add Persona
          </Button>
        </Col>
      </Row>
      <div style={{ marginBottom: "5%" }}></div>
      {/* Persona Section */}
      <Row className="mt-3">
        {tasks.map((task,index) => (
          <Col key={index} md={4} className="mb-3">
            <Card
              className="shadow-sm border-0"
              onClick={() => navigate(`/${user_id}/${task.id}`)}
              style={{ cursor: "pointer", height: "240px" }} 
            >
              <Card.Img
                variant="top"
                src={task.image}
                alt={task.name}
                style={{ height: "140px", objectFit: "cover" }}
              />
              <Card.Body
                className="d-flex flex-column justify-content-between"
                style={{ fontSize: "12px", padding: "12px",backgroundColor:"#eaeaea" }}
              >
                <div>
                  <Card.Title className="mb-2" style={{ fontSize: "14px" }}>
                    {task.name}
                  </Card.Title>
                  {task.quotes && (
                    <Card.Text> " {task.quotes} " </Card.Text>
                  )}
                  {task.description && (
                    <Card.Text>{task.description}</Card.Text>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* Add Persona Card */}
        <Col md={4} className="mb-3">
          <Card
            className="shadow-sm border-0 d-flex align-items-center justify-content-center"
            style={{ height: "240px", cursor: "pointer",backgroundColor:"#eaeaea" }}
            onClick={handleAddTask}
          >
            <div className="text-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f1f1f1",
                  fontSize: "18px",
                }}
              >
                +
              </div>
              <p className="mt-2 text-muted small">Add a Persona</p>
            </div>
          </Card>
        </Col>
      </Row>
      </div>
    </Container>
    <div style={{padding:"0.5%"}}></div>
    </div>
  );
}

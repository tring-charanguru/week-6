import { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";

function TableList() {
  const [Data, setData] = useState([]);
  const [popUp, setpopUp] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [college, setcollege] = useState("");
  const [popUp2, setpopUp2] = useState(false);
  const [popUp3,setpopUp3] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData) setData(storedData);
  }, []);

  useEffect(() => {
    if (Data.length > 0) {
      localStorage.setItem("data", JSON.stringify(Data));
    }
  }, [Data]);

  const createRow = () => {
    setpopUp(true);
    setName("");
    setAge("");
    setcollege("");
  };

  function handleCloseAdd() {
    setpopUp(false);
    setName("");
    setAge("");
    setcollege("");
  }

  function handleSubmitAdd() {
    if (name.trim() != "" && college.trim() != "" && age.trim() != "") {
      if (age < 1 || age > 120) {
        alert("Age Should be Valid");
        return;
      }
      if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Name should consists only letters and spaces");
        return;
      }
      if (!/^[A-Za-z ]+$/.test(college)) {
        alert("College should consists only letters and spaces");
        return;
      }
      const newData = [...Data, { name: name, age: age, college: college }];
      setData(newData);
      setpopUp(false);
    } else {
      alert("Enter all the data!!!");
      return;
    }
  }

  function RemoveData(index) {
    setpopUp3(true);
    setDeleteIndex(index)
  }
  function handleCloseDelete(){
      setpopUp3(false);
      setDeleteIndex(-1);
  }
  function handleConfirmDelete(){
    const updatedData = [...Data];
    updatedData.splice(deleteIndex, 1);
    setData(updatedData);
    setpopUp3(false);
    setDeleteIndex(-1);
  }

  function editData(index) {
    setpopUp2(true);
    setEditIndex(index);
    const EditingData = Data[index];
    setName(EditingData.name);
    setAge(EditingData.age);
    setcollege(EditingData.college);
  }
  function handleSubmitEdit() {
    if (name.trim() === "" || college.trim() === "" || age.trim() === "") {
      alert("Enter without Missing Data");
      return;
    }
    if (age < 1 || age > 120) {
      alert("Age Should be Valid");
      return;
    }
    if (!/^[A-Za-z ]+$/.test(name)) {
      alert("Name should consists only letters and spaces");
      return;
    }
    if (!/^[A-Za-z ]+$/.test(college)) {
      alert("College should consists only letters and spaces");
      return;
    }

    const EditingData = [...Data];
    EditingData[editIndex]["name"] = name;
    EditingData[editIndex]["age"] = age;
    EditingData[editIndex]["college"] = college;
    setData(EditingData);
    setpopUp2(false);
    setEditIndex(-1);
    setName("");
    setAge("");
    setcollege("");
  }

  function handleCloseEdit() {
    setpopUp2(false);
    setEditIndex(-1);
    setName("");
    setAge("");
    setcollege("");
  }
  return (
    <>
      <nav>
        <Button variant="outline-primary" onClick={createRow}>
          Add New
        </Button>
      </nav>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>College</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((element, i) => (
            <tr key={i}>
              <td>{element.name}</td>
              <td>{element.age}</td>
              <td>{element.college}</td>
              <td>
                <Button onClick={() => editData(i)}>Edit</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => RemoveData(i)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={popUp} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Enter New Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your College"
            value={college}
            onChange={(e) => setcollege(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseAdd()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitAdd()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={popUp2}
        onHide={handleCloseEdit}
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter the Data To be Edited</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your College"
            value={college}
            onChange={(e) => setcollege(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseEdit()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitEdit()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="sm"
        show={popUp3}
        onHide={() => handleCloseDelete()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Want to Delete?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:"flex",justifyContent:"space-evenly"}}>
          <Button onClick={()=>handleCloseDelete()} variant="secondary">Close</Button>
          <Button onClick={()=>handleConfirmDelete()}>Confirm</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableList;

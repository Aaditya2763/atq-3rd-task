// App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavbarBox from "./components/Navbar/navbar";
import Spinner from 'react-bootstrap/Spinner';

import { Provider } from "react-redux";
import store from "./redux/store/Store";

import Dashboard from "./pages/dashboard";
import axios from "axios";

function App() {
  const [data, setdata] = useState([]);
  const [loginuser, setloginuser] = useState("");
  const [loading, setloading] = useState(false);
  const [hasError, sethasError] = useState(false);
  const [errormsg, setErrorMessage] = useState("");

  const userHandler = (user) => {
    setloginuser(user);
  };

  const fetchData = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
 
      setdata(response.data);
     setloading(false)
     sethasError(false)
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      sethasError(true)
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const errorFetchDataHandler = () => {
    fetchData();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ overflow: "hidden" }}>
          {!loading && !hasError && (<NavbarBox loginuserHandler={userHandler} user={loginuser} />
)}
{loading && ( <div className="d-flex flex-direction-row   "  style={{margin:"300px auto", width:"200px" }}>
  <Spinner animation="border" role="status" >
      <span className=" text-dark"></span>
    </Spinner> 
    <span style={{
                color: "black",
                fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 700, paddingLeft:10
              }}>Loading....</span>
    </div>)}
    { !loading &&  hasError &&(  <div
      className="modal show"
      style={{ display: 'block', position: 'initial',marginTop:"200px"}}
    >
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title className="text-danger">Unable to Fetch data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{errormsg}</p>
        </Modal.Body>

        <Modal.Footer>
        
          <Button variant="success"  style={{ color: "black",
                fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                color:"white",
                fontStyle: "normal",
                fontWeight: 500,}} onClick={errorFetchDataHandler}> Try Again</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>)}
          {!loading && !hasError &&  (<Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  data={data}
                  errorFetchDataHandler={errorFetchDataHandler}
                  loading={loading}
                  errormsg={errormsg}
                />
              }
            />
          </Routes>)}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

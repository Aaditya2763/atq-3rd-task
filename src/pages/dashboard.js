import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import classes from "./dashboard.module.css";
import images from "../../src/assets/dummy.svg"
import { Container } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { FaRegUser } from "react-icons/fa";
const Dashboard = ({ data }) => {
  // console.log(data)
const [loading,setloading]=useState(false)
const [error,seterror]=useState(false)
const [userId,setuserId]=useState("")
const [user,setuser]=useState("")


  const userHandler=async(id)=>{
    try {
      setloading(true)
      const userData = data.find((user) => user.id === id);
    if (userData) {
      setuserId(id);
      console.log(userData)
      setuser(userData);
      seterror(false)
      setloading(false)
    } else {
      // Handle the case where the user with the specified id is not found
      seterror(true)
      setloading(false)
    }
    } catch (error) {
      setloading(false)
    }
  }
  const joinedDate = new Date(user.createdAt).toLocaleDateString();
  const joinedTime = new Date(user.createdAt).toLocaleTimeString();
  
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="d-flex flex-column">
        <img
          src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNvY2lhbHxlbnwwfHwwfHx8MA%3D%3D"
          className={classes.image}
          alt="img"
        />
        <div style={{ position: "absolute", top: "30%", left: "10%" }}>
          <h3
            style={{
              color: "white",
              fontFamily: "IBM Plex Sans",
              fontSize: "36px",
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
          
          </h3>
          <p
            style={{
              color: "white",
              fontFamily: "IBM Plex Sans",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              marginTop: -10,
            }}
          >
            
          </p>
        </div>
      </div>
      <div className="border border-danger mt-1 text-danger text-center" style={{ fontFamily: "IBM Plex Sans",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,}}>Note: <span className="text-success">Aatar is not changing because the avatar fetched by the Api is incorrect. Please check ! </span></div>
      <Container className="mt-4">
        <div className="d-flex flex-direction-col  ">
          <Container
            className={classes.userContainer}
            style={{ width: "50%", height:"750px",overflow:"scroll", }}
          >
            <h2
              className="text-center p-2"
              
              style={{
                color: "white",
                width: "100%",
                fontFamily: "IBM Plex Sans",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,
                position:"sticky",top:"0px",
              background:"#5A4FCF"
              }}
            >
              User dashboard
            </h2>
            {data.map((user) => {
              return (
                <div key={user.id} className="d-flex flex-direction-row justify-content-between border " style={{height:"40"}} onClick={()=>{
                  userHandler(user.id)
                }}>
                  <div className="align-items-center">
                    {" "}
                    <img src={images} className="mt-1"/>
                    <span className="m-2" style={{fontFamily: "IBM Plex Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,}}>{user.profile.firstName}</span>
                  </div>
                  <Button variant="outline-primary" className="m-2" onClick={()=>{
                    userHandler(user.id)
                  }}>view profile</Button>
                </div>
              );
            })}
          </Container>
          <Container
            className={classes.userDetailsContainer}
            style={{ width: "100%", borderRadius:"10px" }}
          >
            <h2
              className=" text-center   p-2 bg-opacity-10 "
              style={{
                color: "white",
                width: "100%",
                fontFamily: "IBM Plex Sans",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,
                background:"#5A4FCF",
                
              }}
            >
              User dashboard
            </h2>
            {loading && ( <div className="d-flex flex-direction-row   "  style={{margin:"250px auto", width:"200px" }}>
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

    { !loading &&  error &&(  <div
      className="modal show"
      style={{ display: 'block', position: 'initial',marginTop:"200px"}}
    >
<div  className={classes.userBox}><h2  style={{textAlign:"center",color:"black"}}>Something went wrong try again !</h2>
<Button variant="outline-danger " onClick={()=>{
  userHandler(userId)
}}>Try Again</Button></div>
      </div>
)}

{!user ? (<div className={classes.userBox}>
  <FaRegUser style={{fontSize:'15rem',marginTop:'50px'}}/>
  <h2 style={{textAlign:"center",margin:'50px auto'}}>Select user to see Profile</h2>
</div>):(<div>
 
                <div  className="d-flex flex-column  mt-1 " style={{height:"40"}}>
                  <div className=" d-flex flex-column align-items-center">
                   
                    <img src={images} className="mt-1" style={{height:"100%",width:"35%"}}/>
                    <span className="m-2" style={{fontFamily: "IBM Plex Sans",
                fontSize: "28px",
                fontStyle: "normal",
                fontWeight: 600,}}>{user.profile.firstName}</span>
                <span style={{fontFamily: "IBM Plex Sans",
                fontSize: "1.5rem",
                fontStyle: "normal",
                textAlign:"center",
                fontWeight: 600, marginTop:-20}}>{user.jobTitle}</span>
                <span style={{fontFamily: "IBM Plex Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600, marginTop:0,color:"gray"}}>Joined :{joinedDate} { joinedTime}</span>
                  </div>

                  <div className="mt-1 border border-primary mx-5 rounded">
                  <div className="d-flex flex-row justify-content-between" style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}> 
                      <p>Id : <span></span></p>
                      <p>User Name : {user.profile.username}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between"  style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}>
                      <p>First Name : {user.profile.firstName}</p>
                      <p style={{marginRight:"0px"}}>Last Name : {user.profile.lastName}</p>
                    </div>
                  </div>
                  <div className="mt-2 border mx-2 ">
                    <p style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}>Email : {user.profile.email}</p>
                  <p style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}>Bio : {user.Bio}</p>
                  <p style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}>Avatar Link : {user.avatar}</p>

                  </div>
                  <Button variant="outline-primary" className="m-2" 
                 >view profile</Button>
                </div>
        
          
</div>) }
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;

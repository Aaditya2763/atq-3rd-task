import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import classes from "./dashboard.module.css";
import images from "../../src/assets/dummy.svg"
import { Container } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { FaRegUser } from "react-icons/fa";
const Dashboard = ({ data }) => {
const[usersData,setUsersData]=useState(data)
const [loading,setloading]=useState(false)
const [error,seterror]=useState(false)
const [userId,setuserId]=useState("")
const [user,setuser]=useState("")
const[message,setmessage]=useState("")
const [selectedUserId, setSelectedUserId] = useState(null);

const userDeleteHandler=(id)=>{
  console.log(id)

const remainingUsers=data.filter((data)=>data.id!==id);
console.log(remainingUsers)
setuser("")
setmessage("User deleted successfully")
setUsersData(remainingUsers);

}

useEffect(() => {
  const timerId = setTimeout(() => {
    setmessage("");
  }, 1000);

  // Clear the timer when the component unmounts or when the data changes
  return () => clearTimeout(timerId);
});

  const userHandler=async(id)=>{
    try {
      setSelectedUserId(id);
      setloading(true)
      const userData = data.find((user) => user.id === id);
    if (userData) {
      setuserId(id);
     
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
    <div   style={{ overflow: "hidden" }} >
    
      <marquee direction="left" className=" container-fluid  mt-1 text-danger text-center" style={{ fontFamily: "IBM Plex Sans",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,}}>Note: <span className="text-success">Avatar of some users are not changing because the avatar fetched by the Api is incorrect. Please check ! </span></marquee>
      <Container className="mt-3 ">
        <div className="d-flex flex-direction-col  ">
          <Container
            className={classes.userContainer}
            style={{ width: "50%", height:"630px",borderBottom:"1px solid lightgray" }}
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
            {message && (            <div className="text-center border border-danger text-light  " style={{height:30,marginTop:-8,background:"#fd5c63"}}>User deleted successfully</div>
)}
            {usersData.map((user,index) => {
              return (
                <div key={index}  className="d-flex flex-direction-row justify-content-between border mt-0 " style={{height:"40", backgroundColor: selectedUserId === user.id ? '#CCCCFF' : 'white',}} onClick={()=>{
                  userHandler(user.id)
                }}>
                  <div className="align-items-center">
                    {" "}
                    <img src={user.avatar} className="mt-1 mx-1 mb-1 rounded-circle border" style={{width:50,height:50}}/>
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
                   
                    <img src={user.avatar} className="mt-1 rounded-circle border" style={{width:"200px",height:"200px", backgroundColor:"#f2f2f2" }}/>
                    <span className="mt-1" style={{fontFamily: "IBM Plex Sans",
                fontSize: "28px",
                fontStyle: "normal",
                fontWeight: 600,}}>{user.profile.firstName}</span>
                <span style={{fontFamily: "IBM Plex Sans",
                fontSize: "1.5rem",
                fontStyle: "normal",
                textAlign:"center",
                fontWeight: 600, marginTop:-15}}>{user.jobTitle}</span>
                <span style={{fontFamily: "IBM Plex Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600, marginTop:0,color:"gray"}}>Joined :{joinedDate} { joinedTime}</span>
                  </div>

                  <div className=" border border-primary mx-5  rounded">
                  <div className="d-flex flex-row justify-content-between" style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}> 
                      <p style={{width:"100%",float:"left"}}><span style={{color:"gray"}}>Id :</span> {user.id}</p>
                      <p style={{width:"100%",float:"left"}}><span style={{color:"gray"}}>User Name :</span> <span>{user.profile.username}</span></p>
                    </div>
                    <div className="d-flex flex-row  justify-content-between"  style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}>
                      <p style={{width:"100%",float:"left"}}><span style={{color:"gray"}}>First Name :</span> {user.profile.firstName}</p>
                      <p style={{width:"100%",float:"left"}}><span style={{color:"gray"}}>Last Name :</span> {user.profile.lastName}</p>
                    </div>
                  </div>
                  <div className="mt-1  mx-2 ">
                    <p style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}><span style={{color:"gray"}}>Email :</span><a >{user.profile.email}</a></p>
                  <p style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}><span style={{color:"gray"}}>Bio :</span> {user.Bio}</p>
                  <p style={{width:"80%",margin:'0px auto',fontFamily: "IBM Plex Sans",
                fontSize: "20px",
                fontStyle: "normal",}}><span style={{color:"gray"}}>Avatar Link :</span> <a   href={user.avatar}
                target="_blank" style={{textDecoration:""}}>{user.avatar}</a></p>

                  </div>
                  <Button variant="outline-danger " className="mx-2 mt-1" 
                  onClick={()=>{
                    userDeleteHandler(user.id);
                  }}>Delete User</Button>
                </div>
        
          
</div>) }
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;

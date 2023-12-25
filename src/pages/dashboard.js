import React, { useEffect, useState } from "react";

import classes from "./dashboard.module.css";
import images from "../../src/assets/user1.svg"
import { Container } from "react-bootstrap";
const Dashboard = ({ data }) => {
  // console.log(data)

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="d-flex flex-column">
        <img
          src="/assets/dashboardImg.svg"
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
            Computer Engineering
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
            142,765 Computer Engineers follow this
          </p>
        </div>
      </div>
      <Container className="mt-4">
        <div className="d-flex flex-direction-col  ">
          <Container
            className="border rounded m-1 p-0"
            style={{ width: "50%", height:"750px",overflow:"scroll" }}
          >
            <h2
              className=" text-center  bg-success p-2 bg-opacity-10 "
              style={{
                color: "#7367f0",
                width: "100%",
                fontFamily: "IBM Plex Sans",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,
              }}
            >
              User dashboard
            </h2>
            {data.map((user) => {
              return (
                <div key={user.id} className="d-flex flex-direction-row justify-content-between border mb-2" style={{height:"40"}}>
                  <div>
                    {" "}
                    <img src={images}/>
                    <span>{user.profile.firstName}</span>
                  </div>
                  <button>View</button>
                </div>
              );
            })}
          </Container>
          <Container
            className="border rounded mx-5 p-0"
            style={{ width: "100%", height: 400 }}
          >
            <h2
              className=" text-center  bg-success p-2 bg-opacity-10 "
              style={{
                color: "#7367f0",
                width: "100%",
                fontFamily: "IBM Plex Sans",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,
              }}
            >
              User dashboard
            </h2>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;

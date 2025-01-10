/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import ContentBytes from "../../../Common/ContentBytes/ContentBytes";
import Recommendation from "../../../Common/Recommendation/Recommendation";
import PerformanceCard from "../../../Common/PerformanceCard/PerformanceCard";
import { IRecommendation, IContentbytes } from "./Helper/interfaces";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../helper/firebase-config";
import { postRequest } from "../../../service/fetch-services";

//import Components

const UserDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setdata] = useState<IRecommendation[]>([]);
  const [activeSection, setActiveSection] = useState("recommendation");
  const [contentBytes, SetcontentBytes] = useState<IContentbytes[]>([]);
  const [contentBytesLoading, SetcontentBytesLoading] =
    useState<boolean>(false);

  const fetchData = () => {
    try {
      setLoading(true);

      // Listening for real-time updates using onSnapshot
      const unsubscribe = onSnapshot(
        collection(db, "recommendations"),
        (querySnapshot) => {
          const fetchedData = querySnapshot.docs.map(
            (doc) => doc.data() as IRecommendation
          );
          setdata(fetchedData); // Set the fetched data to state
          setLoading(false);
        }
      );

      // Cleanup function to unsubscribe from the snapshot listener when the component is unmounted
      return () => unsubscribe();
    } catch (err) {
      console.log("Error fetching data from Firestore:", err);
      setLoading(false);
    }
  };

  const fetchContentBytes = async () => {
    try {
      SetcontentBytesLoading(true);
      const result = await postRequest("contentBites/list", {
        limit: 5,
        page: 1,
      });
      SetcontentBytes(result?.data?.contentBites);
      SetcontentBytesLoading(false);
    } catch (err) {
      console.log(err);
      SetcontentBytesLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call the function to start listening for real-time updates
    // Optionally, return a cleanup function to unsubscribe when the component unmounts
    fetchContentBytes();

    return () => {
      // Cleanup if needed, but onSnapshot automatically handles cleanup as well
    };
  }, []);

  const handleScroll = () => {
    const sections = ["recommendation", "content-bytes", "past-performance"];
    let foundSection = "";
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 1.75 && rect.bottom >= 0) {
          foundSection = section;
        }
      }
    });
    if (foundSection) {
      setActiveSection(foundSection);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <React.Fragment>
      <div className="pb-2">
        <div className="menucontainer">
          <div className="menu">
            <div
              onClick={() => scrollToSection("recommendation")}
              className={`menu-item ${
                activeSection === "recommendation" ? "active" : ""
              }`}
            >
              Recommendations
            </div>
            <div
              onClick={() => scrollToSection("content-bytes")}
              className={`menu-item ${
                activeSection === "content-bytes" ? "active" : ""
              }`}
            >
              Content Bytes
            </div>
            <div
              onClick={() => scrollToSection("past-performance")}
              className={`menu-item ${
                activeSection === "past-performance" ? "active" : ""
              }`}
            >
              Past Performance
            </div>
          </div>
        </div>

        <Card>
          <CardBody className="pt-0">
            <div
              className="user-dashboard-container dashboard-recommendation container-min"
              id="recommendation"
            >
              <div>
                <h3>Hey Vishal Soni</h3>
                <p className="mt-3 mb-5 font-weight-normal fs-5">
                  Here is your command center
                </p>
              </div>
              <Col lg={12}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Recommendations</h5>
                  <button
                    type="button"
                    className="btn btn-sm my-2 me-1 btn-light-success"
                  >
                    View All
                    <i className="ms-2 fas fa-arrow-circle-right"></i>
                  </button>
                </div>
              </Col>
              <Row>
                {!loading &&
                  data?.map((item, i) => {
                    return (
                      <Col xs={12} sm={6} xxl={4} key={i}>
                        <Recommendation data={item} />
                      </Col>
                    );
                  })}
              </Row>
            </div>
            <div
              className="user-dashboard-container container-min"
              id="content-bytes"
            >
              <Row>
                <Col lg={12}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">Content Bytes</h5>
                    <button
                      type="button"
                      className="btn btn-sm my-2 me-1 btn-light-success"
                    >
                      View All
                      <i className="ms-2 fas fa-arrow-circle-right"></i>
                    </button>
                  </div>
                </Col>
                {!contentBytesLoading &&
                  contentBytes?.map((item, i) => {
                    return (
                      <Col xs={6} key={i}>
                        <ContentBytes data={item} />
                      </Col>
                    );
                  })}
              </Row>
            </div>
            <div
              className="user-dashboard-container container-min"
              id="past-performance"
            >
              <h5 className="mb-4">Past Performance</h5>
              <Row>
                {[1, 2, 3]?.map((i) => {
                  return (
                    <Col xs={6} sm={4} md={4} lg={4} xxl={3} key={i}>
                      <PerformanceCard />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;

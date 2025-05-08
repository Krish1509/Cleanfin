/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { 
  // Button,
  // ButtonGroup,
  Card,
  CardBody,
  Col,
  Row
} from "react-bootstrap";
import ContentBytes from "../../../Common/ContentBytes/ContentBytes";
import Recommendation from "../../../Common/Recommendation/Recommendation";
import { IRecommendation, IContentbytes } from "./Helper/interfaces";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../helper/firebase-config";
import { postRequest } from "../../../service/fetch-services";
// import AnimationComponent from "../../../Common/AnimationComponent/AnimationComponent";
import Subscription from "../../../Common/Subscription/Subscription";
import { useNavigate } from "react-router-dom";
import LottieAnimation, { Varient } from "../../../Common/AnimationComponent/LottieAnimation";
import { initializeSocket, TouchlineData, reconnectSocket } from "../../../service/socketService";
import PerformanceCard from "../../../Common/PerformanceCard/PerformanceCard";
// import FIIDIITradesCard from "../../../Common/FIIDIITradesCard/FIIDIITrades";
// import { TradeTime } from "../../../Common/FIIDIITradesCard/contsant";

//import Components

const UserDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setdata] = useState<IRecommendation[]>([]);
  const [activeSection, setActiveSection] = useState("recommendation");
  const [contentBytes, SetcontentBytes] = useState<IContentbytes[]>([]);
  const [ShowAnimation, setShowAnimation] = useState<boolean>(false);
  const [animationVarient, setAnimationVarient] = useState<{
    type: Varient;
    info: string;
  }>({ type: Varient.Target, info: "" });
  const [contentBytesLoading, SetcontentBytesLoading] = useState<boolean>(false);
  // const [tradesTimes, setTradesTimes] = useState<TradeTime>(TradeTime.Day);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // Convert subscription_end to a Date object
  const subscriptionEndDate = new Date(user?.subscription_end);
  const currentDate = new Date();

  useEffect(() => {
    reconnectSocket();
    const socket = initializeSocket();

    socket.on("newTouchlineData", (data: TouchlineData) => {
      setdata((prevData) =>
        prevData.map((item) => {
          if (data?.data.scrip.scrip_token === item.scriptCode.toString()) {
            return { ...item, touchlineData: data };
          }
          return item;
        })
      );
    });
  }, []);

  const fetchData = () => {
    try {
      setLoading(true);

      // Create a query to filter documents where isActive is true
      const recommendationsQuery = query(
        collection(db, "recommendations"),
        where("isActive", "==", true) // Filter for isActive = true
      );

      // Store the previous values for target1Achieved, target2Achieved, target3Achieved, and stopLossAchieved
      let previousData: Record<
        string,
        {
          target1Achieved: boolean;
          target2Achieved: boolean;
          target3Achieved: boolean;
          stopLossAchieved: boolean;
        }
      > = {};

      // Listening for real-time updates using onSnapshot
      const unsubscribe = onSnapshot(recommendationsQuery, (querySnapshot) => {
        const fetchedData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as IRecommendation;
          const id = doc.id;

          // Get previous values
          const prev = previousData[id];

          // Only proceed if prev is defined
          if (prev) {
            // Check if any of the specified fields changed from false to true
            const target1Changed = prev.target1Achieved === false && data.target1Achieved === true;
            const target2Changed = prev.target2Achieved === false && data.target2Achieved === true;
            const target3Changed = prev.target3Achieved === false && data.target3Achieved === true;
            const stopLossChanged = prev.stopLossAchieved === false && data.stopLossAchieved === true;

            // Trigger animation only if any of the fields changed from false to true
            if (target1Changed || target2Changed || target3Changed || stopLossChanged) {
              if (stopLossChanged) {
                setAnimationVarient({
                  type: Varient.StopLoss,
                  info: `Milestone Reached on Stop Loss!`,
                });
              } else {
                let targetInfo: number = target1Changed ? 1 : target2Changed ? 2 : target3Changed ? 3 : 0;
                setAnimationVarient({
                  type: Varient.Target,
                  info: `Milestone Reached on Target ${targetInfo}!`,
                });
              }
              triggerAnimation(); // Trigger animation
            }
          }

          // Update previous data for comparison
          previousData[id] = {
            target1Achieved: data.target1Achieved,
            target2Achieved: data.target2Achieved,
            target3Achieved: data.target3Achieved,
            stopLossAchieved: data.stopLossAchieved,
          };

          return data;
        });

        setdata(fetchedData); // Set the fetched data to state
        setLoading(false);
      });

      // Cleanup function to unsubscribe from the snapshot listener when the component is unmounted
      return () => unsubscribe();
    } catch (err) {
      console.log("Error fetching data from Firestore:", err);
      setLoading(false);
    }
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timeout ID

  const triggerAnimation = () => {
    // If there's an existing timeout, clear it
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowAnimation(true); // Show the animation

    // Set a new timeout to hide the animation after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setShowAnimation(false); // Hide the animation
    }, 3000); // Hide animation after 3 seconds
  };

  const fetchContentBytes = async () => {
    try {
      SetcontentBytesLoading(true);
      const result = await postRequest("contentBites/list", {
        limit: 5,
        page: 1,
        isActive: true,
      });
      SetcontentBytes(result?.data?.contentBites);
      SetcontentBytesLoading(false);
    } catch (err) {
      console.log(err);
      SetcontentBytesLoading(false);
    }
  };

  const handleScroll = () => {
    const sections = ["recommendation", "content-bytes", "past-performance", "fii-dii-trades"];
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
    setShowAnimation(false);
    if (subscriptionEndDate > currentDate) {
      fetchData(); // Call the function to start listening for real-time updates
    }
    // Optionally, return a cleanup function to unsubscribe when the component unmounts
    fetchContentBytes();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: any) => {
    const element = document.getElementById(sectionId);
    const headerOffset = 230; // Adjust this to your header height
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const [showSubscriptionButton, setShowSubscriptionButton] = useState(false);
  useEffect(() => {
    // let intervalId: any;
    const checkSubscriptionEndDate = async () => {
      try {
        // Check if subscription has ended and status is not active
        if (subscriptionEndDate < currentDate) {
          setShowSubscriptionButton(true);
        }
      } catch (error) {
        setShowSubscriptionButton(true);
      }
    };

    checkSubscriptionEndDate();
    // Set interval to poll API every 30 seconds
    // intervalId = setInterval(fetchUserSubscriptionDetails, 30000);

    // Cleanup function to clear interval on unmount
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <React.Fragment>
      <div className="pb-2">
        <div className="menucontainer">
          <div className="menu">
            <div onClick={() => scrollToSection("recommendation")} className={`menu-item ${activeSection === "recommendation" ? "active" : ""}`}>
              Recommendations
            </div>
            <div onClick={() => scrollToSection("content-bytes")} className={`menu-item ${activeSection === "content-bytes" ? "active" : ""}`}>
              Content Bytes
            </div>
            <div onClick={() => scrollToSection("past-performance")} className={`menu-item ${activeSection === "past-performance" ? "active" : ""}`}>
              Past Performance
            </div>
            {/* <div onClick={() => scrollToSection("fii-dii-trades")} className={`menu-item ${activeSection === "fii-dii-trades" ? "active" : ""}`}>
              FII DII Trades
            </div> */}
          </div>
        </div>

        <Card>
          <CardBody className="pt-0">
            <div className="user-dashboard-container dashboard-recommendation container-min" id="recommendation">
              <div className="d-flex justify-content-between">
                <div>
                  <h3>
                    Hey {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="mt-3 mb-5 font-weight-normal fs-5">Here is your command center</p>
                </div>
              </div>
              <Col lg={12}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Recommendations</h5>
                </div>
              </Col>
              <Row>
                {showSubscriptionButton ? (
                  <Col xs={12} sm={6} xxl={6}>
                    <Subscription />
                  </Col>
                ) : !loading ? (
                  data?.length > 0 ? (
                    data.map((item, i) => (
                      <Col xs={12} sm={6} xxl={4} key={i}>
                        <Recommendation data={item} />
                      </Col>
                    ))
                  ) : (
                    <div className="no-data-container">
                      <div className="no-data-content">
                        <h2>No Recommendations Available</h2>
                        <p>It seems there are no recommendations at the moment. Please check back later!</p>
                      </div>
                    </div>
                  )
                ) : (
                  ""
                )}
              </Row>
            </div>
            <div className="user-dashboard-container container-min" id="content-bytes">
              <Row>
                <Col lg={12}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">Content Bytes</h5>
                    <button type="button" className="btn btn-sm my-2 me-1 btn-light-success" onClick={() => navigate("/content")}>
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
            <div className="user-dashboard-container container-min" id="past-performance">
              {/* <h5 className="mb-4">Past Performance</h5> */}
              <Col lg={12}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Past Performance</h5>
                  <button type="button" className="btn btn-sm my-2 me-1 btn-light-success" onClick={() => navigate("/pastPerformance")}>
                    View All
                    <i className="ms-2 fas fa-arrow-circle-right"></i>
                  </button>
                </div>
              </Col>
              <PerformanceCard />
            </div>
            {/* <div className="user-dashboard-container container-min" id="fii-dii-trades">
              <Col lg={12}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">FII DII Trades</h5>
                  <div>
                    <ButtonGroup>
                      <Button style={{ flex: 1 }} variant={tradesTimes === TradeTime.Day ? "secondary" : "outline-secondary"} onClick={() => setTradesTimes(TradeTime.Day)}>Daily</Button>
                      <Button style={{ flex: 1 }} variant={tradesTimes === TradeTime.Month ? "secondary" : "outline-secondary"} onClick={() => setTradesTimes(TradeTime.Month)}>Monthly</Button>
                    </ButtonGroup>
                  </div>
                </div>
              </Col>
              <FIIDIITradesCard tradesTimes={tradesTimes} />
            </div> */}
          </CardBody>
        </Card>
      </div>
      <LottieAnimation show={ShowAnimation} varient={animationVarient.type} info={animationVarient.info} />
      {/* add bellow component in reccomendation */}
      {/* <Subscription /> */}
    </React.Fragment>
  );
};

export default UserDashboard;

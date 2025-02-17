/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "react-bootstrap";
import BreadcrumbItem from "../../../../Common/BreadcrumbItem";
import { postRequest } from "../../../../service/fetch-services";
import Loader from "../../../../Common/Loader/Loader";
import ToastAlert from "../../../../helper/toast-alert";
import { ISubPlan } from "../Helper/interfaces";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    ISubPlan[] | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem("user") || "");

  const handleSwitch = () => {
    setShow(!show);
  };

  const fetchContentBytes = async () => {
    try {
      setLoading(true);
      const result = await postRequest("subscription/list");
      setSubscriptionPlans(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentBytes();

    // Load Razorpay script on component mount
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePurchase = async (planId: string) => {
    try {
      setLoading(true);
      const requestData = {
        planId,
        mobileNumber: user.mobileNumber,
        email: user.email,
      };
      const result = await postRequest("subscription/buy", requestData);

      if (result.success) {
        localStorage.setItem("subscriptionId", result.data.subscriptionId);

        // Prepare Razorpay options for subscription
        const options = {
          key: "rzp_test_uzGTmLb6xkyeHP",
          subscription_id: result.data.subscriptionId,
          name: "Subscription Plan",
          description: "Your Subscription Description",
          handler: function (response: any) {
            console.log("Subscription payment successful", response);
            confirmPayment(response);
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.mobileNumber,
          },
          theme: {
            color: "#04A9F5",
          },
        };

        // Open Razorpay subscription window
        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.open();
      } else {
        console.log("Error in subscription creation:", result.message);
      }
      setLoading(false);
    } catch (err) {
      console.log("Error purchasing plan:", err);
      setLoading(false);
    }
  };

  const confirmPayment = async (paymentResponse: any) => {
    try {
      setLoading(true);
      const { razorpay_payment_id, razorpay_signature } = paymentResponse;
      const requestData = {
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id: localStorage.getItem("subscriptionId"),
      };
      const result = await postRequest("subscription/verify", requestData);
      if (result.success) {
        ToastAlert.success("Subscription successfully activated!");
        navigate("/dashboard/user");
      } else {
        ToastAlert.error("Payment failed or subscription not activated!");
      }
      setLoading(false);
    } catch (err) {
      console.log("Error confirming payment:", err);
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      const requestData = {
        status: "cancelled",
        subscriptionId: localStorage.getItem("subscriptionId"),
      };
      const result = await postRequest("subscription/update", requestData);
      if (result.success) {
        ToastAlert.success(result.message);
        navigate("/dashboard/user");
      }
      setLoading(false);
    } catch (err) {
      console.log("Error cancelling plan:", err);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Plans" subTitle="Plans" />
      <Row>
        <Col sm={12}>
          <Row className="align-items-center justify-content-center mb-4">
            <div className="col-auto">
              <label htmlFor="swc-price" className="h4 mb-0">
                Annual
              </label>
            </div>
            <div className="col-auto">
              <div className="form-check form-switch p-0 m-0">
                <input
                  className="form-check-input f-20 m-0 postion-relative"
                  type="checkbox"
                  role="switch"
                  id="swc-price"
                  onClick={handleSwitch}
                />
              </div>
            </div>
            <div className="col-auto">
              <label htmlFor="swc-price" className="h4 mb-0">
                Monthly
              </label>
            </div>
          </Row>

          <div className={`multi-collapse collapse show`}>
            <Row>
              {subscriptionPlans
                ?.filter(
                  (plan: ISubPlan) =>
                    plan?.period === (show ? "monthly" : "yearly")
                )
                ?.map((items: ISubPlan, index: number) => {
                  return (
                    <Col md={6} xxl={4} key={index}>
                      <Card className="price-card">
                        <CardBody
                          className={`price-head ${
                            items?.item?.currency === "INR"
                              ? "bg-light-secondary"
                              : "bg-light-primary"
                          }`}
                        >
                          <h5
                            className={
                              items?.item?.active
                                ? "text-secondary"
                                : "text-muted"
                            }
                          >
                            {items?.item?.name}
                          </h5>
                          <h2
                            className={`price-price ${
                              items?.item?.currency === "INR"
                                ? "text-secondary"
                                : "text-primary"
                            }`}
                          >
                            {`₹${items?.item?.amount / 100}`}{" "}
                            <span>{`/ ${items?.period}`}</span>
                          </h2>
                          <div
                            className={`price-icon ${
                              items?.item?.currency === "INR"
                                ? "bg-light-secondary"
                                : "bg-light-primary"
                            }`}
                          >
                            <i
                              className={`${
                                items?.item?.type === "plan"
                                  ? "ph-duotone ph-buildings"
                                  : "ph-duotone ph-cogs"
                              } ${
                                items?.item?.active
                                  ? "text-secondary"
                                  : "text-muted"
                              }`}
                            ></i>
                          </div>
                        </CardBody>
                        <CardBody>
                          <p>{items?.item?.description}</p>
                          <div className="d-grid" style={{ gap: 5 }}>
                            <button
                              className={`btn ${
                                items?.item?.active
                                  ? "btn-secondary"
                                  : "btn-muted"
                              }`}
                              onClick={() => handlePurchase(items?.id)}
                            >
                              {items?.notes?.length > 0
                                ? items?.notes[0]
                                : "Upgrade Plan"}
                            </button>
                            <button
                              className={`btn ${
                                items?.item?.active
                                  ? "btn-outline-secondary"
                                  : "btn-outline-muted"
                              }`}
                              onClick={handleCancelSubscription}
                            >
                              Cancel Subscription
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </Col>
      </Row>

      <Loader updateLoading={loading}></Loader>
    </React.Fragment>
  );
};

export default Plans;

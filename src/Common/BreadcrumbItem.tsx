import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { getAllowedDashboard } from "../helper/auth";

interface BreadcrumbItemProps {
  mainTitle: string;
  subTitle: string;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ mainTitle, subTitle }) => {
  useEffect(() => {
    setTimeout(() => {
      const header = document.querySelector(".pc-navbar") as HTMLElement;
      const pageHeader = document.querySelector(".page-header") as HTMLElement;

      if (header && pageHeader) {
        const height = header.offsetHeight - 40;
        pageHeader.style.marginTop = `${height}px`;
      }
    }, 100); // Wait for layout to stabilize
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>{subTitle} | Mewa</title>
      </Helmet>
      <div className="page-header">
        <div className="page-block">
          <Row className="row align-items-center">
            <Col md={12}>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={`/${getAllowedDashboard()}`}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">{mainTitle}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  {subTitle}
                </li>
              </ul>
            </Col>
            <Col md={12}>
              <div className="page-header-title">
                <h2 className="mb-0">{subTitle}</h2>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BreadcrumbItem;

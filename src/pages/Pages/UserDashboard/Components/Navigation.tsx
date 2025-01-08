/* eslint-disable @typescript-eslint/no-explicit-any */
import { Nav } from "react-bootstrap";

const Navigation = () => {
  const onPress = (e: any) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Nav
      className="nav-pills nav-justified user-dashboard-tab user-dashboard-sticky-action"
      //   style={{ position: "fixed" }}
    >
      <Nav.Item as="li" data-target-form="#recommendation">
        <Nav.Link
          eventKey="tab-1"
          href="#recommendation"
          data-bs-toggle="tab"
          data-toggle="tab"
          onClick={(e) => onPress(e)}
        >
          <span className="d-none d-sm-inline">Recommendation</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li" data-target-form="#content-bytes">
        <Nav.Link
          eventKey="tab-2"
          href="#content-bytes"
          data-bs-toggle="tab"
          data-toggle="tab"
          className="nav-link"
          onClick={(e) => onPress(e)}
        >
          <span className="d-none d-sm-inline">Content Bytes</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li" data-target-form="#past-performance">
        <Nav.Link
          eventKey="tab-3"
          href="#past-performance"
          data-bs-toggle="tab"
          data-toggle="tab"
          className="nav-link"
          onClick={(e) => onPress(e)}
        >
          <span className="d-none d-sm-inline">Past Performance</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;

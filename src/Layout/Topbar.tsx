/* eslint-disable @typescript-eslint/no-explicit-any */
import { THEME_MODE } from "../Common/layoutConfig";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SimpleBar from "simplebar-react";

//import images
// import avatar1 from "../assets/images/user/avatar-1.jpg";
import avatar2 from "../assets/images/user/avatar-2.jpg";
import { postRequest } from "../service/fetch-services";
import SocketUI from "../Common/SocketUI";
// import avatar3 from "../assets/images/user/avatar-3.jpg";

interface HeaderProps {
  themeMode?: string; // Define the type for themeMode
  changeThemeMode?: any; // Define the type for changeThemeMode function
  toogleSidebarHide?: () => void;
  toogleMobileSidebarHide?: () => void;
  handleOffcanvasToggle?: () => void;
}

const TopBar = ({
  // handleOffcanvasToggle,
  changeThemeMode,
  toogleSidebarHide,
  toogleMobileSidebarHide,
}: HeaderProps) => {
  const dispatch = useDispatch<any>();
  const userDetails = JSON.parse(localStorage.getItem("user") || "");
  // Function to handle theme mode change
  const handleThemeChange = (value: any) => {
    dispatch(changeThemeMode(value));
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const body = {
        userId: userDetails?._id,
        fcmToken: localStorage.getItem("fcmToken") || "",
      };
      const result = await postRequest("auth/logout", body);
      if (result) {
        localStorage.clear();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <header className="pc-header">
        <div className="header-wrapper">
          <div className="me-auto pc-mob-drp">
            <ul className="list-unstyled">
              <li className="pc-h-item pc-sidebar-collapse">
                <Link
                  to="#"
                  className="pc-head-link ms-0"
                  id="sidebar-hide"
                  onClick={toogleSidebarHide}
                >
                  <i className="ti ti-menu-2"></i>
                </Link>
              </li>
              <li className="pc-h-item pc-sidebar-popup">
                <Link
                  to="#"
                  className="pc-head-link ms-0"
                  id="mobile-collapse"
                  onClick={toogleMobileSidebarHide}
                >
                  <i className="ti ti-menu-2"></i>
                </Link>
              </li>
            </ul>
          </div>

          <div className="ms-auto">
            <ul className="list-unstyled">
              {userDetails?.role === "admin" &&
                <span className="pc-h-item">
                  <SocketUI />
                </span>
              }
              <Dropdown as="li" className="pc-h-item">
                <Dropdown.Toggle
                  as="a"
                  className="pc-head-link arrow-none me-0"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <i className="ph-duotone ph-sun-dim"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end pc-h-dropdown">
                  <Dropdown.Item
                    onClick={() => handleThemeChange(THEME_MODE.DARK)}
                  >
                    <i className="ph-duotone ph-moon"></i>
                    <span>Dark</span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleThemeChange(THEME_MODE.LIGHT)}
                  >
                    <i className="ph-duotone ph-sun-dim"></i>
                    <span>Light</span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleThemeChange(THEME_MODE.DEFAULT)}
                  >
                    <i className="ph-duotone ph-cpu"></i>
                    <span>Default</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <li className="pc-h-item">
                <a
                  className="pc-head-link pct-c-btn"
                  onClick={handleOffcanvasToggle}
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvas_pc_layout"
                >
                  <i className="ph-duotone ph-gear-six"></i>
                </a>
              </li> */}

              {/* <Dropdown as="li" className="pc-h-item">
                <Dropdown.Toggle
                  as="a"
                  className="pc-head-link arrow-none me-0"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-haspopup="false"
                >
                  <i className="ph-duotone ph-bell"></i>
                  <span className="badge bg-success pc-h-badge">3</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-notification dropdown-menu-end pc-h-dropdown">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h4 className="m-0">Notifications</h4>
                    <ul className="list-inline ms-auto mb-0">
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="avtar avtar-s btn-link-hover-primary"
                        >
                          <i className="ti ti-link f-18"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <SimpleBar
                    className="dropdown-body text-wrap header-notification-scroll position-relative h-100"
                    style={{ maxHeight: "calc(100vh - 235px)" }}
                  >
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="text-span">Today</p>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src={avatar2}
                              alt="user-image"
                              className="user-avtar avtar avtar-s"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">
                                  Keefe Bond added new tags to 💪 Design system
                                </h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm">2 min ago</span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              <br />
                              <span className="text-truncate">
                                Lorem Ipsum has been the industry&apos;s
                                standard dummy text ever since the 1500s.
                              </span>
                            </p>
                            <span className="badge bg-light-primary border border-primary me-1 mt-1">
                              web design
                            </span>
                            <span className="badge bg-light-warning border border-warning me-1 mt-1">
                              Dashobard
                            </span>
                            <span className="badge bg-light-success border border-success me-1 mt-1">
                              Design System
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-primary">
                              <i className="ph-duotone ph-chats-teardrop f-18"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Message</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm text-muted">
                                  1 hour ago
                                </span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              <br />
                              <span className="text-truncate">
                                Lorem Ipsum has been the industry&apos;s
                                standard dummy text ever since the 1500s.
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <p className="text-span">Yesterday</p>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-danger">
                              <i className="ph-duotone ph-user f-18"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">
                                  Challenge invitation
                                </h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm text-muted">
                                  12 hour ago
                                </span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              <br />
                              <span className="text-truncate">
                                <strong> Jonny aber</strong> invites to join the
                                challenge
                              </span>
                            </p>
                            <button className="btn btn-sm rounded-pill btn-outline-secondary me-2">
                              Decline
                            </button>
                            <button className="btn btn-sm rounded-pill btn-primary">
                              Accept
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-info">
                              <i className="ph-duotone ph-notebook f-18"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Forms</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm text-muted">
                                  2 hour ago
                                </span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry&apos;s standard dummy text ever since the
                              1500s.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src={avatar2}
                              alt="user-image"
                              className="user-avtar avtar avtar-s"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">
                                  Keefe Bond{" "}
                                  <span className="text-body">
                                    {" "}
                                    added new tags to{" "}
                                  </span>{" "}
                                  💪 Design system
                                </h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm">2 min ago</span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              <br />
                              <span className="text-truncate">
                                Lorem Ipsum has been the industry&apos;s
                                standard dummy text ever since the 1500s.
                              </span>
                            </p>
                            <span className="badge bg-light-primary border border-primary me-1 mt-1">
                              web design
                            </span>
                            <span className="badge bg-light-warning border border-warning me-1 mt-1">
                              Dashobard
                            </span>
                            <span className="badge bg-light-success border border-success me-1 mt-1">
                              Design System
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-primary">
                              <i className="ph-duotone ph-chats-teardrop f-18"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Message</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm text-muted">
                                  1 hour ago
                                </span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              <br />
                              <span className="text-truncate">
                                Lorem Ipsum has been the industry&apos;s
                                standard dummy text ever since the 1500s.
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <p className="text-span">Yesterday</p>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-danger">
                              <i className="ph-duotone ph-user f-18"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">
                                  Challenge invitation
                                </h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm text-muted">
                                  12 hour ago
                                </span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              <br />
                              <span className="text-truncate">
                                <strong> Jonny aber</strong> invites to join the
                                challenge
                              </span>
                            </p>
                            <button className="btn btn-sm rounded-pill btn-outline-secondary me-2">
                              Decline
                            </button>
                            <button className="btn btn-sm rounded-pill btn-primary">
                              Accept
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-info">
                              <i className="ph-duotone ph-notebook f-18"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Forms</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm text-muted">
                                  2 hour ago
                                </span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry&apos;s standard dummy text ever since the
                              1500s.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src={avatar2}
                              alt="user-image"
                              className="user-avtar avtar avtar-s"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">
                                  Keefe Bond{" "}
                                  <span className="text-body">
                                    {" "}
                                    added new tags to{" "}
                                  </span>{" "}
                                  💪 Design system
                                </h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm text-muted">
                                  2 min ago
                                </span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              <br />
                              <span className="text-truncate">
                                Lorem Ipsum has been the industry&apos;s
                                standard dummy text ever since the 1500s.
                              </span>
                            </p>
                            <button className="btn btn-sm rounded-pill btn-outline-secondary me-2">
                              Decline
                            </button>
                            <button className="btn btn-sm rounded-pill btn-primary">
                              Accept
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-success">
                              <i className="ph-duotone ph-shield-checkered f-18"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Security</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm text-muted">
                                  5 hour ago
                                </span>
                              </div>
                            </div>
                            <p className="position-relative text-muted mt-1 mb-2">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry&apos;s standard dummy text ever since the
                              1500s.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </SimpleBar>
                  <div className="dropdown-footer">
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="d-grid">
                          <button className="btn btn-primary">
                            Archive all
                          </button>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-grid">
                          <button className="btn btn-outline-secondary">
                            Mark all as read
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}
              <Dropdown as="li" className="pc-h-item header-user-profile">
                <Dropdown.Toggle
                  className="pc-head-link arrow-none me-0"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-haspopup="false"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  style={{ border: "none" }}
                >
                  <img
                    src={avatar2}
                    alt="user-image"
                    width={40}
                    className="user-avtar"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h4 className="m-0">Profile</h4>
                  </div>
                  <div className="dropdown-body">
                    <SimpleBar
                      className="profile-notification-scroll position-relative"
                      style={{ maxHeight: "calc(100vh - 225px)" }}
                    >
                      <ul className="list-group list-group-flush w-100">
                        <li className="list-group-item">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <img
                                src={avatar2}
                                alt="user-image"
                                width={50}
                                className="wid-50 rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1 mx-3">
                              <h5 className="mb-0">
                                {userDetails?.firstName}&nbsp;
                                {userDetails?.lastName}
                              </h5>
                              {/* <a
                                className="link-primary"
                                href="tel:carson.darrin@company.io"
                              > */}
                              {userDetails?.mobileNumber}
                              {/* </a> */}
                            </div>
                            {/* <span className="badge bg-primary">PRO</span> */}
                          </div>
                        </li>
                        {userDetails?.role === "customer" ? (
                          <li className="list-group-item">
                            <Dropdown.Item
                              onClick={() => navigate("/feedback/add")}
                            >
                              <span className="d-flex align-items-center">
                                <i className="ph-duotone ph-chat-text"></i>
                                <span>Feedback</span>
                              </span>
                            </Dropdown.Item>
                          </li>
                        ) : (
                          ""
                        )}
                        <li className="list-group-item">
                          <Dropdown.Item href="/profile/edit">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-user-circle"></i>
                              <span>Edit profile</span>
                            </span>
                          </Dropdown.Item>
                        </li>
                        <li className="list-group-item">
                          <Dropdown.Item onClick={handleLogout}>
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-power"></i>
                              <span>Logout</span>
                            </span>
                          </Dropdown.Item>
                        </li>
                      </ul>
                    </SimpleBar>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default TopBar;

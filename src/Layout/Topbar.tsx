/* eslint-disable @typescript-eslint/no-explicit-any */
import { THEME_MODE } from "../Common/layoutConfig";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SimpleBar from "simplebar-react";

//import images
// import avatar1 from "../assets/images/user/avatar-1.jpg";
import avatar2 from "../assets/images/user/avatar-2.jpg";
import { postRequest } from "../service/fetch-services";
import SocketUI from "../Common/SocketUI";
import { INotification } from "../pages/Pages/UserDashboard/Helper/interfaces";
import moment from "moment";
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

  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  const fetchNotifications = async (page = 1) => {
    try {
      setLoading(true);
      const result = await postRequest("notification/list", {
        limit: 10,
        page: page,
        userId: userDetails?._id,
      });
      const { data } = result;
      setNotifications((prev) => (page === 1 ? data : [...prev, ...data]));
      setTotalPages(result?.pagination?.totalPages);
      setCurrentPage(page);
      setLoading(false);
      setDropdownOpen(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // Detect scroll to bottom
  const handleScroll = () => {
    if (!containerRef.current || loading || currentPage >= totalPages) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchNotifications(currentPage + 1);
    }
  };

  const readAllNotification = async () => {
    try {
      const body = {
        userId: userDetails?._id,
      };
      setUpdateLoading(true);
      await postRequest("notification/mark-all-as-read", body);
      setUpdateLoading(false);
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
              {userDetails?.role === "admin" && (
                <span className="pc-h-item">
                  <SocketUI />
                </span>
              )}
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

              <Dropdown
                as="li"
                className="pc-h-item"
                show={dropdownOpen}
                onToggle={(isOpen) => setDropdownOpen(isOpen)}
              >
                <Dropdown.Toggle
                  as="a"
                  className="pc-head-link arrow-none me-0"
                  data-bs-toggle="dropdown"
                  aria-haspopup="false"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    fetchNotifications();
                  }}
                >
                  <i className="ph-duotone ph-bell"></i>
                  {/* <span className="badge bg-success pc-h-badge">3</span> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-notification dropdown-menu-end pc-h-dropdown">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h4 className="m-0">Notifications</h4>
                  </div>
                  <SimpleBar
                    className="dropdown-body text-wrap header-notification-scroll position-relative h-100"
                    style={{ maxHeight: "calc(100vh - 235px)" }}
                    scrollableNodeProps={{
                      ref: containerRef,
                      onScroll: handleScroll,
                    }}
                  >
                    <ul className="list-group list-group-flush w-100">
                      {loading ? (
                        <li className="list-group-item d-flex justify-content-center">
                          <Spinner
                            size="sm"
                            className="d-flex justify-content-center"
                          />
                        </li>
                      ) : (
                        ""
                      )}
                      {notifications?.length ? (
                        notifications?.map((notification, index) => (
                          <li className="list-group-item" key={index}>
                            <div>
                              <div>
                                <div className="d-flex justify-content-between">
                                  <div className="me-3 position-relative d-flex gap-2">
                                    <h6 className="mb-0">
                                      {notification?.title}
                                    </h6>
                                    <span>{moment(notification.createdAt).format("YYYY-MM-DD h:mm A")}</span>
                                  </div>
                                </div>
                                <p className="position-relative text-muted mt-1 mb-2">
                                  <span>{notification?.body}</span>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">No Data Found!</li>
                      )}
                    </ul>
                  </SimpleBar>
                  <div className="dropdown-footer">
                    <div className="row g-3 justify-content-end">
                      <div className="col-6">
                        <div className="d-grid">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => readAllNotification()}
                            disabled={updateLoading || !notifications?.length}
                          >
                            Mark all as read{" "}
                            {updateLoading ? (
                              <Spinner className="ms-2" size="sm" />
                            ) : (
                              ""
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
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

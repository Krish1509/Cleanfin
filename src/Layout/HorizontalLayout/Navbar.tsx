// import React from "react";
import { getMenuByRole } from "./HorizontalMenudata";
import { Link, useLocation } from "react-router-dom";

// Define types for the menu structure
interface MenuItem {
  id: string;
  label: string;
  link?: string;
  icon?: string;
  badge?: string;
}

const Navbar = () => {
  const router = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || ""); // Fetch role
  const menuData = getMenuByRole(user?.role);

  const isMenuActive = (menuItem: MenuItem) => {
    if (router.pathname === menuItem.link) {
      return true;
    }
    return false;
  };

  return (
    <div className="navbar-content pc-trigger">
      <ul className="pc-navbar" style={{ display: "block" }}>
        {menuData.map((item, key) => (
          <li
            className={`pc-item pc-hasmenu ${
              isMenuActive(item) ? "active" : ""
            }`}
            key={key}
          >
            <Link to={item?.link} className="pc-link">
              {item?.icon ? (
                <span className="pc-micon">
                  <i className={item?.icon}></i>
                </span>
              ) : (
                ""
              )}
              <span className="pc-mtext">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;

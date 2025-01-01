// import React from "react";
import { getMenuByRole } from "./HorizontalMenudata";
import FeatherIcon from "feather-icons-react";
import { Link, useLocation } from "react-router-dom";

// Define types for the menu structure
interface SubMenuItem {
  id: string;
  label: string;
  link?: string;
  icon?: string;
  badge?: string;
  submenu?: SubMenuItem[] | undefined; // Explicitly optional
}

interface MenuItem extends SubMenuItem {
  submenu?: SubMenuItem[] | undefined;
}

const Navbar = () => {
  const router = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || ""); // Fetch role
  const menuData = getMenuByRole(user?.role);

  const isMenuActive = (menuItem: MenuItem) => {
    if (router.pathname === menuItem.link) {
      return true;
    }
    if (
      menuItem.submenu &&
      menuItem.submenu.some((subItem: SubMenuItem) => isMenuActive(subItem))
    ) {
      return true;
    }
    return false;
  };

  const renderSubMenu = (subMenuItems: SubMenuItem[]): JSX.Element => {
    return (
      <ul className="pc-submenu">
        {subMenuItems.map((subItem, subKey) => (
          <li
            className={`pc-item ${isMenuActive(subItem) ? "active" : ""}`}
            key={subKey}
          >
            {subItem.submenu ? (
              <>
                <Link to="#!" className="pc-link">
                  {subItem.icon ? (
                    <span className="pc-micon">
                      <i className={subItem.icon}></i>
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="pc-mtext">{subItem.label}</span>
                  <span className="pc-arrow">
                    <FeatherIcon icon="chevron-right" />
                  </span>
                </Link>
                {renderSubMenu(subItem.submenu)}
              </>
            ) : (
              <Link to={subItem.link || "#"} className="pc-link">
                {subItem.icon && (
                  <span className="pc-micon">
                    <i className={subItem.icon}></i>
                  </span>
                )}
                <span className="pc-mtext">{subItem.label}</span>
                {subItem.badge && (
                  <span className="pc-badge">{subItem.badge}</span>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
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
              {item?.submenu?.length ? (
                <span className="pc-arrow">
                  <FeatherIcon icon="chevron-right" />
                </span>
              ) : null}
            </Link>
            {item?.submenu && renderSubMenu(item.submenu)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;

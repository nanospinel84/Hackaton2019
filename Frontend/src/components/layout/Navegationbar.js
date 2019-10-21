import "./Navegationbar.css";
import React from "react";
import {
  MdAccountCircle,
  MdWeb,
  MdWidgets, 
  MdExitToApp
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Navbar, NavbarBrand, NavLink as BSNavLink } from "reactstrap";
import bn from "../dashboardUtils/utils/bemnames";


const navItems = [
  { to: "/usuarios", name: "usuarios", exact: false, Icon: MdAccountCircle },
  { to: "/certificaciones", name: "certificaciones", exact: false, Icon: MdWeb },
  { to: "/historial", name: "historial", exact: false, Icon: MdWidgets },
  { to: "/", name: "logout", exact: true, Icon: MdExitToApp }

];

const bem = bn.create("navbar");

class Navegationbar extends React.Component {


  render() {
    return (
              
        <div>

        <Navbar color="light" light expand="md">
        <NavbarBrand>Expertix</NavbarBrand>
          <Nav className="ml-auto" navbar>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e("nav-item")}  >
                <BSNavLink
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e("nav-item-icon")} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
          </Navbar>
        </div>
      );
  }
}

export default Navegationbar;

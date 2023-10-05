import React, { useState } from "react";
import Navicon from "./Navicon"
import { NavLink } from "react-router-dom";

import '../css/index.css';


const Sidebar = () => {


    return(
        <div className="sidebar">
            <NavLink to="/Dashboard" activeClassName="active"><Navicon name="Dashboard" class="space_dashboard"/></NavLink>
            <NavLink to="/Product" activeClassName="active"><Navicon name="Product" class="inventory_2" /></NavLink>
            <Navicon name="Product Sets" class="inventory" />
            <NavLink to="/Order" activeClassName="active"><Navicon  name="Orders" class="shopping_cart" /></NavLink>
            <Navicon name="Customers" class="group_add" />
            <NavLink to="/usermanagement" activeClassName="active"><Navicon  name="User Management" class="shield_person" /></NavLink>
            </div>
    );
}

export default Sidebar;
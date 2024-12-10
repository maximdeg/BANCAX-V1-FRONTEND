import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import BurguerIcon from "../BurguerIcon/BurguerIcon";
import { Link } from "react-router-dom";
import "./HamburguerMenuHome.css";

export default function HamburguerMenuHome({ isOpen }) {
    return (
        <Menu isOpen={isOpen} width={"150px"} right customBurgerIcon={<BurguerIcon isOpen={isOpen} />}>
            <Link to="/in/login">
                <button className="btn btn-login">Login</button>
            </Link>
            <Link to="/in/register">
                <button className="btn btn-signup">Sign up</button>
            </Link>
        </Menu>
    );
}

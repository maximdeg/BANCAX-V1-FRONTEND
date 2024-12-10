import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import "./HamburguerMenuHome.css";
import BurguerIcon from "../BurguerIcon/BurguerIcon";
import { Link } from "react-router-dom";

export default function HamburguerMenuHome() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Menu isOpen={isOpen} width={"200px"} right customBurgerIcon={<BurguerIcon isOpen={isOpen} />}>
            <Link to="/in/login">
                <button className="btn btn-login">Login</button>
            </Link>
            <Link to="/in/register">
                <button className="btn btn-signup">Sign up</button>
            </Link>
        </Menu>
    );
}

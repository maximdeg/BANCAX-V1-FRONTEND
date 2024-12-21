import React from "react";
import { slide as Menu } from "react-burger-menu";
import BurguerIcon from "../BurguerIcon/BurguerIcon";
import Sidebar from "../Sidebar/Sidebar";
import "./HamburguerMenu.css";

export default function HamburguerMenu({ isOpen }) {
    return (
        <Menu isOpen={isOpen} width={"240px"} left customBurgerIcon={<BurguerIcon isOpen={isOpen} />}>
            <Sidebar />
        </Menu>
    );
}

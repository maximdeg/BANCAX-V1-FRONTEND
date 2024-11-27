import React from "react";
import { FaHouse, FaCodiepie } from "react-icons/fa6";
import { TbCashRegister } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { ImStatsBars } from "react-icons/im";
import { VscGraphLine } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";

import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
    const { fullname, id, photo } = JSON.parse(sessionStorage.getItem("user_info"));
    const edit_profile_url = `/profile/${id}`;
    console.log(photo);
    const photo_src = `/img/${photo}`;

    return (
        <aside className="aside-nav">
            <div className="sign-in-container">
                <Link to="/in/login">
                    <button className="btn btn-login">Login</button>
                </Link>
                <Link to="/in/register">
                    <button className="btn btn-sing-up">Sign up</button>
                </Link>
            </div>
            <div className="middle-container">
                <div className="user-info">
                    <div className="user-img">
                        <Link to={edit_profile_url}>
                            <img src={photo_src} />
                        </Link>
                    </div>
                    <div className="user-name">
                        <span className="name">Hi {fullname.split(" ")[0]}!</span>
                        <span className="user-link">
                            <Link to={edit_profile_url} className="link">
                                Edit profile
                            </Link>
                        </span>
                    </div>
                </div>
                <nav className="nav-menu">
                    <ul>
                        <li>
                            <Link to="/" className="link">
                                <FaHouse className="icon" />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movements" className="link">
                                <TbCashRegister className="icon" />
                                <span>Movements</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/category-list" className="link">
                                <BiCategoryAlt className="icon" />
                                <span>Category List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/circle-graphic" className="link">
                                <FaCodiepie className="icon" />
                                <span>Circle Graphic</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/bars-graphic" className="link">
                                <ImStatsBars className="icon" />
                                <span>Bars Graphic</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/xy-graphic " className="link">
                                <VscGraphLine className="icon" />
                                <span>Line Graphic</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="link">
                                <FiSettings className="icon" />
                                <span>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="bottom-container"></div>
        </aside>
    );
};

export default Sidebar;

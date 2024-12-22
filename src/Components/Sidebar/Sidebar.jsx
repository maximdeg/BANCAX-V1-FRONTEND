import React from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { FaHouse, FaCodiepie } from "react-icons/fa6";
import { TbCashRegister } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { ImStatsBars } from "react-icons/im";
import { VscGraphLine } from "react-icons/vsc";
import { RxGear } from "react-icons/rx";

import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
    const { isAuthenticatedUser, logout } = useAuthContext();
    const { fullname, id, photo } = JSON.parse(localStorage.getItem("user_info"));
    const edit_profile_url = `/profile/${id}`;
    const photo_src = photo ? photo : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    return (
        <aside className="aside-nav">
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
                        <li data-toolip="Total balance and tutorial">
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
                            <div className="link disabled">
                                <FaCodiepie className="icon" />
                                <span>Circle Graphic</span>
                            </div>
                        </li>
                        <li>
                            <div className="link disabled">
                                <ImStatsBars className="icon" />
                                <span>Bars Graphic</span>
                            </div>
                        </li>
                        <li>
                            <div className="link disabled">
                                <VscGraphLine className="icon" />
                                <span>Line Graphic</span>
                            </div>
                        </li>
                        <li>
                            <Link to="/settings" className="link">
                                <RxGear className="icon" />
                                <span>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {isAuthenticatedUser ? (
                    <button className="btn btn-logout" onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/in/login">
                            <button className="btn btn-login">Login</button>
                        </Link>
                        <Link to="/in/register">
                            <button className="btn btn-sing-up">Sign up</button>
                        </Link>
                    </>
                )}
            </div>
            <div className="bottom-container">
                <img src="https://res.cloudinary.com/djdnlogf1/image/upload/v1734110512/small-logo_f0jlfh.png" alt="bancax-small-logo" />
                <span className="version">Version 1.0.0</span>
            </div>
        </aside>
    );
};

export default Sidebar;

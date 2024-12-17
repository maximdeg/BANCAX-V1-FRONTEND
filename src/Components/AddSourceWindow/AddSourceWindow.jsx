import React, { useEffect, useState } from "react";
import { ImBin2 } from "react-icons/im";

import "./AddSourceWindow.css";
import LoadingDots from "../LoadingDots/LoadingDots";

const AddSourceWindow = ({ title, arrayPluralName, handleDeleteItem, handleAddForm, list, isLoading }) => {
    return (
        <div className="window edit-profile-window">
            <h1>{arrayPluralName.split("")[0].toUpperCase() + arrayPluralName.split("").slice(1).join("")}</h1>
            <div className="window-add-list-container">
                <div className="window-list-container">
                    <h2>{title} List</h2>
                    <List arrayPluralName={arrayPluralName} handleDeleteItem={handleDeleteItem} list={list} />
                </div>
                <div className="window-add-container">
                    <h2>Add new</h2>
                    <form className="add-form" onSubmit={(e) => handleAddForm(e, arrayPluralName)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="name" name="name" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <input type="color" name="color" id="color" />
                        </div>
                        <div className="btn-container">
                            {isLoading ? (
                                <button className="btn btn-signup">
                                    <LoadingDots />
                                </button>
                            ) : (
                                <button className="btn btn-signup">Add {title}</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSourceWindow;

const List = ({ arrayPluralName, handleDeleteItem, list }) => {
    return (
        <div className="list-container">
            <ul className="list">
                {list.map((item) => {
                    if (item.is_active) {
                        return (
                            <li key={item._id} style={{ color: item.color }} className="list-item">
                                <strong>{item.name}</strong>
                                <button className="btn-delete-channel" onClick={(e) => handleDeleteItem(e, arrayPluralName, item._id)}>
                                    <ImBin2 />
                                </button>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";

import "./AddSourceWindow.css";

const AddSourceWindow = () => {
    const { handleAddForm } = useGlobalContext();

    return (
        <div className="window add-source-window">
            <h1>Sources</h1>
            <div className="window-add-list-container">
                <div className="window-list-container">
                    <h2>Source List</h2>
                    <SourceList />
                </div>
                <div className="window-add-container">
                    <h2>Add new</h2>
                    <form className="add-form" onSubmit={(e) => handleAddForm(e, "sources")}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="name" name="name" id="name" />
                        </div>
                        {/* TODO: Add color picker properly */}
                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <input type="color" name="color" id="color" />
                        </div>
                        <div className="btn-container">
                            <button className="btn btn-signup">Add source</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSourceWindow;

const SourceList = () => {
    const { sources } = JSON.parse(sessionStorage.getItem("user_info"));

    return (
        <div className="list-container">
            <ul className="list">
                {sources.map((source) => {
                    return (
                        <li key={source._id} style={{ color: source.color }} className="list-item">
                            <strong>{source.name}</strong>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

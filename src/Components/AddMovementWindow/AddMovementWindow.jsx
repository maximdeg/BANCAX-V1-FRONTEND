import React from "react";
import "./AddMovementWindow.css";

const AddMovementWindow = () => {
    return (
        <div className="add-movement-window">
            <div className="add-movement-title"></div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="amount" name="amount" id="amount" />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select type="category" name="category" id="category" />
                </div>
                <div className="form-group">
                    <label htmlFor="source">Source</label>
                    <select type="source" name="source" id="source" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="description" name="description" id="description" />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" id="date" />
                </div>
            </form>
        </div>
    );
};

export default AddMovementWindow;

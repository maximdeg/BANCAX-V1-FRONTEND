import React from "react";
import { useParams } from "react-router-dom";

const EditPasswordWindow = () => {
    const { user_id } = useParams();
    const handleChangeInputValue = (e) => {};

    return (
        <div>
            <h3>Change password</h3>
            <form action="">
                <div className="form-group">
                    <label htmlFor="current-password">Password</label>
                    <input type="password" name="current-password" id="current-password" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="new-password">Password</label>
                    <input type="password" name="new-password" id="new-password" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirm Password</label>
                    <input type="password" name="password_confirm" id="password_confirm" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="btn-container">
                    <button>Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditPasswordWindow;

import React from "react";

const EditNameWindow = () => {
    const handleChangeInputValue = (e) => {};
    return (
        <div>
            <h3>Main Information</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="fullname">Full name</label>
                    <input type="fullname" name="fullname" id="fullname" placeholder="John Doe" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="example@email.com" onChange={handleChangeInputValue} />
                </div>
                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditNameWindow;

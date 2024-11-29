import React from "react";

const EditPhotoWindow = () => {
    return (
        <div>
            <h3>Photo</h3>
            <div className="user-img">
                <img />
            </div>
            <form>
                <div>
                    <input type="file" name="photo" id="photo" />
                </div>
                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditPhotoWindow;

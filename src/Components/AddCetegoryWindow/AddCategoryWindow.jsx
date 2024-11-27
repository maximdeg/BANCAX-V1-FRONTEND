import React, { useState } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";
import "./AddCategoryWindow.css";

const AddCategoryWindow = () => {
    const { handleAddForm } = useGlobalContext();

    return (
        <div className="window add-category-window">
            <h1>Categories</h1>
            <div className="window-add-list-container">
                <div className="window-list-container">
                    <h2>Category List</h2>
                    <CategoryList />
                </div>
                <div className="window-add-container">
                    <h2>Add new</h2>
                    <form className="add-form" onSubmit={(e) => handleAddForm(e, "categories")}>
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
                            <button className="btn btn-signup">Add category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryWindow;

const CategoryList = () => {
    const { categories } = JSON.parse(sessionStorage.getItem("user_info"));

    const [list, setList] = useState(categories);

    return (
        <div className="list-container">
            <ul className="list">
                {list.map((category) => {
                    return (
                        <li key={category._id} style={{ color: category.color }} className="list-item">
                            <strong>{category.name}</strong>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

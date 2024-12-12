import React, { useState, useRef } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import { ImCross } from "react-icons/im";

import "./ModalTransaction.css";
import { getAuthenticatedHeaders } from "../../utils/Headers";
import { extractFormData } from "../../utils/extractFormData";
import { useForm } from "../../Hooks/useForm";
import { POST } from "../../fetching/http.fetching";
import ENV from "../../env";
import { useGlobalContext } from "../../Context/GlobalContext";

const ModalTransaction = ({ label, setIsModalOpen }) => {
    const today = new Date().toISOString().split("T")[0];
    const { getStorageUserInfo, getSourcesAndCategoriesFromStorage } = useGlobalContext();

    const { id } = getStorageUserInfo();
    const { activeSources, activeCategories } = getSourcesAndCategoriesFromStorage();

    const sourceOptions = activeSources.map((source) => ({ value: source.name, color: source.color, id: source._id }));
    const categoryOptions = activeCategories.map((category) => ({ value: category.name, color: category.color, id: category._id }));
    const [outputMessages, setOutputMessages] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedSourceState, setSelectedSourceState] = useState(sourceOptions[0]);
    const [selectedCategoryState, setSelectedCategoryState] = useState(categoryOptions[0]);

    const form_fields = {
        amount: "",
        source: "",
        category: "",
        description: "",
        date: "",
    };

    const { handleChangeInputValue } = useForm(form_fields);

    const handleSourceSelect = (selectedSource) => {
        setSelectedSourceState(selectedSource);
    };

    const handleCategorySelect = (selectedCategory) => {
        setSelectedCategoryState(selectedCategory);
    };

    const handleChangeDate = (event) => {
        const date = new Date(event.target.value);
        const formattedDate = date.toISOString().split("T")[0];
        console.log(formattedDate);
        setSelectedDate(formattedDate);
    };

    const handleTransactionForm = async (e) => {
        try {
            e.preventDefault();

            const form_HTML = e.target;
            const form_values = new FormData(form_HTML);
            const form_values_object = extractFormData(form_fields, form_values);

            form_values_object.user_id = id;
            form_values_object.source = selectedSourceState;
            form_values_object.category = selectedCategoryState;
            form_values_object.amount = label === "Withdraw" ? form_values_object.amount - form_values_object.amount * 2 : form_values_object.amount;
            form_values_object.date = selectedDate.toString();

            console.log(form_values_object);

            const response = await POST(`${ENV.API_URL}/api/v1/transactions/${id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_object),
            });

            if (!response.ok) {
                // TODO: SHOW ERROR MESSAGE HERE
                console.error(response.payload.detail);
                return;
            }

            setOutputMessages((prevMessages) => [
                ...prevMessages,
                {
                    message: "Transaction added successfully",
                    amount: response.payload.detail.amount,
                    source: response.payload.detail.source,
                    date: response.payload.detail.date,
                },
            ]);

            console.log({ response });
        } catch (err) {
            console.error(err.message);
            // TODO: SHOW ERROR MESSAGE HERE
        }
    };

    return (
        <>
            <div className="darkBG" onClick={() => setIsModalOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">{label}</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setIsModalOpen(false)}>
                        <ImCross />
                    </button>
                    <div className="modalContent">
                        <form className="add-movement-form" onSubmit={(event) => handleTransactionForm(event)}>
                            <div className="form-group amount-container">
                                <label htmlFor="amount">Amount</label>
                                <input type="amount" name="amount" id="amount" onChange={handleChangeInputValue} />
                            </div>
                            <div className="form-group select-group">
                                <CustomSelect label="Source" options={sourceOptions} handleChange={handleSourceSelect} />
                                <CustomSelect label="Category" options={categoryOptions} handleChange={handleCategorySelect} />
                            </div>
                            <div className="form-group description-container">
                                <label htmlFor="description">Description</label>
                                <input type="description" name="description" id="description" onChange={handleChangeInputValue} />
                            </div>
                            <div className="form-group date-container">
                                <label htmlFor="date">Date</label>
                                <input type="date" name="date" id="date" value={selectedDate} onChange={handleChangeDate} />
                            </div>
                            {outputMessages.length !== 0 && (
                                <div className="output-messages-container">
                                    <ul>
                                        {outputMessages.map((transaction, index) => (
                                            <li key={index}>
                                                <div>{transaction.message}</div>
                                                <span>
                                                    {transaction.date}: ${transaction.amount}
                                                    {" ---> "}
                                                    {transaction.source}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="modalActions">
                                <div className="actionsContainer">
                                    <button className="cancelBtn" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </button>
                                    <button className="submitBtn">Add deposit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalTransaction;

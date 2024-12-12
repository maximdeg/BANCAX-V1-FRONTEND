import React, { useState, useCallback } from "react";

import "./CustomSelect.css";

function withClickHandler(Component) {
    return function WrappedComponent(props) {
        const handleClick = useCallback(
            (event) => {
                event.stopPropagation();
                props.onClick(event);
            },
            [props.onClick]
        );

        return <Component {...props} onClick={handleClick} />;
    };
}

const ClickableListItem = withClickHandler("li");

const CustomSelect = ({ label, options, handleChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [labelState, setLabelState] = useState(label);
    const [labelColor, setLabelColor] = useState("#FFFFFF");
    const handleToggle = () => setIsOpen(!isOpen);
    // const selectedOption = options.find((option) => option.value === value);

    const handleOptionClick = (e, color) => {
        setLabelState(e.target.textContent);
        handleChange(e.target.textContent);
        setLabelColor(color);
        setIsOpen(!isOpen);
    };

    return (
        <div className="select-container">
            <div onClick={handleToggle} className="select-label" style={{ borderLeft: `6px solid ${labelColor}` }}>
                {labelState}
            </div>
            <ul className="select-list" type="category" name="category" id="category">
                {isOpen &&
                    options.map((option) => (
                        <ClickableListItem
                            key={option.id}
                            className="option"
                            style={{ color: option.color, borderLeft: `3px solid ${option.color}` }}
                            value={option.value}
                            onClick={(e) => handleOptionClick(e, option.color)}
                        >
                            {option.value}
                        </ClickableListItem>
                    ))}
            </ul>
        </div>
    );
};

export default CustomSelect;

// import React, { useState, useRef, useEffect } from "react";

// function CustomSelect({ options, initialValue, handleChange }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const selectRef = useRef(null);
//     const styledSelectRef = useRef(null);

//     const handleClickOutside = (event) => {
//         if (selectRef.current && !selectRef.current.contains(event.target)) {
//             setIsOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("click", handleClickOutside);
//         return () => document.removeEventListener("click", handleClickOutside);
//     }, []);

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleOptionClick = (option) => {
//         setIsOpen(false);
//         styledSelectRef.current.textContent = option.text;
//         selectRef.current.value = option.value;
//         onChange && onChange(option.value); // Optional callback for onChange event
//     };

//     return (
//         <div className="select-wrapper" ref={selectRef}>
//             <div className="select-styled" ref={styledSelectRef} onClick={toggleDropdown}>
//                 {options[0].text}
//             </div>
//             {isOpen && (
//                 <ul className="select-options">
//                     {options.map((option) => (
//                         <li
//                             key={option.value}
//                             className={option.value === selectRef.current.value ? "is-selected" : ""}
//                             onClick={() => handleOptionClick(option)}
//                         >
//                             {option.text}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             <select value={selectRef.current?.value || initialValue}>
//                 {options.map((option) => (
//                     <option key={option.value} value={option.value}>
//                         {option.text}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// }

// export default CustomSelect;

import React from "react";
import "./ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <section className="error-container">
            <span>4</span>
            <span>
                <span className="screen-reader-text">0</span>
            </span>
            <span>4</span>
            <p className="error_section_subtitle">Thanks. You just broke it all !</p>
            <div className="btn-error-container">
                <Link to="/home">
                    <button className="btn">Get me out of here</button>
                </Link>
            </div>
        </section>
    );
};

export default ErrorPage;

// ERROR PAGE N1
// const ErrorPage = () => {
//     return (
//         <div>
//             <section className="error_section">
//                 <p className="error_section_subtitle">Thanks. You just broke it all !</p>
//                 <h1 className="error_title">
//                     <p>404</p>
//                     404
//                 </h1>
//                 <button href="#" className="btn">
//                     Get me out of here
//                 </button>
//             </section>
//         </div>
//     );
// };

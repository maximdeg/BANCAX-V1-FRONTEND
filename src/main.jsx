import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { GlobalContextProvider } from "./Context/GlobalContext.jsx";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
    hydrateRoot(
        <GlobalContextProvider>
            <AuthContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthContextProvider>
        </GlobalContextProvider>,
        rootElement
    );
} else {
    createRoot(rootElement).render(
        <GlobalContextProvider>
            <AuthContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthContextProvider>
        </GlobalContextProvider>
    );
}

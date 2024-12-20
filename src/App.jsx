import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";

import "./App.css";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage.jsx"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage/ErrorPage.jsx"));
const LayoutPage = lazy(() => import("./Pages/LayoutPage/LayoutPage.jsx"));
const LoginForm = lazy(() => import("./Components/LoginForm/LoginForm.jsx"));
const WelcomePage = lazy(() => import("./Pages/WelcomePage/WelcomePage.jsx"));
const SettingsPage = lazy(() => import("./Pages/SettingsPage/SettingsPage.jsx"));
const MovementsPage = lazy(() => import("./Pages/MovementsPage/MovementsPage.jsx"));
const FormLayoutPage = lazy(() => import("./Pages/FormLayoutPage/FormLayoutPage.jsx"));
const EditProfilePage = lazy(() => import("./Pages/EditProfilePage/EditProfilePage.jsx"));
const CategoryListPage = lazy(() => import("./Pages/CategoryListPage/CategoryListPage.jsx"));
const RegistrationForm = lazy(() => import("./Components/RegistrationForm/RegistrationForm.jsx"));
const ResetPasswordForm = lazy(() => import("./Components/ResetPasswordForm/ResetPasswordForm.jsx"));
const ForgotPasswordForm = lazy(() => import("./Components/ForgotPasswordForm/ForgotPasswordForm.jsx"));
const VerificationConfirmationPage = lazy(() => import("./Pages/VerificationConfirmationPage/VerificationConfirmationPage.jsx"));

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<LayoutPage />}>
                        <Route index element={<HomePage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="movements" element={<MovementsPage />} />
                        <Route path="profile/:user_id" element={<EditProfilePage />} />
                        <Route path="category-list" element={<CategoryListPage />} />
                    </Route>
                </Route>
                <Route path="/home" element={<WelcomePage />} />
                <Route path="/in" element={<FormLayoutPage />}>
                    <Route index element={<LoginForm />} />
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegistrationForm />} />
                    <Route path="forgot-password" element={<ForgotPasswordForm />} />
                    <Route path="reset-password/:token" element={<ResetPasswordForm />} />
                    <Route path="verify/:verification_token" element={<VerificationConfirmationPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Suspense>
    );
}

export default App;

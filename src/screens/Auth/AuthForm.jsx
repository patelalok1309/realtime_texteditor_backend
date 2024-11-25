import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";

function AuthForm() {
    const [variant, setVariant] = useState("LOGIN");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, register } = useContext(AuthContext);

    // Combined form state
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    // Toggle between LOGIN and REGISTER
    const toggleVariant = useCallback(() => {
        setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit logic for login or register
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoading(true);
            if (variant === "LOGIN") {
                try {
                    const result = await login(formData);
                    if (result?.success) {
                        console.log("result", result);
                        navigate("/");
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            }

            if (variant === "REGISTER") {
                try {
                    const result = await register(formData);
                    if (result?.success) {
                        setVariant("LOGIN");
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            }
        },
        [variant, formData, navigate, login, register]
    );

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col min-h-screen justify-center items-center bg-[#212121] py-12 px-2 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center w-fit">
                    <h1 className="text-center text-[#F8F8F2] text-4xl md:text-6xl font-serif tracking-wide hover:text-[#44475A] hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text shadow-lg">
                        Text Editor
                    </h1>
                    <h2 className="m-4 text-center font-semibold text-xl tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>
                <div className="p-6 sm:p-8  w-full bg-[#0d0d0d] rounded-lg shadow-[#44475A]/50 backdrop:blur-md shadow-lg text-center sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:px-10">
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {variant === "REGISTER" && (
                                <Input
                                    label="Username"
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            )}

                            <Input
                                label="Email address"
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />

                            <Input
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />

                            <button
                                type="submit"
                                className={`w-full px-4 py-2 text-white font-medium rounded-md border-gray-500 border text-sm ${
                                    isLoading
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-[#44475A] hover:bg-[#212121]"
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </form>

                        <div className="flex justify-center items-center w-full mt-4 flex-col sm:flex-row">
                            <p className="text-sm text-center text-[#F8F8F2]">
                                {variant === "LOGIN"
                                    ? "Don't have an account?"
                                    : "Already have an account?"}
                            </p>
                            <button
                                onClick={toggleVariant}
                                className="text-[#F8F8F2] ml-2 underline hover:text-[#44475A] hover:scale-105 transition duration-300 ease-in-out"
                            >
                                {variant === "LOGIN" ? "Register" : "Login"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthForm;
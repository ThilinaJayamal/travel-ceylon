// src/components/Login.jsx (or wherever your Login component is)
import React, { useEffect, useState } from 'react';
import { asserts } from '../assets/assets'; // Adjust path if needed
import CustomInput from '../components/CustomInput'; // Adjust path if needed
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // Import the Zustand store

function Login() {
    const navigate = useNavigate();
    const location = useLocation(); // To get redirect URL after login

    // Get state and actions from the store
    const { user, isAuthenticated, loading, error, register, login, clearError } = useAuthStore();

    const [formType, setFormType] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Clear error when form type changes or component mounts
    useEffect(() => {
        clearError();
    }, [formType, clearError]);

    // Automatically navigate to '/' when authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            // Get the 'from' location passed via state, or default to '/'
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, user, navigate, location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError(); // Clear previous errors

        let result;
        if (formType === "Login") {
            result = await login({ email, password });
        } else { // Sign Up
            result = await register({ name, email, password });
        }

        if (result.success) {
            // Navigation is handled by the useEffect above
            console.log(`${formType} successful!`);
        }
        // Error handling is now managed by the store and rendered below
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        // Error clearing is handled by useEffect on formType change
    };

    // --- Google Sign-In Handler ---
    const handleGoogleLogin = () => {
        // Redirect the browser to your backend's Google OAuth endpoint
        // The backend will handle the Google flow and then redirect back to your frontend
        window.location.href = 'http://localhost:5000/api/auth/google';
    };
    // --- End Google Sign-In Handler ---

    return (
        <div className='min-h-screen w-full grid lg:grid-cols-2 grid-cols-1 gap-6 bg-gray-50'>
            {/* Left side image */}
            <div className='p-4 hidden lg:flex justify-between items-center'>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={formType}
                        src={formType === "Login" ? asserts.login_img : asserts.register_img}
                        alt=""
                        className='max-w-full max-h-[80vh]'
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                    />
                </AnimatePresence>
            </div>

            {/* Right side form */}
            <div className='flex flex-col justify-center items-center'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={formType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex flex-col gap-4 md:min-w-md min-w-full px-6 md:px-0 mt-12"
                    >
                        <h1 className='text-4xl font-bold mb-12 text-center'>
                            Travel <span className='text-green-300'>Ceylon</span>
                        </h1>

                        {/* Display error from Zustand store */}
                        {error && <p className='text-red-500'>{error}</p>}

                        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
                            {formType !== "Login" && (
                                <CustomInput
                                    label={"Name"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            )}
                            <CustomInput
                                label={"Email"}
                                type="email" // Specify email type
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <CustomInput
                                label={"Password"}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <div className='flex items-center justify-start w-full'>
                                <button
                                    type="submit"
                                    className='px-8 py-2 mt-2 bg-green-300 rounded-full cursor-pointer disabled:opacity-50'
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? "wait..." : formType}
                                </button>
                            </div>
                        </form>

                        <p className='text-lg mt-4'>
                            {formType === "Login" ? (
                                <>
                                    Don't have an account?{' '}
                                    <span
                                        className='text-green-400 cursor-pointer font-semibold'
                                        onClick={() => {
                                            setFormType("Sign Up");
                                            clearForm();
                                        }}
                                    >
                                        Create one
                                    </span>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <span
                                        className='text-green-400 cursor-pointer font-semibold'
                                        onClick={() => {
                                            setFormType("Login");
                                            clearForm();
                                        }}
                                    >
                                        Log in
                                    </span>
                                </>
                            )}
                        </p>

                        <div className="flex items-center w-full mt-6">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="mx-2 text-lg text-black/70 font-medium">
                                Or {formType} with
                            </span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        <button className='flex gap-4 items-center justify-center border-2 border-gray-300 p-2 rounded-xl
                        hover:shadow cursor-pointer' onClick={handleGoogleLogin}>
                            {/* Google Sign-In Button */}
                            <img
                                src={asserts.google}
                                className='size-6'
                                alt="Sign in with Google"
                            />
                            <p className='text-xl font-semibold text-gray-500'>Google</p>
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Login;
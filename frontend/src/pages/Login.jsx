import React, { useEffect, useState } from 'react';
import { asserts } from '../assets/assets';
import CustomInput from '../components/CustomInput';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { user, loading, error, login, register } = useAuthStore();
    const navigate = useNavigate();

    const [formType, setFormType] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    // Navigate if already logged in
    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    const validateForm = () => {
        const errors = {};

        if (formType !== "Login") {
            if (!name.trim()) errors.name = "Name is required";
            else if (name.trim().length < 3) errors.name = "Name must be at least 3 characters";
        }

        if (!email.trim()) errors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            errors.email = "Email is not valid";

        if (!password) {
            errors.password = "Password is required";
        } else {
            // Strong password regex: at least 1 lowercase, 1 uppercase, 1 digit, 1 special char, min 6 chars
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
            if (!strongPasswordRegex.test(password)) {
                errors.password = "Password must contain at least 6 characters, including uppercase, lowercase, digit, and special character";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        //if (!validateForm()) return;

        try {
            if (formType === "Login") {
                await login({ email, password });
            } else {
                if (!validateForm()) return;
                await register({ name, email, password });
            }
            setPassword(""); // Clear password after submission
        } catch (err) {
            console.error(err);
        }
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setFormErrors({});
    };

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

                        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
                            {formType !== "Login" && (
                                <>
                                    <CustomInput
                                        label={"Name"}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {formErrors.name && (
                                        <p className="text-red-500 text-sm">{formErrors.name}</p>
                                    )}
                                </>
                            )}
                            <CustomInput
                                label={"Email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-sm">{formErrors.email}</p>
                            )}
                            <CustomInput
                                label={"Password"}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {formErrors.password && (
                                <p className="text-red-500 text-sm max-w-[400px]">{formErrors.password}</p>
                            )}

                            {error && <p className="text-red-500">{error}</p>}

                            <div className='flex items-center justify-start w-full'>
                                <button
                                    type="submit"
                                    className='px-8 py-2 mt-2 bg-green-300 rounded-full cursor-pointer disabled:opacity-50'
                                    disabled={loading}
                                >
                                    {loading ? "Please wait..." : formType}
                                </button>
                            </div>
                        </form>

                        <p className='text-lg mt-4'>
                            {formType === "Login" ? (
                                <>
                                    Don’t have an account?{' '}
                                    <span
                                        className='text-green-400 cursor-pointer font-semibold'
                                        onClick={() => { setFormType("Sign Up"); clearForm(); }}
                                    >
                                        Create one
                                    </span>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <span
                                        className='text-green-400 cursor-pointer font-semibold'
                                        onClick={() => { setFormType("Login"); clearForm(); }}
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

                        <div className='flex gap-6 items-center justify-center lg:pb-0 pb-8'>
                            <img src={asserts.google} className='size-6 cursor-pointer' alt="" />
                            <img src={asserts.fb_color} className='size-6 cursor-pointer' alt="" />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Login;

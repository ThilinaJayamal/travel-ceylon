// ServiceProviderAuth.jsx
import React, { useEffect, useState } from "react";
import { useServiceAuthStore } from "../store/serviceAuthStrore";
import { useNavigate } from "react-router-dom";

export default function ServiceProviderAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rePassword: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = useServiceAuthStore((state) => state.login);
    const register = useServiceAuthStore((state) => state.register);
    const user = useServiceAuthStore((state) => state?.user);

    console.log(user)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login({
                    email: formData.email,
                    password: formData.password
                })
            }
            else {
                if (formData.password !== formData.rePassword) {
                    return null
                }
                await register({
                    email: formData.email,
                    password: formData.password
                })
            }

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (user && user.role === "provider") {
            if (user?.serviceType) {
                switch (user.serviceType) {
                    case "Taxi":
                        navigate("/taxi/admin")
                        break;
                    case "Rent":
                        navigate("/")
                        break;
                    case "Guide":
                        navigate("/guides/admin")
                        break;
                    case "Stays":
                        navigate("/stays/admin")
                        break;
                    default:
                        break;
                }
            }
            else {
                navigate("/registration")
            }
        }
    }, [user])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                    {isLogin ? "Service Provider Login" : "Register as Service Provider"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 transition"
                        required
                    />
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="rePassword"
                                placeholder="Re-enter your password"
                                value={formData.serviceType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition"
                                required
                            />
                        </>
                    )}

                    <button
                        type="submit"
                        className="cursor-pointer w-full py-3 rounded-lg bg-green-400 text-white font-semibold text-lg hover:bg-green-500 transition"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="text-lg text-gray-600 mt-4 text-center">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-green-500 font-semibold cursor-pointer hover:underline"
                    >
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}

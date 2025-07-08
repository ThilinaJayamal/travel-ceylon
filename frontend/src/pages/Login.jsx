import React, { useState } from 'react'
import { asserts } from '../assets/assets'
import CustomInput from '../components/CustomInput'
import { motion, AnimatePresence } from 'framer-motion'

function Login() {
    const [formType, setFormType] = useState("Login");

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
                        <h1 className='text-4xl font-bold mb-12 text-center'>Travel <span className='text-green-300'>Ceylon</span></h1>

                        {formType !== "Login" && <CustomInput label={"Name"} />}
                        <CustomInput label={"Email"} />
                        <CustomInput label={"Password"} />

                        <div className='flex items-center justify-start w-full'>
                            <button className='px-8 py-2 mt-2 bg-green-300 rounded-full cursor-pointer'>
                                {formType}
                            </button>
                        </div>

                        <p className='text-lg mt-4'>
                            {formType === "Login" ? (
                                <>
                                    Don’t have an account?{' '}
                                    <span
                                        className='text-green-400 cursor-pointer font-semibold'
                                        onClick={() => setFormType("Sign Up")}
                                    >
                                        Create one
                                    </span>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <span
                                        className='text-green-400 cursor-pointer font-semibold'
                                        onClick={() => setFormType("Login")}
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

export default Login

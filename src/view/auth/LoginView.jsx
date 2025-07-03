import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Login } from '../../api/auth';
import { clearCookie, getCookie, setCookie, setLongTernCookie } from '../../lib/js-cookie';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { ToastError, ToastSuccess } from '../../lib/toast';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // check if user is login redirect to dashboard
    useEffect(() => {
        const user = getCookie('user');
        if (user) {
            navigate('/dashboard'); // 🔁 redirect ไปหน้า login
        }

        //check remenber
        const mydata = getCookie('my-data');
        if (mydata) {
            const parseMydata = JSON.parse(mydata);
            setEmail(parseMydata.email);
            setPassword(parseMydata.password);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await Login(email, password);
        // console.log(res)
        if (res) {
            if (res.status === 200) {
                const data = res.data.data
                setCookie('user', JSON.stringify(data));
                ToastSuccess('ເຂົ້າສູ້ລະບົບສຳເລັດ');

                //remember me
                if (rememberMe) {
                    setLongTernCookie("my-data", JSON.stringify({ email, password }));
                } else {
                    clearCookie("my-data");
                }
                if (data.role_name === "admin") {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }

            } else {
                console.log(res)
                ToastError(res?.response?.data?.message)
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-500 p-4">
            <ToastContainer />
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-2xl font-extrabold text-gray-900">ລະບົບຕິດຕາມເອກະສານຂາເຂົ້າ-ຂາອອກ</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        ເຂົ້າສູ່ລະບົບ
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-6 rounded-md shadow-sm">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                ອີເມວ
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div >
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                ລະຫັດຜ່ານ
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 top-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                    )}
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Remember me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                ບັນທຶກລະຫັດ
                            </label>
                        </div>

                        {/* <div className="text-sm">
                            <a href="#" className="font-medium text-red-600 ">
                                ລືມລະຫັດ
                            </a>
                        </div> */}
                    </div>

                    {/* Sign In Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r  from-slate-600 to-slate-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            ເຂົ້າສູ່ລະບົບ
                        </button>
                    </div>
                </form>

                {/* Social Login */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">ເງື່ອນໄຂ</span>
                        </div>
                    </div>


                </div>

                {/* Sign Up Link */}

            </div>
        </div>
    );
};

export default LoginForm;
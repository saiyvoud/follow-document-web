import React, { useEffect, useState } from 'react'
import userIcon from "../assets/user.png"
import { IoMenu } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { clearCookie, getCookie } from '../lib/js-cookie';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ onToggleSideBar, isToggleSideBar }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState();
    useEffect(() => {
        const user = getCookie('user');
        if (user) {
            const parseUser = JSON.parse(user);
            setUser(parseUser);
            // console.log(parseUser)
        } else {
            navigate("/login");
        }
    }, []);
    const handleLogout = () => {
        clearCookie('user');
        navigate('/login');
    }
    return (
        <>
            {/* NavBar */}
            <div div className='flex-col md:flex-row w-full ' >
                <nav className='bg-white  shadow-lg w-full h-14 flex justify-between'>
                    <button onClick={onToggleSideBar}>
                        {isToggleSideBar ?
                            <AiOutlineClose className=' h-7 w-7 min-w-[20px] my-2 mx-2' /> :
                            <IoMenu className=' h-7 w-7 min-w-[20px] my-2 mx-2' />

                        }
                    </button>
                    <div className=' flex justify-end gap-3 items-center me-5'>
                        <NavLink to={"/myinfo"} className='flex items-center'>
                            <img src={userIcon} className="h-7 w-7 min-w-[20px] my-2 mx-2"></img>
                            <h2 className='mx-2'>{user?.username}</h2>
                        </NavLink>
                        <div onClick={handleLogout}>
                            <IoMdExit className='h-7 w-7 min-w-[20px] my-2 mx-2' />
                        </div>
                    </div>

                </nav>
            </div>
        </>
    )
}


export default Navbar;
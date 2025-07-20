import React from 'react'
import { HiOutlineClipboardDocumentList, HiHome, HiUser, HiOutlineBuildingLibrary, HiUserGroup, HiUsers,HiDocument,HiDocumentCheck } from "react-icons/hi2";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import logo from "../assets/logo.jpeg";
import { NavLink, useLocation } from 'react-router-dom';
import { getCookie } from '../lib/js-cookie';


const Sibebar = () => {
    const location = useLocation();
    const temp = getCookie('user');
    const user = temp ? JSON.parse(temp) : null
    const role_name = user ? user.role_name : ''
    console.log(user)
    // const [isActive, setActive] = useState(0);
    const data = [
        {
            title: "ໜ້າຫລັກ", icon: <HiHome className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/dashboard",
        },
        {
            title: "ເອກະສານ ຂາເຂົ້າ", icon: <HiOutlineDocumentArrowDown className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/doc-import",
        },
        {
            title: "ຕິດຕາມ ເອກະສານ", icon: <HiOutlineClipboardDocumentList className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/doc-follow",
        },
        {
            title: "ເອກະສານ ຂາອອກ", icon: <HiOutlineDocumentArrowUp className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/doc-export",
        },
        {
            title: "ປະເພດເອກະສານ", icon: <HiDocumentCheck className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/doctype",
        },
        {
            title: "ຄະນະ", icon: <HiOutlineBuildingLibrary className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/faculty",
        },
        {
            title: "ພາກສ່ວນ", icon: <HiUsers className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/section-view",
        },
        {
            title: "ຂໍ້ມູນຜູ້ໃຊ້", icon: <HiUser className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/user",
        },
        {
            title: "ສິດເຂົ້າໃຊ້", icon: <HiUserGroup className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/role",
        },
        {
            title: "ລາຍງານ", icon: <HiDocument className="mx-2 w-5 h-5 min-w-[20px]" />, path: "/report",
        },
    ];
    return (
        <div className='w-full '>
           
            {/* SibeBar */}
            <div className='min-h-screen bg-slate-800'>
                <div className='py-5'>
                    <div className='flex justify-center items-center'>
                        <img alt='' src={logo} className="h-20 w-20 mx-16   rounded-full " ></img>
                    </div>
                    <h2 class="py-2 font-bold text-center text-white">Follow Document</h2>
                </div>
                <div className='space-y-2'>
                    {role_name === 'admin' &&
                        <NavLink
                            to={data[0].path}
                            className={location.pathname.startsWith(data[0].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[0].icon}
                            <h2 className='text-center px-2'>{data[0].title}</h2>
                        </NavLink>
                    }
                    {
                        (role_name === "admin" || role_name === "general" || role_name === "staff") &&
                        <NavLink
                            to={data[1].path}
                            className={location.pathname.startsWith(data[1].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[1].icon}
                            <h2 className='text-center px-2'>{data[1].title}</h2>
                        </NavLink>
                    }
                   
                    {
                        (role_name === "admin" || role_name === "general" || role_name === "staff") &&
                        <NavLink
                            to={data[3].path}
                            className={location.pathname.startsWith(data[3].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[3].icon}
                            <h2 className='text-center px-2'>{data[3].title}</h2>
                        </NavLink>
                    }
                    {
                        (role_name === "admin") &&
                        <NavLink
                            to={data[4].path}
                            className={location.pathname.startsWith(data[4].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[4].icon}
                            <h2 className='text-center px-2'>{data[4].title}</h2>
                        </NavLink>
                    }
                    {
                        (role_name === "admin" ) &&
                        <NavLink
                            to={data[5].path}
                            className={location.pathname.startsWith(data[5].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[5].icon}
                            <h2 className='text-center px-2'>{data[5].title}</h2>
                        </NavLink>
                    }
                    {
                        (role_name === "admin") &&
                        <NavLink
                            to={data[6].path}
                            className={location.pathname.startsWith(data[6].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[6].icon}
                            <h2 className='text-center px-2'>{data[6].title}</h2>
                        </NavLink>
                    }
                    {
                        (role_name === "admin" ) &&
                        <NavLink
                            to={data[7].path}
                            className={location.pathname.startsWith(data[7].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[7].icon}
                            <h2 className='text-center px-2'>{data[7].title}</h2>
                        </NavLink>
                    }
                    {
                        (role_name === "admin" ) &&
                        <NavLink
                            to={data[8].path}
                            className={location.pathname.startsWith(data[8].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[8].icon}
                            <h2 className='text-center px-2'>{data[8].title}</h2>
                        </NavLink>
                    }
                    {
                        (role_name === "admin" ) &&
                        <NavLink
                            to={data[9].path}
                            className={location.pathname.startsWith(data[9].path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                            {data[9].icon}
                            <h2 className='text-center px-2'>{data[9].title}</h2>
                        </NavLink>
                    }
                    {/* {data.map((item, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={location.pathname.startsWith(item.path) ? 'flex bg-white rounded-lg px-2 py-2 mx-2 text-slate-800' : 'flex  rounded-lg px-2 py-2 mx-2 text-white ease-in-out duration-200 hover:border-b hover:border-white'}>
                                {item.icon}
                                <h2 className='text-center px-2'>{item.title}</h2>
                            </NavLink>
                        )
                    })}; */}
                </div>
            </div>
        </div>

    )
}

export default Sibebar
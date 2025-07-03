import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { HiUser } from "react-icons/hi2";
import { GetAllUser } from '../../api/user';

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        fettchData();
    }, []);

    const fettchData = async () => {
        const res = await GetAllUser();
        // console.log(res)
        if (res.status === 200) {
            setUser(res.data?.data)
        }
    }
    return (
        <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <HiUser size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'>ຂໍ້ມູນຜູ້ໃຊ້</span>
            </div>
            {users.length > 0 && <div className='p-3'>
                <NavLink to={"add-user"} className='bg-blue-500 text-white p-2 rounded-lg'>ເພີ່ມຜູ້ໃຊ້</NavLink>
            </div>}
            {/* <div className='p-3'>
                <form className='w-full flex justify-start items-center gap-3'>
                    <input type="text" className='border-2 border-gray-300 rounded-lg p-2 w-full' placeholder='' />
                    <button className='bg-blue-500 text-white p-2 rounded-lg'>ຄົ້ນຫາ</button>
                </form>
            </div> */}
            <div className='p-3'>
                <table className='w-full table-auto border-gray-300'>
                    <thead>
                        <tr>
                            {/* <th className='border-2 border-gray-300 p-2 bg-slate-200'>ລະຫັດ</th> */}
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຊື່ຜູ້ໃຊ້</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ອິເມວ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ເບີໂທ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຄະນະ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ພາກສ່ວນ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຈັດການ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, index) => {
                            const jsonStr = JSON.stringify(item);
                            const base64 = btoa((encodeURIComponent(jsonStr)));
                            return (
                                <tr key={index} className='hover:bg-slate-100'>
                                    {/* <td className='border-2 border-gray-300 p-2'>{item?.user_id}</td> */}
                                    <td className='border-2 border-gray-300 p-2'>{item?.username}</td>
                                    <td className='border-2 border-gray-300 p-2'>{item?.email}</td>
                                    <td className='border-2 border-gray-300 p-2'>{item?.phone_number
                                    }</td>
                                    <td className='border-2 border-gray-300 p-2'>{item?.faculty_name}</td>
                                    <td className='border-2 border-gray-300 p-2'>{item?.office_name}</td>
                                    <td className='border-2 border-gray-300 p-2'>
                                        <div className=' flex justify-center items-center gap-2'>
                                            <NavLink to={`edit/${base64}`} className='bg-blue-500 text-white p-1 rounded-lg'>ແກ້ໄຂ</NavLink>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        // <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
        //     <div className='flex justify-start items-center gap-3 p-3'>
        //         <HiOutlineBuildingLibrary size={20} className=' text-teal-500' />
        //         <span className=' text-teal-500 text-lg font-bold'> ຄະນະ</span>
        //     </div>
        //     <div className='p-3'>
        //         <NavLink to={"add-faculty"} className='bg-blue-500 text-white p-2 rounded-lg'>ເພີ່ມຄະນະ</NavLink>
        //     </div>
        //     <div className='p-3'>
        //         <form className='w-full flex justify-start items-center gap-3'>
        //             <input type="text" className='border-2 border-gray-300 rounded-lg p-2 w-full' placeholder='' />
        //             <button className='bg-blue-500 text-white p-2 rounded-lg'>ຄົ້ນຫາ</button>
        //         </form>
        //     </div>

        // </div>
    )
}

export default UserList
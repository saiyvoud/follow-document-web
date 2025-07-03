import React, { useState } from 'react'
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { NavLink, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { FaSave } from "react-icons/fa";
import { InsertFaculty } from '../../api/faculty';
import { ToastError, ToastSuccess } from '../../lib/toast';
const AddFaculty = () => {
    const navigate = useNavigate();
    const [faculty, setFaculty] = React.useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await InsertFaculty({ name: faculty.name, phoneNumber: faculty.phoneNumber })
        if (res.status === 201) {
            ToastSuccess("ເພີ່ມຄະນະສຳເລັດ");
            navigate("/faculty");
        } else if (res.status === 403) {
            ToastError("ບໍ່ມີສິດ");
        } else {
            ToastError(res?.response?.data?.error)
        }
        setIsLoading(false);
    }

    return (
        <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <HiOutlineBuildingLibrary size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'> ເພີ່ມຄະນະໃໝ່</span>
            </div>
            <div className='p-3 w-[500px] mx-auto'>
                <form onSubmit={handleSubmit}>
                    <div className=' mt-5'>
                        <p>ຊື່ຄະນະ</p>
                        <input
                            type="text"
                            className='w-full border border-gray-300 rounded-md p-2'
                            value={faculty?.name}
                            onChange={(e) => setFaculty({ ...faculty, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className=' mt-5'>
                        <p>ເບີໂທ</p>
                        <input
                            type="text"
                            className='w-full border border-gray-300 rounded-md p-2'
                            value={faculty?.phoneNumber}
                            onChange={(e) => setFaculty({ ...faculty, phoneNumber: e.target.value })}
                            required
                        />
                    </div>
                    <div className='mt-3 flex justify-end items-center gap-3'>
                        {!isLoading ?
                            <button type='submit' className=' flex justify-start items-center gap-1 bg-blue-500 p-2 text-white rounded-lg'>
                                <FaSave />
                                <span className='mx-2'>ບັນທຶກ</span>
                            </button>
                            :
                            <button><BeatLoader color='#14b8a6' /></button>}
                        <NavLink to="/faculty" className='flex justify-start items-center gap-1 bg-slate-400 p-2 text-white rounded-lg'>ກັບຄືນ</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFaculty
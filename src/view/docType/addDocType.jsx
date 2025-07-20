import React, { useState } from 'react'
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { NavLink, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { FaSave } from "react-icons/fa";

import { ToastError, ToastSuccess } from '../../lib/toast';
import { InsertDocType } from '../../api/documentType';
const AddDocType = () => {
    const navigate = useNavigate();
    const [docType, setDocType] = React.useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await InsertDocType({ docName: docType.name })
        if (res.status === 201) {
            ToastSuccess("ເພີ່ມປະເພດເອກະສານສຳເລັດ");
            navigate("/doctype");
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
                <span className=' text-teal-500 text-lg font-bold'> ເພີ່ມປະເພດເອກະສານໃໝ່</span>
            </div>
            <div className='p-3 w-[500px] mx-auto'>
                <form onSubmit={handleSubmit}>
                    <div className=' mt-5'>
                        <p>ຊື່ປະເພດເອກະສານ</p>
                        <input
                            type="text"
                            className='w-full border border-gray-300 rounded-md p-2'
                            value={docType?.name}
                            onChange={(e) => setDocType({ ...docType, name: e.target.value })}
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
                        <NavLink to="/docType" className='flex justify-start items-center gap-1 bg-slate-400 p-2 text-white rounded-lg'>ກັບຄືນ</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDocType
import React, { useEffect, useState } from 'react'
import { HiUsers } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { DeletePartDemand, UpdatePartDemand } from '../../api/part_demand';
import { ToastSuccess, ToastError } from '../../lib/toast';
import Swal from 'sweetalert2';

const EditDemand = () => {
    const { data } = useParams();
    const navigate = useNavigate();
    const decodedStr = decodeURIComponent((atob(data)));
    const decodedObj = JSON.parse(decodedStr);

    const [partDemand, setPartDemands] = useState({ part_demand_id: "", part_demand_name: "" });
    useEffect(() => {
        setPartDemands(decodedObj)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "question",
            title: "ອັບເດດຊື່ພາກສ່ວນ",
            showCancelButton: true,
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: 'ຍົກເລີກ',
        }).then(async (result) => {
            if (result.isConfirmed) {
                //update data
                const res = await UpdatePartDemand(partDemand.part_demand_id, { part_demand_name: partDemand.part_demand_name });
                if (res.status === 200) {
                    navigate("/section-view");
                    ToastSuccess("ແກ້ໄຂສຳເລັດ")
                } else if (res.response.status === 403) {
                    ToastError("ບໍ່ມີສິດ");
                }
                else {
                    ToastError(res?.response?.data?.error)
                }
            }
        });

    }
    const handleDelete = async () => {
        Swal.fire({
            icon: "question",
            title: "ລົບ",
            showCancelButton: true,
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: 'ຍົກເລີກ',
        }).then(async (result) => {
            if (result.isConfirmed) {
                //delete doc
                const res = await DeletePartDemand(partDemand.part_demand_id);
                if (res.status === 200) {
                    ToastSuccess("ລົບສຳເລັດ");
                    navigate("/section-view");
                }
                else if (res.response.status === 403) {
                    ToastError("ບໍ່ມີສິດ");
                }
                else {
                    ToastError(res?.response?.data?.error)
                }
            }
        });
    }
    return (
        <div className='mt-5 p-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <HiUsers size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'>ແກ້ໄຂພາກສ່ວນ</span>
            </div>
            <div className=' w-[500px] mx-auto'>
                <form onSubmit={handleSubmit}>
                    <div className='mt-5'>
                        <p>ຊື່ພາກສ່ວນ</p>
                        <input
                            type="text"
                            className='w-full border border-gray-300 rounded-md p-2'
                            value={partDemand.part_demand_name}
                            onChange={(e) => setPartDemands({ ...partDemand, part_demand_name: e.target.value })}
                            required
                        />
                    </div>
                    <div className='mt-5 flex justify-end items-center gap-3'>
                        <button
                            type='submit'
                            className=' flex justify-start items-center gap-1 bg-blue-500 p-2 text-white rounded-lg'>
                            <FaSave />
                            <span className='mx-2'>ບັນທຶກ</span>
                        </button>
                        <div
                            onClick={handleDelete}
                            className=' flex justify-start items-center gap-1 bg-red-500 p-2 text-white rounded-lg'>
                            <MdDelete />
                            <span className='mx-2'>ລົບ</span>
                        </div>
                        <div
                            onClick={() => navigate(-1)}
                            className=' flex justify-start items-center gap-1 bg-slate-400 p-2 text-white rounded-lg'>
                            <span className='mx-2'>ປິດ</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditDemand
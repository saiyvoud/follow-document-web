import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import Swal from 'sweetalert2';
import { ToastError, ToastSuccess } from '../../lib/toast';
import { DeleteFaculty, UpdateFaculty } from '../../api/faculty';


const EditFaculty = () => {
    const { data } = useParams();
    const navigate = useNavigate();
    const decodedStr = decodeURIComponent((atob(data)));
    const decodedObj = JSON.parse(decodedStr);

    const [faculty, setFaculty] = React.useState({});
    useEffect(() => {
        setFaculty(decodedObj)
    }, []);
    console.log(faculty)
    const handleSubmit = () => {
        Swal.fire({
            icon: "question",
            title: "ອັບເດດຄະນະ",
            showCancelButton: true,
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: 'ຍົກເລີກ',
        }).then(async (result) => {
            if (result.isConfirmed) {
                //update data
                const res = await UpdateFaculty(faculty?.faculty_id, { name: faculty.name, phoneNumber: faculty.phoneNumber });
                if (res.status === 200) {
                    ToastSuccess("ອັບເດດສຳເລັດ");
                    navigate("/faculty");
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
    const handleDelete = () => {
        Swal.fire({
            icon: "question",
            title: "ລົບຄະນະ",
            showCancelButton: true,
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: 'ຍົກເລີກ',
        }).then(async (result) => {
            if (result.isConfirmed) {
                //delete doc
                const res = await DeleteFaculty(faculty?.faculty_id);
                if (res.status === 200) {
                    ToastSuccess("ລົບສຳເລັດ");
                    navigate("/faculty");
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
        <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <HiOutlineBuildingLibrary size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'> ແກ້ໄຂຄະນະ</span>
            </div>
            <div className='p-3 w-[500px] mx-auto'>
                <div>
                    <p>ຊື່ຄະນະ</p>
                    <input
                        type="text"
                        className='w-full border border-gray-300 rounded-md p-2'

                        value={faculty?.name}
                        onChange={(e) => setFaculty({ ...faculty, name: e.target.value })}
                    />
                </div>
                <div className=' mt-5'>
                    <p>ເບີໂທ</p>
                    <input
                        type="text"
                        className='w-full border border-gray-300 rounded-md p-2'
                        value={faculty?.phoneNumber}
                        onChange={(e) => setFaculty({ ...faculty, phoneNumber: e.target.value })}
                    />
                </div>
                <div className='mt-5 flex justify-end items-center gap-3'>
                    <button
                        onClick={handleSubmit}
                        className=' flex justify-start items-center gap-1 bg-blue-500 p-2 text-white rounded-lg'>
                        <FaSave />
                        <span className='mx-2'>ບັນທຶກ</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        className=' flex justify-start items-center gap-1 bg-red-500 p-2 text-white rounded-lg'>
                        <MdDelete />
                        <span className='mx-2'>ລົບ</span>
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className=' flex justify-start items-center gap-1 bg-slate-400 p-2 text-white rounded-lg'>
                        <span className='mx-2'>ປິດ</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditFaculty
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TimestampToDate } from '../../lib/date';
import { DeleteDocOut, UpdateDocOutStatus } from '../../api/document';
import { ToastError, ToastSuccess } from '../../lib/toast';
import Swal from 'sweetalert2';



const EditDocOut = () => {
    const { data } = useParams();
    const navigate = useNavigate();
    const decodedStr = decodeURIComponent((atob(data)));
    const decodedObj = JSON.parse(decodedStr);

    const [doc, setDoc] = useState({
        createdAt: "",
        document_out_id: "",
        faculty_id: "",
        files: "",
        name: "",
        numberID: "",
        part_suppile_id: "",
        part_suppile_name: "",
        phoneNumber: "",
        status: "",
        title: "",
        updatedAt: "",
    });
    useEffect(() => {
        setDoc(decodedObj);
    }, [])

    const handleSubmit = async () => {
        Swal.fire({
            icon: "question",
            title: "ອັບເດດເອກະສານ",
            showCancelButton: true,
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: 'ຍົກເລີກ',
        }).then(async (result) => {
            if (result.isConfirmed) {
                //update status
                const res = await UpdateDocOutStatus(doc.document_out_id, doc.status);
                if (res.status === 200) {
                    ToastSuccess("ອັບເດດສຳເລັດ");
                    navigate("/doc-export");
                }
                if(res.status === 403){
                    ToastError("ບໍ່ມີສິດ");
                }
            }
        });
    }

    const handleDelete = async () => {
        Swal.fire({
            icon: "question",
            title: "ລົບເອກະສານ",
            showCancelButton: true,
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: 'ຍົກເລີກ',
        }).then(async (result) => {
            if (result.isConfirmed) {
                //delete doc
                await DeleteDocOut(doc.document_out_id)
                ToastSuccess("ລົບສຳເລັດ");
                navigate("/doc-export");
            }
        });
    }
    return (
        <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <MdEdit size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'> ແກ້ໄຂເອກະສານ ຂາເຂົ້າ</span>
            </div>
            {/* main content */}
            <div className='mt-0 px-5'>
                <div className='flex justify-between items-start gap-10'>
                    {/* left content */}
                    <div className='w-full'>
                        <div className="mt-5">
                            <p>
                                ເລກທີ:
                            </p>
                            <input
                                type="text"
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='ເລກທີ'
                                value={doc?.numberID}
                                onChange={(e) => setDoc({ ...doc, numberID: e.target.value })}
                            />
                        </div>
                        <div className=' mt-5 flex gap-3'>
                            <div className='w-full'>
                                <p>ວັນທີຮັບເອກະສານ</p>
                                <input
                                    type="text"
                                    className='w-full border border-gray-300 rounded-md p-2'
                                    value={TimestampToDate(doc?.createdAt)}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className=' mt-5 flex gap-3'>
                            <div className='w-full'>
                                <p>ຫົວຂໍ້</p>
                                <input
                                    type="text"
                                    className='w-full border border-gray-300 rounded-md p-2'
                                    placeholder=''
                                    value={doc.title}
                                    onChange={e => setDoc({ ...doc, title: e.target.value })}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className=' mt-5'>
                            <p>ຄະນະ</p>
                            <select onChange={(e) => setDoc({ ...doc, faculty_id: e.target.value })} className='w-full border border-gray-300 rounded-md p-2'>
                                <option selected value={decodedObj.faculty_id} >{decodedObj.name}</option>

                            </select>
                        </div>
                        <div className=' mt-5 flex justify-between gap-3'>
                            <div className='w-full'>
                                <p>ຜູ້ສະໜອງ</p>
                                <select onChange={(e) => setDoc({ ...doc, part_suppile_id: e.target.value })} className='w-full border border-gray-300 rounded-md p-2'>
                                    <option selected value={decodedObj.part_suppile_id} >{decodedObj.part_suppile_name}</option>

                                </select>
                            </div>
                            <div className='w-full'>
                                <p>ເບີໂທ</p>
                                <input
                                    type="text"
                                    className='w-full border border-gray-300 rounded-md p-2'
                                    value={doc.phoneNumber}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    {/* right content */}
                    <div className='w-full h-full'>
                        <div className=' mt-5'>
                            <p>ໄຟລແນບ</p>
                            <iframe title='file' className='w-full h-[300px] ' src={doc.files} />
                        </div>
                        <div className=' mt-5'>
                            <p>ສະຖານະ</p>
                            <select onChange={(e) => setDoc({ ...doc, status: e.target.value })} className='w-full border border-gray-300 rounded-md p-2'>
                                <option selected value={decodedObj.status} >{decodedObj.status}</option>
                                {
                                    decodedObj.status === "success" ?
                                        <option value={"await"}>await</option> :
                                        <option value={"success"}>success</option>
                                }

                            </select>
                        </div>
                    </div>
                </div>
                <div className='mt-3 flex justify-end items-center gap-3'>
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

export default EditDocOut
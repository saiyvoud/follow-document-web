import React, { useEffect, useState } from 'react'
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import { GetDocumentType } from '../../api/documentType';

import { checkPermission } from '../../lib/checkpermission';

const DocType = () => {
    const [documentTypes, setDocumentTypes] = useState([])
    const [documentTypesCurrent, setDocumentTypesCurrent] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const res = await GetDocumentType();
        if (res.status === 200) {
            setDocumentTypes(res.data?.data);
            setDocumentTypesCurrent(res.data?.data)
        }
    }
    const handleSearch = (e) => {
        const query = e.target.value
        const find = documentTypes.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        console.log(find)
        if (find) {
            setDocumentTypesCurrent(find);
        }
    }
    return (
        <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <HiOutlineBuildingLibrary size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'>ປະເພດເອກະສານ</span>
            </div>
            <div className='p-3'>
                {
                    checkPermission("INSERT") &&
                    <NavLink to={"add-doctype"} className='bg-blue-500 text-white p-2 rounded-lg'>ເພີ່ມປະເພດເອກະສານ</NavLink>
                }
            </div>
            <div className='p-3'>
                <input
                    type="text"
                    onChange={handleSearch}
                    className='border-2 border-gray-300 rounded-lg p-2 w-full' placeholder=''
                />
            </div>
            <div className='p-3'>
                <table className='w-full table-auto border-gray-300'>
                    <thead>
                        <tr>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ລະຫັດ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ປະເພດເອກະສານ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ເວລາ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຈັດການ</th>

                        </tr>
                    </thead>
                    <tbody>
                        {documentTypesCurrent.map((item, index) => {
                            const jsonStr = JSON.stringify(item);
                            const base64 = btoa((encodeURIComponent(jsonStr)));
                            return (
                                <tr key={index} className='hover:bg-slate-100'>
                                <td className='border-2 border-gray-300 p-2'>{item?.document_type_id}</td>
                                    <td className='border-2 border-gray-300 p-2'>{item?.docName}</td>
                                    <td className='border-2 border-gray-300 p-2'>{item?.createdAt}</td>

                                    <td className='border-2 border-gray-300 p-2'>
                                        <div className=' flex justify-center items-center gap-2'>
                                            {checkPermission("UPDATED") && <NavLink to={`edit-doctype/${base64}`} className='bg-blue-500 text-white p-1 rounded-lg'>ແກ້ໄຂ</NavLink>}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )

}
export default DocType
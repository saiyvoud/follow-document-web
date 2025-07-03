import React, { useEffect, useState } from 'react'
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import { GetAllFaculty } from '../../api/faculty';
import { checkPermission } from '../../lib/checkpermission';

const Faculty = () => {
    const [facultys, setFacultys] = useState([])
    const [facultysCurrent, setFacultysCurrent] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const res = await GetAllFaculty();
        if (res.status === 200) {
            setFacultys(res.data?.data);
            setFacultysCurrent(res.data?.data)
        }
    }
    const handleSearch = (e) => {
        const query = e.target.value
        const find = facultys.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        console.log(find)
        if (find) {
            setFacultysCurrent(find);
        }
    }
    return (
        <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <HiOutlineBuildingLibrary size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'> ຄະນະ</span>
            </div>
            <div className='p-3'>
                {
                    checkPermission("INSERT") &&
                    <NavLink to={"add-faculty"} className='bg-blue-500 text-white p-2 rounded-lg'>ເພີ່ມຄະນະ</NavLink>
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

                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຊື່ຄະນະ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ເບີໂທ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຈັດການ</th>

                        </tr>
                    </thead>
                    <tbody>
                        {facultysCurrent.map((item, index) => {
                            const jsonStr = JSON.stringify(item);
                            const base64 = btoa((encodeURIComponent(jsonStr)));
                            return (
                                <tr key={index} className='hover:bg-slate-100'>
                                    <td className='border-2 border-gray-300 p-2'>{item?.name}</td>
                                    <td className='border-2 border-gray-300 p-2'>{item?.phoneNumber}</td>

                                    <td className='border-2 border-gray-300 p-2'>
                                        <div className=' flex justify-center items-center gap-2'>
                                            {checkPermission("UPDATED") && <NavLink to={`edit/${base64}`} className='bg-blue-500 text-white p-1 rounded-lg'>ແກ້ໄຂ</NavLink>}
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
export default Faculty
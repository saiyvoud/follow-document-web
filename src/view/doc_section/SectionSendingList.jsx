import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GetAllPartSuppile } from '../../api/part_suppile';
import { checkPermission } from '../../lib/checkpermission';

const SectionSendingList = () => {
    const [partSuppiles, setPartSuppiles] = useState([]);
    const [partSuppilesCurrent, setPartSuppilesCurrent] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const res = await GetAllPartSuppile();
        if (res.status === 200) {
            setPartSuppiles(res.data?.data);
            setPartSuppilesCurrent(res.data?.data)
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value
        if (query !== "") {
            const find = partSuppiles.filter(item => item.part_suppile_name.toLowerCase().includes(query.toLowerCase()));
            if (find) {
                setPartSuppilesCurrent(find);
            }
        } else {
            setPartSuppilesCurrent(partSuppiles);
        }
    }

    return (
        <div>
            <div>
                <p className=' text-lg font-medium'>ພາກສ່ວນສະໜອງເອກະສານ</p>
            </div>
            {partSuppiles.length > 0 && <div className='mt-3'>
                <NavLink to={"suppile/add"} className='bg-blue-500 text-white p-2 rounded-lg'>ເພີ່ມພາກສ່ວນ</NavLink>
            </div>}
            <div className='mt-3'>
                <input
                    onChange={handleSearch}
                    type="text"
                    className='border-2 border-gray-300 rounded-lg p-2 w-full'
                    placeholder='ຄົ້ນຫາ' />
            </div>
            <div className='mt-3'>
                <table className='w-full table-auto border-gray-300'>
                    <thead>
                        <tr>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຊື່ພາກສ່ວນ</th>
                            <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຈັດການ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partSuppilesCurrent.map((item, index) => {
                            const jsonStr = JSON.stringify(item);
                            const base64 = btoa((encodeURIComponent(jsonStr)));
                            return (
                                <tr key={index} className='hover:bg-slate-100'>
                                    <td className='border-2 border-gray-300 p-2'>{item?.part_suppile_name}</td>
                                    <td className='border-2 border-gray-300 p-2'>
                                        <div className=' flex justify-center items-center gap-2'>
                                            {checkPermission("UPDATED") && <NavLink to={`suppile/edit/${base64}`} className='bg-blue-500 text-white p-1 rounded-lg'>ແກ້ໄຂ</NavLink>}
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

export default SectionSendingList
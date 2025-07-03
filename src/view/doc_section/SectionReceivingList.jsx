import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import data from '../../lib/data/document_receiving_section_data.json'
import { GetAllPartDemand } from '../../api/part_demand';
import { checkPermission } from '../../lib/checkpermission';
const SectionReceivingList = () => {
    const [partDemands, setPartDemands] = useState([]);
    const [partDemandsCurrent, setPartDemandsCurrent] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const res = await GetAllPartDemand();
        if (res.status === 200) {
            setPartDemands(res.data?.data);
            setPartDemandsCurrent(res.data?.data)
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value
        if (query !== "") {
            const find = partDemands.filter(item => item.part_demand_name.toLowerCase().includes(query.toLowerCase()));
            if (find) {
                setPartDemandsCurrent(find);
            }
        } else {
            setPartDemandsCurrent(partDemands);
        }
    }
    return (
        <div>
            <div>
                <p className=' text-lg font-medium'>ພາກສ່ວນຮັບເອກະສານ</p>
            </div>
            {partDemands.length > 0 && <div className='mt-3'>
                <NavLink to={"demand/add"} className='bg-blue-500 text-white p-2 rounded-lg'>ເພີ່ມພາກສ່ວນ</NavLink>
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
                        {partDemandsCurrent.map((item, index) => {
                            const jsonStr = JSON.stringify(item);
                            const base64 = btoa((encodeURIComponent(jsonStr)));
                            return (
                                <tr key={index} className='hover:bg-slate-100'>
                                    <td className='border-2 border-gray-300 p-2'>{item.part_demand_name}</td>
                                    <td className='border-2 border-gray-300 p-2'>
                                        <div className=' flex justify-center items-center gap-2'>
                                            {checkPermission("UPDATED") && <NavLink to={`demand/edit/${base64}`} className='bg-blue-500 text-white p-1 rounded-lg'>ແກ້ໄຂ</NavLink>}
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

export default SectionReceivingList
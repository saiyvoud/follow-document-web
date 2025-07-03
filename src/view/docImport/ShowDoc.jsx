import React from 'react'
import { TimestampToDate } from '../../lib/date';
import { NavLink } from 'react-router-dom';
const ShowDoc = (props) => {
    // console.log(props)
    const item = props.data[0]
    const jsonStr = JSON.stringify(item);
    const base64 = btoa((encodeURIComponent(jsonStr)));

    return (
        <div className='w-full mt-10'>
            <table className='w-full table-auto border-gray-300'>
                <thead>
                   <th className='border-2 border-gray-300 p-2 bg-slate-200'>ເລກທີເອກະສານ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຄະນະ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຫົວຂໍ້</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ວັນທີ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຜູ້ຮັບຜິດຊອບ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ເບີໂທ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ສະຖານະ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ການກະທຳ</th>
                </thead>
                <tbody>
                    <tr className=' border-b p-2 hover:bg-slate-100'>
                        <td className=' p-2 text-center'>{item?.numberID}</td>
                        <td className=' p-2 text-center'>{item?.name}</td>
                        <td className=' p-2 text-center'>{item?.title}</td>
                        <td className=' p-2 text-center'>{TimestampToDate(item?.createdAt)}</td>
                        <td className=' p-2 text-center'>{item?.part_demand_name}</td>
                        <td className=' p-2 text-center'>{item?.phoneNumber}</td>
                        <td className=' p-2 text-center'>
                            {item.status === 'success' ? <span className=' p-1 rounded-lg text-green-500 font-bold bg-green-200'>{item.status}</span>
                                : item.status === 'await' ? <span className='p-1 rounded-lg text-yellow-500 font-bold bg-yellow-200'>{item.status}</span> :
                                    <span className='p-1 rounded-lg text-blue-500 font-bold bg-blue-200'>{item.status}</span>
                            }
                        </td>
                        <td>
                            <div className='flex justify-center items-center'>
                                {/* <button className=' shadow-lg p-1 bg-slate-200 rounded-lg'>ເບິ່ງ</button> */}
                                <NavLink to={"/doc-follow/doc-in/edit/" + base64} className='ms-2 shadow-lg p-1 bg-blue-200 rounded-lg'>ແກ້ໄຂ</NavLink>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ShowDoc
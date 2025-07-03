import React, { useEffect, useState } from 'react'
import { TimestampToDate } from '../../lib/date';
import { NavLink } from 'react-router-dom';
import { checkPermission } from '../../lib/checkpermission';
const ListDocOut = (props) => {

    const [documents, setDocuments] = useState([]);
    const [selectStatus, setSelectStatus] = useState("");
    const [query, setQuery] = useState("");
    console.log(props.props)
    useEffect(() => {
        setDocuments(props.props)
    }, [props.props])

    useEffect(() => {
        const data = props.props
        if (query === "") {
            setDocuments(data);
        } else {
            const findDocs = data.filter(item => item.numberID.toLowerCase().includes(query.toLowerCase()));
            if (findDocs) {
                setDocuments(findDocs);
            }
        }
    }, [query])
    //ຄົ້ນຫາ ຕາມ ສະຖານະ
    useEffect(() => {
        const data = props.props
        if (selectStatus === 'all') {
            setDocuments(data);
        } else {
            const findDocs = data.filter(item => item.status === selectStatus);
            if (findDocs) {
                setDocuments(findDocs);
            }
        }
    }, [selectStatus])
    return (
        <div>
            <p>ຄົ້ນຫາ ເອກະສານ</p>
            <div className=' flex justify-start items-center gap-3'>
                <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    className='border-2 border-gray-300 rounded-lg p-2 w-full'
                    placeholder='ລະຫັດເອກະສານ'
                />
                <select
                    onChange={(e) => setSelectStatus(e.target.value)}
                    className=' w-[20%] border-2 border-gray-300 rounded-lg p-2'
                >
                    <option value="all">ທຸກສະຖານະ</option>
                    <option value="success">success</option>
                    <option value="await">await</option>
                    <option value="fail">fail</option>
                </select>
                {/* <button type='submit' className=' bg-blue-500 p-2 rounded-lg'><FaSearch size={25} color='white' /></button> */}
            </div>
            <div className='w-full mt-10'>
                <table className='w-full table-auto border-gray-300'>
                    <thead>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ເລກທີເອກະສານ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຄະນະ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຫົວຂໍ້</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ວັນທີ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ຜູ້ສະໜອງ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ເບີໂທ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ສະຖານະ</th>
                        <th className='border-2 border-gray-300 p-2 bg-slate-200'>ການກະທຳ</th>
                    </thead>
                    <tbody>
                        {documents && documents.length > 0 && documents.map((item, index) => {
                            const jsonStr = JSON.stringify(item);
                            const base64 = btoa((encodeURIComponent(jsonStr)));
                            return (
                                <tr key={index} className=' border-b p-2 hover:bg-slate-100'>
                                    <td className=' p-2 text-center'>{item?.numberID}</td>
                                    <td className=' p-2 text-center'>{item?.name}</td>
                                    <td className=' p-2 text-center'>{item?.title}</td>
                                    <td className=' p-2 text-center'>{TimestampToDate(item?.createdAt)}</td>
                                    <td className=' p-2 text-center'>{item?.part_suppile_name}</td>
                                    <td className=' p-2 text-center'>{item?.phoneNumber}</td>
                                    <td className=' p-2 text-center'>
                                        {item.statusOut === 'success' ? <span className=' p-1 rounded-lg text-green-500 font-bold bg-green-200'>{item.statusOut}</span>
                                            : item.statusOut === 'await' ? <span className='p-1 rounded-lg text-yellow-500 font-bold bg-yellow-200'>{item.statusOut}</span> :
                                                <span className='p-1 rounded-lg text-blue-500 font-bold bg-blue-200'>{item.statusOut}</span>
                                        }
                                    </td>
                                    <td>
                                        <div className='flex justify-center items-center'>
                                            {/* <button className=' shadow-lg p-1 bg-slate-200 rounded-lg'>ເບິ່ງ</button> */}
                                            {checkPermission("UPDATED") &&
                                                <NavLink to={"/doc-follow/doc-out/edit/" + base64} className='ms-2 shadow-lg p-1 bg-blue-200 rounded-lg'>ແກ້ໄຂ</NavLink>
                                            }
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

export default ListDocOut
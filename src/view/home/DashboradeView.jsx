import React from 'react'
import { User } from "lucide-react"
import { Dashboard } from '../../api/dashboard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { TimestampToDate } from '../../lib/date';
import {  NavLink } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboradeView = () => {
    const [data, setData] = React.useState();
    React.useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        const res = await Dashboard();
        if (res.status === 200) {
            setData(res.data.data);
        }
    }
    console.log(data)
    return (
        <div className='bg-gray-300 '>
            {/* Card backgroud */}
            <div className='flex space-x-5 justify-center items-center py-5'>
                <div className=' w-full bg-yellow-500 p-4 rounded-lg border-2 border-black'>
                    <p className='text-center font-bold'>{data?.doc_count[0]?.number}</p>
                    <p className='text-center'>ເອກະສານຂາເຂົ້າມື້ນີ້</p>
                </div>
                <div className='w-full bg-green-500 p-4 rounded-lg border-2 border-black'>
                    <p className='text-center font-bold'>{data?.doc_count[1]?.number}</p>
                    <p className='text-center'>ເອກະສານຂາອອກມື້ນີ້</p>
                </div>
                <div className='w-full bg-red-500 p-4 rounded-lg border-2 border-black'>
                    <p className='text-center font-bold'>{data?.doc_count[2]?.number}</p>
                    <p className='text-center'>ເອກະສານ ຄ້າງອະນຸມັດ</p>
                </div>
                <div className='w-full bg-orange-500 p-4 rounded-lg border-2 border-black'>
                    <p className='text-center font-bold'>{data?.doc_count[3]?.number}</p>
                    <p className='text-center'>ເອກະສານທັງຫມົດ</p>
                </div>

            </div>

            {/* Chart  */}
            <div className=' flex justify-center gap-5'>
                <div className='w-[40%]  bg-white rounded-lg p-5'
                >
                    <p>ຄວມຄືບຫນ້າ</p>
                    <Doughnut data={{
                        labels: [
                            'ເອກະສານຄ້າງ',
                            'ສຳເລັດແລ້ວ',
                        ],
                        datasets: [{
                            label: 'ຈຳນວນ',
                            data: [data?.doc_count[3]?.number, ((data?.doc_count[3]?.number - data?.doc_count[2]?.number) / data?.doc_count[3]?.number) * 100],
                            backgroundColor: [
                                'rgb(255, 205, 86)',
                                'rgb(31 120 50)'
                            ],
                            hoverOffset: 4
                        }]
                    }} />
                </div>
                <div className='w-[60%] bg-white rounded-lg p-5'>
                    <p className=' text-center'>ເອກະສານຂາເຂົ້າ ຫຼ້າສຸດ</p>
                    <table className='min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase'>ເວລາ</th>
                                <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase'>ເລກທີ</th>
                                <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase'>ຫົວຂໍ້</th>
                                <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase'>ສະຖານະ</th>
                                {/* <th className='px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase'></th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {
                                data?.last_doc_in.map(item => {
                                    const jsonStr = JSON.stringify(item);
                                    const base64 = btoa((encodeURIComponent(jsonStr)));
                                    return (
                                        <tr key={item?.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-800">{TimestampToDate(item?.createdAt)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.numberID}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.title}</td>
                                            <td className="px-6 py-4 text-sm">
                                                {item?.status}
                                            </td>
                                            {/* <td className="px-6 py-4 text-right text-sm font-medium">
                                                <NavLink to={"/doc-follow/doc-in/edit/" + base64} className="text-blue-600 hover:underline">ເບິ່ງ</NavLink>
                                            </td> */}
                                        </tr>
                                    )
                                })
                            }
                            {/* เพิ่มแถวอื่นๆ ตามข้อมูลจริง */}
                        </tbody>
                    </table>
                </div>
                {/* <div className='w-[300px] bg-white rounded-lg p-5'
                >
                    <p>ເອກະສານຂາເຂົ້າ</p>
                    <Doughnut data={{
                        labels: [
                            'success',
                            'await',
                        ],
                        datasets: [{
                            label: 'ຈຳນວນ',
                            data: [data[5]?.total, data[6]?.total],
                            backgroundColor: [
                                'rgb(31 120 50)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                        }]
                    }} />
                </div> */}
            </div>
        </div>
    )
}


export default DashboradeView
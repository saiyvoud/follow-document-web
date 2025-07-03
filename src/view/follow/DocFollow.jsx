import { useEffect, useState } from 'react'
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GetAllDocIn, GetAllDocOut } from '../../api/document';
import ListDocIn from './ListDocIn';
import ListDocOut from './ListDocOut';
const DocFollow = () => {
    const [docsIn, setDocsIn] = useState([]);
    const [docsOut, setDocsOut] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        const resDocsIn = await GetAllDocIn();
        if (resDocsIn?.status === 200) {
            setDocsIn(resDocsIn?.data?.data)
        }

        const resDocsOut = await GetAllDocOut();
        if (resDocsOut?.status === 200) {
            setDocsOut(resDocsOut?.data?.data)
        }
    }

    const CountDocsSuccess = () => {
        const findDocsInSuccess = docsIn.filter(item => item.status === "success");
        const findDocsOutSuccess = docsOut.filter(item => item.status === "success");
        return findDocsInSuccess.length + findDocsOutSuccess.length;
    }
    const CountDocsAwait = () => {
        const findDocsInAwait = docsIn.filter(item => item.status === "await");
        const findDocsOutAwait = docsOut.filter(item => item.status === "await");

        return findDocsInAwait.length + findDocsOutAwait.length;
    }
    return (
        <>
            <div className='mt-5 mb-5 pb-3 w-full bg-white rounded-lg'>
                <div className='flex justify-start items-center gap-3 p-3'>
                    <HiOutlineClipboardDocumentList size={20} className=' text-teal-500' />
                    <span className=' text-teal-500 text-lg font-bold'> ຕິດຕາມ ເອກະສານ</span>
                </div>
                {/* main content */}
                <div className='flex justify-between items-center gap-4 px-10'>
                    <div className=' p-5 border shadow-lg rounded-lg w-full'>
                        <p>ເອກະສານຂາເຂົ້າ ທັງໝົດ</p>
                        <p className=' text-blue-600 font-bold text-lg'>{docsIn.length}</p>
                    </div>
                    <div className=' p-5 border shadow-lg rounded-lg w-full'>
                        <p>ເອກະສານຂາອອກ ທັງໝົດ</p>
                        <p className=' text-blue-600 font-bold text-lg'>{docsOut.length}</p>
                    </div>
                    <div className=' p-5 border shadow-lg rounded-lg w-full'>
                        <p>ກຳລັງດຳເນີນການ</p>
                        <p className=' text-blue-600 font-bold text-lg'>{CountDocsAwait()}</p>
                    </div>
                    <div className=' p-5 border shadow-lg rounded-lg w-full'>
                        <p>ສຳເລັດແລ້ວ</p>
                        <p className=' text-blue-600 font-bold text-lg'>{CountDocsSuccess()}</p>
                    </div>
                </div>

            </div>
            <div className='mt-5 mb-5 pb-3 w-full bg-white rounded-lg'>
                <div className='flex justify-start items-center gap-3 p-3'>
                    <HiOutlineClipboardDocumentList size={20} className=' text-teal-500' />
                    <span className=' text-teal-500 text-lg font-bold'>ລາຍການ ເອກະສານ ຂາເຂົ້າ</span>
                </div>
                <div className='mt-5 px-5 '>
                    <ListDocIn props={docsIn} />
                </div>
            </div>
            <div className='mt-5 mb-5 pb-3 w-full bg-white rounded-lg'>
                <div className='flex justify-start items-center gap-3 p-3'>
                    <HiOutlineClipboardDocumentList size={20} className=' text-teal-500' />
                    <span className=' text-teal-500 text-lg font-bold'>ລາຍການ ເອກະສານ ຂາອອກ</span>
                </div>
                <div className='mt-5 px-5 '>
                    <ListDocOut props={docsOut} />
                </div>
            </div>
        </>
    )
}

export default DocFollow
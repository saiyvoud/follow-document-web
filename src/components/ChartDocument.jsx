import { useState } from 'react';
import { Info, Download, ChevronDown, ChevronRight } from 'lucide-react';

export default function ChartDocumnet() {
    const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [devices, setDevices] = useState({
        desktop: false,
        tablet: false,
        mobile: false
    });

    const handleDeviceChange = (device) => {
        setDevices(prev => ({
            ...prev,
            [device]: !prev[device]
        }));
    };

    // This would be replaced with real chart data in a production app
    const DonutChart = () => (
        <div className="flex mb-5 justify-center items-center h-50">
            <div className="relative w-40 h-40 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">65%</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Desktop</p>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="10" strokeDasharray="283" strokeDashoffset="99" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#10B981" strokeWidth="10" strokeDasharray="283" strokeDashoffset="240" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#F59E0B" strokeWidth="10" strokeDasharray="283" strokeDashoffset="254" />
                    </svg>
                </div>
            </div>
            <div className='space-y-5'>
                <div className='flex mx-5 justify-center items-center'>
                    <div className='bg-red-500 h-2 w-2 rounded-full'></div>
                    <p className='mx-2'>ຕົ້ມແຊບຕີນໄກ່</p>
                </div>
                <div className='flex mx-5 justify-start items-center'>
                    <div className='bg-yellow-500 h-2 w-2 rounded-full'></div>
                    <p className='mx-2'>ທອດຂາໄກ່</p>
                </div>
                <div className='flex mx-5 justify-start items-center'>
                    <div className='bg-orange-500 h-2 w-2 rounded-full'></div>
                    <p className='mx-2'>ຕຳ</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-sm max-h-sm w-full bg-white rounded-lg shadow-lg  ">
         <h2 className='m-5'>ສິນຄ້າຂາຍດີ</h2>
            <DonutChart  />
        </div>
    );
}
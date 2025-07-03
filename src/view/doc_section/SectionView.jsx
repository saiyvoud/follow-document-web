import React from 'react'
import { HiUsers } from 'react-icons/hi2'
import SectionSendingList from './SectionSendingList'
import SectionReceivingList from './SectionReceivingList'
const SectionView = () => {
  return (
    <div className='mt-5 p-3 w-full bg-white rounded-lg'>
      <div className='flex justify-start items-center gap-3 p-3'>
        <HiUsers size={20} className=' text-teal-500' />
        <span className=' text-teal-500 text-lg font-bold'> ພາກສ່ວນ</span>
      </div>
      <div className=' w-full flex justify-between gap-3'>
        <div className='w-full p-5 rounded-lg shadow-lg'>
          <SectionReceivingList />
        </div>
        <div className='w-full p-5 rounded-lg shadow-lg'>
          <SectionSendingList />
        </div>
      </div>
    </div>
  )
}

export default SectionView
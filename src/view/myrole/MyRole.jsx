import React from 'react'
import { HiUserGroup } from 'react-icons/hi2'
import {  GetAllUserRolePerMission } from '../../api/user';
import UserItem from './UserItem';
const MyRole = () => {
    const [users, setUser] = React.useState([]);

    React.useEffect(() => {
        fettchData();
    }, []);

    const fettchData = async () => {
        const res = await GetAllUserRolePerMission();
        // console.log(res)
        if (res.status === 200) {
            setUser(res.data?.data)
        }
    }
    // console.log(users)
    return (
        <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <HiUserGroup size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'>ສິດເຂົ້າໃຊ້</span>
            </div>
            <div className=' p-5 w-[70vw] mx-auto'>
                {users.map(item => {
                    return (
                        <UserItem data={item} />
                    )
                })}
            </div>
        </div>
    )
}

export default MyRole
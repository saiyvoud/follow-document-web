import React from 'react'
import { HiUser } from 'react-icons/hi2'
import UserIcon from '../../assets/user.png'
import { clearCookie, getCookie } from '../../lib/js-cookie';
import { useNavigate } from 'react-router-dom';
const MyInfo = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState();
    React.useEffect(() => {
        const user = getCookie('user');
        if (user) {
            const parseUser = JSON.parse(user);
            setUser(parseUser);
            console.log(parseUser)
        } else {
            navigate("/login");
        }
    }, []);
    return (
        <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
            <div className='flex justify-start items-center gap-3 p-3'>
                <HiUser size={20} className=' text-teal-500' />
                <span className=' text-teal-500 text-lg font-bold'>ຂໍ້ມູນຜູ້ໃຊ້</span>
            </div>
            <div className='mt-3 w-[500px] mx-auto flex justify-around gap-4'>
                <div className='w-full'>
                    <div className=' border border-gray-300 rounded-md py-3'>
                        <img alt='user' src={UserIcon} className='w-[100px] h-[100px] rounded-full mx-auto' />
                    </div>
                    {/* <div className='flex justify-center items-center gap-2 mt-3'>

                        <button className='p-2 bg-green-500 text-white rounded-lg'>ປ່ຽນຮູບ</button>
                        <button className=' p-2 bg-red-500 text-white rounded-lg'>ລົບ</button>
                    </div> */}
                </div>
                <div className='w-full '>
                    <p>username: {user?.username}</p>
                    <p>email: {user?.email}</p>
                    <p>phone: {user?.phone_number}</p>
                </div>
            </div>
        </div>
    )
}

export default MyInfo
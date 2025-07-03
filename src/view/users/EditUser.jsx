import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { HiUser } from "react-icons/hi2";
import { GetAllFaculty } from '../../api/faculty';
import { GetAllOffice } from '../../api/office';
import { GetAllRole } from '../../api/role';
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import Swal from 'sweetalert2';
import { ToastError, ToastSuccess } from '../../lib/toast';
import { UpdateUser } from '../../api/user';

const EditUser = () => {
  const { data } = useParams();
  const navigate = useNavigate();
  const decodedStr = decodeURIComponent((atob(data)));
  const decodedObj = JSON.parse(decodedStr);

  const [user, setUser] = React.useState({});
  const [facultys, setFacultys] = React.useState([]);
  const [offices, setOffices] = React.useState([]);

  React.useEffect(() => {
    setUser(decodedObj);
    fetchData()
  }, []);

  const fetchData = async () => {
    const resFaculty = await GetAllFaculty();
    if (resFaculty.status === 200) {
      setFacultys(resFaculty.data?.data)
    }

    const resOffice = await GetAllOffice();
    if (resOffice.status === 200) {
      setOffices(resOffice.data?.data);
    }

  }
  const handleDelete = async () => {

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "ອັບເດດຜູ້ໃຊ",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: 'ຍົກເລີກ',
    }).then(async (result) => {
      if (result.isConfirmed) {
        //update data
        const res = await UpdateUser(user?.user_id, { username: user.username, email: user.email, password: user.password, phone_number: user.phone_number, faculty_id: user.faculty_id, office_id: user.office_id });
        if (res.status === 200) {
          navigate("/user");
          ToastSuccess("ແກ້ໄຂສຳເລັດ")
        } else {
          ToastError(res?.response?.data?.error)
        }

      }
    });
  }
  // console.log(decodedObj)
  return (
    <div className='mt-5 pb-3 w-full bg-white rounded-lg'>
      <div className='flex justify-start items-center gap-3 p-3'>
        <HiUser size={20} className=' text-teal-500' />
        <span className=' text-teal-500 text-lg font-bold'> ແກ້ໄຂຜູ້ໃຊ້</span>
      </div>
      <div className='p-3 w-[500px] mx-auto'>
        <form onSubmit={handleSubmit}>
          <div>
            <p>ຊື່ຜູ້ໃຊ້</p>
            <input
              type="text"
              className='w-full border border-gray-300 rounded-md p-2'
              placeholder='ຊື່ຜູ້ໃຊ້'
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>
          <div className=' mt-5'>
            <p>ອີເມວ</p>
            <input
              type="email"
              className='w-full border border-gray-300 rounded-md p-2'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className=' mt-5'>
            <p>ລະຫັດ</p>
            <input
              type="password"
              className='w-full border border-gray-300 rounded-md p-2'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <div className=' mt-5'>
            <p>ເບີໂທ</p>
            <input
              type="text"
              className='w-full border border-gray-300 rounded-md p-2'
              value={user.phone_number}
              onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
              required
            />
          </div>
          <div className=' mt-5'>
            <p>ຄະນະ</p>
            <select
              value={user.faculty_id}
              onChange={(e) => setUser({ ...user, faculty_id: e.target.value })}
              className='w-full border border-gray-300 rounded-md p-2'
              required
            >
              <option selected value="">-- ເລືອກ --</option>
              {facultys.map(item => {
                return (
                  <option value={item?.faculty_id}>{item?.name}</option>
                )
              })}
            </select>
          </div>
          <div className=' mt-5'>
            <p>ພາກສ່ວນ</p>
            <select
              value={user.office_id}
              onChange={(e) => setUser({ ...user, office_id: e.target.value })}
              className='w-full border border-gray-300 rounded-md p-2'
              required
            >
              <option selected value="">-- ເລືອກ --</option>
              {offices.map(item => {
                return (
                  <option value={item?.office_id}>{item?.office_name}</option>
                )
              })}
            </select>
          </div>

          <div className='mt-5 flex justify-end items-center gap-3'>
            <button
              type='submit'
              className=' flex justify-start items-center gap-1 bg-blue-500 p-2 text-white rounded-lg'>
              <FaSave />
              <span className='mx-2'>ບັນທຶກ</span>
            </button>
            {/* <div
              onClick={handleDelete}
              className=' flex justify-start items-center gap-1 bg-red-500 p-2 text-white rounded-lg'>
              <MdDelete />
              <span className='mx-2'>ລົບ</span>
            </div> */}
            <div
              onClick={() => navigate(-1)}
              className=' flex justify-start items-center gap-1 bg-slate-400 p-2 text-white rounded-lg'>
              <span className='mx-2'>ປິດ</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
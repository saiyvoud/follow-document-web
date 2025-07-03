import React from 'react'
import { GetAllRole, UpdateRoleUser } from '../../api/role';
import { ToastSuccess } from '../../lib/toast';
import { UpdatePermissionUser } from '../../api/permission';

const UserItem = (data) => {
    // console.log(data.data)
    const [user, setUser] = React.useState({});
    const [roles, setRoles] = React.useState([])
    const [permissions, setPermiision] = React.useState([]);

    React.useEffect(() => {
        setUser(data.data);
        if (data?.data?.permissions) {
            const str = data?.data?.permissions;
            const permissions = str.split(",");
            setPermiision(permissions)
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await GetAllRole();
        // console.log(res)
        if (res.status === 200) {
            setRoles(res.data?.data)
        }
    }

    const handleUpdatePermission = async (permission_name) => {
        try {
            const res = await UpdatePermissionUser({ user_id: user.user_id, permission_name: permission_name });
            if (res.status === 200) {
                ToastSuccess("update")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (e) => {
        setUser({ ...user, role_id: e.target.value })
        const res = await UpdateRoleUser({ role_id: e.target.value, user_id: user.user_id });
        if (res.status === 200) {
            ToastSuccess("update")
        }
    }
    const handleCheckInsert = async () => {
        if (permissions.includes('INSERT')) {
            setPermiision(permissions.filter(p => p !== 'INSERT'));
        } else {
            setPermiision([...permissions, 'INSERT']);
            
        }
        handleUpdatePermission("INSERT");
        
    }

    const handleCheckDelete = async () => {
        if (permissions.includes('DELETE')) {
            setPermiision(permissions.filter(p => p !== 'DELETE'));
        } else {
            setPermiision([...permissions, 'DELETE']);
        }
        handleUpdatePermission("DELETE");

    }

    const handleCheckUpdated = async () => {
        if (permissions.includes('UPDATED')) {
            setPermiision(permissions.filter(p => p !== 'UPDATED'));
        } else {
            setPermiision([...permissions, 'UPDATED']);
        }
        handleUpdatePermission("UPDATED");

    }

    const handleCheckRead = async () => {
        if (permissions.includes('READ')) {
            setPermiision(permissions.filter(p => p !== 'READ'));
        } else {
            setPermiision([...permissions, 'READ']);
        }
        handleUpdatePermission("READ");

    }

    return (
        <div className='w-full py-2 border-b-2 border-slate-300 flex justify-between items-center gap-5'>
            <span className='w-full'>{user?.username}</span>
            <span className='w-full'>{user?.email}</span>
            <div className='w-full'>
                <select
                    value={user.role_id}
                    onChange={handleUpdate}
                    className='w-full border border-gray-300 rounded-md p-2'
                    required
                >
                    <option selected value="">-- ເລືອກສິດ --</option>
                    {roles.map(item => {
                        return (
                            <option value={item?.role_id}>{item?.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className='w-full flex justify-start items-center gap-4'>
                <div className='flex items-center'>
                    <input type="checkbox" checked={permissions.includes('INSERT')} onChange={handleCheckInsert} />
                    <label className='ml-1'>INSERT</label>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" checked={permissions.includes('READ')} onChange={handleCheckRead} />
                    <label className='ml-1'>READ</label>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" checked={permissions.includes('UPDATED')} onChange={handleCheckUpdated} />
                    <label className='ml-1'>UPDATED</label>
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" checked={permissions.includes('DELETE')} onChange={handleCheckDelete} />
                    <label className='ml-1'>DELETE</label>
                </div>
            </div>
        </div>
    )
}

export default UserItem
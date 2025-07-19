import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SideBar from "../components/Sibebar";
import LoginView from "../view/auth/LoginView";
import DashboardView from "../view/home/DashboradeView";
import Navbar from "../components/Navbar";
import DocImport from "../view/docImport/DocImport";
import { Navigate } from "react-router-dom";
import DocFollow from "../view/follow/DocFollow";
import DocExport from "../view/docExport/DocExport";
import Faculty from "../view/faculty/Faculty";
import MyRole from "../view/myrole/MyRole";
import AddFaculty from "../view/faculty/AddFaculty";
import EditFaculty from "../view/faculty/EditFaculty";
import UserList from "../view/users/UserList";
import EditUser from "../view/users/EditUser";
import AddUser from "../view/users/AddUser";
import SectionView from "../view/doc_section/SectionView";
import MyInfo from "../view/myinfo/MyInfo";
import { ToastContainer } from "react-toastify";
import EditDocIn from "../view/follow/EditDocIn";
import EditDocOut from "../view/follow/EditDocOut";
import EditDemand from "../view/doc_section/EditDemand";
import EditSuppile from "../view/doc_section/EditSuppile";
import AddDemand from "../view/doc_section/AddDemand";
import AddSuppile from "../view/doc_section/AddSuppile";
import ReportView from "../view/report/report";

const RouterPath = () => {

  
    const MainLayout = () => {
        const navigate = useNavigate();
        const [isShowSideBar, setIsShowSideBar] = useState(true);
        const handleToggleSideBar = () => {
            setIsShowSideBar(!isShowSideBar);
        };

        // check user login
        useEffect(() => {
            const user = Cookies.get('user');
            if (!user) {
                navigate('/login'); // 🔁 redirect ไปหน้า login
            }
        }, []);

        return (
            <>
                <ToastContainer />
                <div className="flex">
                    <div className={` ${isShowSideBar ? 'w-[250px]' : 'w-[0px] hidden'} fixed z-50 transition-all duration-7700 ease-in-out`}>
                        <SideBar />
                    </div>
                    <div className={`w-full ${isShowSideBar ? 'ms-[250px]' : 'ms-[0px]'} bg-gray-300 `}>
                        <nav className="sticky top-0 z-50 bg-white shadow-lg">
                            <Navbar onToggleSideBar={handleToggleSideBar} isToggleSideBar={isShowSideBar} />
                        </nav>
                        <section className="px-5 min-h-[90vh] ">
                            <Outlet />{/* ສ່ວນນີ້ແມ່ນສໍາລັບເນື້ອຫາ ທີ່ເປັນ Route ຕ່າງໆ */}
                        </section>
                    </div>
                </div>
            </>
        )
    };

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginView />,
        },
        {
            path: "/",
            element: <MainLayout />, // Layout หลัก
            children: [
                { path: "/", element: <p className=" text-center"> WELCOME </p>},
                { path: "/myinfo", element: <MyInfo /> },
                { path: "/doc-import", element: <DocImport /> },
                { path: "/doc-export", element: <DocExport /> },
                { path: "/doc-follow", element: <DocFollow /> },
                { path: "/doc-follow/doc-in/edit/:data", element: <EditDocIn /> },
                { path: "/doc-follow/doc-out/edit/:data", element: <EditDocOut /> },
                { path: "/dashboard", element: <DashboardView /> },
                { path: "/faculty", element: <Faculty /> },
                { path: "/faculty/add-faculty", element: <AddFaculty /> },
                { path: "/faculty/edit/:data", element: <EditFaculty /> },
                { path: "/user", element: <UserList /> },
                { path: "/user/edit/:data", element: <EditUser /> },
                { path: "/user/add-user", element: <AddUser /> },
                { path: "/section-view", element: <SectionView /> },
                { path: "/section-view/demand/edit/:data", element: <EditDemand /> },
                { path: "/section-view/suppile/edit/:data", element: <EditSuppile /> },
                { path: "/section-view/demand/add", element: <AddDemand /> },
                { path: "/section-view/suppile/add", element: <AddSuppile /> },
                { path: "/role", element: <MyRole /> },
                { path: "/report", element: <ReportView /> },

            ],
        },
    ]);
    return <RouterProvider router={router} />
}

export default RouterPath;
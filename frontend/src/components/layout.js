import React, { useEffect, useState } from "react";
import '../layout.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from 'antd';

function Layout({ children }) {
    const location = useLocation();
    const { user } = useSelector((state) => state.user);
    const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
    const navigate = useNavigate()
    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const userMenu = [
        {
            name: "Home",
            path: "/home",
            icon: "ri-home-6-line"
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: 'ri-file-list-3-line'
        },
        {
            name: "UpdatePassword",
            path: "/update-password",
            icon: "ri-user-2-fill"
        },
    ];

    const applyDoctorMenu = [
        {
            name: "Home",
            path: "/home",
            icon: "ri-home-6-line"
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "ri-hospital-line"
        },
    ];

    const adminMenu = [
        {
            name: "Home",
            path: "/home",
            icon: "ri-home-6-line"
        },
        {
            name: "users",
            path: "/admin/userslist",
            icon: "ri-user-settings-line"
        },
        {
            name: "Doctors",
            path: "/admin/doctorslist",
            icon: "ri-hospital-line",
        },
        {
            name: "UpdatePassword",
            path: "/update-password",
            icon: "ri-user-2-fill"
        },
    ];

    const doctorMenu = [
        {
            name: "Home",
            path: "/home",
            icon: "ri-home-6-line"
        },
        {
            name: "Appointments",
            path: "/doctor/appointments",
            icon: 'ri-file-list-3-line'
        },
        {
            name: "Doctor Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "ri-user-2-fill"
        },
        {
            name: "UpdatePassword",
            path: "/update-password",
            icon: "ri-user-2-fill"
        },
    ];
    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu :user?.isApplyDoctor ? applyDoctorMenu:userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
    return (
        <div className="main">
            <div className="d-flex">
                <div className='sidebar'>
                    <div className="sidebar-header">
                        <h1>HH</h1>
                        <h1 className="role">{role}</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu, index) => {
                            const isActive = location.pathname === menu.path
                            return (
                                <div key={index} className={`d-flex menu-item ${isActive && "active-menu-item"}`}>
                                    <Link to={menu.path}><i className={menu.icon}></i></Link>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                            );
                        })}
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear()
                            navigate('/login')
                        }}>
                            <i className='ri-shut-down-line'></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        {collapsed ? (
                            <i className="ly-cl ri-align-justify remix-icons-1" onClick={() => setCollapsed(false)}></i>
                        ) : (
                            <i className="ly-cl ri-close-line remix-icons-1" onClick={() => setCollapsed(true)}></i>
                        )}
                        <div className="d-flex align-items-center px-3">
                            <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/Notifications')}>
                                <i className="ri-notification-3-line remix-icons-1"></i>
                            </Badge>
                            <Link className="anchor-lay mx-3" to={user?.isDoctor ? `/doctor/profile/${user?._id}` : `/home`}>{user?.name}</Link>
                        </div>
                    </div>
                    <div className="body mx-3 mt-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
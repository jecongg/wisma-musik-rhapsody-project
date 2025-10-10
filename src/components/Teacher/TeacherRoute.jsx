import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Placeholder hook untuk simulasi autentikasi
const useAuth = () => {
    // Di aplikasi nyata, ini akan terhubung ke state management (Context, Redux, dll.)
    // Untuk demo, kita anggap guru sudah login.
    const user = {
        loggedIn: true,
        role: 'teacher' 
    };
    return user;
};

const TeacherRoute = () => {
    const { loggedIn, role } = useAuth();

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    if (role !== 'teacher') {
        return <Navigate to="/" />;
    }

    return <Outlet />; // Tampilkan halaman jika autentikasi berhasil
};

export default TeacherRoute;
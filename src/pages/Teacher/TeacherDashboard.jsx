import React, { useState } from 'react';
import { FaTachometerAlt, FaChalkboardTeacher, FaCalendarAlt } from 'react-icons/fa';

// Sesuaikan path ini ke lokasi komponen Anda
import { useFirebaseAuth } from '../../js/hooks/useFirebaseAuth';
import Sidebar from '../../components/Layout/Sidebar';
import { Navigate } from 'react-router-dom';

// --- Placeholder untuk setiap section/halaman ---
// Anda bisa memindahkan ini ke file terpisah nanti jika sudah kompleks

const DashboardOverview = ({ user }) => (
    <div className="p-6 md:p-8">
        <header className="grid gap-2 mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-balance">
                Selamat Datang, {user?.displayName || 'Guru'}!
            </h1>
            <p className="text-sm text-gray-500">
                Berikut adalah ringkasan aktivitas mengajar Anda hari ini.
            </p>
        </header>
        
        {/* Contoh Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">Total Kelas Aktif</h3>
                <p className="text-3xl font-bold mt-2">5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">Murid Terdaftar</h3>
                <p className="text-3xl font-bold mt-2">42</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">Tugas Perlu Dinilai</h3>
                <p className="text-3xl font-bold mt-2 text-amber-500">3</p>
            </div>
        </div>
    </div>
);

const MyClassesSection = () => (
    <div className="p-6 md:p-8">
        <h1 className="text-2xl font-semibold">Kelas Saya</h1>
        <p className="mt-2 text-gray-600">Daftar semua kelas yang Anda ajar akan ditampilkan di sini.</p>
        {/* Tambahkan logika untuk fetch dan tampilkan data kelas di sini */}
    </div>
);

const ScheduleSection = () => (
    <div className="p-6 md:p-8">
        <h1 className="text-2xl font-semibold">Jadwal Mengajar</h1>
        <p className="mt-2 text-gray-600">Kalender atau daftar jadwal mengajar Anda akan ada di sini.</p>
        {/* Tambahkan komponen kalender atau daftar jadwal di sini */}
    </div>
);

// --- KOMPONEN UTAMA Teacher/Dashboard.jsx ---

export default function Dashboard() {
    const { user, authloading, logout } = useFirebaseAuth();

    // Menu navigasi khusus untuk Guru
    const teacherMenus = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, component: 'dashboard' },
        { name: 'Kelas Saya', icon: <FaChalkboardTeacher />, component: 'classes' },
        { name: 'Jadwal', icon: <FaCalendarAlt />, component: 'schedule' },
    ];
    
    // State untuk mengatur komponen mana yang aktif
    const [activeComponent, setActiveComponent] = useState('dashboard');

     // 3. GUNAKAN `authloading` UNTUK KONDISI LOADING
    if (authloading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2'></div>
                    <p>Memverifikasi sesi...</p>
                </div>
            </div>
        );
    }

    // 4. SETELAH LOADING SELESAI, jika tidak ada user, arahkan ke halaman login
    if (!user) {
        // Ganti "/login" dengan path halaman login Anda
        return <Navigate to="/login" replace />; 
    }
    
    const renderActiveComponent = () => {
        switch(activeComponent) {
            case 'dashboard':
                return <DashboardOverview user={user} />;
            case 'classes':
                return <MyClassesSection />;
            case 'schedule':
                return <ScheduleSection />;
            default:
                return <DashboardOverview user={user} />;
        }
    };

    // 5. Jika loading selesai DAN user ada, tampilkan dashboard
    return (
        <div className='flex bg-gray-100 min-h-screen'>
            <Sidebar 
                user={user} 
                menus={teacherMenus} 
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
            />
            <main className='flex-1 overflow-y-auto'>
                {renderActiveComponent()}
            </main>
        </div>
    );
};
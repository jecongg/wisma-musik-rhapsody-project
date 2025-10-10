import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// ... import lainnya
import PublicLayout from './components/Layout/PublicLayout';
// import AuthenticatedLayout from './components/Layout/AuthenticatedLayout'; // Kita ganti dengan yang lebih spesifik
import AdminPage from './pages/Admin/AdminPage';
import RegisterTeacher from './pages/RegisterTeacher';
import AdminRoute from "./components/Layout/AdminRoute"; // <-- IMPORT BARU
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import TeacherRoute from "./components/Teacher/TeacherRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Rute Publik */}
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register-teacher' element={<RegisterTeacher />} />
        </Route>

        {/* Rute yang dilindungi hanya untuk Admin */}
        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<AdminPage />} />
          {/* <Route path='/admin/settings' element={<AdminSettings />} /> */}
        </Route>
        
        {/* Nanti Anda bisa menambahkan TeacherRoute dan StudentRoute di sini */}
        <Route element={<TeacherRoute />}>
          <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App;
import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import RequireAuth from './components/auth/RequireAuth';
import SignUp from './components/auth/SignUp';
import MyProfile from './components/profile/MyProfile';
import Navbar from './components/shared/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;

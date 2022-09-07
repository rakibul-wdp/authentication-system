import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
  const [user] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
  };

  const menuItems = (
    <>
      <li>
        <Link to='/'>My Profile</Link>
      </li>
      {user && (
        <li>
          <Link to=''>{user.displayName}</Link>
        </li>
      )}
    </>
  );
  return (
    <div className='navbar bg-secondary px-72'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden text-base-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-secondary rounded-box w-52 text-base-100 font-bold text-lg'
          >
            {menuItems}
          </ul>
        </div>
        <Link to={'/'} className='btn btn-ghost bg-base-100 normal-case text-xl'>
          GUVI
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal p-0 text-base-100 font-bold text-lg'>{menuItems}</ul>
      </div>
      <div className='navbar-end'>
        {user ? (
          <button className='btn btn-ghost font-bold bg-primary text-base-100' onClick={logout}>
            Sign Out
          </button>
        ) : (
          <Link className='btn btn-ghost font-bold bg-primary text-base-100' to='/login'>
            Login/SignUp
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

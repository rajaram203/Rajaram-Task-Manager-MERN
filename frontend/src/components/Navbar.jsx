import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className='flex justify-between sticky top-0 p-5 bg-white shadow-md items-center z-50'>
        <h2 className='cursor-pointer uppercase font-bold text-blue-700 text-xl tracking-wide'>
          <Link to="/"> Rajaram's Task Manager </Link>
        </h2>
        <ul className='hidden md:flex gap-6 uppercase font-medium text-gray-700'>
          {authState.isLoggedIn ? (
            <>
              <li className="bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg transition-all duration-300 shadow-md">
                <Link to='/tasks/add' className='block px-5 py-2 flex items-center space-x-2'>
                  <i className="fa-solid fa-plus"></i> 
                  <span>Add Task</span>
                </Link>
              </li>
              <li className='py-2 px-4 cursor-pointer hover:bg-gray-100 transition rounded-md' onClick={handleLogoutClick}>
                Logout
              </li>
            </>
          ) : (
            <li className='py-2 px-4 cursor-pointer text-blue-600 hover:bg-gray-100 transition rounded-md'>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {/* Mobile menu button */}
        <span className='md:hidden cursor-pointer text-gray-700 text-2xl' onClick={toggleNavbar}>
          <i className={`fa-solid ${isNavbarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </span>

        {/* Mobile Sidebar */}
        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition-transform ${isNavbarOpen ? 'translate-x-0' : 'translate-x-full'} bg-white shadow-lg w-3/4 sm:w-2/4 h-screen p-6 z-50`}>
          <div className='flex justify-between items-center'>
            <h2 className='text-blue-700 text-xl font-bold'>Menu</h2>
            <span className='cursor-pointer text-2xl text-gray-700' onClick={toggleNavbar}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <ul className='flex flex-col gap-6 uppercase font-medium text-gray-700 mt-6'>
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all py-3 px-4 rounded-lg shadow-md">
                  <Link to='/tasks/add' className='block w-full h-full flex items-center space-x-2'>
                    <i className="fa-solid fa-plus"></i>
                    <span>Add Task</span>
                  </Link>
                </li>
                <li className='py-3 px-4 cursor-pointer hover:bg-gray-200 transition rounded-lg' onClick={handleLogoutClick}>
                  Logout
                </li>
              </>
            ) : (
              <li className='py-3 px-4 cursor-pointer text-blue-600 hover:bg-gray-200 transition rounded-lg'>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  )
}

export default Navbar;

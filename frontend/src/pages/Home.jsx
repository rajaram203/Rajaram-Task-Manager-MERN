import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : 'Task Manager';
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="h-screen w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center shadow-lg">
            <h1 className="text-4xl font-bold mb-4">Stay Organized with Task Manager</h1>
            <p className="text-lg text-gray-200 mb-6">Organize your tasks efficiently and boost productivity.</p>

            {/* 🚀 Animated Button (Pop-up Effect Only) */}
            <Link
              to="/signup"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md 
                         transition-transform duration-200 hover:scale-105"
            >
              Join Now
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mt-10 mx-8 text-gray-700 border-b-2 border-gray-300 pb-2">
              Welcome, {authState.user.name} 🎉
            </h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;

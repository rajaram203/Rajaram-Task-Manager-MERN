import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });
  };

  const fieldError = field => (
    <p className={`mt-1 text-red-500 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <form className='w-full max-w-[500px] p-8 bg-white border border-gray-300 shadow-xl rounded-lg text-gray-800'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center text-3xl font-semibold mb-6 text-indigo-700'>Create an Account</h2>

            <div className="mb-5">
              <label htmlFor="name" className="block font-medium">Name</label>
              <Input type="text" name="name" id="name" value={formData.name} placeholder="Enter your name" onChange={handleChange} className="border p-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400" />
              {fieldError("name")}
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block font-medium">Email</label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} className="border p-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400" />
              {fieldError("email")}
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block font-medium">Password</label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Create a password" onChange={handleChange} className="border p-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400" />
              {fieldError("password")}
            </div>

            <button className='w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md' onClick={handleSubmit}>
              Sign Up
            </button>

            <div className='pt-4 text-center'>
              <Link to="/login" className='text-indigo-100 font-medium hover:underline'>Already have an account? Login here</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupForm;

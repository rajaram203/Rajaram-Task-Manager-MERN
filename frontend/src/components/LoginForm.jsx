import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [isLoggedIn, navigate, redirectUrl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-red-500 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Welcome Back</h2>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password <span className="text-red-500">*</span></label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
              {fieldError("password")}
            </div>

            {/* Submit Button */}
            <button 
              className="w-full bg-blue-600 text-white py-2 font-medium rounded-lg 
                         hover:bg-blue-700 transition-transform duration-200 hover:scale-105"
              onClick={handleSubmit}
            >
              Login
            </button>

            {/* Signup Link */}
            <div className="text-center mt-4">
              <Link to="/signup" className="text-blue-500 hover:underline">Don't have an account? Signup here</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;

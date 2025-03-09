import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {
  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      description: task.description
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    if (mode === "add") {
      const config = { url: "/tasks", method: "post", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    } else {
      const config = { url: `/tasks/${taskId}`, method: "put", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <form className="w-full max-w-[600px] bg-white p-8 border-2 shadow-lg rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-center mb-6 text-3xl font-extrabold text-gray-700">
                {mode === "add" ? "ADD NEW TASK" : "EDIT TASK"}
              </h2>

              <div className="mb-6">
                <label htmlFor="description" className="block font-medium text-gray-700">Provide description for the task</label>
                <Textarea
                  type="description"
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder="Write here.."
                  onChange={handleChange}
                  className="border-2 p-3 w-full rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 text-lg font-bold text-gray-800"
                />
                {fieldError("description")}
              </div>

              <button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-bold text-lg shadow-md transition duration-300"
                onClick={handleSubmit}
              >
                {mode === "add" ? "ADD TASK" : "UPDATE TASK"}
              </button>

              <button
                className="w-full mt-4 bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-bold text-lg shadow-md transition duration-300"
                onClick={() => navigate("/")}
              >
                CANCEL
              </button>

              {mode === "update" && (
                <button
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow-md transition duration-300"
                  onClick={handleReset}
                >
                  RESET
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </MainLayout>
  )
}

export default Task;

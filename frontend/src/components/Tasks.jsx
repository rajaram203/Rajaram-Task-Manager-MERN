import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <div className="bg-blue-500 min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-[700px] py-6 px-4 bg-white rounded-lg shadow-lg">
        {tasks.length !== 0 && <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks ({tasks.length})</h2>}

        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <span className="text-gray-700 text-lg font-medium">No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-md px-4 py-2">+ Add New Task</Link>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div key={task._id} className="bg-gray-100 my-4 p-4 text-gray-800 rounded-md shadow-md">
                  <div className="flex items-center">
                    <span className="font-extrabold text-lg">Task #{index + 1}</span>

                    <Tooltip text="Edit this task" position="top">
                      <Link to={`/tasks/${task._id}`} className="ml-auto mr-3 text-blue-600 cursor-pointer text-lg">
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text="Delete this task" position="top">
                      <span className="text-red-500 cursor-pointer text-lg" onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>
                  <div className="whitespace-pre font-semibold text-gray-700 mt-2">{task.description}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

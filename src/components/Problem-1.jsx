import React, { useState } from "react";

const Problem1 = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    taskStatus: "",
  });
  const [show, setShow] = useState("all");

  const handleClick = (val) => {
    setShow(val);
  };

  function sortTasksByStatus(tasks) {
    const statusOrder = {
      active: 1,
      completed: 2,
      pending: 3,
      archive: 4,
    };

    return tasks.sort((a, b) => {
      const statusA = statusOrder[a.taskStatus];
      const statusB = statusOrder[b.taskStatus];

      return statusA - statusB;
    });
  }

  const submitTask = (event) => {
    event.preventDefault();

    if (
      task.taskStatus === "active" ||
      task.taskStatus === "completed" ||
      task.taskStatus === "pending" ||
      task.taskStatus === "archive"
    ) {
      setTasks((prev) => {
        const allTasks = [task, ...prev];
        const sortTasks = sortTasksByStatus(allTasks);
        return sortTasks;
      });
    } else {
      window.alert("task should be active/pending/completed/archive");
    }

    setTask({
      taskName: "",
      taskStatus: "",
    });
  };

  const handleChange = (event) => {
    setTask((prevTask) => ({
      ...prevTask,
      [event.target.name]: event.target.value,
    }));
  };

  let tasksTBody;
  if (show === "all") {
    tasksTBody = (
      <tbody>
        {tasks.map((task) => (
          <tr key={task.taskName}>
            <td>{task.taskName}</td>
            <td>{task.taskStatus}</td>
          </tr>
        ))}
      </tbody>
    );
  } else if (show === "active") {
    tasksTBody = (
      <tbody>
        {tasks.map((task) =>
          task.taskStatus === "active" ? (
            <tr key={task.taskName}>
              <td>{task.taskName}</td>
              <td>{task.taskStatus}</td>
            </tr>
          ) : null
        )}
      </tbody>
    );
  } else if (show === "completed") {
    tasksTBody = (
      <tbody>
        {tasks.map((task) =>
          task.taskStatus === "completed" ? (
            <tr key={task.taskName}>
              <td>{task.taskName}</td>
              <td>{task.taskStatus}</td>
            </tr>
          ) : null
        )}
      </tbody>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={(e) => submitTask(e)}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                name="taskName"
                value={task.taskName}
                onChange={(e) => handleChange(e)}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                name="taskStatus"
                value={task.taskStatus}
                onChange={(e) => handleChange(e)}
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {tasksTBody}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;

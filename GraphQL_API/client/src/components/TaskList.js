import React, { useState } from "react";
import { graphql } from 'react-apollo';
import TaskDetails from './TaskDetails';
import { getTasksQuery } from "../queries/queries";

function TaskList(props) {
  const [selected, setSelected] = useState(null);

  const selectTask = (id) => {
    setSelected(id);
  };

  // Function to display tasks
  const displayTasks = () => {
    const data = props.data;
    if (data.loading) {
      return <div>Loading tasks...</div>;
    } else {
      return data.tasks.map(task => {
        return (
          <li key={task.id} onClick={() => selectTask(task.id)}>
            {task.title}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="task-list">
        {displayTasks()}
      </ul>
      {selected && <TaskDetails taskId={selected} />}
    </div>
  );
}

export default graphql(getTasksQuery)(TaskList);

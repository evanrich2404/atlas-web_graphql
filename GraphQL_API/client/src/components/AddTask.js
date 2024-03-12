import { useState } from "react";
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getProjectsQuery, addTaskMutation, getTasksQuery } from '../queries/queries';

function AddTask(props) {
  const [inputs, setInputs] = useState({
    title: '',
    weight: 1,
    description: '',
    projectId: ''
  });

  const handleChange = (e) => {
    const newInputs = { ...inputs };
    newInputs[e.target.name] = e.target.name === "weight" ? parseInt(e.target.value) : e.target.value;
    setInputs(newInputs);
  };

  const displayProjects = () => {
    const { getProjectsQuery } = props;
    if (getProjectsQuery.loading) {
      return <option disabled>Loading projects...</option>;
    } else {
      return getProjectsQuery.projects.map(project => (
        <option key={project.id} value={project.id}>{project.title}</option>
      ));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addTaskMutation({
      variables: {
        title: inputs.title,
        weight: inputs.weight,
        description: inputs.description,
        projectId: inputs.projectId,
      },
      refetchQueries: [{ query: getTasksQuery }],
    });
  };

  return (
    <form className="task" id="add-task" onSubmit={submitForm}>
      <div className="field">
        <label>Task title:</label>
        <input type="text" name="title" onChange={handleChange} value={inputs.title} required />
      </div>
      <div className="field">
        <label>Weight:</label>
        <input type="number" name="weight" onChange={handleChange} value={inputs.weight} required />
      </div>
      <div className="field">
        <label>Description:</label>
        <textarea name="description" onChange={handleChange} value={inputs.description} required></textarea>
      </div>
      <div className="field">
        <label>Project:</label>
        <select name="projectId" onChange={handleChange} value={inputs.projectId} required>
          <option value="" disabled>Select project</option>
          {displayProjects()}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}

export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addTaskMutation, { name: "addTaskMutation" })
)(AddTask);

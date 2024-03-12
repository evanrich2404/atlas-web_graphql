// client/src/queries/queries.js
import { gql } from 'apollo-boost';

const getTasksQuery = gql`
{
  tasks {
    id
    title
  }
}
`;

const getProjectsQuery = gql`
{
  projects {
    id
    title
  }
}
`;

const addTaskMutation = gql`
  mutation($title: String!, $weight: Int!, $description: String!, $projectId: ID!) {
    addTask(title: $title, weight: $weight, description: $description, projectId: $projectId) {
      id
      title
    }
  }
`;

const addProjectMutation = gql`
  mutation($title: String!, $weight: Int!, $description: String!) {
    addProject(title: $title, weight: $weight, description: $description) {
      id
      title
    }
  }
`;

const getTaskDetailQuery = gql`
  query GetTaskDetail($id: ID) {
    task(id: $id) {
      id
      title
      weight
      description
      project {
        id
        title
        weight
        description
        tasks {
          id
          title
          weight
        }
      }
    }
  }
`;

export { getTasksQuery, getProjectsQuery, addTaskMutation, addProjectMutation, getTaskDetailQuery };

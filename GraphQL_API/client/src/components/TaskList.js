import {
  useState,
  //useEffect
} from "react";
// components
import TaskDetails from './TaskDetails';

function TaskList(props) {
  // eslint-disable-next-line
  const [state, setState] = useState({
    selected: null
  });

  return ( <
    div >
    <
    ul id = "task-list" > {

    } <
    /ul>  <
    TaskDetails /
    > < /
    div >
  );
}

export default TaskList;

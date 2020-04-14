import React from 'react';

import { TaskResource } from '../model/task.model';
import TaskTrackerListItem from './TaskTrackerListItem';

import './TaskTrackerList.css';

interface TaskTrackerListProps {
  tasks: TaskResource[];
}

function TaskTrackerList(props: TaskTrackerListProps) {
  return (
    <ul className="list-unstyled m-0">
      { props.tasks.map(task => <TaskTrackerListItem task={task} key={task.id} />) }
    </ul>
  )
}

export default TaskTrackerList;
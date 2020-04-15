import React from 'react';

import { TaskResource } from '../model/task.model';
import TaskTrackerListItem from './TaskTrackerListItem';
import { TaskTrackerItemUpdateActions } from './TaskTrackerContainer';
import './TaskTrackerList.css';

interface TaskTrackerListProps extends TaskTrackerItemUpdateActions {
  tasks: TaskResource[];
}

function TaskTrackerList(props: TaskTrackerListProps) {
  return (
    <ul className="list-unstyled m-0">
      { props.tasks.map(task =>
        <TaskTrackerListItem
          task={task}
          key={task.id}
          onComplete={props.onComplete}
          onDelete={props.onDelete} />)
      }
    </ul>
  )
}

export default TaskTrackerList;
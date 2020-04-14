import React from 'react';

import { TaskResource } from '../model/task.model';
import Checkbox from './Checkbox';
import './TaskTrackerListItem.css';

interface TaskTrackerListItemProps {
  task: TaskResource;
}

function TaskTrackerListItem(props: TaskTrackerListItemProps) {
  const { task } = props;
  return (
    <li className="d-flex align-items-center task-tracker-list-item">
      <Checkbox id={task.id} />
      <span className="mr-auto">{task.title}</span>
      <small className="text-muted">two days left</small>
      <button className="btn task-tracker-list-item-remove"><i className="gg-trash"></i></button>
    </li>
  )
}

export default TaskTrackerListItem;
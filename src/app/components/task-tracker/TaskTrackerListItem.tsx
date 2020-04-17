import React from 'react';
import { Link } from 'react-router-dom';

import { TaskResource } from '../../model/task.model';
import { getDistanceToNow } from '../../lib/utils';
import { TaskTrackerItemUpdateActions } from './TaskTrackerContainer';
import Checkbox from '../shared/Checkbox';
import './TaskTrackerListItem.css';

interface TaskTrackerListItemProps extends TaskTrackerItemUpdateActions {
  task: TaskResource;
}

function DueDateComponent(props: { dueDate: any }) {
  const date = getDistanceToNow(new Date(props.dueDate));
  return (
    <small className="badge badge-light badge-pill">
      {date}
    </small>
  );
}

function TaskTrackerListItem(props: TaskTrackerListItemProps) {
  const { task } = props;

  const handleItemCompleted = () => {
    props.onComplete({
      id: task.id,
      completed: !task.completed
    });
  };

  const handleItemDelete = () => {
    props.onDelete({ id: task.id });
  };

  return (
    <li className="d-flex align-items-center task-tracker-list-item">
      <Checkbox onChange={handleItemCompleted} checked={task.completed} id={task.id} />
      <span className="mr-auto">{task.title}</span>
      { task.dueDate && <DueDateComponent dueDate={ task.dueDate } />}
      <span className="px-1"></span>
      <button onClick={handleItemDelete} title="Delete" className="btn btn-mr-icon">
        <i className="mr-icon gg-trash"></i>
      </button>
      <Link to={`/app/tasks/${ task.id }`} title="Edit" className="btn btn-mr-icon">
        <i className="mr-icon gg-info"></i>
      </Link>
    </li>
  )
}

export default TaskTrackerListItem;
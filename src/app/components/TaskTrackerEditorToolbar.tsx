import React, { useState } from 'react';

import FormField from './FormField';
import './TaskTrackerEditorToolbar.css';
import { isValidString, isFunction } from '../lib/utils';

interface TaskTrackerMicroEditorProps {
  loading?: boolean;
  todoTitle?: string | null;
  onTitleChange?: ((title: string) => void);
  onTaskAdd?: (() => void);
} 

function TaskTrackerEditorToolbar(props: TaskTrackerMicroEditorProps) {
  const [todoTitle, setTodoTitle] = useState('');

  if (isValidString(props.todoTitle)) {
    setTodoTitle(props.todoTitle);
  }

  const handleTodoControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);

    if (isFunction(props.onTitleChange)) {
      props.onTitleChange(event.target.value);
    }
  }

  const handleTodoControlKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && isValidString(todoTitle) && typeof props.onTaskAdd === 'function') {
      props.onTaskAdd();
    }
  }

  const loadingSpinnerElem = <span className="spinner-border spinner-border-sm" />;

  return (
    <div className="card border-0">
      <div className="card-body">
        <FormField
          type="text"
          id="new-todo-control"
          placeholder="What's to do next?"
          hint="Press enter to create new task"
          className="new-todo-control"
          onChange={handleTodoControlChange}
          onKeyUp={handleTodoControlKeyUp} />
        {props.loading && loadingSpinnerElem}
      </div>
    </div>
  )
}

export default TaskTrackerEditorToolbar;
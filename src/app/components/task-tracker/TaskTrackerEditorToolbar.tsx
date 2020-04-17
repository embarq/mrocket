import React, { useState } from 'react';

import FormField from '../shared/FormField';
import './TaskTrackerEditorToolbar.css';
import { isValidString, isFunction } from '../../lib/utils';
import Checkbox from '../shared/Checkbox';

interface TaskTrackerMicroEditorProps {
  loading?: boolean;
  todoTitle?: string | null;
  todoCompleted?: boolean | null;
  onComplete?: (completed: boolean) => void;
  onTitleChange?: ((title: string) => void);
  onTaskAdd?: (() => void);
} 

function TaskTrackerEditorToolbar(props: TaskTrackerMicroEditorProps) {
  const [todoTitle, setTodoTitle] = useState('');

  if (!isValidString(todoTitle) && isValidString(props.todoTitle)) {
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

  const handleCheckboxChange = () => {
    if (isFunction(props.onComplete)) {
      props.onComplete(!props.todoCompleted);
    }
  }

  const loadingSpinnerElem = <span className="spinner-border spinner-border-sm" />;

  return (
    <div className="card border-0">
      <div className="card-body">
        <div className="d-flex">
          {props.todoCompleted != null && (
            <div className="pt-2">
              <Checkbox
                checked={props.todoCompleted}
                onChange={handleCheckboxChange}
                id="todo-editor-toolbar" />
            </div>)
          }
          <div className="w-100">
            <FormField
              type="text"
              id="new-todo-control"
              placeholder="What's to do next?"
              hint="Press enter to save"
              className="new-todo-control"
              value={todoTitle}
              onChange={handleTodoControlChange}
              onKeyUp={handleTodoControlKeyUp} />
            {props.loading && loadingSpinnerElem}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskTrackerEditorToolbar;
import React, { useState } from 'react';

import FormField from './FormField';
import './TaskTrackerEditorToolbar.css';

interface TaskTrackerMicroEditorProps {
  onTaskAdd: (payload: { todoTitle: string }) => void;
} 

function TaskTrackerEditorToolbar(props: TaskTrackerMicroEditorProps) {
  const [todoTitle, setTodoTitle] = useState('');
  const isEmptyTitle = () => todoTitle.trim().length === 0;

  const handleTodoControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  }

  const boundOnTaskAdd = () => {
    props.onTaskAdd({ todoTitle });
  }

  const handleTodoControlKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isEmptyTitle()) {
      props.onTaskAdd({ todoTitle });
    }
  }

  const maybeShowAddButton = () => {
    if (isEmptyTitle()) {
      return null;
    }

    return (
      <div className="col-2">
        <button onClick={boundOnTaskAdd} type="button" className="btn btn-info">Add</button>
      </div>
    )
  }

  return (
    <div className="card border-0">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <FormField
              type="text"
              id="new-todo-control"
              placeholder="What's to do next?"
              hint="Press enter to create new task"
              className="new-todo-control"
              onChange={handleTodoControlChange}
              onKeyUp={handleTodoControlKeyUp} />
          </div>
    
          {maybeShowAddButton()}
        </div>
      </div>
    </div>
  )
}

export default TaskTrackerEditorToolbar;
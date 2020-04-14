import React from 'react';
import { TaskTrackerEditorPageMode } from '../pages/TaskTrackerEditorPage';
import { isFunction } from '../lib/utils';

interface TaskTrackerEditorFooterControlsProps {
  mode: TaskTrackerEditorPageMode,
  loading?: boolean;
  // It would need only delete button handler
  // otherwise for "Save" and "Create" we rely on default forms behavior
  // Meaning that type submit will invoke onSubmit handler
  // on submit button parent form
  onDelete?: () => void;
}

function TaskTrackerEditorFooterControls(props: TaskTrackerEditorFooterControlsProps) {
  const loadingSpinnerElem = <span className="spinner-border spinner-border-sm mr-2"></span>

  if (props.mode === TaskTrackerEditorPageMode.Create) {
    return (
      <React.Fragment>
        <div>{/* spacer */}</div>
        <button type="submit" className="btn btn-white text-primary">
          {props.loading && loadingSpinnerElem}
          Create
        </button>
      </React.Fragment>
    );
  }

  const handleDelete = () => {
    if (isFunction(props.onDelete)) {
      props.onDelete();
    }
  }

  return (
    <React.Fragment>
      <button onClick={handleDelete} type="button" className="btn btn-white text-danger">
        {props.loading && loadingSpinnerElem}
        Delete
        </button>
      <button type="submit" className="btn btn-white text-info">
        {props.loading && loadingSpinnerElem}
        Save
        </button>
    </React.Fragment>
  )
}

export default TaskTrackerEditorFooterControls;
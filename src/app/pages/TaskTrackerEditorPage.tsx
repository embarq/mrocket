import React from 'react';
import './TaskTrackerEditorPage.css';
import FormField from '../components/FormField';
import TaskTrackerLayout from '../layout/TaskTrackerLayout';
import TaskTrackerEditorToolbar from '../components/TaskTrackerEditorToolbar';

export type TaskTrackerEditorPageProps = {};

function TaskTrackerEditorPage(props: TaskTrackerEditorPageProps) {
  const handleTaskAdd = ({ todoTitle }: any) => {

  }

  return (
    <TaskTrackerLayout toolbarChildren={ <TaskTrackerEditorToolbar onTaskAdd={handleTaskAdd} /> }>
      <div className="card border-0">
        <div className="card-body">
          <div className="form-group">
            <FormField
              controlType="textarea"
              label="Description"
              id="todo-description"
              placeholder="Describe your next task" />
          </div>
          <div className="form-group">
            <FormField
              type="datetime-local"
              value={new Date(Date.now()).toISOString().slice(0, 16)}
              label="Due date"
              id="todo-due-date" />
          </div>
        </div>
        <div className="card-footer border-0 bg-app-primary">
          <div className="d-flex justify-content-between">
            {/* <button className="btn btn-white text-danger">Delete</button> */}
            {/* <button className="btn btn-white text-info">Save</button> */}
            <button className="btn btn-white text-primary">Create</button>
          </div>
        </div>
      </div>
    </TaskTrackerLayout>
  );
}

export default TaskTrackerEditorPage;

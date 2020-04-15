import React from 'react';

import './TaskTrackerPage.css';

import TaskTrackerLayout from '../layout/TaskTrackerLayout';
import TaskTrackerToolbar from '../components/TaskTrackerToolbar';
import TaskTrackerContainer from '../components/TaskTrackerContainer';

function TaskTrackerPage() {  
  return (
    <TaskTrackerLayout toolbarChildren={<TaskTrackerToolbar />}>
      <div className="card">
        <div className="card-body">
          <TaskTrackerContainer />
        </div>
      </div>
    </TaskTrackerLayout>
  );
}

export default TaskTrackerPage;
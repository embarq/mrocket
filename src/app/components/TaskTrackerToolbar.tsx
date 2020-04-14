import React from 'react';

import SortModeControl from './SortModeControl';
import './TaskTrackerToolbar.css';

function TaskTrackerToolbar() {
  return (
    <div className="card border-0">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            You have 10 active tasks
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col">
  
              </div>
              <div className="col">
                <SortModeControl />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="progress bg-transparent" style={{height: '4px'}}>
        <div className="progress-bar bg-app-primary" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
      </div>
    </div>
  );
}

export default TaskTrackerToolbar;
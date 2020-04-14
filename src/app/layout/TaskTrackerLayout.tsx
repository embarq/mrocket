import React from 'react';

import './TaskTrackerLayout.css';

export type TaskTrackerLayoutProps = {
  children: React.ReactNode;
  toolbarChildren: React.ReactNode;
};

function TaskTrackerLayout(props: TaskTrackerLayoutProps) {
  return (
    <main className="app-main-wrapper">
      <div className="app-content toolbar-content">
        {props.toolbarChildren}
      </div>
      <div className="spacer pt-4"></div>
      <div className="container">
        <div className="app-content">
          {props.children}
        </div>
      </div>
    </main>
  );
}

export default TaskTrackerLayout;
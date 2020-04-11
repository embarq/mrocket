import React from 'react';
import './TaskTrackerLayout.css';

export type TaskTrackerLayoutProps = {};

function TaskTrackerLayout(props: React.PropsWithChildren<TaskTrackerLayoutProps>) {
  return (
    <div>
      <pre>TaskTrackerLayout</pre>
      {props.children}
    </div>
  );
}

export default TaskTrackerLayout;

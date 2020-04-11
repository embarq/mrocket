import React from 'react';
import './TaskTrackerPage.css';

export type TaskTrackerPageProps = {};

function TaskTrackerPage(props: React.PropsWithChildren<TaskTrackerPageProps>) {
  return (
    <div>
      <pre>TaskTrackerPage</pre>
      {props.children}
    </div>
  );
}

export default TaskTrackerPage;
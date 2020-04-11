import React from 'react';
import './TaskTrackerEditorPage.css';

export type TaskTrackerEditorPageProps = {};

function TaskTrackerEditorPage(props: React.PropsWithChildren<TaskTrackerEditorPageProps>) {
  return (
    <div>
      <pre>TaskTrackerEditorPage</pre>
      {props.children}
    </div>
  );
}

export default TaskTrackerEditorPage;

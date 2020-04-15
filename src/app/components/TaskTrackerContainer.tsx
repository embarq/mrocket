import React from 'react';

import { TaskResource } from '../model/task.model';
import { TasksService } from '../lib/tasks-service';
import { isFunction } from '../lib/utils';
import { QueryChangeObserver } from '../lib/firestore-query-observer';
import TaskTrackerList from './TaskTrackerList';

interface TaskTrackerContainerProps {
}

export interface TaskTrackerItemUpdateActions {
  onComplete: (payload: {id: string, completed: boolean}) => void;
  onDelete: (payload: {id: string}) => void;
}

interface TaskTrackerContainerState {
  tasks: TaskResource[];
}

class TaskTrackerContainer extends React.Component<TaskTrackerContainerProps, TaskTrackerContainerState> {
  private tasksChangesObserver: QueryChangeObserver<TaskResource>;
  private unsubscribeTasksChanges: (() => void) | null = null;
  private handleItemComplete: (payload: { id: string; completed: boolean; }) => void;
  private handleItemDelete: (payload: { id: string; }) => void;

  constructor(props: TaskTrackerContainerProps) {
    super(props);
    this.state = {
      tasks: []
    };
    this.tasksChangesObserver = TasksService.Instance.onUserTasksChanges();

    this.handleItemComplete = (payload: {id: string, completed: boolean}) => {
      TasksService.Instance
        .updateTask(payload.id, { completed: payload.completed })
        .then()
        .catch(err => console.error(err));
    }
  
    this.handleItemDelete = (payload: {id: string}) => {
      TasksService.Instance
        .deleteTask(payload.id)
        .then()
        .catch(err => console.error(err));
    }
  }

  componentWillUnmount() {
    this.tasksChangesObserver.kill();

    if (isFunction(this.unsubscribeTasksChanges)) {
      this.unsubscribeTasksChanges()
    }
  }

  componentDidMount() {
    this.unsubscribeTasksChanges = this.tasksChangesObserver.subscribe((data) => {
      this.onUserTasksChanges(data);
    });
  }

  onUserTasksChanges(data: TaskResource[]) {
    this.setState({ tasks: data });
  }

  render() {
    return (
      <TaskTrackerList
        onComplete={this.handleItemComplete}
        onDelete={this.handleItemDelete}
        tasks={this.state.tasks} />
    )
  }
}

export default TaskTrackerContainer
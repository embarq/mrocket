import React, { useState } from 'react';
import { Redirect, RouteChildrenProps } from 'react-router-dom';

import { TasksService } from '../lib/tasks-service';
import TaskTrackerLayout from '../layout/TaskTrackerLayout';
import FormField from '../components/shared/FormField';
import TaskTrackerEditorToolbar from '../components/task-tracker/TaskTrackerEditorToolbar';
import TaskTrackerEditorFooterControls from '../components/task-tracker/TaskTrackerEditorFooterControls';
import './TaskTrackerEditorPage.css';

interface TaskTrackerEditorRouteParams {
  taskId: string;
}

export type TaskTrackerEditorPageProps = RouteChildrenProps<TaskTrackerEditorRouteParams> & {
};

interface TaskTrackerEditorPageState {
  loading: boolean;
  loadingSuccess: boolean;
  loadingError: any | null;
}

interface TaskFormState {
  id: string | null;
  title: string;
  description: string | null;
  dueDate: any;
  completed: boolean | null;
}

const initialPageState: TaskTrackerEditorPageState = {
  loading: false,
  loadingSuccess: false,
  loadingError: null
}

export enum TaskTrackerEditorPageMode {
  Create,
  Edit
}

function TaskTrackerEditorPage(props: TaskTrackerEditorPageProps) {
  const [pageMode, setPageMode] = useState<TaskTrackerEditorPageMode | null>(null);
  const [pageState, setPageState] = useState<TaskTrackerEditorPageState>(initialPageState);
  const [taskFormState, setTaskFormState] = useState<TaskFormState>({
    id: null,
    title: '',
    description: null,
    dueDate: null,
    completed: null
  });

  const handleSaveTask = () => {
    const taskPayload = {
      ...taskFormState
    };

    setPageState({
      loading: true,
      loadingSuccess: false,
      loadingError: null
    });

    const action = pageMode === TaskTrackerEditorPageMode.Edit
      ? TasksService.Instance.updateTask(taskFormState.id as string, taskPayload as any)  // FIXME: taskPayload typings
      : TasksService.Instance.createTask({ ...taskPayload, completed: false })

    action
      .then((res) => {
        setTaskFormState({
          ...taskFormState,
          id: res.taskId
        });
        setPageState({
          loading: false,
          loadingSuccess: true,
          loadingError: null
        });
      })
      .catch((err) => {
        // TODO: implement error state handling in component's UI
        setPageState({
          loading: false,
          loadingSuccess: false,
          loadingError: err
        });
      });
  }

  const handleToolbarTaskAdd = () => {
    handleSaveTask();
  }

  const handleTitleChange = (title: string) => {
    setTaskFormState({
      ...taskFormState,
      title
    });
  }

  const handleFormFieldChange = (formField: keyof TaskFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskFormState({
        ...taskFormState,
        [formField]: event.target.value
      });
    }
  
  const handleComplete = (completed: boolean) => {
    setTaskFormState({
      ...taskFormState,
      completed
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSaveTask();
  }

  const handleDelete = () => {
    setPageState({
      ...pageState,
      loading: true
    });

    TasksService.Instance.deleteTask(taskFormState.id as string).then(() => {
      setPageState({
        ...pageState,
        loading: false,
        loadingSuccess: true
      });
    });
  }

  const { taskId: taskIdParam } = props.match?.params as TaskTrackerEditorRouteParams;
  const nextPageMode = taskIdParam === 'new' ? TaskTrackerEditorPageMode.Create : TaskTrackerEditorPageMode.Edit;

  if (pageMode !== nextPageMode) {
    setPageMode(nextPageMode);

    if (
      nextPageMode === TaskTrackerEditorPageMode.Edit &&
      taskFormState.id == null &&
      !pageState.loading
    ) {
      setPageState({
        ...pageState,
        loading: true
      });

      TasksService.Instance.getTask(taskIdParam).then(task => {
        setPageState({
          ...pageState,
          loading: false
        });
        setTaskFormState({
          ...taskFormState,
          id: taskIdParam,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          completed: task.completed
        });
      });
    }
  }

  if (pageState.loadingSuccess) {
    const redirectParams = {
      pathname: '/app/tasks',
      state: {
        taskId: taskFormState.id
      }
    }

    return <Redirect push to={redirectParams} />
  }

  return (
    <TaskTrackerLayout toolbar={
      <TaskTrackerEditorToolbar
        todoCompleted={taskFormState.completed}
        todoTitle={taskFormState.title}
        onComplete={handleComplete}
        onTaskAdd={handleToolbarTaskAdd}
        onTitleChange={handleTitleChange}
        loading={pageState.loading} />
    }>
      <form onSubmit={handleSubmit} className="card border-0">
        <div className="card-body">
          <div className="form-group">
            <FormField
              onChange={handleFormFieldChange('description')}
              controlType="textarea"
              label="Description"
              value={taskFormState.description}
              id="todo-description"
              disabled={pageState.loading}
              placeholder="Describe your next task" />
          </div>
          <div className="form-group">
            {/* 
              TODO: due-date component
              - by default a date-time picker is displayed + spoiler/collapse toggle
              - uncollapsed view contains predefined set of minutes, hours and days
             */}
            <FormField
              onChange={handleFormFieldChange('dueDate')}
              type="datetime-local"
              value={taskFormState.dueDate}
              label="Due date"
              disabled={pageState.loading}
              id="todo-due-date" />
          </div>
        </div>
        <div className="card-footer border-0 bg-app-primary">
          <div className="d-flex justify-content-between">
            <TaskTrackerEditorFooterControls
              mode={pageMode as TaskTrackerEditorPageMode}
              loading={pageState.loading}
              onDelete={handleDelete} />
          </div>
        </div>
      </form>
    </TaskTrackerLayout>
  );
}

export default TaskTrackerEditorPage;

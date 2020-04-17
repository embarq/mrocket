import React, { useState } from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';

import { TasksService } from '../lib/tasks-service';
import TaskTrackerLayout from '../layout/TaskTrackerLayout';
import FormField from '../components/shared/FormField';
import TaskTrackerEditorToolbar from '../components/task-tracker/TaskTrackerEditorToolbar';
import TaskTrackerEditorFooterControls from '../components/task-tracker/TaskTrackerEditorFooterControls';
import './TaskTrackerEditorPage.css';

export type TaskTrackerEditorPageProps = {};

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
    dueDate: null
  });

  const handleSaveTask = () => {
    const taskPayload = {
      ...taskFormState,
      completed: false
    };

    setPageState({
      loading: true,
      loadingSuccess: false,
      loadingError: null
    });

    TasksService.Instance
      .upsertTask(taskPayload)
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSaveTask();
  }

  const handleDelete = () => {
    console.log('[TaskTrackerEditorPage:handleDelete]');
  }

  const { params } = useRouteMatch<{taskId: string}>();
  const nextPageMode = params.taskId === 'new' ? TaskTrackerEditorPageMode.Create : TaskTrackerEditorPageMode.Edit;

  if (pageMode !== nextPageMode) {
    setPageMode(nextPageMode);

    if (nextPageMode === TaskTrackerEditorPageMode.Edit) {
      setTaskFormState({
        ...taskFormState,
        id: params.taskId
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
    <TaskTrackerLayout toolbarChildren={
      <TaskTrackerEditorToolbar onTaskAdd={handleToolbarTaskAdd} onTitleChange={handleTitleChange} loading={ pageState.loading } />
    }>
      <form onSubmit={handleSubmit} className="card border-0">
        <div className="card-body">
          <div className="form-group">
            <FormField
              onChange={handleFormFieldChange('description')}
              controlType="textarea"
              label="Description"
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
          <div className="d-flex justify-content-end">
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

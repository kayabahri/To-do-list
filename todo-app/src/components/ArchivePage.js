import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArchivedTasks, unarchiveTask, deleteArchivedTask } from '../redux/thunks/archiveThunks';
import { useTranslation } from 'react-i18next';
import '../styles/ArchivePage.css';

const ArchivePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const archivedTasks = useSelector((state) => state.archivedTasks?.tasks || []);
  const status = useSelector((state) => state.archivedTasks?.status || 'idle');
  const error = useSelector((state) => state.archivedTasks?.error);

  useEffect(() => {
    dispatch(fetchArchivedTasks());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      console.log(t('Archived tasks loaded successfully'));
    }
  }, [status, t]);

  const handleUnarchive = (taskId) => {
    dispatch(unarchiveTask({ taskId })).then(() => {
      dispatch(fetchArchivedTasks());
    });
  };

  const handleDelete = (taskId) => {
    dispatch(deleteArchivedTask({ taskId })).then(() => {
      dispatch(fetchArchivedTasks());
    });
  };

  const groupedTasks = archivedTasks.reduce((groups, task) => {
    const category = task.categoryName || t('Unspecified');
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(task);
    return groups;
  }, {});

  return (
    <div className="archive-page">
      {Object.entries(groupedTasks).map(([categoryName, tasks]) => (
        <div key={categoryName} className="category-group">
          <h3 className="category-title">{categoryName}</h3>
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <p>{task.text}</p>
              <div className="task-buttons">
                <span
                  className="action-text restore-text"
                  onClick={() => handleUnarchive(task.id)}
                >
                  {t('Unarchive')}
                </span>
                <span
                  className="action-text delete-text"
                  onClick={() => handleDelete(task.id)}
                >
                  {t('Delete')}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArchivePage;

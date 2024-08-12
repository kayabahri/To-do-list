import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArchivedTasks, unarchiveTask, deleteArchivedTask } from '../redux/thunks/archiveThunks';
import '../styles/ArchivePage.css';

const ArchivePage = () => {
  const dispatch = useDispatch();
  const archivedTasks = useSelector((state) => state.archivedTasks?.tasks || []); // Undefined kontrolü yapıldı
  const status = useSelector((state) => state.archivedTasks?.status || 'idle'); // Undefined kontrolü yapıldı
  const error = useSelector((state) => state.archivedTasks?.error);

  useEffect(() => {
    dispatch(fetchArchivedTasks());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      console.log('Archived tasks loaded successfully');
    }
  }, [status]);

  const handleUnarchive = (taskId) => {
    dispatch(unarchiveTask({ taskId })).then(() => {
      dispatch(fetchArchivedTasks()); // Yeniden yükle
    });
  };

  const handleDelete = (taskId) => {
    dispatch(deleteArchivedTask({ taskId })).then(() => {
      dispatch(fetchArchivedTasks()); // Yeniden yükle
    });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="archive-page">
      <h2>Archived Tasks</h2>
      {archivedTasks.length > 0 ? (
        <ul>
          {archivedTasks.map((task) => (
            <li key={task.id}>
              <div className="task-card">
                <p>{task.text}</p>
                <p>Kategori: {task.categoryName || 'Belirtilmemiş'}</p> {/* Kategori adı yoksa 'Belirtilmemiş' gösterilir */}
                <span className="task-dates">
                  {task.startDate && task.endDate && (
                    <>
                      <i className="fas fa-clock"></i> {new Date(task.startDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })} - {new Date(task.endDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                    </>
                  )}
                </span>
                <button onClick={() => handleUnarchive(task.id)}>Geri Çıkar</button>
                <button onClick={() => handleDelete(task.id)}>Sil</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No archived tasks available.</div>
      )}
    </div>
  );  
};

export default ArchivePage;

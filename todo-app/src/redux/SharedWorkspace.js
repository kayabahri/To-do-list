import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const SharedWorkspace = () => {
  const { sharedKey } = useParams();
  const [workspaceData, setWorkspaceData] = useState(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      const docRef = doc(db, 'workspaces', sharedKey);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorkspaceData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchWorkspace();
  }, [sharedKey]);

  return (
    <div>
      {workspaceData ? (
        <div>
          <h1>{workspaceData.name}</h1>
          {/* Diğer çalışma alanı verilerini burada gösterebilirsiniz */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SharedWorkspace;

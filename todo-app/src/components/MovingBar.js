import React, { useState, useEffect } from 'react';
import '../styles/MovingBar.css';
import { generateRandomKey } from '../utils';
import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const MovingBar = ({ sidebarOpen }) => {
  const [userKey, setUserKey] = useState(null);
  const [sharedKey, setSharedKey] = useState('');
  const [isViewBoxOpen, setIsViewBoxOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserKey = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && userDocSnap.data().sharedKey) {
          setUserKey(userDocSnap.data().sharedKey);
        } else {
          const newKey = generateRandomKey();
          await setDoc(userDocRef, { sharedKey: newKey }, { merge: true });
          setUserKey(newKey);
        }
      }
    };

    fetchUserKey();
  }, []);

  const handleShare = async () => {
    const user = auth.currentUser;
    if (user && userKey) {
      const workspaceData = {
        name: "Çalışma Alanı", // Bu verileri dinamik olarak ayarlayabilirsiniz
        description: "Bu, paylaşılan çalışma alanının bir örneğidir."
      };
      await setDoc(doc(db, 'workspaces', userKey), workspaceData);
      alert(`Paylaşım anahtarınız: ${userKey}`);
    } else {
      alert('Lütfen önce giriş yapınız.');
    }
  };

  const handleView = (e) => {
    e.preventDefault();
    if (sharedKey) {
      navigate(`/shared/${sharedKey}`);
    }
  };

  return (
    <div className={`moving-bar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="moving-bar-content">
        {/* Sol tarafa eklenmek istenen içerik buraya gelecek */}
      </div>
      <div className="button-group">
        <button className="view-button" onClick={() => setIsViewBoxOpen(!isViewBoxOpen)}>Görüntüle</button>
        <button className="share-button" onClick={handleShare}>Paylaş</button>
      </div>
      {isViewBoxOpen && (
        <form onSubmit={handleView} className="view-form">
          <input
            type="text"
            value={sharedKey}
            onChange={(e) => setSharedKey(e.target.value)}
            placeholder="Anahtar girin"
            required
          />
          <button type="submit" className="submit-button">Onayla</button>
        </form>
      )}
    </div>
  );
};

export default MovingBar;

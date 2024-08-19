import React, { useContext, useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Header from './components/Header';
import About from './components/About';
import Settings from './components/Settings';
import Home from './components/Home';
import Login from './components/Login';
import SideBar from './components/SideBar';
import SharedWorkspace from './redux/SharedWorkspace';
import ShareAccessForm from './components/ShareAccessForm';
import ArchivePage from './components/ArchivePage';
import InfoPage from './components/InfoPage'; 
import { ThemeContext } from './contexts/ThemeContext';
import './styles/App.css';
import { store, persistor } from './redux/store';
import { auth } from './firebaseConfig';
import './i18n'; // i18n initialization

const App = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInfoPage, setShowInfoPage] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Kullanıcının ilk kez oturum açıp açmadığını kontrol et
      const hasSeenInfoPage = localStorage.getItem('hasSeenInfoPage');

      if (currentUser && !hasSeenInfoPage) {
        setShowInfoPage(true);
        localStorage.setItem('hasSeenInfoPage', 'true');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      localStorage.removeItem('hasSeenInfoPage'); // Çıkış yapıldığında sıfırla
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  if (loading) {
    return null; // Yükleme sırasında gösterilen içerik kaldırıldı
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={null}>
          <Router>
            {showInfoPage ? (
              <InfoPage onProceed={() => setShowInfoPage(false)} />
            ) : (
              <div className={`App ${user ? theme : ''}`}>
                {user && <Header />}
                {user && <SideBar handleLogout={handleLogout} />}
                <main className={user ? '' : 'login-page'}>
                  <Routes>
                    {user ? (
                      <>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/shared/:sharedKey" element={<SharedWorkspace />} />
                        <Route path="/share-access" element={<ShareAccessForm />} />
                        <Route path="/archive" element={<ArchivePage />} />
                        <Route path="*" element={<Home />} />
                      </>
                    ) : (
                      <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/share-access" element={<ShareAccessForm />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                      </>
                    )}
                  </Routes>
                </main>
              </div>
            )}
          </Router>
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;

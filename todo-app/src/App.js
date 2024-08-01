import React, { useContext, useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Header from './components/Header';
import About from './components/About';
import Settings from './components/Settings';
import Home from './components/Home';
import Login from './components/Login';
import { ThemeContext } from './contexts/ThemeContext';
import './styles/App.css';
import './i18n';
import { store, persistor } from './redux/store';
import { auth } from './firebaseConfig';
import SideBar from './components/SideBar';
import SharedWorkspace from './redux/SharedWorkspace'; // redux klasöründen import ettik
import ShareAccessForm from './components/ShareAccessForm'; // ShareAccessForm bileşenini import ettik

const App = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={`App ${theme}`}>
            <Router>
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
                      <Route path="*" element={<Home />} />
                    </>
                  ) : (
                    <>
                      <Route path="/login" element={<Login />} />
                      <Route path="/share-access" element={<ShareAccessForm />} />
                      <Route path="*" element={<Login />} />
                    </>
                  )}
                </Routes>
              </main>
            </Router>
          </div>
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;

import React, { useEffect } from 'react';
import { auth, googleProvider, db } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          lists: [],
          settings: {}
        });
      }

      console.log('User signed in');
      navigate('/'); // Navigate to InfoPage
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  useEffect(() => {
    document.body.classList.add('login-page');
    document.documentElement.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
      document.documentElement.classList.remove('login-page');
    };
  }, []);

  return (
    <div className="login-container">
      <div className="login-text">
        {t("Welcome to Your Application!Welcome back! By logging in to the ToDo application, you can easily manage all your things to do, track your projects and get organized. Log in now and increase your productivity!")}
      </div>
      <button className="login-button" onClick={handleGoogleLogin}>
        <i className="fab fa-google"></i>
        {t("Log in with Google")}
      </button>
    </div>
  );
};

export default Login;

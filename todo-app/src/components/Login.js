import React, { useEffect } from 'react';
import { auth, googleProvider, db } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import '../styles/Login.css';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Kullanıcı verilerini Firestore'a kaydet
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
        Hoş geldiniz! ToDo uygulamasına giriş yaparak tüm yapılacaklarınızı kolayca yönetebilir, projelerinizi takip edebilir ve organize olabilirsiniz. Hemen giriş yapın ve üretkenliğinizi artırın!
      </div>
      <button className="login-button" onClick={handleGoogleLogin}>
        Google ile Giriş Yap
      </button>
    </div>
  );
};

export default Login;

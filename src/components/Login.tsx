/** @jsxImportSource @emotion/react */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { firebaseui } from 'index';
import 'firebaseui/dist/firebaseui.css';

const Login = () => {
  useEffect(() => {
    firebaseui.start('#firebaseui-container', {
      signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    });
  }, []);

  return (
    <div>
      <h1 css={{
        textAlign: 'center'
      }}>로그인 / 회원가입</h1>
      <div id="firebaseui-container"></div>{' '}
    </div>
  );
};
export default Login;

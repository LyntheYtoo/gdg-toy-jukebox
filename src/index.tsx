/** @jsxImportSource @emotion/react */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAbLRcnIBkSFu91sj8RHplTto9udMA9tKs',
  authDomain: 'gdg-toy-jukebox.firebaseapp.com',
  projectId: 'gdg-toy-jukebox',
  storageBucket: 'gdg-toy-jukebox.appspot.com',
  messagingSenderId: '677057320010',
  appId: '1:677057320010:web:a2072e9778b4d3b2c402b3',
};
firebase.initializeApp(firebaseConfig);

// 주소가 localhost 일 때 firestore 테스트모드
if (window.location.hostname === 'localhost') {
  console.log('INFO - running in localhost');
  firebase.auth().useEmulator('http://localhost:9099/');
  firebase.firestore().useEmulator('localhost', 8080);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

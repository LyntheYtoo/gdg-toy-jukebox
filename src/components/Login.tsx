/** @jsxImportSource @emotion/react */
import { useEffect, useMemo } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui';

import { Typography } from 'antd';

const { Title } = Typography;

const Login = () => {
  const ui = useMemo(
    () =>
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth()),
    [],
  );

  useEffect(() => {
    ui.start('#firebaseui-container', {
      signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    });

    return () => ui.reset();
  }, []);

  return (
    <div>
      <Title
        css={{
          textAlign: 'center',
          margin: 32,
        }}>
        로그인
      </Title>
      <div id="firebaseui-container"></div>{' '}
    </div>
  );
};
export default Login;

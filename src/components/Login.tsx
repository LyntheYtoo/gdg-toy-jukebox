/** @jsxImportSource @emotion/react */
import { useEffect, useMemo } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui';

import { Typography } from 'antd';

const { Title } = Typography;

interface Props {
  onSuccess(): void;
  onError(): void;
}
const Login = (props: Props) => {
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
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          props.onSuccess();
          return false;
        },
        signInFailure: () => {
          props.onError();
        },
      },
    });

    return () => ui.reset();
  }, [props, ui]);

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
      }}>
      {/* <Title
        css={{
          textAlign: 'center',
          margin: 32,
        }}>
        로그인
      </Title> */}
      <div id="firebaseui-container"></div>
    </div>
  );
};
export default Login;

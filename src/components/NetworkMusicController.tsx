/** @jsxImportSource @emotion/react */

import { User } from 'App';
import { useEffect } from 'react';

import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();

interface Props {
  roomNumber?: string;
  currentUser?: User;
}
const NetworkMusicController = (props: Props) => {
  useEffect(() => {
    // 유저가 없으면 실행 안함
    if (!props.currentUser) return;

    // 현재 접속중인 방이 없을 때만 자기 uid의 방을 팜
    if (!props.roomNumber) {
      db.collection('room')
        .where('masterUid', '==', props.currentUser.uid)
        .onSnapshot((snapshot) => {
          if (snapshot.empty) {
            createMyRoom(props.currentUser!);
          }
        });
    }
  }, [props.roomNumber, props.currentUser]);

  return <></>;
};
export default NetworkMusicController;

function createMyRoom(currentUser:User) {
  // 방 만들기
  db.collection('room').add({
    masterUid: currentUser.uid,
    musicQueue: [],
    curMusicIndex: -1,
    isPlaying: false,
  })
}
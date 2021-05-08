/** @jsxImportSource @emotion/react */

import { SearchItem, User } from 'App';
import { useEffect, useMemo, useState } from 'react';

import firebase from 'firebase';
import 'firebase/firestore';

interface Props {
  currentUser?: User;

  playMusic: () => void;
  pauseMusic: () => void;
  setMusicIndex: (i: number) => void;
  setMusicQueue: (queue: SearchItem[]) => void;
  musicIndex: number;
  musicQueue: SearchItem[];

  roomId?: string;
  setRoomId: (id: string) => void;
}
const NetworkMusicController = (props: Props) => {
  const db = useMemo(() => firebase.firestore(), []);

  useEffect(() => {
    // 유저가 없으면 실행 안함
    if (!props.currentUser) return;
    
    // 현재 접속중인 방이 없을 때만 자기 uid의 방을 팜
    if (props.roomId) return;

    db.collection('room')
      // .where('masterUid', '==', props.currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          createMyRoom(props.currentUser!).then(doc => {
            props.setRoomId(doc.id);
          });
        } else {
          const roomId = snapshot.docs[0].id;
          props.setRoomId(roomId);
        }
      });
  }, [createMyRoom, db, props]);

  // 동기화 당하는 로직
  useEffect(() => {
    if (!props.roomId) return;

    return db
      .collection('room')
      .doc(props.roomId)
      .onSnapshot(doc => {
        const roomData = doc.data() as Room | undefined;

        if (!roomData) return;

        if (roomData.isPlaying) {
          props.playMusic();
        }
        if (!roomData.isPlaying) {
          props.pauseMusic();
        }
        if (!compareSameMusicIndex(roomData.musicIndex, props.musicIndex)) {
          props.setMusicIndex(roomData.musicIndex);
        }
        if (!compareSameMusicQueue(roomData.musicQueue, props.musicQueue)) {
          props.setMusicQueue(roomData.musicQueue);
        }
      });
  }, [props.roomId, props, db]);

  // 동기화 하는 로직
  useEffect(() => {}, []);

  async function createMyRoom(currentUser: User) {
    console.log('createMyRoom');
    // 방 만들기
    const doc = await db.collection('room').add({
      masterUid: currentUser.uid,
      musicQueue: [],
      musicIndex: -1,
      isPlaying: false,
    } as Room);

    return doc;
  }

  function compareSameMusicQueue(q1: SearchItem[], q2: SearchItem[]): boolean {
    if (q1.length !== q2.length) return false;

    for (let i = 0; i < q1.length; i++) {
      if (q1[i].id !== q2[i].id) return false;
    }
    return true;
  }

  function compareSameMusicIndex(i1: number, i2: number): boolean {
    return i1 === i2;
  }

  function updateRoomMusicIdx(idx: number) {
    db.collection('room')
      .doc(props.roomId)
      .update({
        musicIndex: idx,
      } as Room);
  }

  function updateRoomMusicQueue(queue: SearchItem[]) {
    db.collection('room')
      .doc(props.roomId)
      .update({
        musicQueue: queue,
      } as Room);
  }

  function updateIsPlaying(isPlaying: boolean) {
    db.collection('room')
      .doc(props.roomId)
      .update({
        isPlaying: isPlaying,
      } as Room);
  }

  return <></>;
};
export default NetworkMusicController;

interface Room {
  masterUid: string;
  musicQueue: SearchItem[];
  musicIndex: number;
  isPlaying: boolean;
}

interface Chat {
  rootId: string;
  uid: string;
  content: string;
  sendTime: Date;
}

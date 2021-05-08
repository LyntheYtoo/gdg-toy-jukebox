import { SearchItem, User } from 'App';
import { useEffect, useMemo, useState } from 'react';

import firebase from 'firebase';
import 'firebase/firestore';

interface Param {
  currentUser?: User;

  playMusic: () => void;
  pauseMusic: () => void;
  setMusicIndex: (i: number) => void;
  setMusicQueue: (queue: SearchItem[]) => void;
  musicIndex: number;
  musicQueue: SearchItem[];

  roomId?: string;
  setRoomId: (id: string | undefined) => void;
}
const useRoomSync = (params: Param) => {
  const db = useMemo(() => firebase.firestore(), []);

  useEffect(() => {
    // 유저가 없으면 실행 안함
    if (!params.currentUser) return;

    // 현재 접속중인 방이 없을 때만 자기 uid의 방을 팜
    if (params.roomId) return;

    db.collection('room')
      // .where('masterUid', '==', props.currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          createMyRoom(params.currentUser!).then(doc => {
            params.setRoomId(doc.id);
          });
        } else {
          const roomId = snapshot.docs[0].id;
          params.setRoomId(roomId);
        }
      });
  }, [createMyRoom, db, params]);

  useEffect(() => {
    if (!params.roomId) return;

    return db
      .collection('room')
      .doc(params.roomId)
      .onSnapshot(doc => {
        const roomData = doc.data() as Room | undefined;
        console.log('ssss');

        if (!roomData) return;

        if (roomData.isPlaying) {
          params.playMusic();
        }
        if (!roomData.isPlaying) {
          params.pauseMusic();
        }
        if (!compareSameMusicIndex(roomData.musicIndex, params.musicIndex)) {
          params.setMusicIndex(roomData.musicIndex);
        }
        if (!compareSameMusicQueue(roomData.musicQueue, params.musicQueue)) {
          params.setMusicQueue(roomData.musicQueue);
        }
      });
  }, [params.roomId, params, db]);

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
      .doc(params.roomId)
      .update({
        musicIndex: idx,
      } as Room);
  }

  function updateRoomMusicQueue(queue: SearchItem[]) {
    db.collection('room')
      .doc(params.roomId)
      .update({
        musicQueue: queue,
      } as Room);
  }

  function updateIsPlaying(isPlaying: boolean) {
    db.collection('room')
      .doc(params.roomId)
      .update({
        isPlaying: isPlaying,
      } as Room);
  }

  return {
    updateIsPlaying,
    updateRoomMusicIdx,
    updateRoomMusicQueue
  };
};
export default useRoomSync;

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

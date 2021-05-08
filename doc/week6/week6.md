# 음악큐 동기화
음악을 동기화 되기 위해선 우선 먼저 Room의 방장을 정해야한다  
우선 Room의 첫번째로 들어간 유저가 방장이 되게끔 임시로 작성한다

그 후에 들어온 사람은 일반 유저로 방장이 곡을 바꾸게 되거나 일시정지 플레이를 하게 될시 영향을 받는다  

DB 구조 설계

Room  
-id  
-masterUid 
-musicQueue[] (Snippet)  
-curMusicIndex 
-isPlaying
  
Chat  
-rootId  
-uid  
-content  
-sendTime  

## 동기화 방법

1. Room의 방장은 동기화를 하는 입장이 되어  
모든 행동이 서버에 반영이 된다

하지만 서버의 내용은 방장에게 영향이 가지 않는다

2. Room의 참가자들은 동기화를 당하는 입장이 되어서
서버의 모든 행동이 웹앱에 영향을 준다

이 로직을 구현하기 위해 NetworkMusicController라는  
컴포넌트를 구현하였음

현재 버그가 있어 버그를 수정중에 있음

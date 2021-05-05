# 음악큐 동기화
음악을 동기화 되기 위해선 우선 먼저 Room의 방장을 정해야한다  
우선 Room의 첫번째로 들어간 유저가 방장이 되게끔 임시로 작성한다

그 후에 들어온 사람은 일반 유저로 방장이 곡을 바꾸게 되거나 일시정지 플레이를 하게 될시 영향을 받는다  

DB 구조 설계

Room  
-id  
-masterUid  
-musicQueue[] (Snippet)  
-musicState  
--index  
--isPlaying
  
Chat  
-rootId  
-uid  
-content  
-sendTime  

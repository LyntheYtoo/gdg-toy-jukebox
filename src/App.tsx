/** @jsxImportSource @emotion/react */
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { GlobalOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { key } from './google_apikey.json';
import { Divider } from 'antd';
import { flexCol, flexRow, inFlexCol, inFlexRow } from 'globalStyles';
import YouTube from 'react-youtube';
import PlayerPanel from 'components/PlayerPanel';
import MusicSearch from 'components/MusicSearch';
import MusicController from 'components/MusicController';
import PlayerQueue from 'components/PlayerQueue';

const QUERY_URL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&q=`;

function App() {
  const [resultItems, setResultItems] = useState<SearchItem[]>([]);

  const [musicQueue, setMusicQueue] = useState<SearchItem[]>([]);
  const [curMusicIdx, setCurMusicIdx] = useState<number>(0);
  const playerRef = useRef<YouTube>(null);

  const player = playerRef.current?.getInternalPlayer();

  useEffect(() => {
    if (musicQueue.length < 0) {
      setCurMusicIdx(0);
    }
  }, [musicQueue]);

  async function reqGetSearchResult(word: string) {
    if (word === '') return;

    const raw = await (await fetch(QUERY_URL + word)).json();
    setResultItems(raw.items as SearchItem[]);
  }

  return (
    <Layout css={{ minHeight: '100vh' }}>
      <Header
        css={{
          ...flexRow,
          justifyContent: 'space-between',
        }}>
        <div
          css={{
            fontSize: 32,
            color: 'white',
            ...inFlexRow,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}>
          gdgbox&nbsp;
          <div css={{ fontWeight: 10, maxLines: 1 }}>
            your social music player
          </div>
        </div>
        <div
          css={{
            fontSize: 32,
            fontWeight: 10,
            color: 'white',
            ...inFlexRow,
            alignItems: 'center',
          }}>
          <GlobalOutlined css={{ marginRight: 16 }} />
          gdgbox.today/test
        </div>
      </Header>

      <Content
        css={{
          ...flexRow,
          marginTop: 32,
          marginRight: 32,
          marginLeft: 32,
          justifyContent: 'space-around',
        }}>
        <div
          css={{
            flex: 9,
            ...flexCol,
            marginBottom: '7vh',
          }}>
          {/* PlayingInfo */}
          <PlayerPanel
            youtube={
              <YouTube
                ref={playerRef}
                videoId={musicQueue[curMusicIdx]?.id.videoId}
                opts={{
                  height: '210',
                  width: '240',
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                onReady={(event) => {
                  event.target.pauseVideo();
                }}
                onEnd={() => {
                  if (curMusicIdx + 1 < musicQueue.length) {
                    setCurMusicIdx(curMusicIdx + 1);
                  }
                }}
              />
            }
            title={
              musicQueue[curMusicIdx] !== undefined
                ? musicQueue[curMusicIdx]?.snippet.title
                : '음악을 골라주세요'
            }
          />
          <br />
          {/* PlayingQueue */}
          <PlayerQueue
            musicQueue={musicQueue}
            playMusic={(idx) => {
              setCurMusicIdx(idx);
              player.playVideo();
            }}
            removeMusic={(idx) => {
              const clone = musicQueue.concat();
              clone.splice(idx, 1);
              setMusicQueue(clone);
            }}
          />
        </div>

        {/* 디바이더 */}
        <Divider
          type="vertical"
          css={{ minHeight: '80vh', alignSelf: 'center' }}
        />
        {/* MusicSearch */}
        <div css={{ flex: 9 }}>
          <MusicSearch
            addMusic={(music) => {
              const clone = musicQueue.concat(music);
              setMusicQueue(clone);
            }}
            doSearch={(word) => {
              reqGetSearchResult(word);
            }}
            searchResultItems={resultItems}
          />
        </div>
      </Content>
      {/* 하단 재생 컨트롤러 */}
      <MusicController
        backwardMusic={() => {
          if (musicQueue.length === 0) return;

          if (0 <= curMusicIdx - 1) {
            setCurMusicIdx(curMusicIdx - 1);
          }
        }}
        forwardMusic={() => {
          if (musicQueue.length === 0) return;
 
          if (curMusicIdx + 1 < musicQueue.length) {
            setCurMusicIdx(curMusicIdx + 1);
          }
        }}
        playMusic={() => {
          if (musicQueue.length === 0) return;

          if (player) {
            player.playVideo();
          }
        }}
        pauseMusic={() => {
          if (musicQueue.length === 0) return;

          if (player) {
            player.pauseVideo();
          }
        }}
      />
    </Layout>
  );
}
export default App;

export interface SearchItem {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

export interface Id {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface Thumbnails {
  default: ImageMeta;
  medium: ImageMeta;
  high: ImageMeta;
}

export interface ImageMeta {
  url: string;
  width: number;
  height: number;
}

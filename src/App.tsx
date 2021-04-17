/** @jsxImportSource @emotion/react */
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import {
  CaretRightOutlined,
  CloseOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  GlobalOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { key } from './google_apikey.json';
import { Divider } from 'antd';
import { flexCol, flexRow, inFlexCol, inFlexRow } from 'globalStyles';
import YouTube from 'react-youtube';

const QUERY_URL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&q=`;

function App() {
  const [resultItems, setResultItems] = useState<SearchItem[]>();
  const [searchWord, setSearchWord] = useState('');
  const [musicQueue, setMusicQueue] = useState<SearchItem[]>([]);
  const [curMusicIdx, setCurMusicIdx] = useState<number>(0);
  const playerRef = useRef<YouTube>(null);

  const player = playerRef.current?.getInternalPlayer();

  useEffect(() => {
    if (musicQueue.length < 0) {
      setCurMusicIdx(0);
    }
  }, [musicQueue]);

  async function reqGetSearchResult() {
    if (searchWord === '') return;

    const raw = await (await fetch(QUERY_URL + searchWord)).json();
    setResultItems(raw.items as SearchItem[]);
  }

  const renderedSearchList =
    resultItems &&
    resultItems.map((item) => {
      return (
        <div
          css={{
            ...flexCol,
            justifyContent: 'center',
            padding: 16,
          }}>
          <div
            css={{
              ...inFlexRow,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <img src={item.snippet.thumbnails.medium.url} alt="썸네일" />
            <button
              css={{
                marginLeft: 16,
              }}
              onClick={() => {
                const clone = musicQueue.concat(item);
                setMusicQueue(clone);
              }}>
              추가
            </button>
          </div>

          {item.snippet.title}
        </div>
      );
    });

  const renderedPlayQueue = musicQueue.map((e, index) => {
    return (
      <p
        css={{
          ...inFlexRow,
          alignItems: 'center',
          fontSize: 20,
        }}>
        <CaretRightOutlined
          onClick={() => {
            setCurMusicIdx(index);
            player.playVideo();
          }}
        />
        &nbsp;&nbsp;{e.snippet.title}&nbsp;&nbsp;00:00&nbsp;&nbsp;
        <CloseOutlined
          onClick={() => {
            const clone = musicQueue.concat();
            clone.splice(index, 1);
            setMusicQueue(clone);
          }}
        />
      </p>
    );
  });

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
        {/* 플레이 큐 */}
        <div
          css={{
            flex: 9,
            ...flexCol,
            justifyContent: 'space-between',
          }}>
          <div
            css={{
              ...flexCol,
              marginBottom: '7vh'
            }}>
            <div
              css={{
                ...inFlexRow,
                alignItems: 'center',
              }}>
              {/* <img
                src={'http://ipsumimage.appspot.com/240x210'}
                alt="youtube thumbnail"
              /> */}
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

              <h2 css={{ marginLeft: 16 }}>
                {musicQueue[curMusicIdx] !== undefined
                  ? musicQueue[curMusicIdx]?.snippet.title
                  : '음악을 골라주세요'}
              </h2>
            </div>

            <br />
            {renderedPlayQueue}
          </div>
        </div>

        {/* 디바이더 */}
        <Divider
          type="vertical"
          css={{ minHeight: '80vh', alignSelf: 'center' }}
        />

        {/* 유튜브 검색 창 */}
        <div
          css={{
            ...flexCol,
            flex: 9,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <div
            css={{
              ...inFlexRow,
              minWidth: '40vw',
              justifyContent: 'center',
            }}>
            <input
              type="text"
              onChange={(e) => {
                const tmp = e.target.value.trim();
                setSearchWord(tmp);
              }}
            />
            <button
              css={{ marginLeft: 32 }}
              onClick={() => reqGetSearchResult()}>
              검색
            </button>
          </div>

          <div
            css={{
              ...inFlexCol,
              marginTop: 32,
              alignItems: 'center',

              marginBottom: 80
            }}>
            {renderedSearchList && (
              <p>
                <strong>검색 결과</strong>
              </p>
            )}
            {renderedSearchList}
          </div>
        </div>
      </Content>
      {/* 하단 재생 컨트롤러 */}
      <div
        css={{
          backgroundColor: 'lightgreen',
          minHeight: 80,
          position: 'fixed',
          minWidth: '100%',
          bottom: 0,

          ...flexRow,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastBackwardOutlined
          css={{
            marginRight: 16,
            fontSize: 32,
          }}
          onClick={() => {
            if (0 <= curMusicIdx - 1) {
              setCurMusicIdx(curMusicIdx - 1);
            }
          }}
        />
        <CaretRightOutlined
          css={{
            marginRight: 16,
            fontSize: 32,
          }}
          onClick={() => {
            if (player) {
              player.playVideo();
            }
          }}
        />
        <PauseOutlined
          css={{
            marginRight: 16,
            fontSize: 32,
          }}
          onClick={() => {
            if (player) {
              player.pauseVideo();
            }
          }}
        />
        <FastForwardOutlined
          css={{
            fontSize: 32,
          }}
          onClick={() => {
            if (curMusicIdx + 1 < musicQueue.length) {
              setCurMusicIdx(curMusicIdx + 1);
            }
          }}
        />
      </div>
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

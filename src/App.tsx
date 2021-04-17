/** @jsxImportSource @emotion/react */
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import {
  CaretRightOutlined,
  CloseOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import './App.css';
import { key } from './google_apikey.json';
import { Divider } from 'antd';
import { flexCol, flexRow, inFlexCol, inFlexRow } from 'globalStyles';
import YouTube from 'react-youtube';

const QUERY_URL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&q=`;

function App() {
  const [resultItems, setResultItems] = useState<YoutubeItem[]>();
  const [searchWord, setSearchWord] = useState('');
  const [playQueue, setPlayQueue] = useState<YoutubeItem[]>([]);
  const [curMusicIdx, setCurMusicIdx] = useState<number>(0);
  const playerRef = useRef<YouTube>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  async function reqGetSearchResult() {
    if (searchWord === '') return;

    const raw = await (await fetch(QUERY_URL + searchWord)).json();
    setResultItems(raw.items as YoutubeItem[]);
  }

  const player = playerRef.current?.getInternalPlayer();

  const renderedSearchList =
    resultItems &&
    resultItems.map((item) => {
      return (
        <p
          css={{
            ...flexCol,
            justifyContent: 'center',
          }}>
          <div
            css={{
              ...flexRow,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <img src={item.snippet.thumbnails.medium.url} alt="썸네일" />
            <button
              css={{
                marginLeft: 16,
              }}
              onClick={() => {
                const clone = playQueue.concat(item);
                setPlayQueue(clone);
              }}>
              추가
            </button>
          </div>

          {item.snippet.title}
        </p>
      );
    });

  const renderedPlayQueue = playQueue.map((e, index) => {
    return (
      <p
        css={{
          ...inFlexRow,
          alignItems: 'center',
          fontSize: 20,
        }}>
        <CaretRightOutlined onClick={() => setCurMusicIdx(index)} />
        &nbsp;&nbsp;{e.snippet.title}&nbsp;&nbsp;00:00&nbsp;&nbsp;
        <CloseOutlined
          onClick={() => {
            const clone = playQueue.concat();
            clone.splice(index, 1);
            setPlayQueue(clone);
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
              {/* {curMusicIdx ? ( */}
                <>
                  <YouTube
                    ref={playerRef}
                    videoId={playQueue[curMusicIdx]?.id.videoId}
                    opts={{
                      height: '210',
                      width: '240',
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                      },
                    }}
                    onReady={(event) => {
                      event.target.pauseVideo();
                    }}
                  />

                  <h2 css={{ marginLeft: 16 }}>유튜브 제목</h2>
                </>
              {/* ) : (
                <>
                  <div
                    css={{
                      height: 210,
                      width: 240,
                      ...flexCol,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'gray',
                    }}></div>
                  <h2 css={{ marginLeft: 16 }}>음악을 선택해주세요</h2>
                </>
              )} */}
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
      <Footer
        css={{
          ...flexRow,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgreen',
          minHeight: '7vh',
        }}>
        <FastBackwardOutlined
          css={{
            marginRight: 16,
            fontSize: 32,
          }}
        />
        <CaretRightOutlined
          css={{
            marginRight: 16,
            fontSize: 32,
          }}
          onClick={() => {
            if (player) {
              isPlaying ? player.pauseVideo() : player.playVideo();
            }
          }}
        />
        <FastForwardOutlined
          css={{
            fontSize: 32,
          }}
        />
      </Footer>
    </Layout>
  );
}
export default App;

export interface YoutubeItem {
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

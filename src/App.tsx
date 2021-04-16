/** @jsxImportSource @emotion/react */
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import {
  CaretRightOutlined,
  CloseOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import './App.css';
import { key } from './google_apikey.json';
import { Divider } from 'antd';
import { flexCol, flexRow, inFlexCol, inFlexRow } from 'globalStyles';

const QUERY_URL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&q=`;

function App() {
  const [resultItems, setResultItems] = useState<YoutubeItem[]>();
  const [searchWord, setSearchWord] = useState('');
  const [playQueue, setPlayQueue] = useState<YoutubeItem[]>([]);

  async function reqGetSearchResult() {
    if (searchWord === '') return;

    const raw = await (await fetch(QUERY_URL + searchWord)).json();
    setResultItems(raw.items as YoutubeItem[]);
    console.log(raw.items as YoutubeItem[]);
  }

  const renderedYoutubeList =
    resultItems &&
    resultItems.map((item) => {
      return (
        <div
          css={{
            ...flexRow,
            alignItems: 'center',
          }}>
          <p
            css={{
              ...flexCol,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={item.snippet.thumbnails.medium.url} alt="썸네일" />
            {item.snippet.title}
          </p>
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
        <CaretRightOutlined />
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
              <img
                src={'http://ipsumimage.appspot.com/240x210'}
                alt="youtube thumbnail"
              />
              <h2 css={{ marginLeft: 16 }}>유튜브 제목</h2>
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
            {renderedYoutubeList && (
              <p>
                <strong>검색 결과</strong>
              </p>
            )}
            {renderedYoutubeList}
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

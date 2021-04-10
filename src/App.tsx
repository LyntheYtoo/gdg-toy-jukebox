/** @jsxImportSource @emotion/react */
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import {
  CaretRightOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import './App.css';
import { key } from './google_apikey.json';
import { Divider } from 'antd';

const QUERY_URL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&q=`;

function App() {
  const [resultItems, setResultItems] = useState<YoutubeItem[]>();
  const [searchWord, setSearchWord] = useState('');

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
        <p
          className="flex-col"
          css={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={item.id.videoId}>
          <img
            src={item.snippet.thumbnails.medium.url}
            alt="썸네일"
          />
          {item.snippet.title}
        </p>
      );
    });

  return (
    <Layout css={{ minHeight: '100vh' }}>
      <Header
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <div
          css={{
            fontSize: 32,
            color: 'white',
            display: 'inline-flex',
            flexDirection: 'row',
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
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <GlobalOutlined css={{ marginRight: 16 }} />
          gdgbox.today/test
        </div>
      </Header>

      <Content
        className="flex-row"
        css={{
          marginTop: 32,
          marginRight: 32,
          marginLeft: 32,
          justifyContent: 'space-around',
        }}>
        {/* 플레이 큐 */}
        <div
          css={{
            flex: 9,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <div
              css={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <img
                src={'http://ipsumimage.appspot.com/240x210'}
                alt="youtube thumbnail"
              />
              <h2 css={{ marginLeft: 16 }}>유튜브 제목</h2>
            </div>

            <br />
            <p
              css={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 20,
              }}>
              노래 제목 1&nbsp;&nbsp;00:00&nbsp;&nbsp;
              <CaretRightOutlined />
            </p>
            <p
              css={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 20,
              }}>
              노래 제목 2&nbsp;&nbsp;00:00&nbsp;&nbsp;
              <CaretRightOutlined />
            </p>
            <p
              css={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 20,
              }}>
              노래 제목 3&nbsp;&nbsp;00:00&nbsp;&nbsp;
              <CaretRightOutlined />
            </p>
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
            flex: 9,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <div
            css={{
              minWidth: '40vw',
              display: 'inline-flex',
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
            className="in-flex-col"
            css={{
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
        className="flex-row"
        css={{
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

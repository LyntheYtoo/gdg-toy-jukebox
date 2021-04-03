/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import './App.css';

const QUERY_URL =
  'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAbLRcnIBkSFu91sj8RHplTto9udMA9tKs&part=snippet&type=video&q=';

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
        <p key={item.id.videoId}>
          <img src={item.snippet.thumbnails.medium.url} alt="썸네일" />
          <br />
          {item.snippet.title}
        </p>
      );
    });

  return (
    <div
      className="App"
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: 'lightblue',
        padding: 16,
      }}>
      <h1>유튜브 검색리스트</h1>

      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <input
          type="text"
          onChange={(e) => {
            const tmp = e.target.value.trim();
            setSearchWord(tmp);
          }}
        />
        <button css={{ marginLeft: 32 }} onClick={() => reqGetSearchResult()}>
          검색
        </button>
      </div>

      <p
        css={{
          marginTop: 64,
        }}>
        {renderedYoutubeList && <strong>검색 결과</strong>}
        {renderedYoutubeList}
      </p>
    </div>
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

/** @jsxImportSource @emotion/react */

import { Button, Input } from 'antd';
import Search from 'antd/lib/input/Search';
import { SearchItem } from 'App';
import { flexCol, inFlexCol, inFlexRow } from 'globalStyles';
import { useState } from 'react';

interface Props {
  searchResultItems: SearchItem[];
  addMusic: (music: SearchItem) => void;
  doSearch: (word: string) => void;
}
const MusicSearch = (props: Props) => {
  const renderedSearchList =
    props.searchResultItems &&
    props.searchResultItems.map((item) => {
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
                // const clone = musicQueue.concat(item);
                // setMusicQueue(clone);
                props.addMusic(item);
              }}>
              추가
            </button>
          </div>

          {item.snippet.title}
        </div>
      );
    });

  /* 유튜브 검색 창 */
  return (
    <div
      css={{
        ...flexCol,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <div
        css={{
          ...inFlexRow,
          minWidth: '40vw',
          justifyContent: 'center',
        }}>
        <Search
          // placeholder="input search text"
          css={{
            width: 360,
          }}
          allowClear
          enterButton="검색"
          size="large"
          onSearch={(value) => props.doSearch(value)}
        />
      </div>

      <div
        css={{
          ...inFlexCol,
          marginTop: 32,
          alignItems: 'center',

          marginBottom: 80,
        }}>
        {renderedSearchList.length !== 0 && (
          <p>
            <strong>검색 결과</strong>
          </p>
        )}
        {renderedSearchList}
      </div>
    </div>
  );
};
export default MusicSearch;

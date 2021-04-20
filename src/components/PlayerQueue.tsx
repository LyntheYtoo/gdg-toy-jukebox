/** @jsxImportSource @emotion/react */

import { CaretRightOutlined, CloseOutlined } from '@ant-design/icons';
import { SearchItem } from 'App';
import { flexCol, inFlexRow } from 'globalStyles';

interface Props {
  musicQueue: SearchItem[];
  playMusic: (idx: number) => void;
  removeMusic: (idx: number) => void;
}
const PlayerQueue = (props: Props) => {
  const renderedPlayQueue = props.musicQueue.map((e, index) => {
    return (
      <p
        css={{
          ...inFlexRow,
          alignItems: 'center',
          fontSize: 20,
        }}>
        <CaretRightOutlined
          onClick={() => {
            props.playMusic(index);
            // setCurMusicIdx(index);
            // player.playVideo();
          }}
        />
        &nbsp;&nbsp;{e.snippet.title}&nbsp;&nbsp;00:00&nbsp;&nbsp;
        <CloseOutlined
          onClick={() => {
            props.removeMusic(index);
            // const clone = musicQueue.concat();
            // clone.splice(index, 1);
            // setMusicQueue(clone);
          }}
        />
      </p>
    );
  });

  return (
    <div
      css={{
        ...flexCol,
      }}>
      {renderedPlayQueue}
    </div>
  );
};
export default PlayerQueue;

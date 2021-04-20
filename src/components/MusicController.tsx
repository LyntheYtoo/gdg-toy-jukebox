/** @jsxImportSource @emotion/react */

import { CaretRightOutlined, FastBackwardOutlined, FastForwardOutlined, PauseOutlined } from "@ant-design/icons";
import { flexRow } from "globalStyles";

interface Props {
  playMusic: () => void;
  pauseMusic: () => void;
  backwardMusic: () => void;
  forwardMusic: () => void;
}
const MusicController = (props: Props) => {
  return (
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
            // if (0 <= curMusicIdx - 1) {
            //   setCurMusicIdx(curMusicIdx - 1);
            // }
            props.backwardMusic();
          }}
        />
        <CaretRightOutlined
          css={{
            marginRight: 16,
            fontSize: 32,
          }}
          onClick={() => {
            // if (player) {
            //   player.playVideo();
            // }
            props.playMusic();
          }}
        />
        <PauseOutlined
          css={{
            marginRight: 16,
            fontSize: 32,
          }}
          onClick={() => {
            // if (player) {
            //   player.pauseVideo();
            // }
            props.pauseMusic();
          }}
        />
        <FastForwardOutlined
          css={{
            fontSize: 32,
          }}
          onClick={() => {
            // if (curMusicIdx + 1 < musicQueue.length) {
            //   setCurMusicIdx(curMusicIdx + 1);
            // }
            props.forwardMusic();
          }}
        />
      </div>
  )
}
export default MusicController;
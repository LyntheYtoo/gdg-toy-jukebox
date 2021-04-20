/** @jsxImportSource @emotion/react */

import { inFlexRow } from 'globalStyles';
import { ReactElement } from 'react';

interface Props {
  youtube: ReactElement;
  title: string;
}
const PlayerPanel = (props: Props) => {
  return (
    <div
      css={{
        ...inFlexRow,
        alignItems: 'center',
      }}>
      {/* 유튜브 */}
      {props.youtube}
      <h2 css={{ marginLeft: 16 }}>{props.title}</h2>
    </div>
  );
};
export default PlayerPanel;

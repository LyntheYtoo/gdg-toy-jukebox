/** @jsxImportSource @emotion/react */

import Search from 'antd/lib/input/Search';
import { flexRow } from 'globalStyles';
import { useState } from 'react';

interface Props {
  roomId: string | undefined;
  setRoomId: (id: string) => void;
}
const RoomSearch = (props: Props) => {
  const [value, setValue] = useState(props.roomId);

  return (
    <Search
      // placeholder="input search text"
      css={{
        width: 360,
      }}
      allowClear
      enterButton="검색"
      size="large"
      value={value}
      onChange={e => setValue(e.target.value)}
      onSearch={value => props.setRoomId(value)}
    />
  );
};
export default RoomSearch;

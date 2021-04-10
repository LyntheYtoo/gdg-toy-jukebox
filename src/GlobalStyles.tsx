/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <div>
      <Global
        styles={{
          '.flex-row': {
            display: 'flex',
            flexDirection: 'row',
          },
          '.flex-col': {
            display: 'flex',
            flexDirection: 'column',
          },
          '.in-flex-row': {
            display: 'inline-flex',
            flexDirection: 'row',
          },
          '.in-flex-col': {
            display: 'inline-flex',
            flexDirection: 'column',
          },
        }}
      />
    </div>
  );
};
export default GlobalStyles;

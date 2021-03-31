/** @jsxImportSource @emotion/react */
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div
      className="App"
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: 'lightcyan',
      }}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
      <div css={{backgroundColor: 'lightsalmon', alignSelf: 'stretch'}}>
        아 제발
        <div css={{alignSelf: 'center'}}>wwmlsafas</div>
      </div>
      <div>wwmlsafas</div>

      <ul
        css={{
          backgroundColor: 'lightpink',
        }}>
        <li>aaaa</li>
        <li>bbbb</li>
        <li>cccc</li>
        <li>dddd</li>
      </ul>
      <ul
        css={{
          backgroundColor: 'lightpink',
        }}>
        <li>aaaa</li>
        <li>bbbb</li>
        <li>cccc</li>
        <li>dddd</li>
      </ul>
    </div>
  );
}

export default App;

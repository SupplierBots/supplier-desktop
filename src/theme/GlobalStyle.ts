import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Lato:100,200,300,400&display=swap");
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-app-region: no-drag;
  }

  html {
    /* 16px * 62.5% = 10px = 1rem */
    font-size: 62.5%;
  }

  body {
    font-family: "Lato", sans-serif;
    overflow: hidden;
  }

  a,
  a:hover {
    text-decoration: none;
    -webkit-user-drag: none;
  }

`;

export default GlobalStyle;

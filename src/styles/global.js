import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body, input, button {
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto' sans-serif;
    font-size: 14px;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

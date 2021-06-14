import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Titillium Web', sans-serif;
    font-size: 16px;
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyle;

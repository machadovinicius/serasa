import { createGlobalStyle } from 'styled-components';
import backgroundHeader from './assets/header-bg.png';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    background-image: url(${backgroundHeader});
    background-color: #ebecee;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% 350px;
  }
`;

export default GlobalStyle;

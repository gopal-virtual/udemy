import React from "react";
import { createGlobalStyle } from "styled-components";

import "./font.css";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: '"Roboto", sans-serif'
    }
`;

function Provider({ children }) {
  return (
    <React.Fragment>
      {children}
      <GlobalStyle />
    </React.Fragment>
  );
}

export default Provider;

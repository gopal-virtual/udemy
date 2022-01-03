import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Theme from "./theme";

import "./font.css";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: '"Roboto", sans-serif'
    }
`;

function Provider({ children, mode = "light" }) {
  const [localMode, setLocalMode] = React.useState(mode);

  React.useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setLocalMode(e.matches ? "dark" : "light");
      });
  }, []);

  return (
    <ThemeProvider theme={{ colors: Theme.colors[localMode] }}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default Provider;

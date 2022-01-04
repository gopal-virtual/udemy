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
  const handleModeChange = React.useCallback((e) => {
    setLocalMode(e.matches ? "dark" : "light");
  });

  React.useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleModeChange);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleModeChange);
  }, []);

  return (
    <ThemeProvider theme={{ colors: Theme.colors[localMode] }}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default Provider;

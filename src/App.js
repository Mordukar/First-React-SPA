import { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { Routes } from "./components/Routes";
import "./App.css";
import { ThemeContext } from "./utils/ThemeContext";
import { store } from "./store";
import { Container } from '@material-ui/core';

function App() {
  const [theme, setTheme] = useState("light");

  const changeTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <Container>
          <Routes />
        </Container>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;

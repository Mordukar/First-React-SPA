import { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { Routes } from "./components/Routes";
import "./App.css";
import { ThemeContext } from "./utils/ThemeContext";
import { persistor, store } from "./store";
import { Container } from '@material-ui/core';
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const [theme, setTheme] = useState("light");

  const changeTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeContext.Provider value={{ theme, changeTheme }}>
          <Container>
            <Routes />
          </Container>
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;

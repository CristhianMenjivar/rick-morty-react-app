import React from "react";
import "./App.css";
import Routes from "./Routes";

import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Header from "./components/Header";

// graphql cliente
const clientePollo = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
});

const Apollo = ({ children }) => (
  <ApolloProvider client={clientePollo}>{children}</ApolloProvider>
);

const App = () => {
  return (
    <Apollo>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </Provider>
    </Apollo>
  );
};

export default App;

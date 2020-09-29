import React from "react";
import "./App.css";
import { GamesProvider } from "./components/contexts/GamesContext";
import GamesList from "./components/GamesList";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import DateFilter from "./components/DateFilter";
import Pagination from "./components/Pagination";
import Header from "./Header";

function App() {
  return (
    <GamesProvider>
      <Header />
      <div className="App">
        <SearchBar />
        <Filters />
        <DateFilter />
        <GamesList />
        <Pagination />
      </div>
    </GamesProvider>
  );
}

export default App;

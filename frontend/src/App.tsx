// Importy potřebných knihoven a komponent
import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css"; // Import stylů
import CardList from "./Components/CardList/CardList"; // Import komponenty pro zobrazení seznamu společností
import Search from "./Components/Search/Search"; // Import vyhledávací komponenty
import { CompanySearch } from "./company"; // Import typu pro vyhledávání společností
import { searchCompanies } from "./api"; // Import funkce pro vyhledávání společností
import ListPortfolio from "./Components/Portfolio/ListPortfolio/ListPortfolio";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";

// Hlavní komponenta aplikace
function App() {
  // Stavy pro uchování vyhledávacího řetězce, výsledků vyhledávání a chybových zpráv serveru
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);

  // Funkce pro aktualizaci vyhledávacího řetězce podle uživatelského vstupu
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Funkce pro vytvoření portfolia (zatím neimplementováno)
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exist = portfolioValues.find((value) => value === e.target[0].value);
    if (exist) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  };

  // Funkce pro zpracování kliknutí na tlačítko vyhledávání
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault(); // Zamezení výchozího chování formuláře
    const result = await searchCompanies(search); // Vyvolání vyhledávání
    if (typeof result === "string") {
      // Zpracování chybové zprávy
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      // Zpracování úspěšně načtených dat
      setSearchResults(result.data);
    }
    console.log(searchResults); // Logování výsledků (pro ladění)
  };

  // Vykreslení komponenty
  return (
    <div className="App">
      <Navbar />
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResults}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <h1>{serverError}</h1>}
    </div>
  );
}

export default App; // Export komponenty pro použití v jiných částech aplikace

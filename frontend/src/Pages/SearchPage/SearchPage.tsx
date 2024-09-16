import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';

interface Props {}

const SearchPage = (props: Props) => {
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

export default SearchPage
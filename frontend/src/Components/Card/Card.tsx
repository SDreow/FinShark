// Importy potřebných knihoven a komponent
import React from "react"; // Import Reactu pro vytváření komponent
import "./Card.css"; // Import CSS stylů pro tuto komponentu
import { CompanySearch } from "../../company"; // Import typu CompanySearch pro práci s daty společností
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio"; // Import komponenty AddPortfolio

// Definice rozhraní pro props přijímané komponentou Card
interface Props {
  id: string; // ID společnosti
  searchResult: CompanySearch; // Výsledek vyhledávání společnosti
  onPortfolioCreate: (e: React.SyntheticEvent) => void; // Funkce pro vytvoření portfolia
}

// Komponenta Card pro zobrazení informací o společnosti
const Card: React.FC<Props> = ({ id, searchResult, onPortfolioCreate}: Props): JSX.Element => {
  // Vykreslení komponenty
  return (
    <div className="card">
      <img alt="company logo" />
      <div className="details">
        <h2>
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p>${searchResult.currency}</p>
      </div>
      <p className="info">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate} // Propojení s funkcí pro vytvoření portfolia
        symbol={searchResult.symbol} // Symbol společnosti
      />
    </div>
  );
};

export default Card; // Export komponenty pro její použití v jiných částech aplikace
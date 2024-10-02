import React, { useEffect, useState } from "react";
import { CompanyBalanceSheet, CompanyCashFlow } from "../../company";
import { useOutletContext } from "react-router";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";

type Props = {};

const config = [
    {
      Label: <div className="font-bold">Total Assets</div>,
      render: (company: CompanyBalanceSheet) => company.totalAssets,
    },
    {
      Label: "Current Assets",
      render: (company: CompanyBalanceSheet) => company.totalCurrentAssets,
    },
    {
      Label: "Total Cash",
      render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
    },
    {
      Label: "Property & equipment",
      render: (company: CompanyBalanceSheet) => company.propertyPlantEquipmentNet,
    },
    {
      Label: "Intangible Assets",
      render: (company: CompanyBalanceSheet) => company.intangibleAssets,
    },
    {
      Label: "Long Term Debt",
      render: (company: CompanyBalanceSheet) => company.longTermDebt,
    },
    {
      Label: "Total Debt",
      render: (company: CompanyBalanceSheet) => company.otherCurrentLiabilities,
    },
    {
      Label: <div className="font-bold">Total Liabilites</div>,
      render: (company: CompanyBalanceSheet) => company.totalLiabilities,
    },
    {
      Label: "Current Liabilities",
      render: (company: CompanyBalanceSheet) => company.totalCurrentLiabilities,
    },
    {
      Label: "Long-Term Debt",
      render: (company: CompanyBalanceSheet) => company.longTermDebt,
    },
    {
      Label: "Long-Term Income Taxes",
      render: (company: CompanyBalanceSheet) => company.otherLiabilities,
    },
    {
      Label: "Stakeholder's Equity",
      render: (company: CompanyBalanceSheet) => company.totalStockholdersEquity,
    },
    {
      Label: "Retained Earnings",
      render: (company: CompanyBalanceSheet) => company.retainedEarnings,
    },
  ];

const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();
  useEffect(() => {
    const getData = async () => {
      const value = await getBalanceSheet(ticker!);
      setBalanceSheet(value?.data[0]);
    };
    getData();
  }, []);
  return (
    <>
      {balanceSheet ? (
        <RatioList config={config} data={balanceSheet} />
      ) : (
        <h1>Company not found!</h1>
      )}
    </>
  );
};

export default BalanceSheet;

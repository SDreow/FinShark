import React, { useEffect, useState } from "react";
import { CompanyCashFlow } from "../../company";
import { useOutletContext } from "react-router";
import { getCashFlowStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormating";

type Props = {};

const config = [
  {
    Label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    Label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    Label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
  },
  {
    Label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(
        company.netCashUsedProvidedByFinancingActivities
      ),
  },
  {
    Label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    Label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    Label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssued),
  },
  {
    Label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashFlowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashflowData, setCashFlow] = useState<CompanyCashFlow[]>();
  useEffect(() => {
    const fetchCashFlow = async () => {
      const result = await getCashFlowStatement(ticker!);
      setCashFlow(result!.data);
    };
    fetchCashFlow();
  }, []);
  return cashflowData ? (
    <Table config={config} data={cashflowData} />
  ) : (
    <Spinner />
  );
};

export default CashFlowStatement;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Models;

namespace api.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock sotckModel)
        {
            return new StockDto
            {
                Id = sotckModel.Id,
                Symbol = sotckModel.Symbol,
                CompanyName = sotckModel.CompanyName,
                Purchase = sotckModel.Purchase,
                LastDiv = sotckModel.LastDiv,
                Industry = sotckModel.Industry,
                MarketCap = sotckModel.MarketCap
            };
        }
    }
}
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ClientData from "../models/ClientData"
import { clientDataReducer, currencyReducer, exchangeDataReducer, popularCurrencyReducer } from "./reducers"
import { ExchangeData } from "../models/ExchangeRateData"
import CurrencyModel from "../models/CurrencyModel"


export type StateType = {
    clientData: ClientData,
    exchangeData: ExchangeData[],
    currencies: CurrencyModel[],
    popularCurrencies: CurrencyModel[]
}

const reducer = combineReducers<StateType> ({
   clientData: clientDataReducer as any,
   exchangeData: exchangeDataReducer as any,
   currencies: currencyReducer as any,
   popularCurrencies: popularCurrencyReducer as any,
})

export const store = configureStore({reducer,
     middleware: (getMiddleware) => getMiddleware({
         serializableCheck: false
    })
})
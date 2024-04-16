import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ClientData from "../models/ClientData"
import { clientDataReducer, currencyReducer, exchangeDataReducer, popularCurrencyReducer, profileReducer, realTimeDataReducer } from "./reducers"
import { ExchangeData } from "../models/ExchangeRateData"
import CurrencyModel from "../models/CurrencyModel"
import ProfileData from "../models/ProfileData"
import RealExchangeDataModel from "../models/RealExchangeDataModel"


export type StateType = {
    clientData: ClientData,
    profileData: ProfileData,
    exchangeData: ExchangeData[],
    currencies: CurrencyModel[],
    popularCurrencies: CurrencyModel[],
    realTimeData: RealExchangeDataModel[] 
}

const reducer = combineReducers<StateType> ({
    clientData: clientDataReducer as any,
    profileData: profileReducer as any,
    exchangeData: exchangeDataReducer as any,
    currencies: currencyReducer as any,
    popularCurrencies: popularCurrencyReducer as any,
    realTimeData: realTimeDataReducer as any
})

export const store = configureStore({reducer,
     middleware: (getMiddleware) => getMiddleware({
         serializableCheck: false
    })
})
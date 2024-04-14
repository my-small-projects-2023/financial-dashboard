import { PayloadAction } from "@reduxjs/toolkit";
import ClientData from "../models/ClientData";
import { ExchangeData } from "../models/ExchangeRateData";
import CurrencyModel from "../models/CurrencyModel";

export const AUTH_ACTION = "auth";
export const EXCHANGE_DATA_ACTION = "exchangedata/set"
export const CURRENCIES_ACTION = "currencies"
export const POPULAR_CURRENCIES_ACTION = "popular-currencies"


export function authAction(clientData: ClientData): PayloadAction<ClientData> {
    return {payload: clientData, type: AUTH_ACTION};
}

export function setExchangeData(exchangeData: ExchangeData[]): PayloadAction<ExchangeData[]> {
    return {payload: exchangeData, type: EXCHANGE_DATA_ACTION};
}

export function setCurrencies(currencies: CurrencyModel[]): PayloadAction<CurrencyModel[]> {
    return {payload: currencies, type: CURRENCIES_ACTION};
}

export function setPopularCurrencies(popularCurrencies: CurrencyModel[]): PayloadAction<CurrencyModel[]> {
    return {payload: popularCurrencies, type: POPULAR_CURRENCIES_ACTION};
}


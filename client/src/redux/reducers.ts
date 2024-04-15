import { Reducer } from "react";
import ClientData, { emptyClientData } from "../models/ClientData";
import { PayloadAction } from "@reduxjs/toolkit";
import { AUTH_ACTION, CURRENCIES_ACTION, EXCHANGE_DATA_ACTION, POPULAR_CURRENCIES_ACTION, UPDATE_PROFILE_ACTION } from "./actions";
import { ExchangeData } from "../models/ExchangeRateData";
import CurrencyModel from "../models/CurrencyModel";
import { CLIENT_DATA_ITEM } from "../components/services/AuthServiceImpl";
import ProfileData, { emptyProfileData } from "../models/ProfileData";

export const clientDataReducer: Reducer<ClientData, PayloadAction<ClientData>> = 
(clientData = localStorage.getItem(CLIENT_DATA_ITEM)?
 JSON.parse(localStorage.getItem(CLIENT_DATA_ITEM) as string) : emptyClientData, action): ClientData => {
   
    if (action.type === AUTH_ACTION) {
        localStorage.setItem(CLIENT_DATA_ITEM, JSON.stringify(action.payload));
        return action.payload;
    }
    return clientData;
}

export const profileReducer: Reducer<ProfileData, PayloadAction<ProfileData>> = 
(profileData = emptyProfileData, action): ProfileData => {
    if (action.type === UPDATE_PROFILE_ACTION) {
        return action.payload;
    }
    return profileData;
}

export const exchangeDataReducer: Reducer<ExchangeData[], PayloadAction<ExchangeData[]>> = 
    (exchangeData = [], action): ExchangeData[] => {
        return action.type === EXCHANGE_DATA_ACTION ? action.payload : exchangeData;
}

export const currencyReducer: Reducer<CurrencyModel[], PayloadAction<CurrencyModel[]>> = 
    (currencies = [], action): CurrencyModel[] => {
        return action.type === CURRENCIES_ACTION ? action.payload : currencies;
}

export const popularCurrencyReducer: Reducer<CurrencyModel[], PayloadAction<CurrencyModel[]>> = 
    (popularCurrencies = [], action): CurrencyModel[] => {
        return action.type === POPULAR_CURRENCIES_ACTION ? action.payload : popularCurrencies;
}

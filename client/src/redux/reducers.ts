import { Reducer } from "react";
import ClientData, { emptyClientData } from "../models/ClientData";
import { PayloadAction } from "@reduxjs/toolkit";
import { AUTH_ACTION } from "./actions";



export const CLIENT_DATA_ITEM = "client-data"

export const clientDataReducer: Reducer<ClientData, PayloadAction<ClientData>> = 
(clientData = localStorage.getItem(CLIENT_DATA_ITEM)?
 JSON.parse(localStorage.getItem(CLIENT_DATA_ITEM) as string) : emptyClientData, action): ClientData => {
   
    if (action.type === AUTH_ACTION) {
        localStorage.setItem(CLIENT_DATA_ITEM, JSON.stringify(action.payload));
        return action.payload;
    }
    return clientData;
}
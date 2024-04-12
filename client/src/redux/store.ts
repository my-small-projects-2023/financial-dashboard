import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ClientData from "../models/ClientData"
import { clientDataReducer } from "./reducers"


export type StateType = {
    clientData: ClientData,
}
const reducer = combineReducers<StateType> ({
   clientData: clientDataReducer as any,
})
export const store = configureStore({reducer,
     middleware: (getMiddleware) => getMiddleware({
         serializableCheck: false
     })})
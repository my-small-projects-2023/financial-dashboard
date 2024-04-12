import { PayloadAction } from "@reduxjs/toolkit";
import ClientData from "../models/ClientData";

export const AUTH_ACTION = "auth";

export function authAction(clientData: ClientData): PayloadAction<ClientData> {
    return {payload: clientData, type: AUTH_ACTION};
}
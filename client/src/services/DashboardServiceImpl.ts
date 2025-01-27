import axios from "axios";
import DashBoardService from "./interfaces/DashboardService";
import { CLIENT_DATA_ITEM } from "./AuthServiceImpl";
import ClientData, { emptyClientData } from "../models/ClientData";
import testData from '../config/test-data.json'

  
export const DEFAULT_BASE_CURRENCY = 'USD'

class DashboardServiceImpl implements DashBoardService {


    baseUrl: string

    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }

    async getCurrenciesList(): Promise<any> {
        const clientDataString = localStorage.getItem(CLIENT_DATA_ITEM);
        const clientData: ClientData = clientDataString ? JSON.parse(clientDataString) : emptyClientData;
        return axios.get(`${this.baseUrl}/currency`, {
            headers: {
                Authorization: `Bearer ${clientData.token}`
            }
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err.message)
            return null
        })
    }

    async getExchangeRate(period: string, base: string, target: string): Promise<any> {
        const clientDataString = localStorage.getItem(CLIENT_DATA_ITEM);
        const clientData: ClientData = clientDataString ? JSON.parse(clientDataString) : emptyClientData;

        // if service gives status code 429 you can uncoment demo url
        // return axios.get(`https://www.alphavantage.co/query?function=${period}&from_symbol=${base}&to_symbol=${target}&apikey=demo`)
        // .then(res => {
        //     return res.data
        // })
        // .catch(err => {
        //     console.log(err.message)
        //     return null
        // })

        // initial request to server
        // return axios.get(`${this.baseUrl}/exchangeRate/${period}/${base}/${target}`, {
        //  headers: {
        //     Authorization: `Bearer ${clientData.token}`
        //  }
        //  })
        // .then(res => {
        //     return res.data
        // })
        // .catch(err => {
        //     console.log(err.message)
        //     return null
        // })

        // if all abow gives status code 429 u can use test-data to display diagram
        return testData.monthly
        
    }

    async convertCurrencies(base: string, target: string, amount: string): Promise<any> {
        const clientDataString = localStorage.getItem(CLIENT_DATA_ITEM);
        const clientData: ClientData = clientDataString ? JSON.parse(clientDataString) : emptyClientData;
        return axios.get(`${this.baseUrl}/convert/${base}/${target}/${amount}`, {
         headers: {
            Authorization: `Bearer ${clientData.token}`
         }
         })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err.message)
            return null
        })
    }

    // socket connection initator
    async getRealTimeExchangeRate(base: string, currencyData: string[]): Promise<any> {
        const clientDataString = localStorage.getItem(CLIENT_DATA_ITEM);
        const clientData: ClientData = clientDataString ? JSON.parse(clientDataString) : emptyClientData;
        return axios.post(`${this.baseUrl}/realtime/${base}`, 
        { currencies: currencyData },
        { headers: {
                Authorization: `Bearer ${clientData.token}`
            }
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err.message)
            return null
        })
    }
    
}

const createDashboardService = (baseUrl: string) => new DashboardServiceImpl(baseUrl);

export default createDashboardService;  
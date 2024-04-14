import axios from "axios";
import DashBoardService from "./DashboardService";
import { CLIENT_DATA_ITEM } from "./AuthServiceImpl";
import ClientData, { emptyClientData } from "../../models/ClientData";



class DashboardServiceImpl implements DashBoardService {

    baseUrl: string

    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
    async getCurrenciesList(): Promise<any> {
        const clientDataString = localStorage.getItem(CLIENT_DATA_ITEM);
        const clientData: ClientData = clientDataString ? JSON.parse(clientDataString) : emptyClientData;
        return axios.get('http://localhost:3001/dashboard/currency', {
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


    async getExchangeRate(period: string, fromCurrency: string, toCurrency: string): Promise<any> {
        const clientDataString = localStorage.getItem(CLIENT_DATA_ITEM);
        const clientData: ClientData = clientDataString ? JSON.parse(clientDataString) : emptyClientData;
        return axios.get(`https://www.alphavantage.co/query?function=${period}&from_symbol=EUR&to_symbol=USD&apikey=demo`, {
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
    
}

const createDashboardService = (baseUrl: string) => new DashboardServiceImpl(baseUrl);

export default createDashboardService;  
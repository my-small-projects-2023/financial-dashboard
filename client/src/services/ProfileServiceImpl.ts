import axios from "axios";
import ClientData, { emptyClientData } from "../models/ClientData";
import { CLIENT_DATA_ITEM } from "./AuthServiceImpl";
import ProfileService from "./interfaces/ProfileService";
import ProfileData from "../models/ProfileData";

class ProfileServiceImpl implements ProfileService {
    
    baseUrl: string

    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }

    async getProfile(): Promise<ProfileData | null> {
        const clientDataString = localStorage.getItem(CLIENT_DATA_ITEM);
        const clientData: ClientData = clientDataString ? JSON.parse(clientDataString) : emptyClientData;
        return axios.get(`${this.baseUrl}`, {
            headers: {
                Authorization: `Bearer ${clientData.token}`
            }
        })
        .then(res => {
            return res.data.profile as ProfileData
        })
        .catch(err => {
            console.log(err.message)
            return null
        })
    }
    async updateProfile(currencies: string[]): Promise<ProfileData | null> {
        const clientDataString = localStorage.getItem(CLIENT_DATA_ITEM);
        const clientData: ClientData = clientDataString ? JSON.parse(clientDataString) : emptyClientData;
        return axios.put(`${this.baseUrl}`, 
        { currencies: currencies },
        {   headers: {
                Authorization: `Bearer ${clientData.token}`
            },
            
        })
        .then(res => {
            return res.data.profile as ProfileData
        })
        .catch(err => {
            console.log(err.message)
            return null
        })
    }

}

const createProfileService = (baseUrl: string) => new ProfileServiceImpl(baseUrl);

export default createProfileService;  
import ClientData, { emptyClientData } from "../../models/ClientData";
import LoginData from "../../models/LoginData";
import SigninData from "../../models/SigninData";
import AuthService from "./AuthService";
import axios from 'axios'

export const CLIENT_DATA_ITEM = "client-data"

export class AuthServiceImpl implements AuthService {

    baseUrl: string

    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }

    async login(loginData: LoginData): Promise<ClientData | null> {
        return axios.post(`${this.baseUrl}/login`, loginData)
        .then(res => {
            return res.data as ClientData
        })
        .catch(err => {
            console.log(err.message)
            return null
        })

    }

    async signup(signinData: SigninData): Promise<number> {
        return await axios.post(`${this.baseUrl}/signup`, signinData)
        .then(res => {
            console.log(res)
            return 200
        })
        .catch(err => {
            console.log(err.message)
            return err.response.status;
        }) 

    }

    async logout(): Promise<boolean> {
        localStorage.setItem(CLIENT_DATA_ITEM, JSON.stringify(emptyClientData));
        return true
    }
}

const createAuthService = (baseUrl: string) => new AuthServiceImpl(baseUrl);

export default createAuthService;     
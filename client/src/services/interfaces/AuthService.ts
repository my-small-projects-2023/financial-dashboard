import LoginData from "../../models/LoginData";
import SigninData from "../../models/SigninData";
import ClientData from "../../models/ClientData";

export default interface AuthService {

    login(loginData: LoginData): Promise<ClientData | null>;
    signup(signinData: SigninData): Promise<number>;
    logout(): Promise<boolean>
}

export default interface ClientData {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    currencies: string[],
    token: string
}

export const emptyClientData: ClientData = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    currencies: [],
    token: ""
}
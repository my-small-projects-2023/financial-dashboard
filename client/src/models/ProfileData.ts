
export default interface ProfileData {
    firstName: string,
    lastName: string,
    email: string,
    currencies: string[],
}

export const emptyProfileData: ProfileData = {
    firstName: "",
    lastName: "",
    email: "",
    currencies: []
}
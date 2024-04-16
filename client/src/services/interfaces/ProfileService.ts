import ProfileData from "../../models/ProfileData";

export default interface ProfileService {
    getProfile(): Promise<ProfileData | null>;
    updateProfile(currencies: string[]): Promise<ProfileData | null>;
}
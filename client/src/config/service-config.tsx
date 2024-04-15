import createAuthService from "../components/services/AuthServiceImpl"
import createDashboardService from "../components/services/DashboardServiceImpl";
import createProfileService from "../components/services/ProfileServiceImpl";


export const AUTH_BASE_URL = 'http://localhost:3001/auth'
export const DASHBOARD_BASE_URL = 'http://localhost:3001/dashboard'
export const PROFILE_BASE_URL = 'http://localhost:3001/profile'

export const authService = createAuthService(AUTH_BASE_URL);
export const dashboardService = createDashboardService(DASHBOARD_BASE_URL);
export const profileService = createProfileService(PROFILE_BASE_URL);


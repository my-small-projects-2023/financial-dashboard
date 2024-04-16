import createAuthService from "../services/AuthServiceImpl"
import createDashboardService from "../services/DashboardServiceImpl";
import createProfileService from "../services/ProfileServiceImpl";


export const AUTH_BASE_URL = 'http://localhost:3001/auth'
export const DASHBOARD_BASE_URL = 'http://localhost:3001/dashboard'
export const PROFILE_BASE_URL = 'http://localhost:3001/profile'

export const authService = createAuthService(AUTH_BASE_URL);
export const dashboardService = createDashboardService(DASHBOARD_BASE_URL);
export const profileService = createProfileService(PROFILE_BASE_URL);


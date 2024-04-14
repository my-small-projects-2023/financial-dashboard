import createAuthService from "../components/services/AuthServiceImpl"
import createDashboardService from "../components/services/DashboardServiceImpl";


export const AUTH_BASE_URL = 'http://localhost:3001/auth'
export const DASHBOARD_BASE_URL = 'http://localhost:3001/dashboard'

export const authService = createAuthService(AUTH_BASE_URL);
export const dashboardService = createDashboardService(DASHBOARD_BASE_URL);


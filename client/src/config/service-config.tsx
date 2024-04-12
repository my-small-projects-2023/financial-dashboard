import createAuthService from "../components/services/AuthServiceImpl"


export const AUTH_BASE_URL = 'http://localhost:3001/auth'

export const authService = createAuthService(AUTH_BASE_URL);


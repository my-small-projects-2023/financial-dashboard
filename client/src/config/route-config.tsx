import HomePage from "../components/pages/HomePage";
import RouteType from "../models/RouteType";
import { IoHomeSharp } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import LoginPage from "../components/pages/LoginPage";
import DashboardPage from "../components/pages/DashboardPage";
import LogoutPage from "../components/pages/LogoutPage";
import NotFoundPage from "../components/pages/NotFoundPage";


export const HOME_PAGE_PATH = '/';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout'
export const DASHBOARD_PATH = '/dashboard'
export const NOT_FOUND_PATH = '*'

export const ROUTES: RouteType[] = [
    {path: HOME_PAGE_PATH, label: 'Home', element: <HomePage/>, authenticated: false, icon: <IoHomeSharp />, isShown: true},
    {path: LOGIN_PATH, label: 'Login', element: <LoginPage/>, authenticated: false, icon: <BiLogIn/>},
    {path: DASHBOARD_PATH, label: 'Dashboard', element: <DashboardPage/>, authenticated: true, icon: <RxDashboard/>},
    {path: LOGOUT_PATH, label: 'Logout', element: <LogoutPage/>, authenticated: true, icon: <BiLogOut/>},
    {path: NOT_FOUND_PATH, label: 'Not Found 404', element: <NotFoundPage/>, authenticated: false}

]


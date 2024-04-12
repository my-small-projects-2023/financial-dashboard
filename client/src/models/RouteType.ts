import { ReactNode } from "react";

export default interface outeType {
    path: string,
    label: string,
    element: ReactNode,
    authenticated: boolean,
    isShown?: boolean,
    icon?: ReactNode 
}
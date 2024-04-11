import { ReactNode } from "react";

export default interface outeType {
    path: string,
    label: string,
    element: ReactNode,
    authenticated: boolean,
    icon?: ReactNode 
}
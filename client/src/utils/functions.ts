import RouteType from "../models/RouteType";

export function getRouteIndex(items: RouteType[], pathname: string): number {
    let index = items.findIndex(item => item.path === pathname);
    if (index < 0) {
        index = 0;
    }
    return index;
}
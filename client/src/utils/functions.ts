import RouteType from "../models/RouteType";

export function getRouteIndex(items: RouteType[], pathname: string): number {
    let index = items.findIndex(item => item.path === pathname);
    if (index < 0) {
        index = 0;
    }
    return index;
}

export function parseDouble(num: number): number {
    return parseFloat(num.toFixed(4))
}

export function getPercentage(prev: number, current: number): number {
    let res = ((current - prev) / prev) * 100
    return parseFloat(res.toFixed(2))
}

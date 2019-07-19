const routes  = {
    admin: [],
    business: [],
    personal: [],
    guest: []
}

export const getRoutesByRole = (role) => {
    return routes[role];
}
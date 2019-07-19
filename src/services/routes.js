const routes  = {
    admin: [
        {type: 'title', text: 'Admin'}
    ],
    business: [
        {type: 'title', text: 'Business'}
    ],
    personal: [],
    guest: []
}

export const getRoutesByRole = (role) => {
    return routes[role];
}
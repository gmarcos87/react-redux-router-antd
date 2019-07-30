import { pathNames } from '../configs/routes'
const routes  = {
    business: {
        items: [
            {
                key: pathNames.businessDashboard,
                title: 'Mi dinero',
                items: [
                    {
                        key: pathNames.businessExtracto,
                        path: pathNames.businessUnderConstruction,
                        title: 'Extracto',
                    },
                    {
                        key: pathNames.businessInformes,
                        path: pathNames.businessUnderConstruction,
                        title: 'Informes',
                    },
                    {
                        key: pathNames.businessDepositar,
                        path: pathNames.businessUnderConstruction,
                        title: 'Depositar',
                    },
                    {
                        key: pathNames.businessRetirar,
                        path: pathNames.businessUnderConstruction,
                        title: 'Retirar',
                    },
                    {
                        key: pathNames.businessCambiar,
                        path: pathNames.businessUnderConstruction,
                        title: 'Cambiar',
                    }
                ]
            }
        ]
    },
    admin: {},
    personal: {},
    guest: {}
}

export const getRoutesByRole = (role) => {
    return routes[role];
}
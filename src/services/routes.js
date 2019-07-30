import { pathNames } from '../configs/routes'
const routes  = {
    business: {
        items: [
            {
                key: pathNames.businessDashboard,
                title: 'My money',
                items: [
                    {
                        key: pathNames.businessAllInOne,
                        path: pathNames.businessAllInOne,
                        title: 'All In One',
                    },
                    {
                        key: pathNames.businessExtracto,
                        path: pathNames.businessExtracto,
                        title: 'Transaction History',
                    },
                    {
                        key: pathNames.businessInformes,
                        path: pathNames.businessUnderConstruction,
                        title: 'Reports',
                    },
                    {
                        key: pathNames.businessDepositar,
                        path: pathNames.businessUnderConstruction,
                        title: 'Deposit',
                    },
                    {
                        key: pathNames.businessRetirar,
                        path: pathNames.businessUnderConstruction,
                        title: 'Withdraw',
                    },
                    {
                        key: pathNames.businessCambiar,
                        path: pathNames.businessUnderConstruction,
                        title: 'Exchange',
                    }
                ]
            },
            {
                key: pathNames.businessRequestMoney,
                title: 'Receive',
                items: [
                    {
                        key: pathNames.businessRequestMoney,
                        path: pathNames.businessUnderConstruction,
                        title: 'Request money',
                    }
                ]
            },
            {
                key: pathNames.businessSendMoney,
                title: 'Pay',
                items: [
                    {
                        key: pathNames.businessSendMoney,
                        path: pathNames.businessSendMoney,
                        title: 'Send money',
                    },
                    {
                        key: pathNames.businessPaymentsAndServices,
                        path: pathNames.businessUnderConstruction,
                        title: 'Payment and services',
                    }
                ]
            }
            ,
            {
                key: pathNames.businessConfiguration,
                title: 'Configuration',
                items: [
                    {
                        key: pathNames.businessConfiguration,
                        path: pathNames.businessUnderConstruction,
                        title: 'Configuration'
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
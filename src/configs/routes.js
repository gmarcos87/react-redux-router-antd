const arrToObj  = (a = []) => a.reduce((prev,act) => { prev[act] = act; return prev; } , {});

export const pathNames = arrToObj([
    'businessAllInOne',
    'businessDashboard',
    'businessUnderConstruction',
    'businessExtracto',
    'businessInformes',
    'businessDepositar',
    'businessRetirar',
    'businessCambiar',

    'businessRequestMoney',

    'businessSendMoney',
    'businessPaymentsAndServices',

    'businessConfiguration'
])

const business =[
    {
       key: pathNames.businessDashboard,
       fileName: 'allInOne',
       area: 'business',
       path: 'dashboard',
       container: 'dashboard',
       role: 'business'
    },
    {
        key: pathNames.businessUnderConstruction,
        fileName: 'under-construction',
        area: 'business',
        path: 'proximamente',
        container: 'dashboard',
        role: 'business'
     },
     {
       key: pathNames.businessSendMoney,
       fileName: 'sendMoney',
       area: 'business',
       path: 'send-money',
       container: 'dashboard' 
    },

     {
       key: pathNames.businessExtracto,
       fileName: 'home',
       area: 'business',
       path: 'extrato',
       container: 'dashboard' 
    },
     {
       key: pathNames.businessAllInOne,
       fileName: 'allInOne',
       area: 'business',
       path: 'all-in-one',
       container: 'dashboard' 
    },
]

const admin = [];

const persona = [];

const merged  = [
    ...business,
    ...admin,
    ...persona
  ]

export const getPath = (key) => {
    const path = (merged.find(routeItem => routeItem.key === key ) || {path: ''}).path
    const area = (merged.find(routeItem => routeItem.key === key ) || {area: ''}).area
    return `/${area}/${path}` 
} 

export default merged
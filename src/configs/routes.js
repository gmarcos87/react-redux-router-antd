const arrToObj  = (a = []) => a.reduce((prev,act) => { prev[act] = act; return prev; } , {});

export const pathNames = arrToObj([
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
       fileName: 'home',
       area: 'business',
       path: 'dashboard',
       container: 'dashboard' 
    },
    {
        key: pathNames.businessUnderConstruction,
        fileName: 'under-construction',
        area: 'business',
        path: 'proximamente',
        container: 'dashboard' 
     },

     {
       key: pathNames.businessSendMoney,
       fileName: 'sendMoney',
       area: 'business',
       path: 'send-money',
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
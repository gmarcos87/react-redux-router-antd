import global from '@app/configs/global'

// Recibe como parametro el account_name y retorna el balance y las cuentas asociadas a él, y retorna la info de perfil.

export const getAccountInformation = (account_name) =>   new Promise((res,rej)=> {
    setTimeout(()=> {
        res({ data:  
        			{ 
      					accounts: [{ 
										name 								: 'betosarasasa'
										, balance 					: 1000
										, account_id  			: 'aaaaa'
									  , account_type 			: 'type_personal' // (personal, fundo, negocio)
									  , locked_amount 		: 100
									  , deposits_counter  : 1
									  , withdraw_amount   : 0
									  , withdraw_counter  : 0
									  , xchg_amount 			: 0
									  , xchg_counter 			: 0
									  , permission 				: 'owner'
								}]
							} 
						});
        
    }, 500)
})
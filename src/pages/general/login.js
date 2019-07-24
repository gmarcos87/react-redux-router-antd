import React, {useState} from 'react'
import { Button } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as loginRedux from '../../redux/models/login'

const Login = ({tryLogin, isLoading}) => {
    const [privateKey, setKey] = useState('');
    return (<>
        <h2>Make Login</h2>
        <textarea placeholder='Private Key' onChange={e => setKey(e.target.value)}>
        </textarea>
        <Button onClick={()=>tryLogin(privateKey)} loading={isLoading}>Login</Button>
    </>)
}

export default connect(
    (state)=> ({
        isLoading: loginRedux.isLoading(state)
    }),
    (dispatch)=>({
        tryLogin: bindActionCreators(loginRedux.tryLogin, dispatch)
    })
)(Login)
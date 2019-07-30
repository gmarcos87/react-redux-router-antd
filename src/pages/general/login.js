import React, { Component } from "react";
import { Form, Button, Checkbox } from 'antd';
import UserSelector from '@app/components/InkiriHeader/userSelector'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as loginRedux from '@app/redux/models/login';

import * as global from '@app/configs/global';

import {Keystore, Keygen} from 'eosjs-keygen';
// import {Eos} from 'eosjs';
import * as myEOS from 'eosjs';
// import { Api, JsonRpc, RpcError } from 'eosjs';

import './login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      save: false,
      seed     : "",
      privKey  : "",
      config   : {
        uriRules: {
          'active': '.*',
          'active/**': '.*'
        },
        timeoutInMin: 10,
        timeoutKeyPaths: [
          'owner',
          'owner/**'
        ],
        keepPublicKeys: true
      }

    };
    
    
  }

  tryGenerate() {
    
    let sessionConfig = {
      timeoutInMin: 30,
      uriRules: {
        'owner' : '/account_recovery',
        'active': '/(transfer|contracts)',
        'active/**': '/producers'
      }
    }

    let keystore = Keystore('myaccount', sessionConfig)
    // let eos = Eos.Testnet({keyProvider: keystore.keyProvider})

    Keygen.generateMasterKeys().then(keys => {
      // create blockchain account called 'myaccount'
      
      console.log(JSON.stringify(keys));

      this.setPrivKey(keys);
      // eos.getAccount('myaccount').then(account => {
      //   keystore.deriveKeys({
      //     parent: keys.masterPrivateKey,
      //     accountPermissions: account.permissions
      //   })
      // })

    })
  }

  setSeed(seed){
    this.setState({seed:seed});
  }
  setPrivKey(privKey){
    this.setState({privKey:privKey});
  }


  connectEos(){
    const network = {
      blockchain: "eos",
      host: "publicapi-mainnet.eosauthority.com",
      port: 443,
      protocol: "https",
      chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    };

    const requiredFields = { accounts: [network] };
    let chainId = network.chainId;
    let httpEndpoint = network.protocol + "://" + network.host + ":" + network.port;
    let eosConnect = myEOS.eos({
      chainId,
      httpEndpoint,
    });

    eosConnect.getAccount('eosfiredream').then(result => console.log(result)).catch(error => console.error(error));

  }

  render() {   
    // const [seed, setSeed] = useState('');
    // const [privateKey, setKey] = useState('');
    // <Button onClick={()=>this.connectEos()}>Connect</Button>
    const seed     = this.state.seed;
    const privKey   = this.state.privKey;

    return (
      <Form className="login-form">
        {/* <input placeholder='Input seed' onChange={e => this.setSeed(e.target.value)}></input>
        
        <Button onClick={()=>this.tryGenerate(seed)}>Generate Key</Button>
        
        <label>Private Key</label>
        <input placeholder='Private Key' value={privKey}></input>
      */}
        <Form.Item>
          <UserSelector onChange={(account) => this.setState({account})} className="login-user-selector" />
        </Form.Item>
        <Form.Item>
          <Checkbox value={this.state.save} onChange={(e) => this.setState({save: e.target.checked})}>Remember me</Checkbox>
          <Button type="primary" disabled={!this.state.account} onClick={()=>this.props.tryLogin(this.state.account, this.state.save)} loading={this.props.isLoading}  className="login-form-button">
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
    (state)=> ({
        isLoading: loginRedux.isLoading(state)
    }),
    (dispatch)=>({
        tryLogin: bindActionCreators(loginRedux.tryLogin, dispatch)
    })
)(Login)

// import React, {useState} from 'react'
// import { Button } from 'antd';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
// import * as loginRedux from '../../redux/models/login'

// const Login = ({tryLogin, isLoading}) => {
//     const [privateKey, setKey] = useState('');
//     return (<>
//         <h2>Make Login</h2>
//         <textarea placeholder='Private Key' onChange={e => setKey(e.target.value)}>
//         </textarea>
//         <Button onClick={()=>tryLogin(privateKey)} loading={isLoading}>Login</Button>
//     </>)
// }

// export default connect(
//     (state)=> ({
//         isLoading: loginRedux.isLoading(state)
//     }),
//     (dispatch)=>({
//         tryLogin: bindActionCreators(loginRedux.tryLogin, dispatch)
//     })
// )(Login)
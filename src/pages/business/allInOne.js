import React, {useState, Component} from 'react'
import { Button, Select, InputNumber } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as userRedux from '@app/redux/models/user'

import * as globalCfg from '@app/configs/global';

import { InboundMessageType, createDfuseClient } from '@dfuse/client';

import * as api from '@app/services/inkiriApi';

import './home.css'; 



import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

const { Option } = Select;


class AllInOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected:           false,
      errorMessages:       [],
      transfers:           [],
      balance:             {},

      sender_account:      'ikmasterooo1',
      destination_account: 'ikadminoooo1',
      destination_amount:   2,
      privs:               {
        'ikmasterooo1': '5J2bKBbHH6xB2U255CWbXJ6uAuibg5KCh1omKdhpKoCfrTxWkUN'
        , 'ikadminoooo1': '5KkKKHiFqNfyFRTWQSdVmg7UBTdwvmkRz48dUyE6pQCEbfJLm6u'
      }
      
    };

    this.onAmountChange   = this.onAmountChange.bind(this);
    this.onAccountChange  = this.onAccountChange.bind(this);
    this.onSenderChange   = this.onSenderChange.bind(this);
    this.readConfig       = this.readConfig.bind(this);
    this.getSenderPriv    = this.getSenderPriv.bind(this);
    this.prettyJson       = this.prettyJson.bind(this);

    this.stream = undefined
    // this.client = undefined
    this.client = createDfuseClient({
      apiKey:globalCfg.dfuse.apiKey,
      network:globalCfg.dfuse.network,
      streamClientOptions: {
        socketOptions: {
          onClose: this.onClose,
          onError: this.onError,
        }
      }
    })

  }


  componentWillUnmount() {
    if (this.stream !== undefined) {
      this.stream.close()
    }
  }

  onAmountChange(value) {
    // this.setState({destination_amount: event.target.value});
    console.log(' -- onAmountChange')
    console.log(JSON.stringify(value))
    this.setState({destination_amount: value});
  }

  onAccountChange(value){
    console.log(' -- onAccountChange')
    console.log(JSON.stringify(value))
    // this.setState({destination_account: event.target.value});
    this.setState({destination_account: value});
  }

  onSenderChange(value){
    this.setState({sender_account: value});
  }

  getFormattedAmount()
  {
    return Number(this.state.destination_amount).toFixed(4) + ' INK';
  }
  
  getSenderPriv(){
    return this.state.privs[this.state.sender_account];
  }

  readConfig() {
    const endpoint = "https://jungle.eos.dfuse.io"
    const guaranteed = "in-block" // Or "irreversible", "handoff:1", "handoffs:2", "handoffs:3"
    const transferTo = this.state.destination_account;
    const transferQuantity = this.getFormattedAmount();
    const dfuseApiToken = globalCfg.dfuse.apiKey
    const privateKey = this.getSenderPriv();

    const transferFrom = this.state.sender_account;
    
    return {
      endpoint,
      guaranteed,
      dfuseApiToken: dfuseApiToken,
      privateKey: privateKey,
      transferFrom: transferFrom,
      transferTo,
      transferQuantity
    }
  }

  send = async () => {
    
    if(!this.state.connected)
      this.launch();

    const config = this.readConfig()

    const signatureProvider = new JsSignatureProvider([config.privateKey])
    const rpc = new JsonRpc(config.endpoint)
    const api = new Api({
      rpc,
      signatureProvider
    })

    const transferAction = {
      account: "ikmasterooo1",
      name: "transfer",
      authorization: [
        {
          actor: config.transferFrom,
          permission: "active"
        }
      ],
      data: {
        from: config.transferFrom,
        to: config.transferTo,
        quantity: config.transferQuantity,
        memo: 'snd|key'
      }
    }

    console.log("Transfer action", this.prettyJson(transferAction))

    const startTime = new Date()
    const result = await api.transact(
      { actions: [transferAction] },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )
  }
  
  prettyJson(input: any): string {
    return JSON.stringify(input, null, 2)
  }

  issue = async () => {
    
    if(!this.state.connected)
      this.launch();

    const config = this.readConfig()

    const signatureProvider = new JsSignatureProvider([config.privateKey])
    const rpc = new JsonRpc(config.endpoint)
    const api = new Api({
      rpc,
      signatureProvider
    })

    const issueAction = {
      account: "ikmasterooo1",
      name: "issue",
      authorization: [
        {
          actor: config.transferFrom,
          permission: "active"
        }
      ],
      data: {
        to: config.transferTo,
        quantity: config.transferQuantity,
        memo: 'iss|key'
      }
    }

    console.log("Issue action", this.prettyJson(issueAction))

    const startTime = new Date()
    const result = await api.transact(
      { actions: [issueAction] },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )
  }

  launch = async () => {
  // launch(){
    console.log(' LAUNCH clicked')
    if (!globalCfg.dfuse.apiKey) {
      const messages = [
        "To correctly run this sample, you need to defined an environment variable",
        "named 'REACT_APP_DFUSE_API_KEY' with the value being your dfuse API token.",
        "",
        "To make it into effect, define the variable before starting the development",
        "scripts, something like:",
        "",
        "REACT_APP_DFUSE_API_KEY=web_....",
        "",
        "You can obtain a free API key by visiting https://dfuse.io"
      ]

      console.log(' LAUNCH no key')
      this.setState({ connected: false, errorMessages: messages, transfers: [] })
      return
    }

    if (this.state.connected) {
      const messages = [
        "Already connected!!!!"
      ]

      this.setState({errorMessages: messages, transfers: [] })
      return;
    }

    this.setState({ errorMessages: [], transfers: [] })

    try { 
      this.stream = await this.client.streamActionTraces({
        account: "ikmasterooo1|ikadminoooo1", action_name: "transfer|issue"
      }, this.onMessage)

      console.log(' LAUNCH connected')
      this.setState({ connected: true })
    } catch (error) {
      console.log(' LAUNCH error')
      console.log(JSON.stringify(error))
      this.setState({ errorMessages: ["Unable to connect to socket.", JSON.stringify(error)] })
    }
  }

  onMessage = async (message) => {
    console.log(' ON  MESSAGE ', JSON.stringify(message))
    if (message.type !== InboundMessageType.ACTION_TRACE) {
      return
    }

    const { from, to, quantity, memo } = message.data.trace.act.data
    const transfer = `Transfer [${from} -> ${to}, ${quantity}] (${memo})`

    this.setState((prevState) => ({
      transfers: [ ...prevState.transfers.slice(-100), transfer ],
    }))
  }

  stop = async () => {
    if (this.stream === undefined) {
      return
    }

    try {
      await this.stream.close()
      this.stream = undefined
    } catch (error) {
      this.setState({ errorMessages: ["Unable to disconnect socket correctly.", JSON.stringify(error)]})
    }
  }

  onClose = () => {
    this.setState({ connected: false })
  }

  onError = (error) => {
    this.setState({ errorMessages: ["An error occurred with the socket.", JSON.stringify(error)]})
  }

  renderTransfer = (transfer, index) => {
    return <code key={index} className="App-transfer">{transfer}</code>
  }

  renderTransfers() {
    return (
      <div className="App-infinite-container">
        { this.state.transfers.length <= 0
            ? this.renderTransfer("Nothing yet, start by hitting Launch!")
            : this.state.transfers.reverse().map(this.renderTransfer)
        }
      </div>
    )
  }

  renderError = (error, index) => {
    if (error === "") {
      return <br key={index} className="App-error"/>
    }

    return <code key={index} className="App-error">{error}</code>
  }

  renderErrors() {
    if (this.state.errorMessages.length <= 0) {
      return null
    }

    return (
      <div className="App-container">
        {this.state.errorMessages.map(this.renderError)}
      </div>
    )
  }

  render() {
    return (

      <div className="XX-App">
        <div className="XX-header">
          <h2>Operations</h2>
          {this.renderErrors()}
          <div className="App-main">
            
            <div style={{ display: 'block' }}>
              <h3>Sender/Issuer</h3>
              <Select 
                defaultValue="ikmasterooo1" 
                style={{ width: 'auto' }} 
                onChange={ this.onSenderChange} >
                
                <Option value="ikmasterooo1">ikmasterooo1</Option>
                <Option value="ikadminoooo1">ikadminoooo1</Option>
              </Select>
            </div>

            <div style={{ display: 'block' }}>
              <h3>Receipt</h3>
              <Select 
                defaultValue="ikadminoooo1" 
                style={{ width: 'auto' }} 
                onChange={ this.onAccountChange} >
                
                <Option value="ikmasterooo1">ikmasterooo1</Option>
                <Option value="ikadminoooo1">ikadminoooo1</Option>
              </Select>
            </div>

            <div style={{ display: 'block' }}>
              <h3>Amount</h3>
              <InputNumber
                defaultValue={2}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={ this.onAmountChange }
              />
            </div>

            <button className="App-button" onClick={()=>this.send()}>Send</button>
            <button className="App-button" onClick={()=>this.issue()}>Issue</button>

          </div>
        </div>

        <div className="XX-header">
          <h2>Transactions History</h2>
          <div className="App-buttons">
            <button className="App-button" onClick={()=>this.launch()}>Listen</button>
            <button className="App-button" onClick={()=>this.stop()}>Stop</button>
          </div>
          <div className="App-main">
            <p className="App-status">
              {`Connected: ${this.state.connected ? "Connected (Showing last 100 transfers)" : "Disconnected"}`}
            </p>
            {this.renderTransfers()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
    (state)=> ({
        userAccount: 	      userRedux.defaultAccount(state),
        allAccounts: 	      userRedux.allAccounts(state),
        isLoading: 		      userRedux.isLoading(state)
    }),
    (dispatch)=>({
        tryUserState: bindActionCreators(userRedux.tryUserState , dispatch)
    })
)(AllInOne)
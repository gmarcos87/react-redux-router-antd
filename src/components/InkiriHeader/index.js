import React, {Component} from 'react'
import { Layout, Icon, Button } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as userRedux from '@app/redux/models/user'
import * as loginRedux from '@app/redux/models/login'
import styles from './index.less';

import UserSelector from './userSelector'

// import AvatarDropdown from '@app/components/GlobalHeader';

const { Header } = Layout;

class InkiriHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  accountToString(account){
    return JSON.stringify(account);
  }
  
  handleChange(account) {
    console.log(`selected ${account.name}`);
    this.props.tryLogin(account)
  }

  render(){
    return (
       <Header style={{ background: '#fff', padding: 0 }}>
          <div className="ant-pro-global-header">  
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="right">
              <div className="header_element_container">
                <a className="header_element_top_padded header_element_left_padded" target="_blank" href="https://jungle.bloks.io/account/ikadminoooo1">View account on blockexplorer</a>
              </div>

              <div className="header_element_container">
               <UserSelector onChange={this.handleChange} />
                <Button style={{marginLeft: '10px'}}icon={'logout'} onClick={this.props.logout}>Logout</Button>
              </div>
            </div>
          </div>
        </Header>
    )
  }

}

export default connect(
    (state)=> ({
    }),
    (dispatch)=>({
        try: bindActionCreators(userRedux.tryUserState , dispatch),
        tryLogin: bindActionCreators(loginRedux.tryLogin, dispatch),
        logout: bindActionCreators(loginRedux.logout, dispatch)
    })
)(InkiriHeader)
import React, {useState, Component} from 'react'
import { Layout, Icon, Select } from 'antd';
import { Anchor } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as userRedux from '@app/redux/models/user'
import styles from './index.less';

// import AvatarDropdown from '@app/components/GlobalHeader';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Link } = Anchor;

class InkiriHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  accountToString(account){
    return JSON.stringify(account);
  }
  
  handleChange(value) {
    console.log(`selected ${value}`);
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
                <div style={{ display: 'none' }}> ToDo: obtenet lista acounts desde API </div>
                <Select defaultValue="ikmasterooo1" style={{ width: 'auto' }} onChange={this.handleChange}>
                  <Option value="ikmasterooo1">ikmasterooo1</Option>
                  <Option value="ikadminoooo1" disabled>
                    ikadminoooo1
                  </Option>
                </Select>
              </div>
            </div>
          </div>
        </Header>
    )
  }

}

export default connect(
    (state)=> ({
        userAccount:   userRedux.defaultAccount(state),
        allAccounts:   userRedux.allAccounts(state),
        isLoading:     userRedux.isLoading(state)
    }),
    (dispatch)=>({
        try: bindActionCreators(userRedux.tryUserState , dispatch)
    })
)(InkiriHeader)
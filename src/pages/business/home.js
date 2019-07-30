import React, {useState, Component} from 'react'
import { Button } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


import * as userRedux from '@app/redux/models/user'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: null,
    };
  }

  accountToString(account){
  	return JSON.stringify(account);
  }

  render() {
    return (
      <>
        {this.accountToString(this.props.userAccount) }
      </>
    );
  }
}

export default connect(
    (state)=> ({
        userAccount: 	userRedux.defaultAccount(state),
        allAccounts: 	userRedux.allAccounts(state),
        isLoading: 		userRedux.isLoading(state)
    }),
    (dispatch)=>({
        tryUserState: bindActionCreators(userRedux.tryUserState , dispatch)
    })
)(Home)
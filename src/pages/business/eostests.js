import React, { Component, useState } from "react";
import { Button } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as loginRedux from '@app/redux/models/login'


class EOSTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      error: ""
    };
    
  }

  removeRewardBox() {
    this.setState({
      rewardBox: false,
      rewardQr: false,
      rewardData: {}
    });
  }


  render() {
    return (
      <div></div>
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
)(EOSTests)
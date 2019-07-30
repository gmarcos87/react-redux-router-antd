import React from 'react'
import { Select } from 'antd';
import { connect } from 'react-redux'
import * as loginRedux from '@app/redux/models/login'
import * as accountsRedux from '@app/redux/models/accounts'

const { Option } = Select;

const SelectUser = ({accounts, actualAccount, onChange, loading}) => {
    const sendAccount = (name) => {
        const selectedAccount = accounts.find(acc => acc.name === name)
        if(typeof onChange === 'function') {
            onChange(selectedAccount)
        }
    }
    return (
        <Select defaultValue={actualAccount} style={{ width: '100%' }} onChange={sendAccount} loading={loading} placeholder={'Select account'}>
            { accounts.map(acc => <Option key={acc.name} value={acc.name}>{acc.name}</Option> )}
        </Select>
    )
}

export default connect(
    (state)=> ({
        accounts:   accountsRedux.accounts(state),
        actualAccount: loginRedux.actualAccount(state),
        isLoading: loginRedux.isLoading(state)
    })
)(SelectUser)
import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { getMenuItems, getMenu } from '../redux/models/menu'

import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getPath } from '../configs/routes'

const  { SubMenu } = Menu;

const renderItem = (item) => {
    if(item.items) {
        return (
        <SubMenu title={item.title} key={item.key}>
            { item.items.map(renderItem) }
        </SubMenu>
        );
    } else {
        return  (
        <Menu.Item key={item.key}>
            <Link to={getPath(item.path || item.key)}>
                { item.icon? <Icon type={item.icon} />: false }
                <span>{item.title}</span>
            </Link>
        </Menu.Item>
        );
    }
}

export const MenuByRole = ({items = [], getMenu }) => {
        useEffect(()=>{
            getMenu({userId: "1"})
        })
        return (
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    { items.map(renderItem) }
                </Menu>
        )
};

export default connect(
    state => ({
        items: getMenuItems(state)
    }),
    dispatch => ({
        getMenu: bindActionCreators(getMenu, dispatch)
    })
)(MenuByRole)

import React from 'react'
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import loadable from '@loadable/component'
import { DashboardContainer } from '../containers/dashboard.container';
import { BlankContainer } from '../containers/blank.container';
import { Spin } from 'antd'
import { connect } from 'react-redux';
import Login from '../pages/general/login'


const _checkRole = ({role, actualRole, children, history}) => {
    if (role === actualRole) {
        return <>
            {children}
        </>
    } else {
        history.push(`/${actualRole}`);
        return false;
    }
}

const CheckRole = connect((state)=>({
    actualRole: state.login.role
}),()=>({}))(withRouter(_checkRole))

const CheckLogin = () => <CheckRole role={undefined}><Login/></CheckRole>

const loadableComponent = (area,fileName, container, role)=> {
    const ayncComponent = loadable(() => import(`../pages/${area}/${fileName}`), {
        fallback: <Spin style={{marginTop: '100px'}}/>,
    })
    let Container;
    if(container === 'dashboard') {
        Container = ()=> <DashboardContainer Children={ayncComponent} />
    } else {
        Container = ()=> <BlankContainer Children={ayncComponent} />
    }
    if (role) {
        return ()=>(<CheckRole role={role}><Container/></CheckRole>)
    }
    return ()=><Container />
}

  export function DashboardRouter({menuItems}) {
  return (
    <Router>
        <Route path="/login" component={CheckLogin} />
        {menuItems.map(item => <Route key={item.path} path={item.path} component={loadableComponent(item.area, item.fileName, item.container)} /> )}
        <Redirect path={'/'} to={'/login'} />
    </Router>
  );
}

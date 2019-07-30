import React from 'react'
import loadable from '@loadable/component'
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { Spin } from 'antd'

import { BlankContainer } from '@app/containers/blank.container';
import { DashboardContainer } from '@app/containers/dashboard.container';

import Login from '@app/pages/general/login'
import MenuByRole from './menu';

const _checkRole = ({role, actualRole, children, history}) => {
    if (role === actualRole) {
        return <>
            {children}
        </>
    } else {
        if(actualRole) {
            history.push(`/${actualRole}/dashboard`);
        }
        else {
            history.push(`/login`);
        }
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
        Container = ()=> <DashboardContainer Children={ayncComponent} Menu={MenuByRole}/>
    } else {
        Container = ()=> <BlankContainer Children={ayncComponent} />
    }
    if (role) {
        return ()=>(<CheckRole role={role}><Container/></CheckRole>)
    }
    return ()=><Container />
}

  export function DashboardRouter({routes}) {
  return (
    <Router>
        <Route path="/login" component={CheckLogin} />
        {routes.map(item => <Route key={item.path} path={'/'+item.area+'/'+item.path} component={loadableComponent(item.area, item.fileName, item.container, item.role)} /> )}
        <Route path={'/'} component={()=><Redirect to={'/login'} />} />
    </Router>
  );
}

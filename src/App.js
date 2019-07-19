import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore';
import { Button } from 'antd';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { set, setAsync, getTodos, isLoading } from './redux/models/todo';
import * as menuRedux from './redux/models/menu'

const store = configureStore({})

let Botonera = ({set, setAsync, todos, loading, menuItems, menuLoading, getMenu}) => {
  return (
    <>
          <h2>Disparando acciones</h2>
          <Button onClick={()=>set('hola')} type = "primary" >Todo Set</Button>
          <br/>
          <Button onClick={()=>setAsync('mundo')}type = "primary" loading={loading}>Todo Set Async</Button>
          <br/>
          <Button onClick={()=>getMenu(2)}type = "primary" disabled={menuLoading}>Login como business</Button>
          <br/>
          <Button onClick={()=>getMenu(1)}type = "primary" disabled={menuLoading}>Login como admin</Button>
          <br/>
          <h3>Todos:</h3>
          <pre>
            {JSON.stringify(todos, null, '  ')}
          </pre>
          <h2>Menu Items</h2>
          <pre>
            {JSON.stringify(menuItems, null, '  ')}
          </pre>
    </>
  )
}
Botonera = connect((state)=>({
  todos: getTodos(state),
  loading: isLoading(state),
  menuItems: menuRedux.getMenuItems(state),
  menuLoading: menuRedux.isLoading(state)
}),(dispatch)=>({
  set: bindActionCreators(set, dispatch),
  setAsync: bindActionCreators(setAsync, dispatch),
  getMenu: bindActionCreators(menuRedux.getMenu, dispatch)
}))(Botonera);

const App = () =>{
    return (
      <div className="App">
        <Provider store={store}>
          <Botonera />
        </Provider>
      </div>
    );
}

export default App;
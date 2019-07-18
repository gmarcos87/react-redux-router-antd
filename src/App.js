import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore';
import { Button } from 'antd';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { set, setAsync, getTodos, isLoading } from './redux/modules/todo';

const store = configureStore({})

let Botonera = ({set, setAsync, todos, loading}) => {
  return (
    <>
          <h2>Dos botones que tiran acciones a redux</h2>
          <Button onClick={()=>set('hola')} type = "primary" >Todo Set</Button>
          <br/>
          <Button onClick={()=>setAsync('mundo')}type = "primary" loading={loading}>Todo Set Async</Button>
          <br/>
          <pre>
            {JSON.stringify(todos, null, '  ')}
          </pre>
    </>
  )
}
Botonera = connect((state)=>({
  todos: getTodos(state),
  loading: isLoading(state)
}),(dispatch)=>({
  set: bindActionCreators(set, dispatch),
  setAsync: bindActionCreators(setAsync, dispatch)
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
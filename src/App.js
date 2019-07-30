import React from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/configureStore';
import { DashboardRouter } from './providers/router'
import routes from '@app/configs/routes'
import './App.css';

const App = () =>{
    return (
      <div className="App">
        <Provider store={store}>
            <DashboardRouter routes={routes} />
        </Provider>
      </div>
    );
}

export default App;
import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore';
import { DashboardRouter } from './providers/router'

import './App.css';

const store = configureStore({})

const fakeItems = [
  {
    fileName: 'home',
    area: 'business',
    path: '/business',
    container: 'dashboard'
  },
]

const App = () =>{
    return (
      <div className="App">
        <Provider store={store}>
            <DashboardRouter menuItems={fakeItems} />
        </Provider>
      </div>
    );
}

export default App;
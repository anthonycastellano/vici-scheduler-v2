import './App.css';
import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// pages
import Home from './pages/Home';
import AllSchedules from './pages/AllSchedules';
import Admin from './pages/Admin';

// components
import Header from './components/Header';

// helpers

function App() {
  const schedules = useSelector(state => state.schedules);

  useEffect(() => {
    // fetch schedules
  });

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/all-schedules'>
          <AllSchedules />
        </Route>

        <Route exact path='/admin'>
          <Admin />
        </Route>

        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

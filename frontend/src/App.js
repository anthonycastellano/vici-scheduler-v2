import { Route, Switch, Redirect } from 'react-router-dom';

// styling
import './App.scss';

// pages
import Employees from './pages/Employees';
import Schedules from './pages/Schedules';
import Admin from './pages/Admin';

// components
import Nav from './components/Nav';

function App() {
  return (
    <div className='App'>
      <Nav />
      <div className='content'>
        <Switch>
          <Route exact path='/'>
            <Schedules />
          </Route>

          <Route exact path='/employees'>
            <Employees />
          </Route>

          <Route exact path='/admin'>
            <Admin />
          </Route>

          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

// pages
import Employees from './pages/Employees';
import Schedules from './pages/Schedules';
import Admin from './pages/Admin';

// components
import Nav from './components/Nav';

function App() {
  return (
    <div className='App'>
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
      <Nav />
    </div>
  );
}

export default App;

import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CONSTANTS from './store/constants'

// api
import { getSchedules } from './apiHelpers/schedule';
import { getEmployees } from './apiHelpers/employees';

// styling
import './App.scss';

// pages
import Employees from './pages/Employees';
import Schedules from './pages/Schedules';
import Admin from './pages/Admin';

// components
import Nav from './components/Nav';

const scheduleCompareFn = (schedule1, schedule2) => {
  return schedule1.year > schedule2.year ||  (schedule1.year === schedule2.year && schedule1.month > schedule2.month) ?  1 : -1;
};

function App() {
  const dispatch = useDispatch();

  // fetch schedules and employees
  useEffect(() => {
    // fetch schedules and update state
    getSchedules().then(({ data }) => {
        data.sort(scheduleCompareFn);
        dispatch({ type: CONSTANTS.SET_SCHEDULES_ACTION, schedules: data });
    });

    // fetch employees and update state
    getEmployees().then(({ data }) => {
      dispatch({ type: CONSTANTS.SET_EMPLOYEES_ACTION, employees: data });
    });

    // update login state
    if (localStorage.getItem('token')) {
      dispatch({ type: CONSTANTS.SET_LOGGED_IN_ACTION, loggedIn: true });
    }
  }, []);

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

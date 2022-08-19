import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from './store/constants'

// helpers
import { getSchedules } from './apiHelpers/schedule';
import { getEmployees } from './apiHelpers/employee';
import { scheduleCompareFn } from './helpers/helpers';
import { checkAuth } from './apiHelpers/auth';

// styling
import './App.scss';

// pages
import Employees from './pages/Employees';
import Schedules from './pages/Schedules';
import Admin from './pages/Admin';

// components
import Nav from './components/Nav';
import Modal from './components/Modal';

function App() {
  const dispatch = useDispatch();
  const modalOpen = useSelector(state => state.modal.modalOpen);

  // fetch schedules and employees
  useEffect(async () => {
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
    try {
      await checkAuth();
      dispatch({ type: CONSTANTS.SET_LOGGED_IN_ACTION, loggedIn: true });
    } catch { }
  }, []);

  return (
    <div className='App'>
      <Nav />
      {modalOpen && <Modal />}
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

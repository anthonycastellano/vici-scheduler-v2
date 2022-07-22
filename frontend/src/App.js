import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from './store/constants'

// helpers
import { getSchedules } from './apiHelpers/schedule';
import { getEmployees } from './apiHelpers/employee';
import { scheduleCompareFn } from './helpers/helpers';

// styling
import './App.scss';

// pages
import Employees from './pages/Employees';
import Schedules from './pages/Schedules';
import Admin from './pages/Admin';

// components
import Nav from './components/Nav';
import Modal from './components/Modal';

// constants
const LOGIN_EXPIRATION = 12;
const LOCAL_TOKEN = 'token';
const LOCAL_LOGIN_TIME = 'loginTime';

function App() {
  const dispatch = useDispatch();
  const modalOpen = useSelector(state => state.modal.modalOpen);

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
    if (localStorage.getItem(LOCAL_TOKEN)) {
      const expirationTime = new Date(parseInt(localStorage.getItem(LOCAL_LOGIN_TIME)) + LOGIN_EXPIRATION * 60 * 60 * 1000);

      if (Date.now() < expirationTime) {
        dispatch({ type: CONSTANTS.SET_LOGGED_IN_ACTION, loggedIn: true });
      } else {
        localStorage.removeItem(LOCAL_TOKEN);
        localStorage.removeItem(LOCAL_LOGIN_TIME);
      }
    }
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

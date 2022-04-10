import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

// pages
import Home from './pages/Home';
import AllSchedules from './pages/AllSchedules';
import Admin from './pages/Admin';

// components
import Header from './components/Header';

function App() {
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

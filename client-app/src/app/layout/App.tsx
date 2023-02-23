import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashbord from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/activities/home/HomePage';
import ActivityForm from '../../features/activities/forms/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();
  return (
    //Fragment can be simplified as <>
    <Fragment>

      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />

            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivityDashbord} />
              <Route path='/activity/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </>
        )}
      />

    </Fragment>
  );
}

export default observer(App);

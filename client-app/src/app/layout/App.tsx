import { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashbord from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './loadingComponent';
import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    //Fragment can be simplified as <>
    <Fragment>

      <NavBar />

      <Container style={{ marginTop: '7em' }}>
        <ActivityDashbord />
      </Container>

    </Fragment>
  );
}

export default observer(App);

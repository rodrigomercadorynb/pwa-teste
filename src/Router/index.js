//PACKAGES
import { Route, Switch, Redirect } from 'react-router-dom';

//COMPONENTS
import PrivateRoute from './PrivateRoute';
//app
import Apartamentos from '../pages/App/Apartamentos/apartamentos2';
import Checklist from '../pages/App/Checklist/checklist';

const Router = ({ windowDimensions }) => {
  return (
    <>
      <Switch>
        {/* app */}
        <PrivateRoute exact path='/app'>
          <Apartamentos windowDimensions={windowDimensions} />
        </PrivateRoute>
        <PrivateRoute exact path='/app/:id'>
          <Checklist windowDimensions={windowDimensions} />
        </PrivateRoute>

        <Route path='*'>
          <Redirect to='/404' />
        </Route>
      </Switch>
    </>
  );
};

export default Router;

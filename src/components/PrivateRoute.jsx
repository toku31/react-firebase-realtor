import {Outlet, Navigate} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner';

function PrivateRoute() {
  // const loggedIn = false;
  const { loggedIn, checkingStatus } = useAuthStatus() 
  if (checkingStatus) {
    return <Spinner />
    // return <h3>Loading...</h3>
  }
  console.log('loggedIn', loggedIn);
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
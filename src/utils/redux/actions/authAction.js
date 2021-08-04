import axios from 'axios';
import BASE_URL from '../../BASE_URL';

// New Actions for the app

export const SignIn = (ydata, history) => async (dispatch) => {
  await axios
    .post(`${BASE_URL}/checklist/user/login`, { ydata })
    .then(({ data }) => {
      console.log(data);
      if (data.token) {
        dispatch({ type: 'SIGN_IN', payload: data });
        localStorage.setItem('token', data.token);
        history.push('/app');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default SignIn;

/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import './login.css';
//PACKAGES
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  createMuiTheme,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//IMAGES
import Logo from '../../../images/logo_valleybeach_black.png';

//COMPONENTS
import SignIn from '../../../utils/redux/actions/authAction';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));
const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: { main: '#000' },
  },
  typography: {
    fontFamily: ['poppins', 'sans-serif'].join(','),
  },
});

const Login = ({ validateOnChange = true }) => {
  //   const classes = useStyles();
  const [errorsUser, setErrorsUser] = useState({});
  const [user, setUser] = useState({
    email: 'limpeza@gmail.com',
    password: 'password',
  });
  const [values, setValues] = useState({
    amount: '',
    password: 'password',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  //--------------------------------- validation ------------------------------/
  const validationUser = (fieldValues = user) => {
    const temp = { ...errorsUser };

    if ('email' in fieldValues) {
      // prettier-ignore
      temp.email = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(fieldValues.email) ? '' : 'Coloque um email válido';
    }

    if ('password' in fieldValues)
      temp.password = fieldValues.password ? '' : 'Campo Obrigatório';

    setErrorsUser({
      ...temp,
    });
    if (fieldValues == user) {
      return Object.values(temp).every((x) => x == '');
    }
    return false;
  };
  //--------------------------------------------------------------------------/

  const handleChangePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setUser({ ...user, [prop]: event.target.value });

    console.log(event.target.name, event.target.value);

    if (validateOnChange)
      validationUser({ [event.target.name]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForm = (e) => {
    e.preventDefault();

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateOnChange) validationUser({ [e.target.name]: e.target.value });

    const ydata = [
      {
        user,
      },
    ];

    if (validationUser()) {
      dispatch(SignIn(ydata, history));
    } else {
      console.log('not validated');
    }
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <div className='home'>
        <div className='home-left'>
          <img src={Logo} alt='' className='logo' />
          <div className='login-form'>
            <div className='titulo'>
              <h2>Bem Vindo à Checklist!</h2>
            </div>

            <form
              className='loginForm'
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit}
            >
              <TextField
                id='email'
                label='Email'
                variant='outlined'
                className='emailInput'
                value={user.email}
                name='email'
                onChange={handleForm}
                {...(errorsUser.email && {
                  error: true,
                  helperText: errorsUser.email,
                })}
              />
              <FormControl
                // className={clsx(classes.margin, classes.textField)}
                variant='outlined'
                {...(errorsUser.password && {
                  error: true,
                  // , helperText: errors.password
                })}
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  name='password'
                  onChange={handleChangePassword('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={80}
                />
                {errorsUser.password && (
                  <FormHelperText style={{ color: 'red' }}>
                    {errorsUser.password}
                  </FormHelperText>
                )}
              </FormControl>
            </form>
            <Button
              variant='contained'
              color='primary'
              className='btn'
              type='submit'
              onClick={handleSubmit}
            >
              Entrar
            </Button>
            {/* </Link> */}
          </div>
          <div className='bottom'></div>
        </div>
        <div className='home-right'></div>
      </div>
    </ThemeProvider>
  );
};

export default Login;

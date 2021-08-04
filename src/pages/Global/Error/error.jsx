import React from 'react';
import './error.css';
//PACKAGES
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
//COMPONENTS
import Logo from '../../../images/logo_valleybeach_black.png';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#000' },
    // secondary: 'green',
    // error: 'red',
  },
});

const Error404 = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='home'>
        <div className='error-left'>
          <img src={Logo} alt='' className='logo' />
          <main
            style={{
              textAlign: 'center',
            }}
          >
            <div className='titulo'>
              <h2>Whooops...</h2>
            </div>
            <div>
              <p>
                Este link não existe! Por favor volte á página de login e insira
                os seus dados para ter acesso.
              </p>
            </div>
            <Link to='/'>
              <Button variant='contained' color='primary' className='btn'>
                Voltar ao Login
              </Button>
            </Link>
          </main>
          <div className='bottom'>
            {/* <p>* Para mais informações, contacte o seu anfitrião.</p> */}
          </div>
        </div>
        <div className='error-right'>
          <div className='center404'></div>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default Error404;

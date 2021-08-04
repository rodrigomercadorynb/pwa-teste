/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import './apartamentos.css';

//PACKAGES
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, createMuiTheme } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { RiHotelLine } from 'react-icons/ri';
//ACTIONS
import GetApartamentos from '../../../utils/redux/actions/apartamentos/apartamentosAction';

//IMAGES

//COMPONENTS

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: { main: '#000' },
  },
  typography: {
    fontFamily: ['poppins', 'sans-serif'].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  btnNormal: {
    display: 'inline-block',
    width: 130,
    height: 130,
    borderRadius: '10px',
    margin: '10px',
  },
  btnActive: {
    display: 'inline-block',
    width: 130,
    height: 130,
    boxShadow: '0px 4px 8px 10px #ebebeb',
    borderRadius: '10px',
    margin: '10px',
  },
  btnNormalSmall: {
    display: 'inline-block',
    width: 130,
    height: 130,
    borderRadius: '10px',
    margin: '10px',
  },
  btnActiveSmall: {
    display: 'inline-block',
    width: 130,
    height: 130,
    boxShadow: '0px 4px 8px 10px #ebebeb',
    borderRadius: '10px',
    margin: '10px',
  },
}));

const Apartamentos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const unidades = useSelector((state) => state.apartamentos.apartamentos);

  const fetchApartamentos = () => {
    dispatch(GetApartamentos());
  };

  const handleChange = (e, value) => {
    // e.preventDefault();

    console.log(value);
    dispatch({ type: 'SET_APARTAMENTO', payload: value });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchApartamentos();
    dispatch({ type: 'SET_APARTAMENTO', payload: 0 });
  }, []);

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <h2 className='titulo'>Selecione o apartamento</h2>
      <br />
      {unidades &&
        unidades.map((unidade) => (
          <div className='unidade' key={unidade.id}>
            <span className='apartamento-titulo'>
              <h3>{unidade.descricao}</h3>
            </span>
            <div>
              {unidade &&
                unidade.listaapartamentos.map((apartamento) => (
                  <div key={apartamento.id}>
                    <Link to='/app/checklist'>
                      <Button
                        name={apartamento.slug + '-' + apartamento.id}
                        value={apartamento.id}
                        onClick={(e, value) =>
                          handleChange(e, (value = apartamento.id))
                        }
                        className={classes.btnNormal}
                      >
                        <div>
                          <RiHotelLine size='3em' />
                        </div>
                        <div>{apartamento.descricao}</div>
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </ThemeProvider>
  );
};

export default Apartamentos;

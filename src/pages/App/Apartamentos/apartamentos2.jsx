/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, Fragment } from 'react';
import './apartamentos.css';

//PACKAGES
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  createMuiTheme,
  Tooltip,
  TextField,
  IconButton,
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fade from '@material-ui/core/Fade';
import { FaBed } from 'react-icons/fa';
import { BiBuildingHouse } from 'react-icons/bi';
import SearchIcon from '@material-ui/icons/Search';
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
  alignItems: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Apartamentos = ({ windowDimensions }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const link = history.location.pathname;

  const [filter, setFilter] = useState('');
  const [checked, setChecked] = React.useState(false);

  const unidades = useSelector((state) => state.apartamentos.apartamentos);

  const fetchApartamentos = () => {
    dispatch(GetApartamentos());
  };

  const handleChange = (e, value) => {
    // e.preventDefault();
    e.preventDefault();

    setFilter(e.target.value);
    dispatch({ type: 'SET_APARTAMENTO', payload: value });
  };

  useEffect(() => {
    fetchApartamentos();
    dispatch({ type: 'SET_APARTAMENTO', payload: {} });
    dispatch({ type: 'RESET_CHECKLIST' });
  }, []);

  const handleChangeChecked = () => {
    setChecked((prev) => !prev);
  };

  const checkUnidade = (unidade) => {
    const apartamentos = unidade.listaapartamentos.filter((apartamento) =>
      apartamento.descricao.toLowerCase().includes(filter.toLowerCase())
    );
    if (apartamentos.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkFilter = (apartamento) => {
    if (Object.keys(apartamento).length > 0) {
      return apartamento.descricao.toLowerCase().includes(filter.toLowerCase());
    }
    return null;
  };

  const handleOpenChecklist = (e, apartamento) => {
    e.preventDefault();
    dispatch({ type: 'SET_APARTAMENTO', payload: apartamento });
    history.push(`${link}/${apartamento.id}`);
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      {/* <h2 className='titulo'>Selecione o apartamento</h2> */}
      <div className='searchContainer'>
        <div>
          <p className='tituloPagina'>Selecione um apartamento</p>
        </div>
        <div
          style={{ display: 'flex', height: '50px', justifyContent: 'center' }}
        >
          <div className='searchBox'>
            <FormControlLabel
              control={
                <>
                  <Tooltip
                    title={'Adicionar Reserva'}
                    style={{ height: '48px', marginRight: '-14px' }}
                  >
                    <IconButton
                      className={classes.iconButton}
                      onClick={handleChangeChecked}
                    >
                      <SearchIcon
                        className={classes.searchIcon}
                        checked={checked}
                      />
                    </IconButton>
                  </Tooltip>
                </>
              }
              // label='Show'
            />
            {checked == true ? (
              <div className={classes.container}>
                <Fade in={checked}>
                  <TextField
                    onChange={handleChange}
                    label='Pesquisar'
                    variant='standard'
                    className={classes.searchInput1}
                  />
                </Fade>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <br />
      {unidades &&
        unidades.map(
          (unidade) =>
            checkUnidade(unidade) && (
              <div className='unidade' key={unidade.id}>
                {unidade.listaapartamentos.length > 0 ? (
                  <span className='apartamento-titulo'>
                    <h3>{unidade.descricao}</h3>
                  </span>
                ) : null}
                <div className='listaReservas'>
                  {unidade &&
                    unidade.listaapartamentos.map(
                      (apartamento) =>
                        checkFilter(apartamento) && (
                          <Fragment key={apartamento.id}>
                            <div
                              className='reservaApartamentoCard'
                              onClick={(e) =>
                                handleOpenChecklist(e, apartamento)
                              }
                            >
                              <div className='reservaFotoApartamento'>
                                {apartamento.foto == null ? (
                                  <>
                                    {windowDimensions.width >= 800 ? (
                                      <div
                                        style={{
                                          height: '200px',
                                          width: '100%',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderBottom:
                                            '0.5px solid rgba(200, 200, 200, .6)',
                                        }}
                                      >
                                        <BiBuildingHouse size='5em' />
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          height: '110px',
                                          width: '100%',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderBottom:
                                            '0.5px solid rgba(200, 200, 200, .6)',
                                        }}
                                      >
                                        <BiBuildingHouse size='4em' />
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {windowDimensions.width >= 800 ? (
                                      <div
                                        style={{
                                          backgroundImage: `url(${apartamento.foto})`,
                                          backgroundPosition: 'center',
                                          backgroundSize: 'cover',
                                          backgroundRepeat: 'no-repeat',
                                          height: '200px',
                                          width: '100%',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          borderRadius: '5px 5px 0px 0px',
                                          borderBottom:
                                            '0.5px solid rgba(200, 200, 200, .6)',
                                        }}
                                      />
                                    ) : (
                                      <div
                                        style={{
                                          backgroundImage: `url(${apartamento.foto})`,
                                          backgroundPosition: 'center',
                                          backgroundSize: 'cover',
                                          backgroundRepeat: 'no-repeat',
                                          height: '110px',
                                          width: '100%',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          borderRadius: '5px 0px 0px 5px',
                                          borderBottom:
                                            '0.5px solid rgba(200, 200, 200, .6)',
                                        }}
                                      />
                                    )}
                                  </>
                                )}
                              </div>

                              <div className='reservaDescricao'>
                                <div
                                  className={classes.alignItems}
                                  style={{ marginBottom: '10px' }}
                                >
                                  <div style={{}}>
                                    <FaBed />
                                  </div>
                                  <div>
                                    <p
                                      style={{
                                        marginLeft: '5px',
                                      }}
                                    >
                                      {apartamento.descricao}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        )
                    )}
                </div>
              </div>
            )
        )}
    </ThemeProvider>
  );
};

export default Apartamentos;

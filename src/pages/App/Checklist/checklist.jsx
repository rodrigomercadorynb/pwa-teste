/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import './checklist.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

//PACKAGES
import { createMuiTheme, Button, TextField } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { blue, green } from '@material-ui/core/colors';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import { format } from 'date-fns';

//COMPONENTS
import ModalInfo from './components/modalInfo';
import ModalEnviar from './components/modalEnviar';

//ACTIONS
import GetChecklist from '../../../utils/redux/actions/checklist/checklistAction';
import AdicionarLimpeza from '../../../utils/redux/actions/checklist/adicionarLimpezaAction';

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
  btnActive: {
    display: 'inline-block',
    width: 140,
    height: 130,
    boxShadow: '0px 4px 8px 10px #ebebeb',
    borderRadius: '10px',
    margin: '10px',
  },
  btnActiveMobile: {
    display: 'inline-block',
    width: '80%',
    minHeight: '10vh',
    boxShadow: '0px 4px 8px 10px #ebebeb',
    borderRadius: '10px',
    margin: '10px',
  },
  btnTrue: {
    display: 'inline-block',
    width: 140,
    height: 130,
    boxShadow: '0px 4px 8px 10px #ebebeb',
    borderRadius: '10px',
    margin: '10px',
    background: 'lightgreen',
    '&:focus': {
      background: 'lightgreen',
    },
    '&:hover': {
      backgroundColor: '#7dd17d',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: '#7dd17d',
      },
    },
  },
  btnTrueMobile: {
    display: 'inline-block',
    width: '80%',
    minHeight: '10vh',
    boxShadow: '0px 4px 8px 10px #ebebeb',
    borderRadius: '10px',
    margin: '10px',
    background: 'lightgreen',
    '&:focus': {
      background: 'lightgreen',
    },
    '&:hover': {
      backgroundColor: '#7dd17d',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: '#7dd17d',
      },
    },
  },

  btnFalse: {
    display: 'inline-block',
    width: 140,
    height: 130,
    boxShadow: '0px 4px 8px 10px #ebebeb',
    borderRadius: '10px',
    margin: '10px',
    background: 'tomato',
    '&:focus': {
      background: 'tomato',
    },
    '&:hover': {
      backgroundColor: '#e6573e',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: '#e6573e',
      },
    },
  },
  btnFalseMobile: {
    display: 'inline-block',
    width: '80%',
    minHeight: '10vh',
    boxShadow: '0px 4px 8px 10px #ebebeb',
    borderRadius: '10px',
    margin: '10px',
    background: 'tomato',
    '&:focus': {
      background: 'tomato',
    },
    '&:hover': {
      backgroundColor: '#e6573e',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: '#e6573e',
      },
    },
  },

  alignItems: {
    display: 'flex',
    alignItems: 'center',
  },
  btnInfo: {
    color: theme.palette.getContrastText(blue[600]),
    backgroundColor: blue[600],
    '&:hover': {
      backgroundColor: blue[700],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: blue[600],
      },
    },
  },
  btnEnviar: {
    marginRight: '20px',
    color: 'white',
    backgroundColor: green[400],
    '&:hover': {
      backgroundColor: green[500],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: green[400],
      },
    },
  },
}));

const Checklist = ({ windowDimensions }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const link = history.location.pathname;
  const apartamentoId = link.split('/')[2];

  const [openInfo, setOpenInfo] = useState(false);
  const [openEnviar, setOpenEnviar] = useState(false);
  const [obsEnviar, setObsEnviar] = useState({
    observacoes: '',
  });

  const checklist = useSelector((state) => state.checklist);
  const tooltipInfo = useSelector((state) => state.checklist.tooltip);

  const apartamento = useSelector((state) => state.apartamentos.apartamento);

  const handleChange = (item) => {
    const itemIndex = checklist.checklist[0].listaitens.findIndex(
      (i) => i.id == item.id
    );

    if (checklist.checklist[0].listaitens[itemIndex].checked == null) {
      checklist.checklist[0].listaitens[itemIndex].checked = true;
    } else if (checklist.checklist[0].listaitens[itemIndex].checked == true) {
      checklist.checklist[0].listaitens[itemIndex].checked = false;
    } else if (checklist.checklist[0].listaitens[itemIndex].checked == false) {
      checklist.checklist[0].listaitens[itemIndex].checked = true;
    }

    const registo = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    checklist.checklist[0].listaitens[itemIndex].data = registo;

    dispatch({
      type: 'GET_CHECKLIST',
      // payload: { yData: produtos.yData, dropdown: produtos.dropdown },
      payload: {
        ...checklist,
        ...checklist.checklist,
      },
    });
  };

  useEffect(() => dispatch(GetChecklist()), []);

  //---------------------------------- MODAL ---------------------------------//
  const handleOpen = (btn, e) => {
    e.preventDefault();

    if (btn == 'info') {
      setOpenInfo(true);
    } else if (btn == 'enviar') {
      setOpenEnviar(true);
    }
  };

  const handleClose = (btn, e) => {
    e.preventDefault();

    if (btn == 'info') {
      setOpenInfo(false);
    } else if (btn == 'enviar') {
      setOpenEnviar(false);
    }
  };

  //------------------------------------------------------------------------//
  useEffect(() => {
    setErrorsObservações({});
    setObsEnviar({
      observacoes: '',
    });
  }, [openEnviar]);

  const allCheckedNull = () => {
    return (
      checklist &&
      checklist.checklist &&
      checklist.checklist[0] &&
      checklist.checklist[0].listaitens.find((item) => item.checked == null)
    );
  };

  // -------------------------- Validacao Observações --------------------//
  const [errorsObservacoes, setErrorsObservações] = useState({});

  const validationObservacoes = (fieldValues = obsEnviar) => {
    const temp = { ...errorsObservacoes };
    if ('observacoes' in fieldValues)
      temp.observacoes = fieldValues.observacoes ? '' : 'Campo Obrigatório';

    setErrorsObservações({
      ...temp,
    });
    if (fieldValues == obsEnviar) {
      return Object.values(temp).every((x) => x == '');
    }
    return false;
  };

  // -----------------------------------------------------------------------//

  const handleSubmit = (e) => {
    e.preventDefault();

    const allCheckedFalse = () => {
      return (
        checklist &&
        checklist.checklist &&
        checklist.checklist[0] &&
        checklist.checklist[0].listaitens.find((item) => item.checked == false)
      );
    };

    const listItems = Object.assign([
      ...checklist.checklist[0].listaitens.map(({ id, checked, data }) => ({
        itemId: id,
        checked,
        data,
      })),
    ]);

    const enviarDados = () => {
      const ydata = [
        {
          apartamentoId: apartamentoId,
          observacoes: obsEnviar.observacoes,
          items: listItems,
        },
      ];
      dispatch(AdicionarLimpeza(ydata))
        .then(() => handleClose('enviar', e))
        .then(() => history.push('/app'));
    };

    if (!allCheckedFalse()) {
      console.log('True e envia');
      enviarDados();

      // console.log(ydata);
    } else if (allCheckedFalse()) {
      if (validationObservacoes()) {
        console.log('False com justificação');
        enviarDados();
        // console.log(ydata);
      } else {
        console.log('Preencher form');
      }
    }
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <ModalInfo
        openInfo={openInfo}
        handleClose={handleClose}
        tooltipInfo={tooltipInfo}
      />
      <ModalEnviar
        openEnviar={openEnviar}
        handleClose={handleClose}
        obsEnviar={obsEnviar}
        setObsEnviar={setObsEnviar}
        handleSubmit={handleSubmit}
        validationObservacoes={validationObservacoes}
        errorsObservacoes={errorsObservacoes}
        setErrorsObservações={setErrorsObservações}
      />
      <div className='topChecklist'>
        <div className='backBtnPosition'>
          <Link to={`/app`} className='link-btn'>
            <Button variant='outlined' className='back-btn'>
              <ChevronLeftIcon />
            </Button>
          </Link>
        </div>
        <div className='reservaTitulo'>
          <h2>
            <b>
              {apartamento
                ? apartamento.descricao
                : 'Apartamento' + apartamentoId}
            </b>{' '}
          </h2>
        </div>
      </div>
      <div className='limpeza-btn-info'>
        <Button
          onClick={(e) => handleOpen('info', e)}
          className={classes.btnInfo}
          style={{ marginRight: '20px' }}
        >
          <AiOutlineInfoCircle style={{ color: 'white' }} size='1.6em' />
        </Button>
      </div>

      <div className='items-cards'>
        {checklist &&
          checklist.checklist &&
          checklist.checklist[0] &&
          checklist.checklist[0].listaitens &&
          checklist.checklist[0].listaitens.map((item) => (
            <span key={item.id}>
              {windowDimensions.width > 800 ? (
                <Button
                  className={
                    item.checked == null
                      ? classes.btnActive
                      : item.checked == true
                      ? classes.btnTrue
                      : classes.btnFalse
                  }
                  onClick={() => handleChange(item)}
                >
                  {item.descricao}
                </Button>
              ) : (
                <Button
                  className={
                    item.checked == null
                      ? classes.btnActiveMobile
                      : item.checked == true
                      ? classes.btnTrueMobile
                      : classes.btnFalseMobile
                  }
                  onClick={() => handleChange(item)}
                >
                  {item.descricao}
                </Button>
              )}
            </span>
          ))}
      </div>

      <div className='limpeza-btns'>
        {!allCheckedNull() ? (
          <Button
            onClick={(e) => handleOpen('enviar', e)}
            className={classes.btnEnviar}
          >
            <p style={{ marginRight: '10px' }}>Enviar</p>{' '}
            <IoSend style={{ color: 'white' }} size='1.4em' />
          </Button>
        ) : (
          <Button disabled className={classes.btnEnviar}>
            <p style={{ marginRight: '10px' }}>Enviar</p>{' '}
            <IoSend style={{ color: '#388e3c' }} size='1.4em' />
          </Button>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Checklist;

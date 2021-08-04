/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

//COMPONENTS

// PACKAGES
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button, TextField } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

// ACTIONS
// import AdicionarEncomenda from '../../../../../../utils/redux/actions/reservas/reserva/adicionarEncomendaAction';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 6, 5),
    maxWidth: '600px',
    width: '600px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '80vh',
    margin: 15,
  },
  btnConfirmar: {
    width: '48%',
    height: '50px',
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[400],
    '&:hover': {
      backgroundColor: green[500],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: green[400],
      },
    },
  },
  btnCancelar: {
    width: '48%',
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: red[500],
      },
    },
  },
  modalBtns: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-evenly',
    height: '50px',
  },
}));

const ModalEnviar = ({
  openEnviar,
  handleClose,
  handleSubmit,
  obsEnviar,
  setObsEnviar,
  validateOnChange = true,
  errorsObservacoes = null,
  validationObservacoes,
  setErrorsObservações,
}) => {
  const classes = useStyles();

  const handleChangeObservacoes = (e) => {
    e.preventDefault();

    setObsEnviar({
      ...obsEnviar,
      [e.target.name]: e.target.value,
    });

    if (validateOnChange)
      validationObservacoes({ observacoes: e.target.value });
  };

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openEnviar}
        onClose={(e) => handleClose('enviar', e)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEnviar}>
          <>
            <div className={classes.paper}>
              <div className='header-modal'>
                <h2 id='transition-modal-title' className='titulo-modal'>
                  Enviar Checklist
                </h2>
                {/* <p
                  id='transition-modal-description'
                  className='descricao-modal'
                >
                  Pode ver a reserva <b>{reserva.id}</b>, expirada aquando ao
                  checkOut de um cliente
                </p> */}
              </div>

              <div className='form-add-apartamento'>
                <div className='infoReservaP' style={{ marginTop: '0px' }}>
                  <p>
                    Tem a certeza que quer enviar a seguinte informação para o
                    sistema?
                  </p>
                </div>
                <div className='input-obs'>
                  <TextField
                    id='observacoes'
                    name='observacoes'
                    label='Observações'
                    multiline
                    // variant='outlined'
                    // color='primary'
                    // value={categoria.descricao}
                    onChange={handleChangeObservacoes}
                    fullWidth
                    autoComplete='off'
                    className='nome'
                    // style={{ marginBottom: 8, marginRight: '4%' }}
                    {...(errorsObservacoes.observacoes && {
                      error: true,
                      helperText: errorsObservacoes.observacoes,
                    })}
                  />
                </div>
              </div>

              <br />
              <div className={classes.modalBtns}>
                <Button className={classes.btnConfirmar} onClick={handleSubmit}>
                  Confirmar
                </Button>
                <Button
                  className={classes.btnCancelar}
                  onClick={(e) => handleClose('enviar', e)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalEnviar;

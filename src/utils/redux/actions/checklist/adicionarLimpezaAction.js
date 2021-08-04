import Instance from '../../../Axios';

const AdicionarLimpeza = (ydata) => async (dispatch) => {
  console.log(ydata);
  await Instance()
    .post('/checklist', { ydata })
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: 'POST_CHECKLIST', payload: data });
      //   show('success', 'Foram associados novos funcionários á obra');
    })
    .catch((err) => {
      // eslint-disable-next-line eqeqeq
      if (err.response.status != 200) {
        // show('warning', 'Preencha todos os campos');
        console.log(err);
      }
    });
};

export default AdicionarLimpeza;

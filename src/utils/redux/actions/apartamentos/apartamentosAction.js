import Instance from '../../../Axios';

// New Actions for the app

const GetApartamentos = () => async (dispatch) => {
  await Instance()
    .get(`/checklist/apartamentos`)
    .then(({ data }) => {
      dispatch({ type: 'GET_APARTAMENTOS', payload: data.yData });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default GetApartamentos;

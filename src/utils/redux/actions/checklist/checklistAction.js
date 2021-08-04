import Instance from '../../../Axios';

// New Actions for the app

const GetChecklist = () => async (dispatch) => {
  await Instance()
    .get(`/checklist/items`)
    .then(({ data }) => {
      dispatch({ type: 'GET_CHECKLIST', payload: data.yData });
      dispatch({
        type: 'GET_CHECKLIST_INITIALSTATE',
        payload: data.initialState,
      });
      dispatch({ type: 'GET_CHECKLIST_TOOLTIP', payload: data.tooltipInfo });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default GetChecklist;

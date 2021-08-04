import { checklistInitialState } from '../initialState/checklist';

const checklistReducer = (state = checklistInitialState, { type, payload }) => {
  switch (type) {
    case 'GET_CHECKLIST':
      return {
        ...state,
        checklist: payload,
      };
    case 'GET_CHECKLIST_INITIALSTATE':
      return {
        ...state,
        initialState: payload,
      };
    case 'GET_CHECKLIST_TOOLTIP':
      return {
        ...state,
        tooltip: payload,
      };
    case 'POST_CHECKLIST':
      return {
        ...state,
        novalimpeza: payload,
      };
    case 'RESET_CHECKLIST':
      return {
        ...state,
        checklist: {},
        initialState: {},
      };

    default:
      return state;
  }
};

export default checklistReducer;

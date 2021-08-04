import { apartamentosInitialState } from '../initialState/apartamentos';

const apartamentosReducer = (
  state = apartamentosInitialState,
  { type, payload }
) => {
  switch (type) {
    case 'GET_APARTAMENTOS':
      return {
        ...state,
        apartamentos: payload,
      };
    case 'SET_APARTAMENTO':
      return {
        ...state,
        apartamento: payload,
      };

    default:
      return state;
  }
};

export default apartamentosReducer;

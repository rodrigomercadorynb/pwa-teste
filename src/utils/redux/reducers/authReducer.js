import { authInitialState } from '../initialState/auth';

const authReducer = (state = authInitialState, { type, payload }) => {
  switch (type) {
    case 'SIGN_IN':
      return {
        ...state,
        nome: payload.user.nome,
        // id: payload.user.id,
        // role: payload.user.perfis_id,
        // nome: payload.user.nome,
      };
    default:
      return state;
  }
};

export default authReducer;

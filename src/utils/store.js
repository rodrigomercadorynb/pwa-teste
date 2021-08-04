import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//REDUCERS
import {
  authReducer,
  apartamentosReducer,
  checklistReducer,
} from './redux/reducers/index';

const reducer = combineReducers({
  user: authReducer,
  apartamentos: apartamentosReducer,
  checklist: checklistReducer,
});

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };

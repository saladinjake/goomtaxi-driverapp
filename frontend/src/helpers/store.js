import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),

//   )
// );
// window.store = store;

// store.subscribe(() => {
//   localStorage.setItem('store', JSON.stringify(store.getState()));
// });

// export default store;

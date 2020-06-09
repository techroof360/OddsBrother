import { createStore, applyMiddleware, compose   } from "redux";
 // import { composeWithDevTools } from "redux-devtools-extension";
 import thunk from "redux-thunk";
//  import logger from 'redux-logger';
 import rootReducer from "./reducers/rootReducer";
 
 const middleware = [thunk];
 const initialState = {};
 
 const store = createStore(
   rootReducer,
   initialState,
   compose(
     applyMiddleware(...middleware),
        //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
   )
   // composeWithDevTools(applyMiddleware(...middleware, logger))
 );
 
 export default store;
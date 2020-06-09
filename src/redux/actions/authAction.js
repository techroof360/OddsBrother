import axios from "axios";
import {baseUrl} from './baseUrl'
import {toast} from 'react-toastify'


// Check token & load user
export const loadUser = (data) => (dispatch, getState) => {
  //  console.log('data bearer', data)
    // User loading
    // dispatch({ type:"USER_LOADING" });
    const token = {
      headers:{
      'Authorization': 'Bearer ' +data,
     'Accept': 'application/json'
      }
    }
    axios
      .get(baseUrl +'/user', token)
      .then(res =>  { 
        //  alert('load user')
  // console.log('responce load user', res.data)
        dispatch({
          type: "USER_LOADED",
          payload: res.data
        })
      }
      )
      .catch(err => {
        //  console.log('err auth', err)
        // dispatch(returnErrors(err.response.data, err.response.status));
        // dispatch({
        //   type: "AUTH_ERROR"
        // });
      });
  };
  
  // Register User
  export const register = (data) => dispatch => {
      // console.log('register', data)
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios
      .post(baseUrl + '/register', data)
      .then(res =>
        {
          toast.success('Register Successfully');
          dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data
        })}
     
      )
      .catch(err => {
          // console.log('register err', err)
        // dispatch(
        //   returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        // );
        dispatch({
          type: "REGISTER_FAIL"
        });
      });
  };
  
  // Login User
  export const login = (data) => dispatch => {
    // console.log('login data', data)
    // Headers
 
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios
      .post(baseUrl + '/login', data, config)
      
      .then(res =>
     {    
        //  console.log('login success here', res.data.token);
        toast.success('login Successfully');
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data
        })}
      )
      .catch(err => {
        // dispatch(
        //   returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        // );
        // console.log('error login', err)
        toast.error('Invalid Credentials')
        dispatch({
          type: "LOGIN_FAIL"
        });
      });
  };
  
  // Logout User
  export const logout = ()=> dispatch => {
 
      dispatch({
        type: "LOGOUT_SUCCESS",
      })
      

  };
  
  // Setup config/headers and token
  export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
  };
  
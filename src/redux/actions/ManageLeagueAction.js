import axios from 'axios'
import {baseUrl} from './baseUrl'
import { toast } from 'react-toastify';
export const addLeague = data => dispatch => {
    console.log('action league', data)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .post(baseUrl +"/add_league", data, config)
      .then(res => {
        if (res.data.success == false) {
          // console.log('error')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          // console.log('res success', res.data)
          toast.success( res.data.response)
          dispatch({ type: "ADD_ITEM",  payload: data });
          // dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      })
      .catch(err => {
        console.log('e')
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: "Error While Saving Data" });
      });
  };
  
//@route   GET add_League
//@desc    Get League
//@access  Public
  export const getLeague = () => dispatch => {
   
    axios
      .get(baseUrl+"/add_league")
      .then(res => {
        if (res.data.success == false) {
          // console.log('error')
          // alert('success false')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          // console.log('success league', res.data)
          
           dispatch({ type: "GET_LEAGUE", payload: res.data });
          //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      }
      )
      .catch(
        err => {
          toast.error("Server Error")
          // console.log("server error", err)
      
      }
        // dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  export const deleteLeague = id => dispatch => {
    
    axios
      .delete(baseUrl+`/add_league/${id}`)
      .then(res =>
       { if (res.data.success == false) {
          // console.log('error')
          toast.error(res.data.response);
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          //  console.log('success league delete', res.data)
          toast.success(res.data.response);
           dispatch({ type: "DELETE_ITEM", payload: id });
          //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }}
      )
      .catch(err =>
        // console.log('server err', err);
        toast.error("Server Error")
        // dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  export const updateLeague = ( data) => dispatch => {
  
    // console.log(' id', data.id )
    // console.log(' data', data )


    axios
      .post(baseUrl+`/add_league/${data.id}`, data)
      .then(res =>
       { if (res.data.success == false) {
          // console.log('error')
          toast.error("Something went Wrong");
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          //  console.log('updated', res.data)
           toast.success(res.data.response);
           dispatch({ type: "EDIT_ITEM", payload: data });
          // dispatch({ type: "GET_LEAGUE", payload: res.data.response });
          //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }}
      )
      .catch(err =>
   {   
      // console.log('server err', err)
        toast.error("Server Error")}

        // dispatch(returnErrors(err.response.data, err.response.status))
      );
  };
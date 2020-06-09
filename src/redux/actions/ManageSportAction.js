import axios from 'axios';
import {baseUrl} from './baseUrl';
import {toast} from 'react-toastify'
export const addSport = data => dispatch => {
  // console.log('data sport', data)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post(baseUrl +"/add_sport", data, config)
    .then(res => {
      if (res.data.success == false) {
        // console.log('error')
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        // console.log('res success', res.data)
        toast.success(res.data.response);
        dispatch({ type: "ADD_ITEM",  payload: data });
        // dispatch({ type: "ADD_ORDERS_SUCCESS", msg: res.data.message });
        // dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
      }
    })
    .catch(err => {
      // console.log(err)
      // dispatch({ type: "ADD_ORDERS_ERROR", msg: "Error While Saving Data" });
     });
  };
  

  //@route   GET add_sport
//@desc    Get Sp
//@access  Public
  export const getSport = () => dispatch => {
   
    axios
      .get(baseUrl+"/add_sport")
      .then(res => {
        if (res.data.success == false) {
          // console.log('error')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          // console.log('success sport', res.data)
          
           dispatch({ type: "GET_SPORTS", payload: res.data });
          //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      }
      )
      .catch(
        err => {
          // console.log("server error", err)
      
      }
        // dispatch(returnErrors(err.response.data, err.response.status))
      );
  };


  // Delete Sport
export const deleteSport = id => dispatch => {
  // console.log('id', id)
axios
  .delete(baseUrl+`/add_sport/${id}`)
  .then(res =>
   { if (res.data.success == false) {
      // console.log('error')
      toast.error(res.data.response);
      // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
    } else {
      //  console.log('success league delete', res.data)
      toast.success(res.data.response);
      dispatch({ type: "DELETE_ITEM", payload: id });
      //  dispatch({ type: "GET_LEAGUE", payload: res.data.response });
      //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
    }}
  )
  .catch(err =>
    // console.log('server err', err);
    toast.error("Server Error")
    // dispatch(returnErrors(err.response.data, err.response.status))
  );
};


export const updateSport = ( data) => dispatch => {
  
  // console.log(' id', data.id )
  // console.log(' data', data )

  axios
    .post(baseUrl+`/add_sport/${data.id}`, data)
    .then(res =>
     { if (res.data.success == false) {
        // console.log('error')
        toast.error("Something went Wrong");
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        //  console.log('updated', res)
        toast.success(res.data.response);
         dispatch({ type: "EDIT_ITEM", payload: data });
        // dispatch({ type: "GET_LEAGUE", payload: res.data.response });
        //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
      }}
    )
    .catch(err =>
 {   
    //  console.log('server err', err)
      toast.error("Server Error")}

      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};
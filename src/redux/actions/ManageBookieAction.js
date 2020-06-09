import axios from 'axios';
import {baseUrl} from './baseUrl';
import { toast } from "react-toastify";
export const addBookie = data => dispatch => {
    // console.log('action Bookie', data)
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };
    axios
      .post(baseUrl +"/add_bookie", data)
      .then(res => {
        if (res.data.success === false) {
          // console.log('error')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          // console.log('res success', res.data)
          toast.success("Bookie Added Succesfully");
          dispatch({ type: "ADD_ITEM",  payload: data });
          // dispatch({ type: "ADD_ORDERS_SUCCESS", msg: res.data.message });
          // dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      })
      .catch(err => {
        console.log('e')
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: "Error While Saving Data" });
      });
  };


//@route   GET add_bookie
//@desc    Get bookie
//@access  Public
export const getBookie = () => dispatch => {
   
  axios
    .get(baseUrl+"/add_bookie")
    .then(res => {
      if (res.data.success === false) {
        // console.log('error')
        // alert('success false')
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        //  console.log('success bookies', res.data)
        
         dispatch({ type: "GET_BOOKIES", payload: res.data });
        //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
      }
    }
    )
    .catch(
      err => {
        console.log("e")
    
    }
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};


// Delete Bookie
export const deleteBookie = id => dispatch => {
  // console.log('id', id)
axios
  .delete(baseUrl+`/add_bookie/${id}`)
  .then(res =>
   { if (res.data.success === false) {
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

// update bookie
export const updateBookie = ( id, data) => dispatch => {
  
   console.log(' id', id )
   console.log(' data', data )


  axios
    .post(baseUrl+`/add_bookie/${id.id}`, data)
    .then(res =>
     { if (res.data.success === false) {
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
    //  console.log('server err', err)
      toast.error("Server Error")}

      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};
import axios from "axios";
import {baseUrl} from './baseUrl'
import {toast} from 'react-toastify'
// Add Bit
export const addBit = data =>  dispatch => {
  
    console.log('action bit', data)
   const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post(baseUrl +"/add_bets", data)
    .then(res => {
      if (res.data.success === false) {
        // console.log('error')
         dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        toast.success(res.data.response)
         console.log('res success', res.data)
        dispatch({ type: "ADD_ITEM",  payload: data });
        // dispatch({ type: "ADD_ORDERS_SUCCESS", msg: res.data.message });
        // dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
      }
    })
    .catch(err => {
      // console.log('serer',err)
      toast.error('Server Error')
      // dispatch({ type: "ADD_ORDERS_ERROR", msg: "Error While Saving Data" });
    });
};


//@route   GET add_Bit
//@desc    Get Bit
//@access  Public
export const getBit = () => dispatch => {
   
  axios
    .get(baseUrl+"/add_bets")
    .then(res => {
      if (res.data.success === false) {
        // console.log('error')
        alert('success false')
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        //  console.log('success league', res.data)
         dispatch({ type: "GET_BETS", payload: res.data });
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
// Delete Bit
export const deleteBet = id => dispatch => {
    console.log('id', id)
  axios
    .delete(baseUrl+`/add_bets/${id}`)
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

// manage update Bets
export const updateBets = (id,data )=> dispatch => {
   console.log('update bets id ', id.id)
   console.log('update bets formdata', data)
  axios
    .post(baseUrl+`/add_bets/${id.id}`, data)
    .then(res =>
     { if (res.data.success === false) {
        // console.log('error')
        toast.error("Something went Wrong");
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
         
        toast.success(res.data.response);
        dispatch({ type: "GET_BETS", payload: res.data });
        //  dispatch({ type: "GET_LEAGUE", payload: res.data.response });
        //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
      }}
    )
    .catch(err =>
      console.log('e', err)
      // toast.error("Server Error")

      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// manage update Bets
export const updateBetsStatus = (data , id )=> dispatch => {
 
  // console.log('update bets status id ', id)
  // console.log('update bets status formdata', data)

  let newData = { status:id }
  // console.log('newData', newData)

 axios
   .post(baseUrl+`/update_bet_status/${data.id}`, newData)
   .then(res =>
    { if (res.data.success === false) {
       // console.log('error')
       toast.error("Something went Wrong");
       // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
     } else {
        // console.log('updated', res.data)
       toast.success(res.data.response);
      // dispatch({ type: "GET_BITS_STATUS", payload: id });
       //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
     }}
   )
   .catch(err =>
     console.log('e', err)
     // toast.error("Server Error")

     // dispatch(returnErrors(err.response.data, err.response.status))
   );
};
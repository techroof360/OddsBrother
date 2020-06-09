import axios from 'axios';
import {baseUrl} from './baseUrl';
import {toast} from 'react-toastify';
export const addBonus = data => dispatch => {
    console.log('action Bonus', data)
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };
    axios
      .post(baseUrl +"/add_bonus", data )
      .then(res => {
        // console.log(res.data.request)
        if (res.data.success === false) {
          // console.log(' err')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          // console.log('success',res.data )
          toast.success(res.data.response);
          dispatch({ type: "ADD_ITEM",  payload: data });
          // dispatch({ type: "ADD_ORDERS_SUCCESS", payload: res.data });
          //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      })
      .catch(err => {
        console.log('catch err',err)
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: "Error While Saving Data" });
      });
  };


  //@route   GET add_bonus
//@desc    Get bounce
//@access  Public
export const getBonus = () => dispatch => {
   
  axios
    .get(baseUrl+"/add_bonus")
    .then(res => {
      if (res.data.success === false) {
        // console.log('error')
        // alert('success false')
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        // console.log('success bounce', res.data)
        
         dispatch({ type: "GET_BONUS", payload: res.data });
        //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
      }
    }
    )
    .catch(
      err => {
        console.log("server error")
    
    }
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};




// Delete Bonus
export const deleteBounces = id => dispatch => {
  // console.log('id', id)
axios
  .delete(baseUrl+`/add_bonus/${id}`)
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


// manage update Bonus
export const updateBonus = ( data , id )=> dispatch => {
  //  console.log('update id', id.id)
    //  console.log('update data', data)
  axios
    .post(baseUrl+`/add_bonus/${id.id}`, data)
    .then(res =>
     { if (res.data.success === false) {
        // console.log('error')
        toast.error("Something went Wrong");
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        //  console.log('updated', res.data)
        toast.success(res.data.response);
        dispatch({ type: "EDIT_ITEM", payload: data });
        //  dispatch({ type: "GET_LEAGUE", payload: res.data.response });
        //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
      }}
    )
    .catch(err =>
      // console.log('server err', err),
      toast.error("Server Error")
      

      // dispatch(returnErrors(err.response.data, err.response.status))
    );
 };
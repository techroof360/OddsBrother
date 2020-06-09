
import axios from 'axios'
import {baseUrl} from './baseUrl';
import {toast} from 'react-toastify'
export const addArticalAction = data => dispatch => {
    //  console.log('action  artical data', data)
     // console.log('action league', data)
    //  const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };
    axios
      .post(baseUrl +"/add_artical", data)
      .then(res => {
        if (res.data.success === false) {
          console.log('error')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          // console.log('res success', res.data)
          toast.success(res.data.response);
          dispatch({ type: "ADD_ITEM",  payload: data });
          // dispatch({ type: "ADD_ORDERS_SUCCESS", payload: res.data });
          // dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      })
      .catch(err => {
        console.log(err)
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: "Error While Saving Data" });
      });
  };


  //@route   GET add_artical
//@desc    Get Artical
//@access  Public
export const getArtical = () => dispatch => {
   
  axios
    .get(baseUrl+"/add_artical")
    .then(res => {
      if (res.data.success === false) {
        // console.log('error')
        alert('success false')
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        // console.log('success articals', res.data)
        
         dispatch({ type: "GET_ARTICAL", payload: res.data });
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

// Delete Artical
export const deleteArtical = id => dispatch => {
  // alert('delete')
  // console.log('id', id)
axios
  .delete(baseUrl+`/add_artical/${id}`)
  .then(res =>
   { if (res.data.success === false) {
      // console.log('error')
      toast.error(res.data.response);
      // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
    } else {
      dispatch({ type: "DELETE_ITEM", payload: id });
      //  console.log('success league delete', res.data)
      toast.success(res.data.response);
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


// manage update Artical
export const updateArtical = ( data , id )=> dispatch => {
    // console.log('update id', id)
    //  console.log('update data', data.id)
  axios
    .post(baseUrl+`/add_artical/${data.id}`, id)
    .then(res =>
     { if (res.data.success === false) {
        // console.log('error')
        toast.error("Something went Wrong");
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
      } else {
        //  console.log('updated', res.data)
        toast.success(res.data.response);
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
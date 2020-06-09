import axios from 'axios';
import {baseUrl} from './baseUrl';
import {toast} from 'react-toastify'
export const addBanner = data => dispatch => {
    //  console.log('action banner', data)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .post(baseUrl+"/add_banner", data , config)
      .then(res => {
        // console.log(res.data.request)
        if (res.data.success == false) {
          // console.log('error')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          // console.log('success', res.data)
          dispatch({ type: "ADD_ITEM",  payload: data });
           toast.success(res.data.response);
        
          //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      })
      .catch(err => {
        // console.log(err)
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: "Error While Saving Data" });
      });
  };

//@route   GET add_banner
//@desc    Get Banners
//@access  Public

  export const getBanners = () => dispatch => {
   
    axios
      .get(baseUrl+"/add_banner")
      .then(res => {
        if (res.data.success == false) {
          // console.log('error')
          // alert('success false')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
          // console.log('success', res.data)
          
           dispatch({ type: "GET_BANNERS", payload: res.data });
          //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      }
      )
      .catch(
        err => {
          // toast.error('Server Error')
          // console.log("error", err)
        // alert('server errs')
      }
        // dispatch(returnErrors(err.response.data, err.response.status))
      );
  };


  // Delete Banner
export const deleteBanner = id => dispatch => {
  // console.log('id', id)
axios
  .delete(baseUrl+`/add_banner/${id}`)
  .then(res =>
   { if (res.data.success == false) {
      // console.log('error')
      toast.error(res.data.response);
      // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
    } else {
      //  console.log('success league delete', res.data)
      dispatch({ type: "DELETE_ITEM", payload: id });
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
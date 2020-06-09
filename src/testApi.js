import React from 'react'
import axios from 'axios'
export default function TestApi() {

    
 const addLeague = ()=> {
     
    //  alert('sned')

  
    // console.log('action league', data.id)
    axios
      .post("https://ahs.ranksol.com/nimble_email/api/deleteData/", {id:656} )
      .then(res => {
      
        if (res.data.success == false) {
            console.log('errorr')
          // dispatch({ type: "ADD_ORDERS_ERROR", msg: res.data.message });
        } else {
            console.log('res',res.data)
          // dispatch({ type: "ADD_ORDERS_SUCCESS", msg: res.data.message });
          //  dispatch({ type: "ADD_ORDERS_SUCCESS", msg:'success' });
        }
      })
      .catch(err => {
        console.log(err)
        // dispatch({ type: "ADD_ORDERS_ERROR", msg: "Error While Saving Data" });
      });
  };
  
    return (
        <div>
            <button onClick={()=>addLeague()}>send</button>
        </div>
    )
}

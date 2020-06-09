const initState = {

manageBits:[],
errorBets:"",
status:''
};

const betsReducer = (state = initState, action) =>{
  switch(action.type){
      case "GET_BETS":
          return {
          ...state,
          manageBits:action.payload,
          errorBets:null
          }
          case "GET_BETSS_ERROR" :
          return {
          ...state,
          manageBits:[],
          errorBets:"error while loading data"
          }
          case "DELETE_ITEM":
            return {
              ...state,
              manageBits: state.manageBits.filter(item => item.id !== action.payload)
            };
          case "ADD_ITEM":
            return{
                ...state,
                manageBits:[action.payload, ...state.manageBits]
              }
          // case "GET_BITS_STATUS":{
          //   return {
          //     ...state,
          //     status:action.payload
          //   }
          // }
          default : return state
  }
  }
  export default betsReducer
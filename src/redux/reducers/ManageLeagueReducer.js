const initState = {
    league:[],
    errorLeague:'',
    loading:true
}

const leagueReducer = (state = initState, action) =>{
switch(action.type){
    case "GET_LEAGUE":
        return {
        ...state,
        league: action.payload,
        errorLeague:null
        }
        case "GET_LEAGUE_ERROR" :
        return {
        ...state,
        league:[],
        errorLeague:"error while loading data"
        }
        case "ADD_ITEM":
          return{
            ...state,
            league:[action.payload, ...state.league]
          }
        case "DELETE_ITEM":
      return {
        ...state,
        league: state.league.filter(item => item.id !== action.payload)
      };
      case "EDIT_ITEM":
   
        let edit = state.league.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
        return{
          ...state,
          league:edit
        }
        default : return state
}
}
export default leagueReducer
const initState = {
    banners:[],
    errorBanners:'',
    loading:true
}

const bannerReducer = (state = initState, action) =>{
switch(action.type){
    case "GET_BANNERS":
        return {
        ...state,
        banners:  action.payload,
        errorSports:null
        }
        case "GET_BANNERS_ERROR" :
        return {
        ...state,
        banners:[],
        errorSports:"error while loading data"
            }
            case "DELETE_ITEM":
                return {
                  ...state,
                  banners: state.banners.filter(item => item.id !== action.payload)
                };
                case "ADD_ITEM":
                  return{
                    ...state,
                    banners:[action.payload, ...state.banners]
                  }
        default : return state
}

}
export default bannerReducer
import img from '../../images/nfl.jpg'
const initState = {
    // articals:[{title: "title",heading: "heading",category: "category",file:"img",leagueName: "league name", oddsText: "odds text"} ,
    // {title: "title",heading: "heading",category: "category",file:"img",leagueName: "league name", oddsText: "odds text"} ,
    // {title: "title",heading: "heading",category: "category",file:"img",leagueName: "league name", oddsText: "odds text"} ,
    // {title: "title",heading: "heading",category: "category",file:"img",leagueName: "league name", oddsText: "odds text"} ,
    // {title: "title",heading: "heading",category: "category",file:"img",leagueName: "league name", oddsText: "odds text"} ,
    // {title: "title",heading: "heading",category: "category",file:"img",leagueName: "league name", oddsText: "odds text"} ,
    // {title: "title",heading: "heading",category: "category",file:"img",leagueName: "league name", oddsText: "odds text"} ],
    errorBonus:'',
    loading:true,
    articals:[]
}

const articalReducer = (state = initState, action) =>{
switch(action.type){
    case "GET_ARTICAL":
        return {
        ...state,
        articals:action.payload,
        errorArticals:null
        }
    case "GET_ARTCAL_ERROR" :
        return {
        ...state,
        articals:[],
        errorArticals:"error while loading data"
        }
        case "DELETE_ITEM":
           
      return {
        ...state,
        articals: state.articals.filter(item => item.id !== action.payload)
      };
      case "ADD_ITEM":
        return{
          ...state,
          articals:[action.payload, ...state.articals]
        }
        default : return state
}

}
export default articalReducer
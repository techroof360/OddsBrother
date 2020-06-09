import img from "../../images/nfl.jpg";
const initState = {
  // bookies:[{name: "Mujahid Iqbal", url_registration:"www.urlRegistration.com", image:{img}, url_home:'www.url.home'}, {name: "M", url_registration:"www.urlRegistration.com", image:{img}, url_home:'www.url.home'} ],
  errorBookie: "",
  loading: true,
  bookies: [],
};

const bookieReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_BOOKIES":
      return {
        ...state,
        bookies: action.payload,
        errorBookie: null,
      };
    case "GET_SPORTS_ERROR":
      return {
        ...state,
        bookies: [],
        errorBookie: "error while loading data",
      };
    case "DELETE_ITEM":
      return {
        ...state,
        bookies: state.bookies.filter((item) => item.id !== action.payload),
      };
      case "ADD_ITEM":
        return{
          ...state,
          bookies:[action.payload, ...state.bookies]
        }
    case "EDIT_ITEM":
      let edit = state.bookies.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        bookies: edit,
      };
    default:
      return state;
  }
};
export default bookieReducer;

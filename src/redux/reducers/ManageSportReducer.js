const initState = {
  sports: [],
  errorSports: "",
  loading: true,
};

const sportReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SPORTS":
      return {
        ...state,
        sports: action.payload,
        errorSports: null,
      };
    case "GET_SPORTS_ERROR":
      return {
        ...state,
        sports: [],
        errorSports: "error while loading data",
      };
      case "ADD_ITEM":
        return{
          ...state,
          sports:[action.payload, ...state.sports]
        }
    case "DELETE_ITEM":
      return {
        ...state,
        sports: state.sports.filter((item) => item.id !== action.payload),
      };
    case "EDIT_ITEM":
      let edit = state.sports.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        sports: edit,
      };
    default:
      return state;
  }
};
export default sportReducer;

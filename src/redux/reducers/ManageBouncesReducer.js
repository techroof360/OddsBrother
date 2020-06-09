import img from "../../images/nfl.jpg";
const initState = {
  // bonus:[{rank: "1",title: "Junior Developer",affiliateUrlHome: "url home", affiliateUrlReg: "url registraion",turnover: "1",odds: "1",bonusText: "bouns text",bookieId: "1"} ],
  errorBonus: "",
  loading: true,
  bonus: [],
};

const bonusReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_BONUS":
      return {
        ...state,
        bonus: action.payload,
        errorBookie: null,
      };
    case "GET_BONUS_ERROR":
      return {
        ...state,
        bonus: [],
        errorBonus: "error while loading data",
      };
    case "ADD_ITEM":
      return {
        ...state,
        bonus: [action.payload, ...state.bonus],
      };
    case "DELETE_ITEM":
      return {
        ...state,
        bonus: state.bonus.filter((item) => item.id !== action.payload),
      };
    case "EDIT_ITEM":
      let edit = state.bonus.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        bonus: edit,
      };
    default:
      return state;
  }
};
export default bonusReducer;

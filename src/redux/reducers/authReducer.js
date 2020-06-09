
  
  const initialState = {
    token: null,
    isAuthenticated: null,
    isLoading: false,
    user: "",
    type:"",
  };
  
  export default function(state = initialState, action) {
      
    switch (action.type) {
      case "USER_LOADING":
        return {
          ...state,
          isLoading: true
        };
      case "USER_LOADED":
       
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload.name,
          type:action.payload.type,
          token:localStorage.getItem('token')
        };
      case "LOGIN_SUCCESS":
      case "REGISTER_SUCCESS":
          
        localStorage.setItem('token', action.payload.token);
        // console.log('')
       
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          token:localStorage.getItem('token')

        };
        case "LOGIN_SUCCESS_FACEBOOK":
          
           localStorage.setItem('token', action.response.accessToken);
         
         
          return {
            ...state,
            // test:action.response,
            user:action.response.name,
            isAuthenticated: true,
            isLoading: false,
            token:localStorage.getItem('token')
          };
      case "AUTH_ERROR":
      case "LOGIN_FAIL":
      case "LOGOUT_SUCCESS":
      case "REGISTER_FAIL":
         localStorage.removeItem('token');
     
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false ,
          type:""
        };
      default:
        return state;
    }
  }
  
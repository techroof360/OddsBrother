import { combineReducers } from 'redux';


import sportReducer from './ManageSportReducer';
import bookieReducer from './ManageBookieReducer';
import bonusReducer from './ManageBouncesReducer';
import articalReducer from './ManageArticalReducer';
import leagueReducer from './ManageLeagueReducer'
import betsReducer from './ManageBitReducer';
import bannerReducer from  './ManageBannerReducer';
import auth from './authReducer';
export default combineReducers({
 
    sportReducer,
    bookieReducer,
    bonusReducer,
    articalReducer,
    leagueReducer,
    betsReducer,
    bannerReducer,
    auth

})
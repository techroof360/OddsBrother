const IP = "http://23.254.181.218:8080";
//const IP = "http://192.168.43.6:8080";
//const IP = "http://127.0.0.1:8080";

const apiEndpoints = {
  BET_API: IP + "/rest-api/bets/",
  SETTLED_BET_API: IP + "/rest-api/settled-bets/",
  NEW_BET_API: IP + "/rest-api/new-bets/",
  STATS_API: IP + "/rest-api/stats/",
  BONUSES_API: IP + "/rest-api/bonuses/",
  BOOKIE_API: IP + "/rest-api/bookies/",
  SPORT_API: IP + "/rest-api/sports/",
  LEAGUE_API: IP + "/rest-api/leagues/",
  ARTICLE_API: IP + "/rest-api/articles/",
  BANNER_API: IP + "/rest-api/banners/",
  SAVE_ARTICLE_API: IP + "/rest-api/save-article/",
  SAVE_BANNER_API: IP + "/rest-api/save-banner/",
  UPDATE_ARTICLE_API: IP + "/rest-api/update-article/",
  SAVE_BOOKIE_API: IP + "/rest-api/save-bookie/",
  SAVE_BET_IMAGE_API: IP + "/rest-api/save-bet-image/",
  UPDATE_BOOKIE_API: IP + "/rest-api/update-bookie/",
  USER_API: IP + "/rest-api/users/",
  ACTIVE_USERS_API: IP + "/rest-api/getActiveUsers",
  LOGIN_API: IP + "/rest-api/authenticate",
  REGISTER_API: IP + "/rest-api/register",
  IMAGES_PATH: IP + "/rest-api/images-src-path/"
};

export default apiEndpoints;

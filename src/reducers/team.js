import {
    TEAM_INFO_FETCH_STARTED,
    TEAM_INFO_FETCH_SUCCESS,
    TEAM_INFO_FETCH_ERROR
  } from '../actions/team.js';
  
  const INITIAL_STATE = {
    teams: [{ "id": 1, "name": "K.E.V.I.N", "owner": "KB", "is_my_team": true, "waiver_priority": 1, "move_count": 25, "trade_count": 0}],
    error: ''
  };
  
  const team = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TEAM_INFO_FETCH_SUCCESS:
        return {
          ...state,
          teams: action.teams
        };
      case TEAM_INFO_FETCH_ERROR:
        return {
          ...state,
          error: 'Could not fetch team info. Please try again'
        };
      case TEAM_INFO_FETCH_STARTED:
      default:
        return state;
    }
  };

  export default team;
  
import {
    TEAM_INFO_FETCH_STARTED,
    TEAM_INFO_FETCH_SUCCESS,
    TEAM_INFO_FETCH_ERROR,
    SELECT_TEAM,
    DESELECT_TEAM
  } from '../actions/team.js';
  import { createSelector } from 'reselect';
  
  const INITIAL_STATE = {
    loading_status: 'loading',
    teams: [{ "id": 1, "name": "K.E.V.I.N", "owner": "KB", "is_my_team": true, "waiver_priority": 1, "move_count": 25, "trade_count": 0}],
    error: ''
  };
  
  const teamsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TEAM_INFO_FETCH_STARTED:
        return { ...state, loading_status: 'loading' }
      case TEAM_INFO_FETCH_SUCCESS:
        return { ...state, loading_status: 'finished', teams: teams(state.teams, action) };
      case TEAM_INFO_FETCH_ERROR:
        return { ...state, loading_status: 'error', error: action.error };
      default:
        return state;
    }
  };

  const teams = (state, action) => {
    switch (action.type) {
      case TEAM_INFO_FETCH_SUCCESS:
        return action.teams;
      case SELECT_TEAM:
        const selectedTeamId = action.id;
        return { ...state, [selectedTeamId]: team(state[selectedTeamId], action) };
      case DESELECT_TEAM:
        const deselectTeamId = action.id;
        return { ...state, [deselectTeamId]: team(state[deselectTeamId], action)};
      default:
        return state;
    }
  }

  const team = (state, action) => {
    switch(action.type) {
      case SELECT_TEAM:
        return { ...state, selected: true }
      case DESELECT_TEAM:
        return { ...state, selected: false }
      default:
        return state;
    }
  }

  export default teamsReducer;

  // Add selectors
  const teamSelector = state => state.teamsReducer.teams;

  export const oneTeamSelected = createSelector(
    teamSelector,
    teams => Object.keys(teams).some(id => teams[id].selected == true)
  );
  
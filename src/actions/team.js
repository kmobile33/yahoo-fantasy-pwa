export const TEAM_INFO_FETCH_STARTED = 'TEAM_INFO_FETCH_STARTED';
export const TEAM_INFO_FETCH_SUCCESS = 'TEAM_INFO_FETCH_SUCCESS';
export const TEAM_INFO_FETCH_ERROR = 'TEAM_INFO_FETCH_ERROR';
export const SELECT_TEAM = 'SELECT_TEAM';
export const DESELECT_TEAM = 'DESELECT_TEAM';

export const getTeamInfo = () => (dispatch) => {
  dispatch({ type: TEAM_INFO_FETCH_STARTED })
  teams = {};
  fetch('https://localhost:8080/api/teams')
    .then((res) => res.json())
    .then((data) => {
      data.forEach(t => {
        teams[t.id] = {
          name: t.name,
          owner: t.owner,
          is_my_team: t.is_my_team,
          waiver_priority: t.waiver_priority,
          move_count: t.move_count,
          trade_count: t.trade_count
        }
      })
      dispatch({ type: TEAM_INFO_FETCH_SUCCESS, teams: data });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: TEAM_INFO_FETCH_ERROR, error: err });
    });
};

export const selectTeam = (teamId) => (dispatch) => {
  dispatch({ type: SELECT_TEAM, id: teamId })
}

export const deselectTeam = (teamId) => (dispatch) => {
  dispatch({ type: DESELECT_TEAM, id: teamId })
}

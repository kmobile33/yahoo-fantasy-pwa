export const TEAM_INFO_FETCH_STARTED = 'TEAM_INFO_FETCH_STARTED';
export const TEAM_INFO_FETCH_SUCCESS = 'TEAM_INFO_FETCH_SUCCESS';
export const TEAM_INFO_FETCH_ERROR = 'TEAM_INFO_FETCH_ERROR';

export const getTeamInfo = () => (dispatch) => {
    fetch('')
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: TEAM_INFO_FETCH_SUCCESS,
        teams: data
      });
    })
    .catch((error) => {
      dispatch({
        type: TEAM_INFO_FETCH_ERROR,
        error
      });
    })
  };

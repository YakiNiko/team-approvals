import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  teams: [],
  users: [],
  editTeamId: -1,
};

export const teamsState = createSlice({
  name: "approvalTeams",
  initialState,
  reducers: {
    setTeamsData: (state, { payload: { data } }) => {
      // fix same id bug, not the best way, but fix anyway
      state.teams = data.map((item, index) => {
        item.id = `TEAM${index+1}`
        return item;
      });
    },
    setUsersData: (state, { payload: { data } }) => {
      state.users = data;
    },
    setEditTeamId: (state, { payload: { id } }) => {
      state.editTeamId = id;
    },
  },
});

export const { setEditTeamId, setTeamsData, setUsersData } = teamsState.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getApprovalTeamsList = state => state.approvalTeams.teams;
export const getApprovalUsersList = state => state.approvalTeams.users;
        //  state.approvalTeams.users.find((user) => user.id === id) || [];
export const getTeamToEditId = (state) => state.approvalTeams.editTeamId;
export const getTeamName = (id) => (state) => state.approvalTeams.teams.find(team => team.id === id).name || '';

export default teamsState.reducer;
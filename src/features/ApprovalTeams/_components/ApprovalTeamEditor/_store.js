
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schemes: {},
};

export const teamsState = createSlice({
  name: 'teamApprovalSchemes',
  initialState,
  reducers: {
    saveTeamScheme: (state, action) => {
      const { payload: { scheme, editTeamId }} = action;
      state.schemes = {
        ...state.schemes,
        [editTeamId]: scheme,
      };
    },
  },
});

// Actions
export const {
  saveTeamScheme,
} = teamsState.actions;

// Selectors
export const getApprovalTeamScheme = (id) => (state) => {
  return state.teamApprovalScheme.schemes[id] || [];
}

export const getApprovalTeamUsers = (teamId) => (state) => {
  const usersList = state.approvalTeams.teams.find((team) => team.id === teamId).users;
  // Intersect all users with team user
  return state.approvalTeams.users.filter((alluser) => {
    return usersList.includes(alluser.id)
  });
}

export default teamsState.reducer;
import React, { useEffect } from "react";
import ApprovalTeam from './_components/ApprovalTeamItem';
import ApprovalTeamEditor from './_components/ApprovalTeamEditor';
import {
  getApprovalTeamsList,
  getTeamToEditId,
  setTeamsData,
  setUsersData,
  getApprovalUsersList,
} from "./_store";
import fetchHelper from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";

export default function ApprovalSchemeTeams() {
  const dispatch = useDispatch();
  const teams = useSelector(getApprovalTeamsList);
  const users = useSelector(getApprovalUsersList);
  const editTeamId = useSelector(getTeamToEditId);

  useEffect(() => {
    if(teams.length === 0) dispatch(fetchHelper("teams", setTeamsData));
    if (teams.length > 0 && users.length === 0) dispatch(fetchHelper("users", setUsersData));
  }, [teams, users, dispatch]);

  return (
    <div data-cy="teams-container" className={styles.container}>
      {teams.length === 0 && users.length === 0 && <div>LOADING DATA ...</div>}
      {teams.length > 0 &&
        users.length > 0 &&
        teams.map((teamData, index) => {
          return <ApprovalTeam key={`team${index}`} teamData={teamData} />;
        })}
      {teams.find(team => team.id === editTeamId) && <ApprovalTeamEditor />}
    </div>
  );
}


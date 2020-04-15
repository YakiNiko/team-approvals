import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '../../../../components/Button';
import {
  setEditTeamId,
  getApprovalUsersList,
} from "../../_store";
import { getApprovalTeamScheme } from "../ApprovalTeamEditor/_store";
import styles from './styles.module.css';

export default function ApprovalTeam({ teamData: { id, name, users } }) {
  const dispatch = useDispatch();
  const allUsers = useSelector(getApprovalUsersList);
  const schemesApprovers = useSelector(getApprovalTeamScheme(id));
  
  const getUsersSummary = () => {
    // intersect users list and team user ids
    const usersToDisplay = allUsers.filter((alluser) => users.includes(alluser.id));
    return (
      <div className={styles.usersList}>
        Users
        {usersToDisplay.map((user, index) => {
          if (index < 3) {
            return (
              <div key={Math.random(1) * 100} className={styles.userName}>
                {`${user.first_name} ${user.last_name}`}
              </div>
            );
          } else if (index === 3)
            return (
              <div key={Math.random(1) * 100} className={styles.more}>
                and more...
              </div>
            );
          else return null;
        })}
      </div>
    );
  }

  const getApproversSummary = () => {
    // intersect users list and team user ids
    return (
      <div className={styles.usersList}>
        Approvers
        {schemesApprovers.map((user, index) => {
          if (index < 3) {
            return (
              <div key={Math.random(1) * 100} className={styles.approverName}>
                {`${user.first_name} ${user.last_name}`}
              </div>
            );
          }
          else if(index === 3) return (
            <div
              key={Math.random(1) * 100} 
              className={styles.more}
            >
              and more...
            </div>
          )
          else return null;
        })}
      </div>
    );
  };

  const editActionHandler = () => {
    dispatch(setEditTeamId({ id }));
  }

  return (
    <div data-cy={id} className={styles.container}>
      <div className={styles.teamName}>{name}</div>
      <div className={styles.usersContainer}>
        {users.length > 0 && allUsers.length > 0 && getUsersSummary()}
        {schemesApprovers.length > 0 && allUsers.length > 0 && getApproversSummary()}
      </div>
      <Button type="primary" action={editActionHandler} cy="edit-button">
        Edit
      </Button>
    </div>
  );
}

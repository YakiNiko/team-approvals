import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ApprovalTeamMember from './_components/ApprovalTeamMember';
import Button from '../../../../components/Button';
import CloseButton from './_components/CloseButton';
import { setEditTeamId, getTeamToEditId, getTeamName } from "../../_store";
import {
  getApprovalTeamScheme,
  getApprovalTeamUsers,
  saveTeamScheme,
} from "./_store";
import styles from './styles.module.css';

const DEFAULT_AMOUNT_RANGE = 3000;

export default function ApprovalSchemeEditor() {
  const dispatch = useDispatch();
  const editTeamId = useSelector(getTeamToEditId);
  const scheme = useSelector(getApprovalTeamScheme(editTeamId)).slice();
  const teamName = useSelector(getTeamName(editTeamId));
  const users = useSelector(getApprovalTeamUsers(editTeamId));
  const [currentScheme, updateCurrentScheme] = useState(scheme);

  const addUser = () => {
    if (currentScheme.length === 0) {
      updateCurrentScheme([
        {
          userData: users[0],
          amountRange: { min: 0, max: DEFAULT_AMOUNT_RANGE },
        },
      ]);
    } else {
      const membersLength = currentScheme.length;
      const previousStepMaxValue = currentScheme[membersLength - 1].amountRange.max;
      const lockedUsers = currentScheme.map(user => user.userData.id);

      updateCurrentScheme([
        ...currentScheme,
        {
          userData: users.filter((user) => !lockedUsers.includes(user.id))[0],
          amountRange: {
            min: previousStepMaxValue,
            max: previousStepMaxValue + DEFAULT_AMOUNT_RANGE,
          },
        },
      ]);
    }
  }

  const updateUserAmount = ({ value, index }) => {
    const updatedScheme = currentScheme.map((item, i) => {
      if (i === index) {
        const nextMember = currentScheme[i + 1];
        if (value > item.amountRange.min && (!nextMember || value <= nextMember.amountRange.min)) {
          item.amountRange.max = value;
          return item;
        }
        return item;
      }
      else if(i === index + 1 && value < item.amountRange.max) { // value can't be superior to next user max value
          item.amountRange.min = value;
          return item;
      }
      else return item;
    });

    updateCurrentScheme(updatedScheme)
  };

  const updateStepUser = (id, index) => {
    const newUser = users.find(user => user.id === id);
    const newArray = currentScheme.slice();
    newArray[index].userData = newUser;
    updateCurrentScheme([...newArray]);
  } 

  const removeUser = (userIndex) => {
    // filter: we remove the matching id from the array
    // map : we normalize values so that each step min / max values are following each other
    updateCurrentScheme(
      [...currentScheme
        .filter((item, index) => index !== userIndex)
        .map((item, index, array) => {
          if(index === userIndex) {
            if (userIndex === 0) {
              item.amountRange.min = 0;
              return item;
            }
            else {
              const previousData = array[index - 1];
              if (previousData.amountRange.max < item.amountRange.min) {
                item.amountRange.min = previousData.amountRange.max;
                return item;
              }
              return item;
            }
          }
          return item;
        }
      )]);
  }

  const saveTeamSchemeHandler = () => {
    dispatch(saveTeamScheme({ scheme: currentScheme, editTeamId }));
    dispatch(setEditTeamId(-1));
  }

  const closeEditorHandler = () => {
    dispatch(setEditTeamId({ id: -1 }));
  }

  return (
    <div data-cy="approval-team-editor" className={styles.container}>
      <div className={styles.content}>
        <CloseButton action={closeEditorHandler} className={styles.CloseIcon}>
          X
        </CloseButton>
        <h4>Set up approvers for the {teamName} team</h4>
        {/* User Scheme */}
        <div data-cy="approvers-list" className={styles.members}>
          {currentScheme.length > 0 &&
            currentScheme.map((user, index) => {
              const lockedUsers = currentScheme.map((user) => user.userData.id);
              const usersList = users
                .slice()
                .filter((user) => !lockedUsers.includes(user.id));
              usersList.unshift(user.userData);
              return (
                <ApprovalTeamMember
                  key={`${user.userData.id}${Math.random() * 100}`}
                  index={index}
                  id={user.userData.id}
                  userName={`${user.userData.first_name} ${user.userData.last_name}`}
                  amountRange={user.amountRange}
                  amountUpdateAction={updateUserAmount}
                  deleteAction={removeUser}
                  userUpdateAction={updateStepUser}
                  usersList={usersList}
                />
              );
            })}
          {/* Add user button */}
          {currentScheme.length < users.length && (
            <div className={styles.addUser}>
              <Button
                action={() => {
                  addUser();
                }}
                type="dotted"
                cy="add-step"
              >
                Add a thresold
              </Button>
            </div>
          )}
        </div>
        {/* Footer action */}
        <div className={styles.actions}>
          <Button
            action={() => dispatch(setEditTeamId({ id: -1 }))}
            type="secondary"
          >
            Cancel
          </Button>
          <Button action={saveTeamSchemeHandler} type="primary" cy="save">
            Save approval flow
          </Button>
        </div>
      </div>
    </div>
  );
}
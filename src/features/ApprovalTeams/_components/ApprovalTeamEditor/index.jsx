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
          ...users[0],
          min: 0,
          max: DEFAULT_AMOUNT_RANGE,
        },
      ]);
    } else {
      const membersLength = currentScheme.length;
      const previousStepMaxValue = currentScheme[membersLength - 1].max;
      const lockedUsers = currentScheme.map(user => user.id);

      updateCurrentScheme([
        ...currentScheme,
        {
          ...users.filter((user) => !lockedUsers.includes(user.id))[0],
          min: previousStepMaxValue,
          max: previousStepMaxValue + DEFAULT_AMOUNT_RANGE,
        },
      ]);
    }
  }

  const updateUserAmount = ({ value, index }) => {
    const updatedScheme = currentScheme.map((item, i) => {
      if (i === index) {
        const nextMember = currentScheme[i + 1];
        if (value > item.min && (!nextMember || value <= nextMember.max)) {
          const newItem = { ...item, max: value }
          return newItem;
        }
        return item;
      }
      else if(i === index + 1 && value < item.max) { // value can't be superior to next user max value
        const newItem = { ...item, min: value }
        return newItem;
      }
      else return item;
    });

    updateCurrentScheme(updatedScheme)
  };

  const updateStepUser = (id, index) => {
    const newUser = users.find(user => user.id === id);
    const newArray = currentScheme.slice();
    newArray[index] = { ...newArray[index], ...newUser};
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
              const newItem = { ...item, min: 0 }
              return newItem;
            }
            else {
              const previousData = array[index - 1];
              if (previousData.max < item.min) {
                const newItem = { ...item, min: previousData.max }
                return newItem;
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
              const lockedUsers = currentScheme.map((user) => user.id);
              const usersList = users
                .slice()
                .filter((user) => !lockedUsers.includes(user.id));
              usersList.unshift(user);
              return (
                <ApprovalTeamMember
                  key={`${user.id}${Math.random() * 100}`}
                  index={index}
                  id={user.id}
                  userName={`${user.first_name} ${user.last_name}`}
                  min={user.min}
                  max={user.max}
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
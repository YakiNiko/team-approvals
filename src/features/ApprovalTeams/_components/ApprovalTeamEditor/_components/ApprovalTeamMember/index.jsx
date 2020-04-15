import React, { useState, useRef } from "react";
import CloseButton from '../CloseButton';
import styles from './styles.module.css';
import EditIcon from '../EditIcon';
import Select from 'react-select';

export default function ApprovalTeamMember({
    userName,
    index,
    max,
    min,
    amountUpdateAction,
    deleteAction,
    userUpdateAction,
    usersList,
    id
  }) {

  const [isEditingUser, setUserEdit] = useState(false);
  const [isEditingAmount, setAmountEdit] = useState(false);
  const [amountValue, setAmountValue] = useState(max);
  const inputRef = useRef(null);

  const amountEditHandler = () => {
    setAmountEdit(true);
    inputRef.current.focus();
  }

  const amountEditBlurHandler = (event) => {
    setAmountEdit(false);
    return amountUpdateAction({
      value: Number(event.target.value),
      index,
    });
  };

  const userChangeHandler = (userSelected) => {
    userUpdateAction(userSelected.value, index);
    setUserEdit(false);
  }

  const userBlurHandler = (event) => {
    setUserEdit(false);
  };

  const deleteStepHandler = () => {
    deleteAction(index);
  }

  return (
    <div data-cy={`step${index + 1}`} className={styles.container}>
      <div>
        <div className={styles.optionsContainer}>
          <CloseButton action={deleteStepHandler} className={styles.CloseIcon}>
            X
          </CloseButton>
        </div>
      </div>
      <div className={styles.amountRange}>
        {index === 0 && <div>Up to</div>}
        {index > 0 && <div>From {min} to</div>}
        {!isEditingAmount && (
          <div 
            data-cy={`edit-amount-field-${index+1}`}
            onClick={amountEditHandler} className={styles.valueTextfield}
          >
            {max}
          </div>
        )}
        {
          <div
            className={
              isEditingAmount ? styles.valueInput : styles.valueInputHidden
            }
          >
            <input
              data-cy={`edit-amount-input-${index+1}`}
              ref={inputRef}
              type="number"
              className={styles.valueInput}
              value={amountValue}
              onBlur={amountEditBlurHandler}
              onChange={(event) => {
                setAmountValue(event.currentTarget.value);
              }}
            />
          </div>
        }
        {!isEditingAmount && (
          <EditIcon data-cy="edit-amount" style={{ marginLeft: "-1.7em" }} size={20} color="#AAA" />
        )}
      </div>
      <div className={styles.member}>
        {!isEditingUser && (
          <>
            <div
              onClick={() => {
                if (usersList.length > 0) setUserEdit(!isEditingUser);
              }}
            >
              {userName}
            </div>
            <EditIcon style={{ marginLeft: "0.3em" }} size={20} color="#AAA" />
          </>
        )}
        {isEditingUser && (
          <Select
            options={usersList.map((user) => ({
              label: `${user.first_name} ${user.last_name}`,
              value: user.id,
            }))}
            autoFocus
            defaultValue={usersList
              .map((user) => ({
                label: `${user.first_name} ${user.last_name}`,
                value: user.id,
              }))
              .find((user) => user.value === id)}
            onChange={userChangeHandler}
            onBlur={userBlurHandler}
            className={styles.Select}
          />
        )}
      </div>
    </div>
  );
}
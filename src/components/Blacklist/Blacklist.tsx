 import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import VerifiableInput from "../VerifiableInput/VerifiableInput";

const Blacklist: React.FC = () => {
  const {candidate, list} = useTypedSelector(state => state.settings.blacklist);
  const {updateBlacklistCandidate, fetchBlacklistCandidate, addBlacklistUser, removeBlacklistUser} = useActions();
  return (
    <div className="setting" style={{padding: "1rem", border: "1px solid black"}}>
      <VerifiableInput
        data = {candidate}
        updateValue = {updateBlacklistCandidate}
        fetchValue = {fetchBlacklistCandidate}
        label="Add users to blacklist:"
        inputId="setting-blacklist-candidate"
      />
      <button disabled={candidate.status !== 'verified'} onClick={() => addBlacklistUser()}>Add User</button>
      {
      list.length === 0
      ? 
      <p>The Blacklist is Empty</p>
      :
      <ul>
        {list.map(blacklistedUser => (
          <li>{blacklistedUser} <button onClick={() => removeBlacklistUser(blacklistedUser)}>Delete from list</button></li>
        ))}
      </ul>
      }
    </div>
  )
}

export default Blacklist;
import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

const Blacklist: React.FC = () => {
  const {candidate, list} = useTypedSelector(state => state.settings.blacklist);
  const {updateBlacklistCandidate, addBlacklistUser, removeBlacklistUser} = useActions();
  return (
    <div className="setting">
      <label htmlFor="setting-blacklist-candidate">Add users to blacklist:</label>
      <input type="text" name="user" id="setting-blacklist-candidate" value={candidate} onChange={(e) => updateBlacklistCandidate(e.target.value)} />
      <button onClick={() => addBlacklistUser()}>Add User</button>
      {
      list.length === 0 ? 
      <p>The Blacklist is Empty</p> :
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
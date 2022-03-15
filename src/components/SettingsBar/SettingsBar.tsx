 import React, { ChangeEventHandler, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Blacklist from "../Blacklist/Blacklist";
import { useActions } from "../../hooks/useActions";
import VerifiableInput from "../VerifiableInput/VerifiableInput";

const SettingsBar: React.FC = () => {
  let [visibility, setVisibility] = useState(true);
  const {currentUser, repoName} = useTypedSelector(state => state.settings);
  const {updateCurrentUser, fetchCurrentUser, updateRepoName, fetchRepoName} = useActions();
  return (
    <div style={{border: "1px solid black", backgroundColor: "#eee"}}>
      <button onClick={() => setVisibility(!visibility)}>Toggle settings</button>
      {
      visibility
      && 
      <section className="settings" style={{display: "flex"}}>
        <VerifiableInput
          data = {currentUser}
          updateValue = {updateCurrentUser}
          fetchValue = {fetchCurrentUser}
          label="Enter current user login:"
          inputId="setting-username"
        />
        <VerifiableInput
          data = {repoName}
          updateValue = {updateRepoName}
          fetchValue = {fetchRepoName}
          label="Enter the full name (user/repo) of the repository:"
          inputId="setting-repo"
        />
        <Blacklist></Blacklist>
      </section>
      }
    </div>
  )
}

export default SettingsBar;
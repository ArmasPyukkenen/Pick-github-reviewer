import React, { ChangeEventHandler, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Blacklist from "../Blacklist/Blacklist";
import { useActions } from "../../hooks/useActions";

const SettingsBar: React.FC = () => {
  let [visibility, setVisibility] = useState(true);
  const {currentUser, repoName} = useTypedSelector(state => state.settings);
  const {updateCurrentUser, updateRepoName} = useActions();
  return (
    <div style={{border: "1px solid black", backgroundColor: "#eee"}}>
      <button onClick={() => setVisibility(!visibility)}>Toggle settings</button>
      {visibility && <section className="settings">
        <div className="setting">
          <label htmlFor="setting-username">Enter current user login:</label>
          <input type="text" name="user" id="setting-username" value={currentUser} onChange={(e) => updateCurrentUser(e.target.value)} />
        </div>
        <div className="setting">
          <label htmlFor="setting-repo">Enter the name of the repository</label>
          <input type="text" name="user" id="setting-repo" value={repoName} onChange={e => updateRepoName(e.target.value)}/>
        </div>
        <Blacklist></Blacklist>
      </section>
  }

    </div>
  )
}

export default SettingsBar;
import React from 'react';
import SettingsBar from './components/SettingsBar/SettingsBar';
import './App.css';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const {currentUser, repoName, ok} = useTypedSelector(state => state.settings);
  return (
    <div className="App">
      <h1>Pick reviewer</h1>
      <SettingsBar/>
      <div style={{backgroundColor: "#def"}}>
        <button disabled={!ok}>Pick reviewer</button>
        <p style={ok ? {visibility: 'hidden'} : {}}>To be able to pick reviewer make sure that currentUser and RepoName fields of settings are not empty and validated.</p>
      </div>
      <main>
        <p>Repo name:</p>
        <p>{repoName.value}</p>
        <p>Current User:</p>
        <div className="user-card">{currentUser.value || 'current user data'}</div>
        <p>Reviewer Candidates:</p>
        <ul>
          <li><div className="user-card">Candidate data</div></li>
          <li><div className="user-card">Candidate data</div></li>
          <li><div className="user-card">Candidate data</div></li>
        </ul>
        <p>Chosen Reviewer:</p>
        <div className="user-card">Reviewer Data</div>
      </main>
    </div>
  );
}

export default App;

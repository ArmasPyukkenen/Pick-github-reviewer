import React, { useState } from 'react';
import SettingsBar from './components/SettingsBar/SettingsBar';
import './App.css';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const {currentUser, repoName} = useTypedSelector(state => state.settings);
  return (
    <div className="App">
      <SettingsBar/>
      <button>Search reviewer</button>
      <main>
        <p>Repo name:</p>
        <p>{repoName}</p>
        <p>Current User:</p>
        <div className="user-card">{currentUser || 'current user data'}</div>
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

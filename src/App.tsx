import React, { useEffect } from 'react';
import SettingsBar from './components/SettingsBar/SettingsBar';
import './App.css';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';

function App() {
  const settings = useTypedSelector(state=> state.settings);
  const {status, currentUser, repoName, reviewerCandidates, chosenReviewer} = useTypedSelector(state => state.reviewer);
  const {pickReviewer, setSettings} = useActions();
  //Load settings from localStorage
  useEffect(() => {
    const serializedSettings = window.localStorage.getItem('settings');
    console.log('load settings');
    console.log(serializedSettings);
    if (serializedSettings) {
      setSettings(JSON.parse(serializedSettings));
    }
  }, []);
  //Save settings to local storage
  useEffect(() => {
    const isTempStatus = (inputStatus: string) => ['typing', 'loading'].includes(inputStatus);
    const noUpdate = [settings.currentUser.status, settings.repoName.status, settings.blacklist.candidate.status].some(isTempStatus);
    if (noUpdate) return;
    const serializedSettings = JSON.stringify(settings);
    console.log('save settings');
    console.log(serializedSettings);
    window.localStorage.setItem('settings', serializedSettings)
  }, [settings])
  return (
    <div className="App">
      <h1>Pick reviewer</h1>
      <SettingsBar/>
      <div style={{backgroundColor: "#def"}}>
        <button disabled={!settings.ok} onClick={() => pickReviewer()}>Pick reviewer</button>
        <p style={{fontSize: ".8rem"}}>
          {
            settings.ok
            ? "Click the button to find reviewer"
            : "To be able to pick reviewer make sure that currentUser and RepoName fields of settings are not empty and validated."
          }
        </p>
      </div>
      <main>
        {
          status === 'blank' && <p>Fill in settings to find reviewer</p>
        }
        {
          status === 'loading' && <p>Looking for reviewer...</p>
        }
        {
          status === 'network_error' && <p>An error occured when trying to find a reviewer. Please try again.</p>
        }
        {
          status === 'nomatch' && <p>No candidates to choose a reviewer from. Consider narrowing the blacklist.</p>
        }
        {
          status === 'success'
          &&
          <div>
            <div style={{border: "1px solid grey"}}>
              <p>Current User:</p>
              <p>{currentUser}</p>
            </div>
            <div style={{border: "1px solid grey"}}>
              <p>Repo name:</p>
              <p>{repoName}</p>  
            </div>
            <div style={{border: "1px solid grey"}}>
              <p>Reviewer Candidates:</p>
              <ul>
                {reviewerCandidates.map((candidate: string) => (
                  <li key={candidate}><div>{candidate}</div></li>
                ))}
              </ul>              
            </div>
            <div style={{border: "1px solid grey"}}>
              <p>Chosen Reviewer:</p>
              <div className="user-card">{chosenReviewer}</div>          
            </div>
          </div>
        }
      </main>
    </div>
  );
}

export default App;

import { useState, useContext } from 'react';
import { useLocalStorage } from './hooks';
import './App.css';
import Link from './Link';
import Presets from './Presets';
import Settings from './Settings';
import CurrentSettingsContext from './CurrentSettingsContext';
import SavedSettings from './SavedSettings';
import GenerateLinks from './GenerateLinks';

function App() {
  const [settings, setSettings] = useLocalStorage("cf-settings", true, () => ({"search": {}}));
  const [curSettings, setCurSettings] = useState({});

  return (
    <CurrentSettingsContext.Provider value={{settings, setSettings, curSettings, setCurSettings}}>
      <div className="App">
        <h1>Create Links</h1>
        <Link data-testid="link-component" />
        <Presets data-testid="presets-component" />
        <SavedSettings data-testid="savedsettings-component" />
        <Settings data-testid="settings-component" />
        <GenerateLinks data-testid="generatelinks-component" />
      </div>
    </CurrentSettingsContext.Provider>
  );
}

export default App;

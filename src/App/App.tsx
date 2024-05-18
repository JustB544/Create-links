import { useState, useContext } from 'react';
import { useLocalStorage } from '../helpers/hooks';
import { obj } from '../helpers/interfaces';
import './App.css';
import Link from '../Link/Link';
import Presets from '../Presets/Presets';
import Settings from '../Settings/Settings';
import CurrentSettingsContext from '../Context/CurrentSettingsContext';
import SavedSettings from '../SavedSettings/SavedSettings';
import GenerateLinks from '../GenerateLinks/GenerateLinks';
import Links from '../Links/Links';

function App() {
  const [settings, setSettings] = useLocalStorage("cf-settings", true, () => ({"search": {}}));
  const [curSettings, setCurSettings] = useState<obj>({});

  return (
    <CurrentSettingsContext.Provider value={{settings, setSettings, curSettings, setCurSettings}}>
      <div className="App">
        <h1>Create Links</h1>
        <Link data-testid="link-component" />
        <Presets data-testid="presets-component" />
        <SavedSettings data-testid="savedsettings-component" />
        <Settings data-testid="settings-component" />
        <Links data-testid="links-component" />
        <GenerateLinks data-testid="generatelinks-component" />
      </div>
    </CurrentSettingsContext.Provider>
  );
}

export default App;

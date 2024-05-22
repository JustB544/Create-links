import { useState, useContext } from 'react';
import { useLocalStorage } from '../helpers/hooks';
import { obj } from '../helpers/interfaces';
import './App.css';
import Link from '../Link/Link';
import Presets from '../Presets/Presets';
import MainContext from '../Context/MainContext';
import SavedData from '../SavedData/SavedData';
import GenerateLinks from '../GenerateLinks/GenerateLinks';
import Links from '../Links/Links';
import CurrentData from '../CurrentData/CurrentData';

function App() {
  const [data, setData] = useLocalStorage("cl-data", true, () => ({"search": {}}));
  const [curData, setCurData] = useState<obj>({});

  return (
    <MainContext.Provider value={{data, setData, curData, setCurData}}>
      <div className="App">
        <h1>Create Links</h1>
        <Link data-testid="link-component" />
        <Presets data-testid="presets-component" />
        <SavedData data-testid="saveddata-component" />
        <CurrentData data-testid="currentdata-component" />
        <Links data-testid="links-component" />
        <GenerateLinks data-testid="generatelinks-component" />
      </div>
    </MainContext.Provider>
  );
}

export default App;

import { useState, useContext } from 'react';
import { useLocalStorage } from '../helpers/hooks';
import { obj } from '../helpers/interfaces';
import './App.css';
import BaseLink from '../BaseLink/BaseLink';
import Presets from '../Presets/Presets';
import MainContext from '../Context/MainContext';
import SavedData from '../SavedData/SavedData';
import GenerateLinks from '../GenerateLinks/GenerateLinks';
import CurrentData from '../CurrentData/CurrentData';
import SavedLinks from '../SavedLinks/SavedLinks';
import LinkActions from '../LinkActions/LinkActions';

function App() {
  const [data, setData] = useLocalStorage("cl-data", true, () => ({"search": ""}));
  const [curData, setCurData] = useState<obj>({});
  const [baseLink, setBaseLink] = useState("");
  

  return (
    <MainContext.Provider value={{data, setData, curData, setCurData, baseLink, setBaseLink}}>
      <div className="App">
        <h1>Create Links</h1>
        <BaseLink data-testid="baselink-component" />
        <LinkActions data-testid="linkactions-component" />
        <Presets data-testid="presets-component" />
        <SavedData data-testid="saveddata-component" />
        <CurrentData data-testid="currentdata-component" />
        <SavedLinks data-testid="savedlinks-component" />
        <GenerateLinks data-testid="generatelinks-component" />
      </div>
    </MainContext.Provider>
  );
}

export default App;

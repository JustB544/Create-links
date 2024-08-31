import { useState, useContext, useEffect, useMemo } from 'react';
import { useBatch, useLocalStorage } from '../helpers/hooks';
import { obj } from '../helpers/interfaces';
import { addPriority, reduceData } from '../helpers/functions';
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
  const [data, _setData] = useLocalStorage("cl-data", true, () => ({}));
  const setData = useBatch(data, _setData);

  const [presets, _setPresets] = useLocalStorage("cl-presets", true, () => ({}));
  const setPresets = useBatch(presets, _setPresets);

  const curData = useMemo(() => reduceData(data), [data]);

  const [savedLinks, _setSavedLinks] = useState<obj>({});
  const setSavedLinks = useBatch(savedLinks, _setSavedLinks);
  
  const [baseLink, setBaseLink] = useState("");
  const [fullLink, setFullLink] = useState("");

  return (
    <MainContext.Provider value={{
      data: [data, setData],
      curData,
      presets: [presets, setPresets],
      link: {baseLink: [baseLink, setBaseLink], fullLink: [fullLink, setFullLink]},
      savedLinks: [savedLinks, setSavedLinks]
      }}>
      <div className="App">
        <h1>Create Links</h1>
        <p>Make sure popups are allowed in settings</p>
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

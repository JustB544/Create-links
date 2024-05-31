import { useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../helpers/hooks';
import { obj } from '../helpers/interfaces';
import { addPriority } from '../helpers/functions';
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
  const [data, setData] = useLocalStorage("cl-data", true, () => ({}));
  const [presets, setPresets] = useLocalStorage("cl-presets", true, () => ({}));
  const [curData, setCurData] = useState<obj>({});
  const [savedLinks, setSavedLinks] = useState<obj>({});
  const [baseLink, setBaseLink] = useState("");
  const [fullLink, setFullLink] = useState("");

  // useEffect(() => {
  //   // Manages the priorities of data, curData, and savedLinks
  //   setData((d : obj) => addPriority(d));
  //   setCurData((cd : obj) => addPriority(cd));
  //   setSavedLinks((l : obj) => addPriority(l));
  // }, [data, curData, savedLinks]);

  function setPriority(name : string){
    if (name === "data"){
      setData((d : obj) => addPriority(d));
    }
    else if (name === "curData"){
      setCurData((cd : obj) => addPriority(cd));
    }
    else if (name === "savedLinks"){
      setSavedLinks((l : obj) => addPriority(l));
    }
    else if (name === "presets"){
      setPresets((p : obj) => addPriority(p));
    }
    else {
      console.error("Unknown object referenced");
    }
  }


  return (
    <MainContext.Provider value={{
      data, 
      setData, 
      presets,
      setPresets,
      curData, 
      setCurData, 
      baseLink, 
      setBaseLink, 
      fullLink, 
      setFullLink, 
      savedLinks, 
      setSavedLinks,
      setPriority
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

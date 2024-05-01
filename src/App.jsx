import { useState } from 'react'
import './App.css'
import Link from './Link';
import Presets from './Presets';

function App() {

  return (
    <div className="App">
      <h1>Create Links</h1>
      <Link />
      <Presets />
    </div>
  );
}

export default App

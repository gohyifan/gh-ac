import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import SearchStandard from './Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to GitHub Repo Search</h2>
        <SearchStandard />
      </header>
    </div>
  );
}

export default App;

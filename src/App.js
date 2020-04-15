import React from 'react';
import './App.css';
import ApprovalSchemeManagement from './features/ApprovalTeams';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Approval Schemes Management</h2>
      </header>
      <section>
        <ApprovalSchemeManagement />
      </section>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify'
import { useState } from 'react';

function App() {
  const [idInput, setIdInput] = useState("");
  const [humans, setHumans] = useState([]);

  async function getHuman() {
    const humanData = await API.get('peopleapi', `/human/${idInput}`)
    const humansList = [...humans, humanData];
    setHumans(humansList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input type="text" value={idInput} onChange={(e) => setIdInput(e.target.value)} />
          <button onClick={() => getHuman(idInput)}>Get Human Info!!!</button>
        </div>
        <div>
          {
            humans.map(h => {
              return (
                <div key={`${new Date().getTime()}${h.humanId}`}>{h.humanName}</div>
              )
            })
          }
        </div>
      </header>
    </div>
  );
}

export default App;

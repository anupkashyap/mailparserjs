import './App.css';
import WrapperBox from './Components/WrapperBox';
import { config } from './config';
function App() {
  window.API_KEY = config.API_KEY;
  window.CLIENT_ID = config.CLIENT_ID;
  window.SCOPES = config.SCOPES;
  window.DISCOVERY_DOC = config.DISCOVERY_DOC;
  return (
    <div className="App-container">
      <WrapperBox />
    </div>
  );
}

export default App;

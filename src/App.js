import './App.scss';
import EmployeeDetails from './views/EmployeeDetails';

function App() {
  return (
    <div className="App p-3 container">
      <EmployeeDetails url="https://gist.githubusercontent.com/yousifalraheem/354fb07f27f3c145b78d7a5cc1f0da0b/raw/7561f6827775c6a002a93b6b99b12c3c9454a617/data.json"></EmployeeDetails>
    </div>
  );
}

export default App;

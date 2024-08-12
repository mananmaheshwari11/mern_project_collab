import { Toaster } from 'react-hot-toast';
import './App.css';
import Signup from './Authentication/Signup';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Signup/>
    </div>
  );
}

export default App;

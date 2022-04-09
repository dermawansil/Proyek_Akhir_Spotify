import './App.css';
import { Provider } from "react-redux";
import store from './data/store';
import AppRouter from './router';
// import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;



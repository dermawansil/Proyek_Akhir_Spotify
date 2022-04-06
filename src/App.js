import './App.css';
import Home from './pages/Home/index';

function App() {
    return (
        <Provider store ={store}>
            <div className='App'>
                <Home />
            </div>
        </Provider>
    );
}
export default App;


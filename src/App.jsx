import './App.css'
import MainScreen from './components/MainScreen';
import GameHistory from './components/GameHistory';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <GameHistory/>
      <MainScreen/>
    </Provider>
  )
}

export default App

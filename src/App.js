import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store'
import Announcement from './components/Announcement';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <>
    <Provider store = {store}>
      <BrowserRouter>
      <Announcement/>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

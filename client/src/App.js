import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store'
import Announcement from './components/Announcement';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AllProducts from './components/AllProducts';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import Admin from './components/Admin';
import PrivateComponent from './components/PrivateComponent';

import User from './components/User';
import styled from 'styled-components';
import {COLOR}from './util/theme'
const Container = styled.div`
  min-height: 100vh;
  margin-inline: 30px;
  h1,h2,h3,h4,h5,h6{
    font-family: "Roboto Slab", serif;
    text-transform: capitalize;
  }
  .ant-table{
    font-size: 1.4rem;
    @media screen and (max-width: 800px) {
      font-size: 1rem;
  }

  }
  .nm{
    margin: 0px;
  }
  *{
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track-piece {
      margin: 10px 0px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${COLOR.LIGHT_GREY};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${COLOR.MEDIUM_GREY};
      border-radius: 10px;
    }
  }
  .thin-scroll{
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
  @media screen and (max-width: 800px) {
  margin-inline: 10px;
  *{
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
  }
`;


function App() {
  return (
    <>
    <Provider store = {store}>
      <BrowserRouter>
          <Announcement/>
          <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<HomePage></HomePage>} />
            <Route path='/product' element={<AllProducts />} />
            <Route path='/product/:id' element={<ProductPage/>} />
            <Route element={<PrivateComponent/>}>        
              <Route path='/user' element={<User/>} />
              <Route path='/admin' element={<Admin/>} />
            </Route>        
            <Route path='/login' element={<LoginPage/>} />
            <Route path="*" element={<Navigate to="/" />}/>
          </Routes>
        </Container>
          <Footer />
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

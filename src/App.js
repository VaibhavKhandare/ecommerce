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
import styled from 'styled-components';

const Container = styled.div`
min-height: 100vh;
`;


function App() {
  return (
    <>
    <Provider store = {store}>
      <BrowserRouter>
      <Container>
      <Announcement/>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage></HomePage>} />
        <Route path='/product' element={<AllProducts />} />
        <Route path='/product/:id' element={<ProductPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
      <Footer />
      </Container>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

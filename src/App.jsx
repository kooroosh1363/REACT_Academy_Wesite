import './App.css';
import Header from './common/header/Header';
import { Route, Routes } from "react-router-dom";
import Home from './components/home/Home';
import About from './components/about/About';


function App() {
  return (
    <>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  );
}

export default App;

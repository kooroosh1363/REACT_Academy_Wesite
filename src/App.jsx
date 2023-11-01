import './App.css';
import Header from './common/header/Header';
import { Route, Routes } from "react-router-dom";
import Home from './components/home/Home';


function App() {
  return (
    <>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;

import './App.css';
import {Cliente} from './Cliente';
import {Filme} from './Filme';
import {Locacao} from './Locacao';
import {Relatorio} from './Relatorio';

import {SideMenu} from './Component/SideMenu';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
        <SideMenu>
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/cliente" />} />
            <Route exact path="/index" element={<Navigate replace to="/cliente" />} />
            <Route path='/cliente' element={<Cliente />} />
            <Route path='/filme' element={<Filme />} />
            <Route path='/locacao' element={<Locacao />} />
            <Route path='/relatorio' element={<Relatorio />} />
          </Routes>
        </SideMenu>
    </BrowserRouter>
  );
}

export default App;

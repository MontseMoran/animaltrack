import { useState } from "react";
import Login1 from "./components/Login1";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import AnimalForm from "./components/AnimalForm";
import "./styles/components/App.scss";

function App() {
  const [nombreAsociacion, setNombreAsociacion] = useState("");
  const [contraseña, setContraseña] = useState("");

  return (
    
      <Routes>
        <Route
          path="/"
          element={
            <Login1
              nombreAsociacion={nombreAsociacion}
              setNombreAsociacion={setNombreAsociacion}
              contraseña={contraseña}
              setContraseña={setContraseña}
            />
          }
        />
         <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/animal-form" element={<AnimalForm/>}/>
      </Routes>
    
  );
}

export default App;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/Dashboard.scss";
import { useEffect } from "react";
import AnimalCard from "./AnimalCard";

const nombreAsociacion = localStorage.getItem("nombreAsociacion");

function Dashboard() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/animals`);
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.log("Error al cargar animales", error.message);
      }
    };
    fetchAnimals();
  }, []);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/animal-form");
  }

  return (
    <>
      <main className="dashboard">
        <img
          src="/logo.png"
          alt="AnimalTrack logo"
          className="dashboard__logo"
        />

        <h2 className="dashboard__welcome">
          Bienvenid@ , {nombreAsociacion || "asociación"}
        </h2>
        <article
          className="dashboard__add"
          onClick={handleClick}
          title="Añadir nuevo animal"
        >
          +
        </article>
        <section className="dashboard__cards">
          {animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              name={animal.name}
              image={animal.image}
              hasTreatment={
                Array.isArray(animal.illnesses) &&
                animal.illnesses.some(
                  (i) => i?.treatment?.trim() && (i?.active ?? true)
                )
              }
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Dashboard;

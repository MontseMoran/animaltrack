import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/components/AnimalForm.scss";

function AnimalForm() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [hasChip, setHasChip] = useState(false);
  const [chipNumber, setChipNumber] = useState("");
  const [isSterilized, setIsSterilized] = useState(false);
  const [sterilizedDate, setSterilizedDate] = useState(null);
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [illnesses, setIllnesses] = useState([]);
  const [illnessesName, setIllnessesName] = useState("");
  const [illnessesDate, setIllnessesDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [illnessTreatment, setIllnessTreatment] = useState("");
  const [treatmentFrequency, setTreatmentFrequency] = useState("");


  const navigate = useNavigate();

  function handleBackClick() {
    navigate("/dashboard");
  }
  async function handleSaveClick() {
    const newAnimal = {
  name,
  species,
  chipNumber,
  sterilizedDate,
  image,
  gender,
  birthDate,
  illnesses
};

    await fetch ("http://localhost:4000/animals", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(newAnimal)
    })
    navigate("/dashboard");
    console.log("Enviando:", newAnimal);

  }

  function handleDeleteIllness(indexToDelete) {
    const updateIllnesses = illnesses.filter(
      (_, index) => index != indexToDelete
    );
    setIllnesses(updateIllnesses);
  }
  function handleEditIllness(index) {
    setEditingIndex(index);
    setIllnessesName(illnesses[index].name);
    setIllnessesDate(illnesses[index].date);

  }
  function handleSaveIllness() {
    if (editingIndex !== null) {
      const updated = [...illnesses];
      updated[editingIndex] = {
        name: illnessesName,
        date: illnessesDate,
        treatment: illnessTreatment,
      };
      setIllnesses(updated);
      setEditingIndex(null);
      setIllnessesName("");
      setIllnessesDate("");
      setIllnessTreatment("");
    } else {
      const newIllness = {
        name: illnessesName,
        date: illnessesDate,
        treatment: illnessTreatment,
        active: true,
      };
      setIllnesses([...illnesses, newIllness]);
      setIllnessesName("");
      setIllnessesDate("");
      setIllnessTreatment("");
    }
  }
  function handleToggleActive(index) {
    const updated = [...illnesses];
    updated[index].active = !updated[index].active;
    setIllnesses(updated);
  }

  return (
    <form className="animal-form">
      <h2 className="animal-form__title">Registrar un nuevo animal </h2>
      <details open>
  <summary>🐾 Datos generales</summary>
      <label htmlFor="name">Nombre:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <label htmlFor="species">Especie:</label>
      <select
        id="species"
        type="text"
        value={species}
        onChange={(ev) => setSpecies(ev.target.value)}
      >
        <option value="" disabled>
          Elige una especie
        </option>
        <option value="canine">Perro</option>
        <option value="feline">Gato</option>
        <option value="equid">Caballo / Burro / Asno</option>
        <option value="lagomorph">Conejo / Liebre</option>
        <option value="avian">Ave (paloma, gallina, pato…)</option>
        <option value="bovine">Vaca / Toro / Buey</option>
        <option value="caprine">Cabra</option>
        <option value="ovine">Oveja / Carnero</option>
        <option value="reptile">Reptil (tortuga, serpiente…)</option>
        <option value="other">Otro</option>
      </select>
        <fieldset>
        <legend>Género:</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(ev) => setGender(ev.target.value)}
          />
          Macho
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={(ev) => setGender(ev.target.value)}
          />
          Hembra
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="unknown"
            checked={gender === "unknown"}
            onChange={(ev) => setGender(ev.target.value)}
          />
          Desconocido
        </label>
      </fieldset>
      <label htmlFor="birthDate">Fecha de nacimiento:</label>
      <input
        type="date"
        id="birthDate"
        value={birthDate}
        onChange={(ev) => setBirthDate(ev.target.value)}
      />
      <label htmlFor="photo">Foto:</label>
      <input
        id="photo"
        type="file"
        accept="image/*"
        onChange={(ev) => {
          const file = ev.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      {image && (
        <div className="animal-form__preview">
          <p>Previsualización:</p>
          <img src={image} alt="Previsualización del animal" />
        </div>
      )}
</details>
     <details>
  <summary>🆔 Identificación</summary>
      <label className="animal-form__check">
        <input
          type="checkbox"
          checked={hasChip}
          onChange={(e) => setHasChip(e.target.checked)}
        />
        ¿Tiene chip?
      </label>
      {hasChip && (
        <>
          <label htmlFor="chipNumber">Número de chip:</label>
          <input
            type="text"
            placeholder="Número de chip"
            value={chipNumber}
            onChange={(ev) => {
              const checked = ev.target.checked;
              setHasChip(checked);
              if (!checked) setChipNumber("")
            }}
          />
        </>
      )}
      </details>
       <details>
  <summary>✚ Ficha veterinaria</summary>

      <label className="animal-form__check">
        <input
          type="checkbox"
          checked={isSterilized}
          onChange={(e) => setIsSterilized(e.target.checked)}
        />
        ¿Esterilizado?
      </label>
        {isSterilized &&(
        <>
          <label htmlFor="Fecha de esterilización">Fecha esterilización:</label>
          <input
            type="date"
            placeholder="Fecha de esterilización"
            value={sterilizedDate || ""}
            onChange={(ev) => setSterilizedDate(ev.target.value || null)}
          />
        </>
        )}
      

    
      <label htmlFor="illnessesName">Nombre de la enfermedad:</label>
      <input
        id="illnessesName"
        type="text"
        placeholder="Introduce enfermedad"
        value={illnessesName}
        onChange={(ev) => setIllnessesName(ev.target.value)}
      />
   
      <div className="illness-chips">
  {illnesses.map((illness, index) => (
    <button
      key={index}
      className="illness-chip"
      type="button"
      onClick={() => handleEditIllness(index)} 
    >
      {illness.name}
    </button>
  ))}
</div>

      <button type="button" >
  + Añadir enfermedad
</button>
    
          <label>Tratamiento:</label>
          <input
            type="text"
            value={illnessTreatment}
            onChange={(ev) => setIllnessTreatment(ev.target.value)}
          />
          <label htmlFor="treatmentFrequency">Frecuencia del tratamiento:</label>
<input
  id="treatmentFrequency"
  type="text"
  placeholder="Ej: cada 8 horas, semanal, mensual..."
  value={treatmentFrequency}
  onChange={(ev) => setTreatmentFrequency(ev.target.value)}
/>

</details>
            <div className="animal-form__btn-group">
        <button type="button" className="animal-form__btn-back" onClick={handleBackClick}>
          volver
        </button>
        <button type="button" className="animal-form__btn-save" onClick={handleSaveClick}>
          Guardar
        </button>
      </div>
      

    </form>
  );
}

export default AnimalForm;

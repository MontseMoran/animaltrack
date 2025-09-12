import { useParams } from "react-router";
import { useEffect, useState } from "react";


function AnimalDetail (){
    const {id} = useParams();
    const [animal, setAnimal] = useState(null);

    useEffect(()=>{
        const fetchAnimal = async ()=>{
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}/animals/${id}`)
                const data = await response.json();
                setAnimal(data);
            }catch (error){
                console.log ("Error al cargar el animal", error.message)
            }
        }
        fetchAnimal();
    },[id])
    if (!animal){
        return <p>Cargando...</p>
    }
    return(
  <section>
    <h2>{animal.name}</h2>
    <p>Especie: {animal.species}</p>
    <p>Género: {animal.chipNumber || "Sin chip"}</p>
    <img src={animal.image && animal.image.startsWith("data:image") 
    ? animal.image
    :"/nopicture.svg"}
    alt={animal.name}/>

  </section>
    )
}

export default AnimalDetail;
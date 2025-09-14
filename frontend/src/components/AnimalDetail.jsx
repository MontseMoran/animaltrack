import { useParams, useNavigate} from "react-router";
import { useEffect, useState } from "react";


function AnimalDetail (){
    const {id} = useParams();
    const [animal, setAnimal] = useState(null);
    const navigate = useNavigate();

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
    const handleDelete = async () =>{
        if (window.confirm("¿Seguro que quieres eliminar este animal?")){
            try{
                const response =await fetch (`${import.meta.env.VITE_API_URL}/animals/${id}`,{
                    method:"DELETE",
                    })
                    if (response.ok){
                        alert("Animal eliminado");
                        navigate ("/dashboard");
                    }
            } catch (error) {
                console.error ("Error al eliminar", error);
            }
        }
    }

    const handleEdit = () =>{
        navigate(`/animals/edit/${id}`)
    }
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
<div className="animal-detail__actions">
  <button onClick={handleEdit}>✏️ Modificar</button>
  <button onClick={handleDelete}>🗑️ Eliminar</button>
</div>

  </section>
    )
}

export default AnimalDetail;
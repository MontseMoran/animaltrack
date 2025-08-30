import "../styles/components/AnimalCard.scss"




function AnimalCard({
  id, 
  name, 
  species, 
  image, 
  hasChip = false, 
  isSterilized = false, 
  hasTreatment=false,  
  variant = "list", 
  onClick}) {

  return (
    <section 
    className={`animal-card animal-card--${variant}`}
    onClick={variant=== "list" ? onClick : undefined}
    role={variant === "list"? "button": undefined}
    >
      {variant === "list" && (
        <>
      <div className="animal-card__img">
        <img src={image || "/nopicture.svg"}
        alt={name ||"Animal sin nombre"} />
      </div>
      <div className="animal-card__title">
        <h3>{name}</h3>
      </div>
      <div className="animal-card__species">
        <p>{species}</p>
      </div>
      {hasTreatment && (
        <div className="animal-card__badges">
          <span className="animal-card__pill">Tratamiento</span>
        </div>
      )}
      </>
      )}
    </section>
  );
}

export default AnimalCard;

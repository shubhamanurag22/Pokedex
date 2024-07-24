import './Pokemon.css'

function Pokemon({name, image, id}){
    return (
        <div className='pokemon'>
            <div className='pokemon-name'>{name}</div>
            <div>
                <img className="pokemon-image" src={image}/>
            </div>
        </div>
    )
}

export default Pokemon;
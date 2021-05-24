import React, {useState} from 'react';
import '../estilosComponentes/areaNuevaNota.css';

const AreaNuevaNota = (props) => {
    //State de los input ingresados ne la nueva nota
    const [input, setInput] = useState({
        titulo: '',
        contenido: '',
    });

    function manejoCambioInput(evento) {
        const {name, value} = evento.target;
        
        setInput( valorPrevio => {
            return {
                ...valorPrevio,
                [name]: value,  // Name va entre [] para que sepa que debe tomar el argumento de la funcion
            }
        });
    }

    function manejoClickSubmit(event) {
        event.preventDefault();
        props.setearNota(input)
        setInput({titulo: '', contenido: ''})
    }
    
    return ( 
        <div>
            <form className="crear-nota">
                <input 
                    onChange={manejoCambioInput}
                    value={input.titulo}
                    className="tituloNuevaNota" 
                    name="titulo" 
                    placeholder="Titulo"
                 />
                <textarea 
                    onChange={manejoCambioInput}
                    value={input.contenido}
                    name="contenido" 
                    placeholder="Escriba una nota..." 
                    rows="3"
                 />
                <button 
                    className="btn-agregar"
                    type="submit"
                    onClick={manejoClickSubmit}
                >+</button>
            </form>
        </div>
    );
}
 
export default AreaNuevaNota;
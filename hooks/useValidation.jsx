import  { useEffect, useState } from 'react'

const useValidation = (initialState, validar, fn) => {
    
    const [valores, setValores] = useState(initialState);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errores).length === 0;
            if(noErrors) {
                fn(); // funcion que se ejecuta en el componente
            }
            setSubmitForm(false);
        }
        return () => {
        }
    }, [errores])

    // funcion que se ejecuta cuando el usuario esta escribiendo
    const handleChange = (e) => {
        setValores({
           ...valores,
           [e.target.name]: e.target.value           
        })
    }

    // funcion que se ejecuta cuando el usuario hace Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    }

    // cuando se revisa el evento
    const handleBlur = () =>{
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    }
}

export default useValidation

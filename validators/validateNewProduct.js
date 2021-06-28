const validateNewProduct = (valores) => {
    let errores = {};

    // Validar el nombre del usuario
    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio';
    }

    // Validar la empresa
    if (!valores.empresa) {
        errores.empresa = 'El nombre de empresa es obligatorio';
    }

    // Validar la empresa
    if (!valores.url) {
        errores.url = 'La url es obligatoria';
    }

    // Validar descripcion
    if (!valores.description) {
        errores.description = "La descripción es obligatoria";
    }

    return errores;
}

export default validateNewProduct;
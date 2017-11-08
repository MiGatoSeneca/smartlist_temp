validate = function(field,value) {
  var error = "";

  switch (field) {
    case "email":
      if (!value){
        error = 'Es necesario escribir un correo electrónico';
      }else if(value.length < 5 || value.length > 75){
        error = 'El correo electrónico debe tener entre 5 y 75 caracteres';
      }
      break;

    case "username":
      if (!value){
        error = 'Es necesario escribir un nombre de usuario';
      }else if(value.username < 5 || value.username > 75){
        error = 'El correo electrónico debe tener entre 5 y 75 caracteres';
      }
      break;

    case "password":
      if (!value){
        error = 'Es necesario escribir una contraseña';
      }else if(value.length < 5 || value.length > 75){
        error = 'La contraseña debe tener entre 5 y 75 caracteres';
      }
      break;

    case "fullName":
      if (!value){
        error = 'Es necesario escribir un nombre';
      }else if(value.length < 5 || value.length > 150){
        error = 'El nombre debe tener entre 5 y 150 caracteres';
      }
      break;

    case "url":
      if (!value){
        error = 'Es necesario escribir una url';
      }else if(value.length < 5 || value.length > 150){
        error = 'La url debe tener entre 5 y 150 caracteres';
      }
      break;

    case "plan":
      if (!value){
        error = 'Es necesario seleccionar una plan';
      }else if(value != 'starter' && value != 'basic' && value != 'pro' && value != 'enterprise'){
        error = 'El plan escogido ('+value+') no es válido';
      }
      break;

    case "type":
      if (!value){
        error = 'Es necesario seleccionar una tipo de usuario';
      }else if(value != 'member' && value != 'admin'){
        error = 'El tipo escogido ('+value+') no es válido';
      }
      break;

    case "terms":
      if (!value){
        error = 'Es necesario aceptar los términos';
      }
      break;

  }
  return error;
}

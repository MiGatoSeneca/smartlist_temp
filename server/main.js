import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  var username = 'enrealidadeshotmail@gmail.com';
  var password = 'Orenilas1982';
  var server = 'smtp.gmail.com';
  var port = '465';

  process.env.MAIL_URL = 'smtps://' +
      encodeURIComponent(username) + ':' +
      encodeURIComponent(password) + '@' +
      encodeURIComponent(server) + ':' + port;

  Accounts.emailTemplates.from = 'Converfit · SmartList <smartlist@converfit.com>';
  Accounts.emailTemplates.siteName = 'Converfit · SmartList';

  Accounts.emailTemplates.resetPassword = {
    subject(user) {
      return "Recuperar Contraseña";
    },
    text(user, url) {
      const newUrl = url.replace("#/", "");
      var text = "";
      text += "Hola\n\n"
      text += "Haz click en el siguiente link para recuperar tu contraseña.\n\n"
      text += newUrl+"\n\n"
      text += "Si no has solicitado recuperar la contraseña, ignora esta correo.\n\n"
      text += "Gracias.\n\n"
      text += "El Equipo de Converfit."
      return text
    }
  };

});

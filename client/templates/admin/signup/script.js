Template.adminSignup.onCreated(function() {
  Session.set('adminSignupErrors', {});
  Meteor.logout();
});

Template.adminSignup.helpers({
  errorMessage: function(field) {
    return Session.get('adminSignupErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('adminSignupErrors')[field] ? 'has-error' : '';
  },
  errorExists: function (field) {
    return !!Session.get('adminSignupErrors')[field] ? true : false;
  }
});

Template.adminSignup.events({
  'keyup input': function(e) {
    errors = Session.get('adminSignupErrors')
    errors[$(e.target).attr("name")] = "";
    return Session.set('adminSignupErrors', errors);
  },
  'change input': function(e) {
    errors = Session.get('adminSignupErrors')
    errors[$(e.target).attr("name")] = "";
    return Session.set('adminSignupErrors', errors);
  },
  'submit form': function(e) {
    e.preventDefault();

    var admin = {
      fullName: $(e.target).find('[name=fullName]').val(),
      email: $(e.target).find('[name=email]').val(),
      password: $(e.target).find('[name=password]').val()
    };

    var errors = validateAdminSignup(admin);

    if(_.size(errors)>0){
      return Session.set('adminSignupErrors', errors);
    }

    Accounts.createUser({
      username: admin.email,
      email: admin.email,
      password: admin.password
    },function(err,res){

      if(err){
        errors.form = "El usuario ya está registrado";
        return Session.set('adminSignupErrors', errors);
      }else{
        currentUser = Meteor.user();
        var avatar_bg = intToRGB(hashCode(admin.fullName));
        Members.insert({
          idUser:currentUser._id,
          username:admin.username,
          fullName:admin.fullName,
          email: admin.email,
          type: "admin",
          avatar:"<div class='avatar-circle' style='background-color:#"+avatar_bg+"'><span class='initials'>"+admin.fullName[0].toUpperCase()+admin.fullName[1].toUpperCase()+"</span></div>"
        });
        Router.go('/admin/dashboard');
      }
    });
  }
});

validateAdminSignup = function (admin) {
  var errors = {};

  if(validate("fullName",admin.fullName))
    errors.fullName = validate("fullName",admin.fullName)

  if(validate("email",admin.email))
    errors.email = validate("email",admin.email)

  if(validate("password",admin.password))
    errors.password = validate("password",admin.password)

  return errors;
}

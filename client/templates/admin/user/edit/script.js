Template.adminUserEdit.onCreated(function() {
  Session.set('adminUserEditErrors', {});
  Session.set('forceInsert', false);
  if(!this.data.member){
    this.data.member = {
      fullName : "--",
      email : "--",
      url : "--",
      type : "--",
      plan : "--",
      loginAt : "--"
    }
    Session.set('forceInsert', true);
  }
});

Template.adminUserEdit.helpers({
  errorMessage: function(field) {
    return Session.get('adminUserEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('adminUserEditErrors')[field] ? 'has-error' : '';
  },
  errorExists: function (field) {
    return !!Session.get('adminUserEditErrors')[field] ? true : false;
  },
  created: function(){
    return moment(this.user.createdAt).format('YYYY-MM-DDTHH:mm')
  },
  login: function(){
    if(this.member.loginAt === "--"){
      this.member.loginAt = this.user.createdAt
    }
    return moment(this.member.loginAt).format('YYYY-MM-DDTHH:mm')
  }
});

Template.adminUserEdit.events({
  'keyup input': function(e) {
    errors = Session.get('adminUserEditErrors')
    errors[$(e.target).attr("name")] = "";
    return Session.set('adminUserEditErrors', errors);
  },
  'change input': function(e) {
    errors = Session.get('adminUserEditErrors')
    errors[$(e.target).attr("name")] = "";
    return Session.set('adminUserEditErrors', errors);
  },
  'submit form': function(e) {


    e.preventDefault();

    var user = {
      fullName: $(e.target).find('[name=fullName]').val(),
      username: $(e.target).find('[name=username]').val(),
      email: $(e.target).find('[name=email]').val(),
      url: $(e.target).find('[name=url]').val(),
      plan: $(e.target).find('[name=plan]').val(),
      type: $(e.target).find('[name=type]').val(),
      createdAt: $(e.target).find('[name=createdAt]').val(),
      loginAt: $(e.target).find('[name=loginAt]').val()
    };

    var errors = validateAdminUserEdit(user);

    if(_.size(errors)>0){
      return Session.set('adminUserEditErrors', errors);
    }

    var currentIdUser = this.user._id;

    if(Session.get('forceInsert')){
      Members.insert({
        idUser:currentIdUser,
        username:user.username,
        fullName:user.fullName,
        email: user.email,
        url:user.url,
        plan:user.plan,
        terms:"true",
        type:user.type,
        loginAt:moment(user.loginAt).toDate()
      });
    }else{
      Members.update(this.member._id,{
        $set:{
          username:user.username,
          fullName:user.fullName,
          email: user.email,
          url:user.url,
          plan:user.plan,
          type:user.type,
          loginAt:moment(user.loginAt).toDate()
        }
      });
    }

    swal({
      title: 'Datos Actualizados',
      text: 'Se han guardado los datos correctamente',
      type: 'success',
      confirmButtonText: 'Cerrar'
    },
    function() {
      Router.go('/admin/users')
    });

  }
});

validateAdminUserEdit = function (user) {
  var errors = {};

  if(validate("fullName",user.fullName))
    errors.fullName = validate("fullName",user.fullName)

  if(validate("username",user.username))
    errors.username = validate("username",user.username)

  if(validate("email",user.email))
    errors.email = validate("email",user.email)

  if(validate("url",user.url))
    errors.url = validate("url",user.url)

  if(validate("plan",user.plan))
    errors.plan = validate("plan",user.plan)

  if(validate("type",user.type))
    errors.type = validate("type",user.type)

  return errors;
}

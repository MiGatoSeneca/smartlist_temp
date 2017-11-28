
Router.route('/admin', {
  name: 'adminWelcome',
  layoutTemplate: 'layoutFloatForm'
});

Router.route('/admin/login', {
  name: 'adminLogin',
  layoutTemplate: 'layoutFloatForm'
});

Router.route('/admin/signup', {
  name: 'adminSignup',
  layoutTemplate: 'layoutFloatForm'
});

Router.route('/admin/dashboard', {
  name: 'adminDashboard',
  layoutTemplate: 'layoutAdminApp',
  waitOn: function() {
    return [
      Meteor.subscribe('adminMembers'),
      Meteor.subscribe('adminMemberEventsResume'),
      Meteor.subscribe('adminMemberUsersResume')
    ]
  }
});

Router.route('/admin/users', {
  name: 'adminUsers',
  layoutTemplate: 'layoutAdminApp',
  waitOn: function() {
    return [
      Meteor.subscribe('adminMembers'),
      Meteor.subscribe('adminUsers')
    ]
  }
});


Router.route('/admin/user/:idUser/edit', {
  name: 'adminUserEdit',
  layoutTemplate: 'layoutAdminApp',
  waitOn: function() {
    return [
      Meteor.subscribe('adminMembers'),
      Meteor.subscribe('adminUsers')
    ]
  },
  data: function(){
    return {
      member: Members.findOne({idUser:this.params.idUser}),
      user: Meteor.users.findOne({_id:this.params.idUser})
    }
  }
});

Router.route('/admin/user/:idUser/dashboard', {
  name: 'adminUserDashboard',
  layoutTemplate: 'layoutAdminApp',
  waitOn: function() {
    return [
      Meteor.subscribe('adminMembers'),
      Meteor.subscribe('adminUsers'),
      Meteor.subscribe('adminMemberEventsResume'),
      Meteor.subscribe('adminMemberUsersResume')

    ]
  },
  data: function(){
    return {
      member: Members.findOne({idUser:this.params.idUser}),
      user: Meteor.users.findOne({_id:this.params.idUser})
    }
  }
});

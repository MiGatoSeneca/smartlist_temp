Router.route('/api/', {
    where: 'server'
})
.get(function(){
  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    version: "1.0.0",
  }));

})
.post(function(){
  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    version: "1.0.0"
  }));
})
.put(function(){
  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    version: "1.0.0"
  }));
})
.delete(function(){
  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    version: "1.0.0"
  }));
});

Router.route('/api/:apiKey/event', {
    where: 'server'
}).post(function(){

  MemberEvents.insert({
    apiKey : this.params.apiKey,
    event : this.request.body.event,
    memberUserId : this.request.body.entityId,
    memberItemId : this.request.body.targetEntityId,
    properties : this.request.body.properties,
    createdAt:moment().toDate()
  });

  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "Event post done"
  }));
});


Router.route('/api/:apiKey/ai', {
    where: 'server'
}).get(function(){
  console.log("["+this.params.apiKey+"] [syncAi]");

  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "Event post done",
    ai : {
      id_manufacturer :400
    }
  }));
});

Router.route('/api/:apiKey/user', {
    where: 'server'
}).post(function(){
  console.log("["+this.params.apiKey+"] [memberUser] [add] "+JSON.stringify(this.request.body));

  MemberUsers.insert({
    _id : this.request.body.entityId,
    apiKey : this.params.apiKey,
    createdAt:moment().toDate()
  });


  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "Member user post done"
  }));
});


Router.route('/api/:apiKey/update', {
    where: 'server'
}).get(function(){
  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "Data update",
  }));
});


Router.route('/api/:apiKey/log', {
    where: 'server'
}).post(function(){
  console.log("["+this.params.apiKey+"] [log] "+this.request.body.str);
  Logs.insert({
    apiKey : this.params.apiKey,
    content : this.request.body.str
  });
  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "Log post done"
  }));
});

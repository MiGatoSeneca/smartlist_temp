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

  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "Event post done"
  }));

  console.log("["+this.params.apiKey+"] [memberUser] [add] "+JSON.stringify(this.request.body));

  MemberEvents.insert({
    apiKey : this.params.apiKey,
    event : this.request.body.event,
    memberUserId : this.request.body.entityId,
    memberItemId : this.request.body.targetEntityId,
    abTest : this.request.body.abTest,
    properties : this.request.body.properties,
    createdAt:moment().toDate()
  });

  MemberEventsResume.update({
      apiKey:this.params.apiKey,
      createdAt:moment().startOf('hour').toDate(),
      abTest : "total",
      event : this.request.body.event
    },
    {
      $inc:{count: 1},
      $set:{
        apiKey:this.params.apiKey,
        createdAt:moment().startOf('hour').toDate(),
        abTest : "total",
        event : this.request.body.event
      }
    },
    {upsert:true}
  );

  MemberEventsResume.update({
      apiKey:this.params.apiKey,
      createdAt:moment().startOf('hour').toDate(),
      abTest : this.request.body.abTest,
      event : this.request.body.event
    },
    {
      $inc:{count: 1},
      $set:{
        apiKey:this.params.apiKey,
        createdAt:moment().startOf('hour').toDate(),
        abTest : this.request.body.abTest,
        event : this.request.body.event
      }
    },
    {upsert:true}
  );

  MemberUsersEventsResume.update({
      idMemberUser: this.request.body.entityId,
      apiKey:this.params.apiKey,
      createdAt:moment().startOf('hour').toDate(),
      abTest : this.request.body.abTest,
      event : this.request.body.event
    },
    {
      $inc:{count: 1},
      $set:{
        idMemberUser: this.request.body.entityId,
        apiKey:this.params.apiKey,
        createdAt:moment().startOf('hour').toDate(),
        abTest : this.request.body.abTest,
        event : this.request.body.event
      }
    },
    {upsert:true}
  );


});

Router.route('/api/generateresumes', {
    where: 'server'
}).get(function(){
  console.log("Lets generate Resumes");
  var members = Members.find().fetch();

  members.forEach(function(member){
    console.log("Lets start with: "+member.idUser);



    var count = MemberEvents.find({apiKey:member.idUser}).count();
    console.log("Events Count: "+count);

    const query = {apiKey:member.idUser};
    var options = {sort: {createdAt: -1}};



    var hasEvents = false;
    var FinalEvent = MemberEvents.findOne(query, options);
    if(FinalEvent !== undefined){
      console.log("Finale event: "+FinalEvent.createdAt);
      hasEvents = true;
    }else{
      console.log("dont have Finale event");
    }
    options = {sort: {createdAt: 1}};
    var InitialEvent = MemberEvents.findOne(query, options);
    if(InitialEvent !== undefined){
      console.log("Initial event: "+InitialEvent.createdAt);
      hasEvents = true;
    }else{
      console.log("dont have Initial event");
    }
    if(hasEvents){
      currentHour = moment(InitialEvent.createdAt).startOf("hour");
      endHour = moment(FinalEvent.createdAt).startOf("hour");
      while(currentHour.toDate() < endHour.toDate()){
        console.log(currentHour.format());
        events = ["list","view","add"];
        events.forEach(function(event){
          abTests = ["total","y","n"];
          abTests.forEach(function(abTest){
            if(abTest == "total"){
              countEvents = MemberEvents.find({
                apiKey : member.idUser,
                event : event,
                createdAt:{
                  $gte : currentHour.toDate(),
                  $lt : moment(currentHour.format()).add(1,'h').toDate()
                }
              }).count();
            }else{
              countEvents = MemberEvents.find({
                apiKey : member.idUser,
                abTest : abTest,
                event : event,
                createdAt:{
                  $gte : currentHour.toDate(),
                  $lt : moment(currentHour.format()).add(1,'h').toDate()
                }
              }).count();
            }

            if(countEvents>0){
              MemberEventsResume.update({
                  apiKey:member.idUser,
                  createdAt:currentHour.toDate(),
                  abTest : abTest,
                  event : event
                },
                {
                  $set:{
                    apiKey:member.idUser,
                    createdAt:currentHour.toDate(),
                    abTest : abTest,
                    event : event,
                    count : countEvents
                  }
                },
                {upsert:true}
              );
            }
            console.log(event+" - "+abTest+": "+countEvents);
          });
        });

        currentHour.add(1,'h');
      }
    }


    var count = MemberUsers.find({apiKey:member.idUser}).count();
    console.log("Users Count: "+count);

    var options = {sort: {createdAt: -1}};

    var hasUsers = false;
    var FinalUser = MemberUsers.findOne(query, options);
    if(FinalUser !== undefined){
      console.log("Finale user: "+FinalUser.createdAt);
      hasUsers = true;
    }else{
      console.log("dont have Finale user");
    }
    options = {sort: {createdAt: 1}};
    var InitialUser = MemberUsers.findOne(query, options);
    if(InitialUser !== undefined){
      console.log("Initial event: "+InitialUser.createdAt);
      hasUsers = true;
    }else{
      console.log("dont have Initial event");
    }

    if(hasUsers){
      currentHour = moment(InitialUser.createdAt).startOf("hour");
      endHour = moment(FinalUser.createdAt).startOf("hour");
      while(currentHour.toDate() < endHour.toDate()){
        console.log(currentHour.format());
        countUsers = MemberUsers.find({
          apiKey : member.idUser,
          createdAt:{
            $gte : currentHour.toDate(),
            $lt : moment(currentHour.format()).add(1,'h').toDate()
          }
        }).count();

        if(countUsers>0){
          MemberUsersResume.update({
              apiKey:member.idUser,
              createdAt:currentHour.toDate()
            },
            {
              $set:{
                apiKey:member.idUser,
                createdAt:currentHour.toDate(),
                count : countUsers
              }
            },
            {upsert:true}
          );
        }
        console.log("Users: "+countUsers);

        currentHour.add(1,'h');
      }
      console.log("######### ");
    }
  });

  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "Resumes get done",
    ai : {}
  }));
});


Router.route('/api/:apiKey/ai', {
    where: 'server'
}).get(function(){
  console.log("["+this.params.apiKey+"] [syncAi]");

  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "AI get done",
    ai : {}
  }));
});

Router.route('/api/:apiKey/graphai', {
    where: 'server'
}).get(function(){
  console.log("["+this.params.apiKey+"] [syncAi]");

  this.response.statusCode=200;
  this.response.end(JSON.stringify({
    message: "GraphAI get done",
    graphai : {}
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

  MemberUsersResume.update({
      apiKey:this.params.apiKey,
      event:"set",
      createdAt:moment().startOf('hour').toDate()
    },
    {
      $inc:{count: 1},
      $set:{
        apiKey:this.params.apiKey,
        event:"set",
        createdAt:moment().startOf('hour').toDate()
      }
    },
    {upsert:true}
  );

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

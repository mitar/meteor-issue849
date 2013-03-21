var Test = new Meteor.Collection('test');

if (Meteor.isClient) {
  Meteor.startup(function () {
    Deps.autorun(function () {
      Meteor.subscribe('test', Session.get('value'), {
        onError: function (error) { console.log(error.reason || "Bug!"); }
      });
    });
  });

  Template.hello.greeting = function () {
    return JSON.stringify(Test.findOne());
  };

  Template.hello.events({
    'click input' : function () {
      Session.set('value', new Date());
    }
  });
}

if (Meteor.isServer) {
  var require = __meteor_bootstrap__.require;
  // Comment the following line to remove the bug
  require('jsdom');

  Meteor.publish('test', function (value) {
    uuid = Meteor.uuid();
    this.added('test', uuid, {test: "Test"});
    this.ready();
    throw new Meteor.Error(500, "Some error");
  });
}

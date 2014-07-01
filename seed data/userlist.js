db.usercollection.remove({});
db.usercollection.insert({
  "username" : "taylor",
  "email" : "t@t.com",
  "password" : "melvin",
  "admin" : "1"
});
db.usercollection.insert({
  "username" : "nonadmin",
  "email" : "na@na.com",
  "password" : "a",
  "admin" : null
});
db.usercollection.insert({
  "username" : "oswald",
  "email" : "o@o.co",
  "password" : "admin",
  "admin" : "1"
});
db.usercollection.insert({
  "username" : "peter",
  "email" : "peter@peterkim.me",
  "password" : "client",
  "admin" : null
});
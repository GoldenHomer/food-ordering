db.restcollection.remove({});
db.restcollection.insert(
{
  "restaurant" : "Falafel Corner",
  "restaurantitem" : [
    {
      "item" : "Chicken Shish Kabob"
    },
    {
      "item" : "Avocado Burger"
    },
    {
      "item" : "Hawaiian"
    },
    {
      "item" : "Double Cheeseburger"
    },
    {
      "item" : "Tex-Mex Burger"
    },
    {
      "item" : "Bacon Cheddar"
    },
    {
      "item" : "Pepperoni pizza"
    },
    {
      "item" : "Cheese pizza"
    }
  ]
},
{
  "restaurant" : "zPizza",
  "restaurantitem" : [
    {
      "item" : "Penne with Meatballs"
    },
    {
      "item" : "Calzone"
    },
    {
      "item" : "Hot Meatball"
    },
    {
      "item" : "Turkey Breast"
    },
    {
      "item" : "Supersub"
    },
    {
      "item" : "Meat Calzone"
    },
    {
      "item" : "Chicken Penne"
    },
    {
      "item" : "Ham and Pineapple"
    },
    {
      "item" : "Ham Pizza"
    }
  ]
},
{
  "restaurant" : "Eastern Winds",
  "restaurantitem" : [
    {
      "item" : "Orange Chicken"
    },
    {
      "item" : "Sesame Chicken"
    },
    {
      "item" : "Chicken and Broc"
    },
    {
      "item" : "Mongolian Beef"
    },
    {
      "item" : "Kung Pao"
    },
    {
      "item" : "Prawns with Broc"
    },
    {
      "item" : "Tofu Prawns"
    }
  ]
},
{
  "restaurant" : "King Taco",
  "restaurantitem" : [
    {
      "item" : "Carne Asada"
    },
    {
      "item" : "Carnitas"
    },
    {
      "item" : "Al Pastor"
    },
    {
      "item" : "Lengua"
    },
    {
      "item" : "Cabeza"
    },
    {
      "item" : "Tripas"
    },
    {
      "item" : "Molleja"
    },
    {
      "item" : "Bean and Cheese"
    }
  ]
});

db.ordercollection.remove({});
db.ordercollection.insert(
{
  "restname" : "Z Pizza",
  "date" : "4/27",
  "phone" : "555-555-5555",
  "ordertime" : "lunch",
  "price" : "123",
  "orderitems" : [
    {
      "username" : "Peter",
      "menuitem" : "Pizza",
      "specialreq" : "extra cheese"
    },
    {
      "username" : "Bill",
      "menuitem" : "Pita",
      "specialreq" : ""
    },
    {
      "username" : "Sean",
      "menuitem" : "Wrap",
      "specialreq" : "double meat"
    },
    {
      "username" : "Taylor",
      "menuitem" : "Chicken",
      "specialreq" : ""
    },
    {
      "username" : "Jose",
      "menuitem" : "Beef",
      "specialreq" : ""
    },
    {
      "username" : "Admin",
      "menuitem" : "Burrito",
      "specialreq" : "no beans"
    },
    {
      "username" : "Admin",
      "menuitem" : "Burger",
      "specialreq" : "no onions"
    },
    {
      "username" : "Oswald",
      "menuitem" : "Hawaiian",
      "specialreq" : "oswalds favorite"
    },
    {
      "username" : "Oswald",
      "menuitem" : "Bacon Cheddar",
      "specialreq" : "asknaksjfna"
    },
    {
      "username" : "Oswald",
      "menuitem" : "Bacon Cheddar",
      "specialreq" : "asknaksjfna"
    },
    {
      "username" : "Oswald",
      "menuitem" : "Avocado Burger",
      "specialreq" : "no avocado"
    }
  ]
},
{
  "restname" : "Falafel Corner",
  "date" : "4/28",
  "phone" : "555-555-5555",
  "ordertime" : "dinner",
  "price" : "321",
  "orderitems" : [
    {
      "username" : "Peter",
      "menuitem" : "Indian",
      "specialreq" : "extra cheese"
    },
    {
      "username" : "Bill",
      "menuitem" : "Orange Chicken",
      "specialreq" : ""
    },
    {
      "username" : "Sean",
      "menuitem" : "Wrap",
      "specialreq" : "double meat"
    },
    {
      "username" : "Taylor",
      "menuitem" : "Chicken",
      "specialreq" : ""
    },
    {
      "username" : "Jose",
      "menuitem" : "Beef",
      "specialreq" : ""
    },
    {
      "username" : "Admin",
      "menuitem" : "Burrito",
      "specialreq" : "no beans"
    },
    {
      "username" : "Admin",
      "menuitem" : "Burger",
      "specialreq" : "no onions"
    }
  ]
});

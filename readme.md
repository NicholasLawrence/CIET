# Can I Eat This API (CIET)

[![N|Solid](http://coenraets.org/blog/wp-content/uploads/2013/04/nodejs-mongodb.png)](https://google.com)

CIET is a mobile application that will let users navigate through the menu of a restaurant and be alerted to foods that they may be allergic to. The API is compatible with JSON.

  - Specify your allergies
  - View a restaurant's menu
  - View dish & related allergies

### REST API v 1.0

CIET uses a number of open source projects to work properly:

* [Underscore.js] -  functional programming helpers without extending any built-in objects.
* [mongoDB] - open-source, document database designed for ease of development and scaling
* [mongoose] - object modeling tool designed to work in an asynchronous environment.
* [node.js] - evented I/O for the backend
* [restify] - node.js module built specifically to enable you to build correct REST web services.

### Installation

CIET requires [Node.js](https://nodejs.org/) v6.9.1+ to run.
The database is hosted on mLab, connection details are embedded in the included config.json file.


Install the dependencies and devDependencies and start the server.

```sh
$ cd API
$ npm install -d
$ node host.js
```

### Specification / Request Documentation
By default, the app will expose port 8080, so change this within the host.js file if necessary. 
##### Get User Preferences
View saved allergies and feedback. 
###### Request
* id: User ID
```http
GET http://localhost:8080/user/:id/preferences
```
##### Response
```json
[
  {
    "_id": 1,
    "information_is_useful": true,
    "will_use_app_in_future": true,
    "allergies": [
      {
        "allergy_id": {
          "_id": 1,
          "name": "Nut (Peanut)"
        },
        "severity": "Minor"
      },
      {
        "allergy_id": {
          "_id": 2,
          "name": "Milk"
        },
        "severity": "Moderate"
      },
      {
        "allergy_id": {
          "_id": 3,
          "name": "Egg"
        },
        "serverity": "Dangerous"
      }
    ]
  }
]
```
#### Upsert User Preferences
Inset or Update (if exists) user saved allergies and feedback.
##### Request
* id: User ID
```http
PUT http://localhost:8080/user/:id/preferences
```
```json
[
  {
    "_id": 1,
    "information_is_useful": true,
    "will_use_app_in_future": true,
    "allergies": [
      {
        "allergy_id": 1,
        "severity": "Minor"
      },
      {
        "allergy_id": 2,
        "severity": "Moderate"
      },
      {
        "allergy_id": 3,
        "serverity": "Dangerous"
      }
    ]
  }
]
```
##### Response
HTTP Response Code

##### Get Restaurant Menus
The items on the menu will show the name and image of the dish, a brief description of the dish, the main ingredients, a list of severe allergy risks, and whether the user is allergic to an item in the dish and the severity.
###### Request
* user_id: [Required] User ID 
* last_menu_id: Used for paging through restaurant menus. V aluerestaurant menu at the end of last request or 0 to start at the beginning.
* limit: Number of restaurant menus to return.
```http
GET http://localhost:8080/menu/:last_menu_id/:limit?user_id=:user_id
```
###### Response
```json
[
  {
    "_id": 1,
    "items": [
      {
        "image": "aaaaa.jpg",
        "name": "Stuffed Chicken",
        "description": "The stuffing used in this chicken is a good option for gluten-intolerant eaters.",
        "ingredients": [
          "jasmine rice",
          "golden sultanas",
          "red onion",
          "chicken stock",
          "butter",
          "black pepper",
          "chicken",
          "pine nuts",
          "lemons",
          "italian parsley",
          "olive oil"
        ],
        "allergy_risks": [
          {
            "allergy_id": {
              "_id": 1,
              "name": "Nut (Peanut)"
            },
            "severity": "High",
            "userHasAllergy": true,
            "userAllergySeverity": "Minor"
          },
          {
            "allergy_id": {
              "_id": 2,
              "name": "Milk"
            },
            "severity": "Medium",
            "userHasAllergy": true,
            "userAllergySeverity": "Moderate"
          }
        ]
      },
      {
        "image": "aaaab.jpg",
        "name": "Eggplant Salad",
        "description": "We like to serve the eggplant salad warm but it is just as delicious served at room temperature.",
        "ingredients": [
          "eggplants",
          "oregano",
          "olive oil",
          "pomegrante seed",
          "tomatoes",
          "basil leaves"
        ],
        "allergy_risks": []
      },
      {
        "image": "aaaac.jpg",
        "name": "Salad Dressing",
        "description": "Eggplant Salad Dressing",
        "ingredients": [
          "sherry vinegar",
          "pomegranate molasses",
          "olive oil"
        ],
        "allergy_risks": []
      }
    ]
  }
]
```

#### Get Menu Item Image
Returns the image for a menu item/dish
##### Request
* filename: name of the image with extension. eg. aaaaa.jpg
```http
GET http://localhost:8080/Images/:filename
```
##### Response
Image

### Todos

 - Write Tests
 - Add Code Comments
 - Implement referential integrity checks on Allergy Data
 - Validate request parameters
 - Search by restaurant once CTO finishes restaurant & venue implementation
 - Improve static image serving regex for security
 - Set proper HTTP Headers, especially content-type and CORS
 - Swap out MongoDB's deprecated promise framework
 - Encrypt config data
 
### Assumptions
 - Menu Item/Dish images are requested separately to accomodate caching in future modifications
 - Restaurant & Venue data was not tagged to Menu since those 2 sections were to be omitted.
 - The CTO wanted to capture how many users found the information useful and will use it in the future.
 
### Apologies
- Sorry about the shortage of sample data

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [mongoose]: <https://mongoosejs.com>
   [mongoDB]: <http://mongodb.com>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [restify]: <http://restify.com>
   [Underscore.js]: <http://underscore.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]:  <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>

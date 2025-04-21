RESTful API homework. Made with nodejs, I have already made a more complex system that is similar to this, for the local religious schools of BFI "Isa Beu", if interested I can show you the project!

# OVERVIEW

In the controllers folder you can find the functions for all models, in all of them there are crud ops, i made 3 controllers to differentiate them by their nature, courses-controller has the functions that only apply to courses, and so does student-controller to students, while enroll-controller has functions that make the two models interact with each other.

You may realise by the way the structure of the code is written that i always start with "create" functions, that's because i do the testing as i go.

P.s in server.js I've made the the API "multithreaded" because nodejs runs on a single thread per process, but if we run it locally & we have a cpu with multiple cores this allows us to start a new 'child' process for each CPU core, each worker runs its own separate instance of the server.

# SETUP

1. Install Dependencies
   npm install (if any deprecated use --legacy-peer-deps, its not production code so it's safe to)

2. .env file is already set up and the database cluster on mongo is modified so anyone can connect to it, you have the key in the private comments in the homework assignment

3. Start it
   npm start

4. Install Postman or Insomnia
5. In /routes you have all routes for courses, students and enrolling.

# SAMPLE REQUESTs/RESPONSEs (api="http://localhost:1234")

GET api/enroll/students-of/6806759235342c48bd162d9f
RESPONSE: {
"message": [
{
"_id": "6806693760e5f27fb0e0890f",
"name": "Burimi"
},
{
"_id": "68067ee7ffc5efdfc49d18b2",
"name": "Shqipe"
},
{
"_id": "68067efd0fc7f924992c247a",
"name": "Mujdin"
},
{
"_id": "68067f070fc7f924992c247d",
"name": "Etnik"
},
{
"_id": "68067f0f0fc7f924992c2480",
"name": "SSSSSS"
},
{
"_id": "68067f300fc7f924992c2489",
"name": "Kujtim"
},
{
"_id": "68067f1e0fc7f924992c2486",
"name": "Sinan"
}
],
"data": []
}

GET api/student/
QUERY PARAMS page:2
{
"data": [
{
"_id": "68067f170fc7f924992c2483",
"name": "testttt",
"email": "test1@gmail.com",
"createdAt": "2025-04-21T17:23:35.709Z",
"updatedAt": "2025-04-21T17:23:35.709Z",
"__v": 0
},
{
"_id": "68067f1e0fc7f924992c2486",
"name": "Sinan",
"email": "test2@gmail.com",
"createdAt": "2025-04-21T17:23:42.949Z",
"updatedAt": "2025-04-21T19:39:33.553Z",
"__v": 0
},
{
"_id": "68067f300fc7f924992c2489",
"name": "Kujtim",
"email": "ademi@gmail.com",
"createdAt": "2025-04-21T17:24:00.830Z",
"updatedAt": "2025-04-21T19:38:38.081Z",
"__v": 0
}
]
}

// createdAt/updatedAt is because i enabled timestamps for the models

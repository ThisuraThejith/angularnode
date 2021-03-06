/**
 * Created by thisura on 6/20/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.json());


//let app = express();



//Database connection
mongoose.connect('mongodb://localhost/university');

//Database schemas for deparment and program objects
var departments = mongoose.model('departments', {id: String, name: String});
var programs = mongoose.model('programs', {id: String, name: String});

app.use(cors());
// to change your ports for different cors stuff:

//Server Startup
app.listen(8080, function(error){
    console.log("[INFO] DEPARTEMENT API RUNNING ON http://localhost:8080/");
});



//Fetches all the departments
app.get("/departments", function(req, res){
    console.log("[ROUTE CALLED][GET] /departments");
    departments.find(function(error, departments){
        if(error){
            console.log("[ERROR] FETCHING DEPARTMENTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING DEPARTMENTS FROM DATABASE SUCCESS");
        //res.header("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.json(departments);
        console.log()
    });
});

//Returns one department by the ID
app.get("/departments/:id", function(req, res){
    var reqId = req.params.id;
    console.log("[ROUTE CALLED][GET] /departments/" + reqId);
    departments.find({id: reqId}, function(error, departments){
        if(error){
            console.log("[ERROR] FETCHING ONE DEPARTMENT FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING ONE DEPARTMENT FROM DATABASE SUCCESS");
        res.json(departments);
    });
});

//Adds new department
app.post("/departments", function(req, res){
    console.log("[ROUTE CALLED][POST] /departments");

    var newDepartment = new departments(req.body);

    newDepartment.save(function (error, newDepartment){
        if(error){
            console.log("[ERROR] ADDING A NEW DEPARTMENT TO DATABASE FAILED");
            res.end();
        }
        console.log("[DB] ADDING A NEW DEPARTMENT TO DATABASE SUCCESS");
        res.json(newDepartment);
    });
});

//Returns programs belonging to a specific department
app.get("/departments/programs/:departmentId", function(req, res){
    var reqId = req.params.departmentId;
    console.log("[ROUTE CALLED][GET] /departments/programs/" + reqId);
    programs.find({dept: reqId}, function(error, departments){
        if(error){
            console.log("[ERROR] FETCHING PROGRAMS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING PROGRAMS FROM DATABASE SUCCESS");
        res.json(departments);
    });
});

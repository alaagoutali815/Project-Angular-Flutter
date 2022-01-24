var Express = require("express");
var bodyParser = require("body-parser");
//const userRouteur = require('./routes/users');
//app.use ('/api/auth',userRouteur);

var app =Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var MongoClient = require("mongodb").MongoClient;
const { request, response } = require("express");
var CONNECTION_STRING = "mongodb://localhost/meanapp"


var fileUpload = require('express-fileupload');
var fs = require('fs');
app.use(fileUpload());
app.use('/Photos',Express.static(__dirname+'/Photos'));


var cors = require('cors')
app.use(cors())




var DATABASE = "meanappemployee";
var database;

app.listen(49146,()=>{

    MongoClient.connect(CONNECTION_STRING,{useNewUrlParser:true},(error,client)=>{
        database=client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
    })

});

app.get('/',(request,response)=>{
    response.json('Hello World');
})

//Api Department
app.get('/api/department',(request,response)=>{

    database.collection("Department").find({}).toArray((error,result)=>{
        if(error){
            console.log(error);
        }

        response.send(result);
    })

})

app.post('/api/department',(request,response)=>{

    database.collection("Department").count({},function(error,numOfDocs){
        if(error){
            console.log(error);
        }

        database.collection("Department").insertOne({
                DepartmentId : numOfDocs+1,
                DepartmentName : request.body['DepartmentName'] 
        });

        response.json("Added Successfully");
    })

})


app.put('/api/department',(request,response)=>{

        database.collection("Department").updateOne(
            //Filter Criteria
            {
                "DepartmentId":request.body['DepartmentId']
            },
            //Update
            {$set:
                {
                    "DepartmentName":request.body['DepartmentName']
                }

            }
        );

        response.json("Updated Successfully");
})



app.delete('/api/department/:id',(request,response)=>{

    database.collection("Department").deleteOne({
       DepartmentId:parseInt(request.params.id)
    });

    response.json("Deleted Successfully");
})

//Api Employee
app.get('/api/employee',(request,response)=>{

    database.collection("Employee").find({}).toArray((error,result)=>{
        if(error){
            console.log(error);
        }

        response.send(result);
    })

})

app.post('/api/employee',(request,response)=>{

    database.collection("Employee").count({},function(error,numOfDocs){
        if(error){
            console.log(error);
        }

        database.collection("Employee").insertOne({
            EmployeeId : numOfDocs+1,
            FirstName : request.body['FirstName'],
            LastName : request.body['LastName'],
            Department : request.body['Department'],
            Email : request.body['Email'],
            Phone : request.body['Phone'],
            Adress : request.body['Adress'],
            DateOfJoining :request.body['DateOfJoining'],
            PhotoFileName :  request.body['PhotoFileName'],
        });

        response.json("Added Successfully");
    })

})


app.put('/api/employee',(request,response)=>{

        database.collection("Employee").updateOne(
            //Filter Criteria
            {
                "EmployeeId":request.body['EmployeeId']
            },
            //Update
            {$set:
                {
            FirstName : request.body['FirstName'],
            LastName : request.body['LastName'],
            Department : request.body['Department'],
            Email : request.body['Email'],
            Phone : request.body['Phone'],
            Adress : request.body['Adress'],
            DateOfJoining :request.body['DateOfJoining'],
            PhotoFileName :  request.body['PhotoFileName'],
                }

            }
        );

        response.json("Updated Successfully");
})



app.delete('/api/employee/:id',(request,response)=>{

    database.collection("Employee").deleteOne({
        EmployeeId:parseInt(request.params.id)
    });

    response.json("Deleted Successfully");
})


app.post('/api/employee/savefile',(request,response)=>{

    fs.writeFile("./Photos/"+request.files.file.name,
    request.files.file.data, function(err){
        if(err){
            console.log(err);
        }

        response.json(request.files.file.name);
    }
    )
})
//Api Projet
app.get('/api/projet',(request,response)=>{

    database.collection("Projet").find({}).toArray((error,result)=>{
        if(error){
            console.log(error);
        }

        response.send(result);
    })

})

app.post('/api/projet',(request,response)=>{

    database.collection("Projet").count({},function(error,numOfDocs){
        if(error){
            console.log(error);
        }

        database.collection("Projet").insertOne({
            ProjetId : numOfDocs+1,
            NameProject : request.body['NameProject'],
            Deadline : request.body['Deadline'],
            AffectTo : request.body['AffectTo'],
            HoursProjet : request.body['HoursProjet'],
            Company : request.body['Company'],
            PhotoFileName :  request.body['PhotoFileName'],
        });

        response.json("Added Successfully");
    })

})


app.put('/api/projet',(request,response)=>{

    database.collection("Projet").updateOne(
        //Filter Criteria
        {
            "ProjetId":request.body['ProjetId']
        },
        //Update
        {$set:
            {
                NameProject : request.body['NameProject'],
                Deadline : request.body['Deadline'],
                AffectTo : request.body['AffectTo'],
                HoursProjet : request.body['HoursProjet'],
                Company : request.body['Company'],
                PhotoFileName :  request.body['PhotoFileName'],
            }

        }
    );

    response.json("Updated Successfully");
})



app.delete('/api/projet/:id',(request,response)=>{

    database.collection("Projet").deleteOne({
        ProjetId:parseInt(request.params.id)
    });

    response.json("Deleted Successfully");
})


app.post('/api/projet/savefile',(request,response)=>{

    fs.writeFile("./Photos/"+request.files.file.name,
    request.files.file.data, function(err){
        if(err){
            console.log(err);
        }

        response.json(request.files.file.name);
    }
    )
})



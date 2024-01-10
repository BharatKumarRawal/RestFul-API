//working with post method (create a new data ) in restful api using express js

const express = require("express");
const app = express();
require("./db/conn"); //import from conn.js

const Student = require("./models/student"); //import from model/student

const port = process.env.PORT || 8000;

app.use(express.json());

//create a new students
// using promise
// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body); //geting the data using req.data and giving value to the document
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(401).send(e);
//     });

//   //inserting into the database
// });

// using async
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser); //it comes to postman
  } catch (e) {
    res.status(401).send(e);
  }
});

//read the data of registered students
app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.send(studentData);
  } catch (e) {}
});

//read the data using id
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    res.send(studentData);
  } catch (e) {}
});

/*/////// update the students by its id */ ////

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(
      { _id: _id },
      req.body,
      { new: true }
    ); //new true shows updated data in postman
    res.status(201).send(updateStudent);
  } catch (e) {
    res.status(401).send(e);
  }
});

//********* Delete request in RestAPI******** */

app.delete("/students/:id", async (req, res) => {
  try {
    const email = req.params.email;
    const deleteStudent = await Student.deleteOne({ email: email }); //using email as the path
    if (!req.params.email) {
      return res.status(400).send("Vi error cha");
    }
    res.status(201).send(deleteStudent);
  } catch (e) {
    res.status(401).send(e);
  }
});

app.listen(port, () => {
  console.log(`listening at the ${port}`);
});

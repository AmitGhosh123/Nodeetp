const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//make a code to make student collection and add some data

const app = express();
app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect("mongodb://0.0.0.0/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}
).catch((err) => {
  console.log(err);
}
);


//create a schema
const studentSchema = {
  name: String,
  age: Number,
  email: String,
  phone: Number,
};

//create a model
const Student = mongoose.model("Student", studentSchema);

//create a document of only 1 student
const student1 = new Student({
  name: "Sakshi",
  age: 20,
  email: "demo@gmail.com",
  phone: 1234567890,
});

//insert a document
student1.save();

// after insert we will comment it
app.get("/", (req, res) => {
  res.send("Hello World");
}
);

app.get("/students", (req, res) => {
  Student.find().then((data)=>{
    console.log(data);
    res.json(data);
  })
}
);
// find whose age is greater than 20
app.get("/students/age", (req, res) => {
  Student.find({age:{$gt:17}}).then((data)=>{
    console.log(data);
    res.json(data);
  }
  );
}
);


app.post("/add", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const email = req.body.email;
  const phone = req.body.phone;

  const student = new Student({
    name,
    age,
    email,
    phone,
  });

  student.save();
}
);

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Student.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted");
    }
  });
}
);

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  Student.findById(id, (err, student) => {
    res.send(student);
  });
}
);

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  Student.findById(id, (err, student) => {
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      student.name = req.body.name;
      student.age = req.body.age;
      student.email = req.body.email;
      student.phone = req.body.phone;

      student.save().then((student) => {
        res.json(student);
      });
    }
  });
}
);

app.listen(5500, () => {

  console.log("Server is running on port 5000");
}
);
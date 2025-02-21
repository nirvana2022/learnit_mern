import { courses } from "./datos/cursos.js";
import express, { request, response } from "express";
import { checkCourse, checkUpCourse } from "./helpers/zod.js";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./db.js"; // Importa la conexión a MongoDB

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = 3000;

// Conectar a MongoDB
connectDB();

// Esquema de Mongoose para los cursos
const courseSchema = new mongoose.Schema({
  _idCourse: Number,
  nameCourse: String,
  descCourse: String,
});

const Course = mongoose.model("Course", courseSchema);

// Método para consultar todos los cursos
app.get("/api/courses", async (request, response) => {
  const courses = await Course.find();
  response.json(courses);
});

// Método para consultar un curso específico
app.get("/api/courses/:id", async (request, response) => {
  const idCourse = Number(request.params.id);
  const course = await Course.findOne({ _idCourse: idCourse });

  if (course) {
    response.json(course);
  } else {
    response.status(400).end();
  }
});

// Método para eliminar un curso específico
app.delete("/api/courses/:id", async (request, response) => {
  const idCourse = Number(request.params.id);
  await Course.deleteOne({ _idCourse: idCourse });
  const courses = await Course.find();
  response.json(courses);
});

// Método para crear un curso nuevo
app.post("/api/courses", async (request, response) => {
  const course = checkCourse(request.body);

  if (course.error) {
    return response
      .status(400)
      .json("El formato de los datos ingresados no es valido...");
  }

  const newCourse = new Course(course.data);
  await newCourse.save();
  response.json(newCourse);
});

// Método para actualizar un curso
app.put("/api/courses/:id", async (request, response) => {
  const idCourse = Number(request.params.id);
  const courseCheck = checkUpCourse(request.body);

  if (courseCheck.error) {
    return response
      .status(400)
      .json("El formato de los datos ingresados no es valido...");
  }

  const updatedCourse = await Course.findOneAndUpdate(
    { _idCourse: idCourse },
    courseCheck.data,
    { new: true }
  );

  if (!updatedCourse) {
    return response.status(400).json("Curso no encontrado");
  }

  response.json(updatedCourse);
});

app.listen(PORT, () => {
  console.log("Servidor ejecutandose en el puerto: " + PORT);
});

/* Importación de componentes de datos */
import { courses } from "./datos/cursos.js";
/* Importación de librería de express */
import express, { request, response } from "express";
/* Importación de métodos de zod para manipulación y validaciones de datos */
import { checkCourse, checkUpCourse } from "./helpers/zod.js";

/* Importación de cors para permitir solicitudes del frontend */
import cors from "cors";
/* Imlementación de nuestra app mediante express */
const app = express();

/* Implementación de middleware(recibe datos del front y los devuelve)*/
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001", // Permite solo este origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permite enviar cookies o credenciales
  })
);

/* Puerto del servidor */
const PORT = 3000;

/* Variable para inicializar los datos de los cursos */
let coursesDevolver = courses;

/* Método para consultar todos los cursos */
app.get("/api/courses", (request, response) => {
  response.json(coursesDevolver);
});

/* Método para consultar un curso especifico */
app.get("/api/courses/:id", (request, response) => {
  const idCourse = Number(request.params.id);
  const course = coursesDevolver.find((course) => course._idCourse == idCourse);

  if (course) {
    response.json(course);
  } else {
    response.status(400).end();
  }
});

/* Método para eliminar un curso especifico */
app.delete("/api/courses/:id", (request, response) => {
  const idCourse = Number(request.params.id);
  coursesDevolver = coursesDevolver.filter(
    (course) => course._idCourse != idCourse
  );
  if (coursesDevolver) {
    response.json(coursesDevolver);
  } else {
    response.status(400).end();
  }
});

/* Método para crear un curso nuevo */
app.post("/api/courses", (request, response) => {
  /* Validación de informacion recibida en el body para crear un curso mediante helpers con zod */
  const course = checkCourse(request.body);

  if (course.error) {
    return response
      .status(400)
      .json("El formato de los datos ingresados no es valido...");
  }

  const newCourse = {
    ...course.data,
  };

  /*  Para uso sin zod 
  const newCourse = {
    _idCourse: course._idCourse,
    nameCourse: course.nameCourse,
    descCourse: course.descCourse,
  }; */

  coursesDevolver = [...coursesDevolver, newCourse];

  response.json(newCourse);
});

/* Método para actualizar un curso */
app.put("/api/courses/:id", (request, response) => {
  const idCourse = Number(request.params.id);
  const courseCheck = checkUpCourse(request.body);

  if (courseCheck.error) {
    return response
      .status(400)
      .json("El formato de los datos ingresados no es valido...");
  }
  const courseIndice = coursesDevolver.findIndex(
    (course) => course._idCourse == idCourse
  );

  if (courseIndice == -1) {
    return response.status(400).json("Articulo no encontrado");
  }
  const newCourse = {
    ...coursesDevolver[courseIndice],
    ...courseCheck.data,
  };
  coursesDevolver[courseIndice] = newCourse;
  response.json(newCourse);
});

/* Verificación de puesta en marcha del servidor */
app.listen(PORT, () => {
  console.log("Servidor ejecutandose en el puerto: " + PORT);
});

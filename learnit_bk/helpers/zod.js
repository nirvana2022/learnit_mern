/* Importación de librerías */
import zod from "zod";

/* Declaración de un objeto de persistencia de validación de datos con zod */
const courseSchema = zod.object({
  _idCourse: zod.number(),
  nameCourse: zod.string(),
  descCourse: zod.string(),
});

/* Método para validar información del curso */
export const checkCourse = (course) => {
  return courseSchema.safeParse(course);
};

/* Método para validar y actualizar de forma de parcial */
export const checkUpCourse = (course) => {
  return courseSchema.partial().safeParse(course);
};

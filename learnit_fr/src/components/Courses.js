import React, { useState } from "react";
import CourseList from "./CourseList";
import CourseForm from "./CourseForm";
import "../App.css";
import "../index.css";

const Courses = () => {
  const [courseToEdit, setCourseToEdit] = useState(null);

  const handleCourseUpdated = () => {
    setCourseToEdit(null); // Limpiar el formulario después de actualizar/crear
  };

  return (
    <div>
      <h1>Gestión de Cursos</h1>
      <CourseForm
        courseToEdit={courseToEdit}
        onCourseUpdated={handleCourseUpdated}
      />
      <CourseList onEdit={setCourseToEdit} />
    </div>
  );
};

export default Courses;

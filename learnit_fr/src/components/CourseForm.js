import React, { useState, useEffect } from "react";
import "../App.css";
import "../index.css";

const CourseForm = ({ courseToEdit, onCourseUpdated }) => {
  const [course, setCourse] = useState({ nameCourse: "", descCourse: "" });

  // Actualizar el estado del formulario cuando cambie courseToEdit
  useEffect(() => {
    if (courseToEdit) {
      setCourse(courseToEdit);
    } else {
      setCourse({ nameCourse: "", descCourse: "" });
    }
  }, [courseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = course._idCourse
      ? `http://localhost:3000/api/courses/${course._idCourse}`
      : "http://localhost:3000/api/courses";
    const method = course._idCourse ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    const data = await response.json();
    onCourseUpdated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Identificador del curso"
        value={course._idCourse}
        onChange={(e) => setCourse({ ...course, Course: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre del curso"
        value={course.nameCourse}
        onChange={(e) => setCourse({ ...course, nameCourse: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción del curso"
        value={course.descCourse}
        onChange={(e) => setCourse({ ...course, descCourse: e.target.value })}
      />
      <button type="submit">
        {course._idCourse ? "Actualizar Curso" : "Crear Curso"}
      </button>
    </form>
  );
};

export default CourseForm;

import React, { useEffect, useState } from "react";
import "../App.css";
import "../index.css";

const CourseList = ({ onEdit }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await fetch("http://localhost:3000/api/courses");
    const data = await response.json();
    setCourses(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/courses/${id}`, {
      method: "DELETE",
    });
    fetchCourses(); // Recargar la lista después de eliminar
  };

  return (
    <div>
      <h2>Lista de Cursos</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._idCourse}>
            <h3>{course.nameCourse}</h3>
            <p>{course.descCourse}</p>
            <button onClick={() => onEdit(course)}>Editar</button>
            <button onClick={() => handleDelete(course._idCourse)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

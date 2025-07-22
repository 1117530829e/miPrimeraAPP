"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

// Mock data for students and courses
const studentsData = [
  // Grado 1°
  { id: 1, name: "Ana García", course: "1° Grado", age: 6, grade: "A" },
  { id: 2, name: "Carlos López", course: "1° Grado", age: 6, grade: "A" },
  { id: 3, name: "María Rodríguez", course: "1° Grado", age: 7, grade: "B" },
  { id: 4, name: "Diego Martínez", course: "1° Grado", age: 6, grade: "B" },

  // Grado 2°
  { id: 5, name: "Sofía Hernández", course: "2° Grado", age: 7, grade: "A" },
  { id: 6, name: "Alejandro Torres", course: "2° Grado", age: 8, grade: "A" },
  { id: 7, name: "Isabella Flores", course: "2° Grado", age: 7, grade: "B" },
  { id: 8, name: "Mateo Jiménez", course: "2° Grado", age: 8, grade: "B" },

  // Grado 3°
  { id: 9, name: "Valentina Castro", course: "3° Grado", age: 8, grade: "A" },
  { id: 10, name: "Santiago Morales", course: "3° Grado", age: 9, grade: "A" },
  { id: 11, name: "Camila Vargas", course: "3° Grado", age: 8, grade: "B" },
  { id: 12, name: "Nicolás Ruiz", course: "3° Grado", age: 9, grade: "B" },

  // Grado 4°
  { id: 13, name: "Emma Delgado", course: "4° Grado", age: 9, grade: "A" },
  { id: 14, name: "Lucas Peña", course: "4° Grado", age: 10, grade: "A" },
  { id: 15, name: "Zoe Mendoza", course: "4° Grado", age: 9, grade: "B" },
  { id: 16, name: "Sebastián Ortiz", course: "4° Grado", age: 10, grade: "B" },

  // Grado 5°
  { id: 17, name: "Mía Guerrero", course: "5° Grado", age: 10, grade: "A" },
  { id: 18, name: "Emilio Ramos", course: "5° Grado", age: 11, grade: "A" },
  { id: 19, name: "Luna Silva", course: "5° Grado", age: 10, grade: "B" },
  { id: 20, name: "Joaquín Vega", course: "5° Grado", age: 11, grade: "B" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Todos");
  useEffect(() => {
    setSearchTerm("");
  }, []);

  // Get unique courses
  const courses = [
    "Todos",
    ...new Set(studentsData.map((student) => student.course)),
  ];

  // Filter students based on search term and selected course
  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse =
        selectedCourse === "Todos" || student.course === selectedCourse;
      return matchesSearch && matchesCourse;
    });
  }, [searchTerm, selectedCourse]);

  // Group students by course
  const studentsByCourse = useMemo(() => {
    const grouped = {};
    filteredStudents.forEach((student) => {
      if (!grouped[student.course]) {
        grouped[student.course] = [];
      }
      grouped[student.course].push(student);
    });
    return grouped;
  }, [filteredStudents]);

  return (
    <div className="min-h-screen relative">
      {/* Background Image using Next.js Image component */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/pabloescobar.jpg"
          alt="Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
        />
      </div>
      {/* Overlay for better content readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  Colegio San Martín 12
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Directorio de Estudiantes
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar estudiante o curso..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Course Filter */}
            <div>
              <select
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando {filteredStudents.length} estudiante
            {filteredStudents.length !== 1 ? "s" : ""}
            {selectedCourse !== "Todos" && ` en ${selectedCourse}`}
          </div>
        </div>

        {/* Students by Course */}
        <div className="space-y-8">
          {Object.keys(studentsByCourse)
            .sort()
            .map((course) => (
              <div
                key={course}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course}
                    <span className="ml-3 bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full">
                      {studentsByCourse[course].length} estudiantes
                    </span>
                  </h2>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {studentsByCourse[course].map((student) => (
                      <div
                        key={student.id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                            {student.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                              {student.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Edad: {student.age} años
                            </p>
                            <p className="text-sm text-blue-600 font-medium">
                              Sección: {student.grade}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron estudiantes
            </h3>
            <p className="text-gray-600">
              Intenta ajustar tu búsqueda o filtro.
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-semibold mb-2">Colegio San Martín</p>
          <p className="text-gray-400">Formando líderes del mañana</p>
          <div className="mt-4 flex justify-center space-x-6">
            <span className="text-sm text-gray-400">
              📧 info@colegiosanmartin.edu
            </span>
            <span className="text-sm text-gray-400">📞 (555) 123-4567</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

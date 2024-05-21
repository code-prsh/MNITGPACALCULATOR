import React, { useState } from 'react';

const GpaCalculator = () => {
  const [semesters, setSemesters] = useState([{ courses: [{ grade: '', credit: '' }], gpa: null }]);
  const [cgpa, setCgpa] = useState(null);

  const handleChange = (semesterIndex, courseIndex, event) => {
    const { name, value } = event.target;
    const values = [...semesters];
    values[semesterIndex].courses[courseIndex][name] = value;
    setSemesters(values);
  };

  const handleAddCourse = (semesterIndex) => {
    const values = [...semesters];
    values[semesterIndex].courses.push({ grade: '', credit: '' });
    setSemesters(values);
  };

  const handleRemoveCourse = (semesterIndex, courseIndex) => {
    const values = [...semesters];
    values[semesterIndex].courses.splice(courseIndex, 1);
    setSemesters(values);
  };

  const handleAddSemester = () => {
    setSemesters([...semesters, { courses: [{ grade: '', credit: '' }], gpa: null }]);
  };

  const handleRemoveSemester = (semesterIndex) => {
    const values = [...semesters];
    values.splice(semesterIndex, 1);
    setSemesters(values);
  };

  const getGradePoint = (grade) => {
    switch (grade.toUpperCase()) {
      case 'AA':
        return 10.0;
      case 'AB':
        return 9.0;
      case 'BB':
        return 8.0;
      case 'BC':
        return 7.0;
      case 'CC':
        return 6.0;
      case 'CD':
        return 5.0;
      case 'DD':
        return 4.0;
      default:
        return null;
    }
  };

  const calculateSemesterGpa = (semesterIndex) => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters[semesterIndex].courses.forEach((course) => {
      const gradePoint = getGradePoint(course.grade);
      const credit = parseFloat(course.credit);
      if (gradePoint !== null && !isNaN(credit)) {
        totalPoints += gradePoint * credit;
        totalCredits += credit;
      }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    const values = [...semesters];
    values[semesterIndex].gpa = gpa;
    setSemesters(values);
  };

  const calculateCgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    semesters.forEach((semester) => {
      if (semester.gpa !== null) {
        totalPoints += semester.gpa * getTotalCredits(semester);
        totalCredits += getTotalCredits(semester);
      }
    });

    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    setCgpa(cgpa);
  };

  const getTotalCredits = (semester) => {
    return semester.courses.reduce((total, course) => total + parseFloat(course.credit || 0), 0);
  };

  const getGpaRangeText = (gpa) => {
    if (gpa >= 9.0) {
      return "Are AAP to topper hn";
    } else if (gpa >= 8.0) {
      return "Placement tumhari hi lagegi";
    } else if (gpa >= 7.0) {
      return "Kehna muskil h kuch!";
    } else if (gpa >= 6.0) {
      return "college placemnet se to ummid chhod hi do";
    } else {
      return "Ram Naam satya h";
    }
  };

  return (
    <div className="container">
    <img src='https://upload.wikimedia.org/wikipedia/en/b/b7/Mnit_logo.png' alt='MNIT Logo' />
      <h1>GPA Calculator</h1>
      {semesters.map((semester, semesterIndex) => (
        <div key={semesterIndex} className="semester">
          <h2>Semester {semesterIndex + 1}</h2>
          {semester.courses.map((course, courseIndex) => (
            <div key={courseIndex} className="course">
              <select
                name="grade"
                value={course.grade}
                onChange={(event) => handleChange(semesterIndex, courseIndex, event)}
              >
                <option value="">Select Grade</option>
                <option value="AA">AA</option>
                <option value="AB">AB</option>
                <option value="BB">BB</option>
                <option value="BC">BC</option>
                <option value="CC">CC</option>
                <option value="CD">CD</option>
                <option value="DD">DD</option>
              </select>
              <input
                type="integer"
                name="credit"
                placeholder="Credits"
                value={course.credit}
                onChange={(event) => handleChange(semesterIndex, courseIndex, event)}
              />
              <button onClick={() => handleRemoveCourse(semesterIndex, courseIndex)}>Remove</button>
            </div>
          ))}
          <div className="buttons">
            <button onClick={() => handleAddCourse(semesterIndex)}>Add Course</button>
            <button onClick={() => calculateSemesterGpa(semesterIndex)}>Calculate GPA</button>
            <button onClick={() => handleRemoveSemester(semesterIndex)}>Remove Semester</button>
          </div>
          {semester.gpa !== null && <h3>GPA: {semester.gpa}</h3>}
          {semester.gpa !== null && <p>{getGpaRangeText(semester.gpa)}</p>}
        </div>
      ))}
      <div className="buttons">
        <button onClick={handleAddSemester}>Add Semester</button>
        <button onClick={calculateCgpa}>Calculate CGPA</button>
      </div>
      {cgpa !== null && <h2>Overall CGPA: {cgpa}</h2>}
      {cgpa !== null && <p>{getGpaRangeText(cgpa)}</p>}
    </div>
  );
};

export default GpaCalculator;


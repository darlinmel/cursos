"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let students = [];
let teachers = [];
let courses = [];
let activities = [];
let gradesbookSetups = [];
let assignments = [];
var Carrera;
(function (Carrera) {
    Carrera["turismo"] = "Turismo";
    Carrera["marketing"] = "Marketing";
    Carrera["software"] = "Software";
})(Carrera || (Carrera = {}));
var Courses;
(function (Courses) {
    Courses["interfaces"] = "Interfaces";
    Courses["programacion"] = "Programacion";
    Courses["metodologias"] = "Metodologias";
})(Courses || (Courses = {}));
function addStudent() {
    let currentStudent = {
        name: readHtml("nameStudent"),
        id: readHtml("idStudent"),
        address: readHtml("addressStudent"),
        registrationCode: parseInt(readHtml("registrationCodeStudent")),
        level: readHtml("levelStudent"),
    };
    students.push(currentStudent);
    console.table(students);
}
function addTeacher() {
    let currentTeacher = {
        name: readHtml("nameTeacher"),
        id: readHtml("idTeacher"),
        carrer: readHtml("carrerTeacher"),
    };
    teachers.push(currentTeacher);
    console.table(teachers);
}
function addCourse() {
    let currentCourse = {
        courseName: readHtml("asignatureTeacher"),
    };
    courses.push(currentCourse);
    console.table(courses);
    initSelect();
}
function addActivity() {
    let currentActivity = {
        name: readHtml("activity"),
    };
    activities.push(currentActivity);
    console.table(activities);
    initSelect();
}
function addgradeBook() {
    let currentGradebooksetup = {
        course: readHtml("courseGrade"),
        activity: readHtml("activityGrade"),
        peso: readHtml("weigthgrd"),
        gradeMax: parseInt(readHtml("maxnotagrd")),
    };
    gradesbookSetups.push(currentGradebooksetup);
    console.table(gradesbookSetups);
}
function readHtml(id) {
    return document.getElementById(id).value;
}
function addAssigment() {
    let currentAssignment = {
        student: readHtml("assignmentStudent"),
        gradebooksetup1: readHtml("asignmentGradebooksetup"),
        grade: parseInt(readHtml("asignmentGrade")),
    };
    assignments.push(currentAssignment);
    console.table(assignments);
    initSelect();
}
function initSelect() {
    let gradebookActivity = document.getElementById("activityGrade");
    document.querySelectorAll("#activityGrade option").forEach((option) => option.remove());
    activities.forEach((activity) => {
        let option = document.createElement("option");
        option.value = activity.name;
        option.text = activity.name;
        gradebookActivity.add(option);
    });
    let assignmentStudent = document.getElementById("assignmentStudent");
    document.querySelectorAll("#assignmentStudent option").forEach((option) => option.remove());
    students.forEach((student) => {
        let option = document.createElement("option");
        option.value = student.name;
        option.text = student.name;
        assignmentStudent.add(option);
    });
    let gradebookCourse = document.getElementById("courseGrade");
    document.querySelectorAll("#courseGrade option").forEach((option) => option.remove());
    courses.forEach((course) => {
        let option = document.createElement("option");
        option.value = course.courseName;
        option.text = course.courseName;
        gradebookCourse.add(option);
    });
    let assignmentSetup = document.getElementById("asignmentGradebooksetup");
    document.querySelectorAll("#asignmentGradebooksetup option").forEach((option) => option.remove());
    gradesbookSetups.forEach((data) => {
        let option = document.createElement("option");
        option.value = data.peso;
        option.text = data.peso;
        assignmentSetup.add(option);
    });
}
initSelect();
class Gradebook {
    constructor(students, activities, gradebookSetup, courses, assignments, teacher) {
        this.students = students;
        this.activities = activities;
        this.gradebookSetup = gradebookSetup;
        this.courses = courses;
        this.assignments = assignments;
        this.teacher = teacher;
    }
    distCourseActivityfromGradesbook() {
        let gradebookDTOs = [];
        this.assignments.forEach((assignment) => {
            let currentGradebooksetup = gradesbookSetups.find((setup) => setup.peso === assignment.gradebooksetup1);
            let currentStudent = students.find((student) => student.name === assignment.student);
            if (currentGradebooksetup && currentStudent) {
                let rowGradebook = {
                    registrationCode: 0,
                    level: currentStudent.level,
                    name: currentStudent.name,
                    peso: "",
                    gradeMax: 0,
                    id: assignment.student,
                    activity: currentGradebooksetup.activity,
                    student: assignment.student,
                    gradebooksetup1: assignment.gradebooksetup1,
                    grade: assignment.grade,
                    courseName: currentGradebooksetup.course,
                    course: "",
                };
                gradebookDTOs.push(rowGradebook);
                if (assignment.grade > 70) {
                    alert('El estudiante ha aprobado');
                }
                else {
                    alert('El estudiante ha reprobado');
                }
            }
        });
        return gradebookDTOs;
    }
}
function generateReport() {
    let reportGrade = new Gradebook(students, activities, gradesbookSetups, courses, assignments, teachers);
    let rowReport = reportGrade.distCourseActivityfromGradesbook();
    console.log(activities);
    let reportTable = document.getElementById("report");
    rowReport.forEach((itemDTO) => {
        let tr;
        let td;
        tr = reportTable.insertRow(-1);
        td = tr.insertCell(0);
        td.innerHTML = itemDTO.courseName;
        td = tr.insertCell(1);
        td.innerHTML = itemDTO.name;
        td = tr.insertCell(2);
        td.innerHTML = itemDTO.level.toString();
        td = tr.insertCell(3);
        td.innerHTML = itemDTO.activity;
        td = tr.insertCell(4);
        td.innerHTML = itemDTO.gradeMax.toString();
        td = tr.insertCell(5);
        td.innerHTML = itemDTO.grade.toString();
    });
}

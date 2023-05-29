import { Students } from "./entities/students";
import { Teachers } from "./entities/teacher";
import { Course } from "./entities/course";
import { Activity } from "./entities/activity";
import { GradesBook } from "./entities/gradesBook";
import { GradesBookDTO } from "./entities/gradebookDTO";
import { Assignment } from "./entities/assigment";

let students: Students[] = [];
let teachers: Teachers[] = [];
let courses: Course[] = [];
let activities: Activity[] = [];
let gradesbookSetups: GradesBook[] = [];
let assignments: Assignment[] = [];

enum Carrera {
  turismo = "Turismo",
  marketing = "Marketing",
  software = "Software",
}
enum Courses {
  interfaces = "Interfaces",
  programacion = "Programacion",
  metodologias = "Metodologias",
}

function addStudent(): void {
  let currentStudent: Students = {
    name: readHtml("nameStudent"),
    id: readHtml("idStudent"),
    address: readHtml("addressStudent"),
    registrationCode: parseInt(readHtml("registrationCodeStudent")),
    level: readHtml("levelStudent"),
  };
  students.push(currentStudent);
  console.table(students);
}

function addTeacher(): void {
  let currentTeacher: Teachers = {
    name: readHtml("nameTeacher"),
    id: readHtml("idTeacher"),
    carrer: readHtml("carrerTeacher"),
  };
  teachers.push(currentTeacher);
  console.table(teachers);
}

function addCourse(): void {
  let currentCourse: Course = {
    courseName: readHtml("asignatureTeacher") as "Interfaces" | "Programacion" | "Metodologias",
  };
  courses.push(currentCourse);
  console.table(courses);

  initSelect();
}

function addActivity(): void {
  let currentActivity: Activity = {
    name: readHtml("activity"),
  };
  activities.push(currentActivity);
  console.table(activities);

  initSelect();
}

function addgradeBook(): void {
  let currentGradebooksetup: GradesBook = {
    course: readHtml("courseGrade"),
    activity: readHtml("activityGrade"),
    peso: readHtml("weigthgrd"),
    gradeMax: parseInt(readHtml("maxnotagrd")),
  };
  gradesbookSetups.push(currentGradebooksetup);
  console.table(gradesbookSetups);
}

function readHtml(id: string): string {
  return (document.getElementById(id) as HTMLInputElement).value;
}

function addAssigment(): void {
  let currentAssignment: Assignment = {
    student: readHtml("assignmentStudent"),
    gradebooksetup1: readHtml("asignmentGradebooksetup"),
    grade: parseInt(readHtml("asignmentGrade")),
  };
  assignments.push(currentAssignment);
  console.table(assignments);

  initSelect();
}

function initSelect(): void {
  let gradebookActivity = document.getElementById("activityGrade") as HTMLSelectElement;
  document.querySelectorAll("#activityGrade option").forEach((option) => option.remove());
  activities.forEach((activity) => {
    let option = document.createElement("option");
    option.value = activity.name;
    option.text = activity.name;
    gradebookActivity.add(option);
  });

  let assignmentStudent = document.getElementById("assignmentStudent") as HTMLSelectElement;
  document.querySelectorAll("#assignmentStudent option").forEach((option) => option.remove());
  students.forEach((student) => {
    let option = document.createElement("option");
    option.value = student.name;
    option.text = student.name;
    assignmentStudent.add(option);
  });

  let gradebookCourse = document.getElementById("courseGrade") as HTMLSelectElement;
  document.querySelectorAll("#courseGrade option").forEach((option) => option.remove());
  courses.forEach((course) => {
    let option = document.createElement("option");
    option.value = course.courseName;
    option.text = course.courseName;
    gradebookCourse.add(option);
  });

  let assignmentSetup = document.getElementById("asignmentGradebooksetup") as HTMLSelectElement;
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
  constructor(
    public students: Students[],
    public activities: Activity[],
    public gradebookSetup: GradesBook[],
    public courses: Course[],
    public assignments: Assignment[],
    public teacher: Teachers[]
  ) {}

  public distCourseActivityfromGradesbook(): GradesBookDTO[] {
    let gradebookDTOs: GradesBookDTO[] = [];
    this.assignments.forEach((assignment) => {
      let currentGradebooksetup = gradesbookSetups.find((setup) => setup.peso === assignment.gradebooksetup1);
      let currentStudent = students.find((student) => student.name === assignment.student);

      if (currentGradebooksetup && currentStudent) {
        let rowGradebook: GradesBookDTO = {
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
        } else {
          alert('El estudiante ha reprobado');
        }
      }
    });
    return gradebookDTOs;
  }
}

function generateReport(): void {
  let reportGrade: Gradebook = new Gradebook(students, activities, gradesbookSetups, courses, assignments, teachers);
  let rowReport: GradesBookDTO[] = reportGrade.distCourseActivityfromGradesbook();
  console.log(activities);
  let reportTable: HTMLTableElement = document.getElementById("report") as HTMLTableElement;
  rowReport.forEach((itemDTO) => {
    let tr: HTMLTableRowElement;
    let td: HTMLTableCellElement;
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
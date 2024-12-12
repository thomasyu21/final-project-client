/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;
  if (student.gpa == null){
    student.gpa = "None"
  }
  if (student.imageUrl == null){
    student.imageUrl = "https://picsum.photos/200"
  }
  if (student.campus == null){
    return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <img src = {student.imageUrl} alt="Profile Img"/>
        <h3>Email: {student.email}</h3>
        <h3>GPA: {student.gpa}</h3>
        <h2>Student is not enrolled in a campus</h2>
        <Link to={`/editstudent/${student.id}`}>
          <button>Edit</button>
        </Link>
      </div>
    );
  }

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src = {student.imageUrl} alt="Profile Img"/>
      <h3>Email: {student.email}</h3>
      <h3>GPA: {student.gpa}</h3>
      <Link to={`/campus/${student.campus.id}`}>
        <h2>{student.campus.name}</h2>
      </Link>
      <Link to={`/editstudent/${student.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );

};

export default StudentView;
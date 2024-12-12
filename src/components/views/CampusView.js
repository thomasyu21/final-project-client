/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  
  if (campus.imageUrl === null){
    campus.imageUrl = "https://images.unsplash.com/photo-1567878874047-4ee47c135328"
  }

  if (campus.students.length === 0){
    return (
      <div>
        <h1>{campus.name}</h1>
        <img src={campus.imageUrl} alt="Campus Img" width="310" height="206"/>
        <p>Address: {campus.address}</p>
        <p>Description: {campus.description}</p>
        <Link to={`/editcampus/${campus.id}`}>
            <button>Edit</button>
        </Link>
        <Link to={`/enrollstudent/${campus.id}`}>
          <button>Enroll New Student</button>
        </Link>
        <hr/>
        <h3>There are no students enrolled at this campus</h3>
      </div>
    );
  }

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt="Campus Img" width="310" height="206"/>
      <p>Address: {campus.address}</p>
      <p>Description: {campus.description}</p>
      <Link to={`/editcampus/${campus.id}`}>
          <button>Edit</button>
      </Link>
      <Link to={`/enrollstudent/${campus.id}`}>
        <button>Enroll New Student</button>
      </Link>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <hr/>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;
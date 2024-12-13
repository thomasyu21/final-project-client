/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { 
  fetchStudentThunk,
  editStudentThunk,
  fetchAllCampusesThunk
} from "../../store/thunks";
import { EditStudentView } from "../views";

class EditStudentContainer extends Component {
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
    this.props.fetchAllCampuses()
  }
  // Initialize state
  constructor(props){
    // console.log(props)
    super(props);
    this.state = {
      firstname: this.props.student.firstname, 
      lastname: this.props.student.lastnamename, 
      campusId: this.props.student.campusId, 
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
      redirect: false, 
      redirectId: this.props.student.id
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    if (this.state.campusId === ""){
      this.setState({campusId: null})
    }
    let student = {
        id: this.props.student.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa
    };
    
    // Add new student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null, 
      email: "",
      imageUrl: "https://picsum.photos/200",
      gpa: null,
      redirect: true, 
      redirectId: this.props.student.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    return (
      <div>
        <Header />
        <EditStudentView 
          student={this.props.student} 
          editStudent={this.props.editStudent} 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}    
          campusIds= {[null].concat(this.props.allCampuses.map((campus) => campus.id).sort((a,b) => a-b)).map((id) => <option key={id}>{id}</option>)}    
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.  
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
    allCampuses: state.allCampuses
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (id) => dispatch(editStudentThunk(id)),
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk())
  };
};

// Export store-connected container by default
// StudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);
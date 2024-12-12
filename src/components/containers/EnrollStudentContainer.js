/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EnrollStudentView from '../views/EnrollStudentView';
import { 
    fetchCampusThunk,
    addStudentThunk
} from '../../store/thunks';

class EnrollStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "",
      email: "",
      imageUrl: "https://picsum.photos/200",
      gpa: null,
      redirect: false, 
      redirectId: null
    };
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
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
    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.props.match.params.id,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa
    };

    // Add new student in back-end database
    await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null, 
      email: "",
      imageUrl: "https://picsum.photos/200",
      gpa: null,
      redirect: true, 
      redirectId: this.props.match.params.id
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
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EnrollStudentView 
          campus = {this.props.campus}
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
        />
      </div>          
    );
  }
}

const mapState = (state) => {
    return {
      campus: state.campus,  // Get the State object from Reducer "campus"
    };
  };
// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EnrollStudentContainer);
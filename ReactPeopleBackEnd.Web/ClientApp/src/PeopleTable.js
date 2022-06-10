import React, { Component } from "react";
import axios from "axios";
import AddPersonForm from "./AddPersonForm";
import PersonRow from "./PersonRow";

class PeopleTable extends Component {
  state = {
    people: [],
    person: {
      firstName: "",
      lastName: "",
      Age: "",
    },
  };

  componentDidMount() {
    axios.get("/api/people/getall").then((res) => {
      this.setState({ people: res.data });
    });
  }

  onTextChange = (e) => {
    const copy = { ...this.state.person };
    copy[e.target.name] = e.target.value;
    this.setState({ person: copy });
  };

  onAddClick = () => {
    axios.post("/api/people/add", this.state.person).then(() => {
      axios.get("/api/people/getall").then((res) => {
        this.setState({
          people: res.data,
          person: {
            firstName: "",
            lastName: "",
            age: "",
          },
        });
      });
    });
  };

  render() {
    const { people, person } = this.state;
    const { firstName, lastName, age } = this.state.person;
    return (
      <div className="container mt-5">
        <AddPersonForm
          firstName={firstName}
          lastName={lastName}
          age={age}
          onTextChange={this.onTextChange}
          onAddClick={this.onAddClick}
        />
        <table className="table table-hover table striped table bordered">
          <thead>
            <td>first Name</td>
            <td>LastName</td>
            <td>Age</td>
          </thead>
          <tbody>
            {people.map((p) => {
              <PersonRow person={p} key={p.id} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default PeopleTable;

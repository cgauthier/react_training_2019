
import React, { Component } from 'react';
import cls from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  state = {
    persons: [{
      id: "person_1",
      name: "Claude",
      age: 53
    }, {
      id: "person_2",
      name: "Nicole",
      age: 40
    }, {
      id: "person_3",
      name: "Schnookums",
      age: 7,
      children: "I'm a dog!"
    }],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState( {persons: [{
        name: "Nicole",
        age: 40
      }, {
        name: newName,
        age: 53
      }, {
        name: "Schnookums",
        age: 7,
        children: "I'm a dog!"
      }]} 
    )
  }

  nameChangeHandler = (event, person) => {

    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === person.id;
    });

    const personConst = {
      ...this.state.persons[personIndex]
    }

    personConst.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = personConst;

    this.setState( {persons: persons});
  
  }

  togglePersonsHandler = (event) => {
    let newState = {
      ...this.state
    }
    newState.showPersons = !newState.showPersons;
    this.setState(newState);
  }

  deletePersonHandler = (event, personIndex) => {
    console.log(event.target.type);
    if(event.target.type === undefined) {
      const persons = this.state.persons.slice(); // creates an implicit copy of the entire array.
      persons.splice(personIndex, 1);
      this.setState({persons: persons});
    }
  }

  render() {

    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      color: "black",
      fontSize: "bold",
      cursor: "pointer"
    };

    let persons = null;
    
    
    if(this.state.showPersons) {
      persons = (
        <div> 
          <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}  
            changed={this.nameChangeHandler} />
        </div>
      );
    } 

    return (
        <div className={cls.App}>
          <header className="App-header">
            <Cockpit  
              title={this.props.appTitle}
              persons={this.state.persons} 
              clicked={this.togglePersonsHandler}
              showPersons={this.state.showPersons}
            />            
            {persons}
          </header>
        </div>
    );
  
  }
}

export default App;
// create react app scaffolding isn't working exactly as it should
// need to turn into ES6 syntax for App.js

// ******************************
// classic React Way of working - Class Based Components
// ******************************

import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {

  // state is managed from inside a component
  // with react 16.8 >> you can also manage state in functional component
  // state is something that you use only when required
  
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

  // never manipulate the special state object directly
  // use setState()
  switchNameHandler = (newName) => {
    // console.log("was clicked!");
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

    // alternate way
    // const personConst = Object.assign({}, this.state.persons[personIndex]);

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

  // to deal with the change event
  // if the target of the click is of type INPUT then we must not update the state.
  // of course, not all targets have type....
  deletePersonHandler = (event, personIndex) => {
    console.log(event.target.type);
    if(event.target.type && event.target.type.toLowerCase() !== "text") {
      // always update the state immutably as best practice
      const persons = this.state.persons.slice(); // creates an implicit copy of the entire array.
      // or const persons = [...this.state.persons]; // spread operator
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
      cursor: "pointer"
    };

    let persons = null;


    // adding key allows react to compare what was with what's coming in its virtual DOM
    // to ensure it only modifies what changed, making it more efficient
    // key should be unique
    if(this.state.showPersons) {
      persons = (
        <div> 
          {this.state.persons.map((person, index) => {
            if(person.children) {
              return <Person 
                click={(event) => this.deletePersonHandler(event, index)}
                key={person.id}
                name={person.name} 
                changed={(event) => this.nameChangeHandler(event, person)}
                age={person.age}>{person.children}</Person>
            } else {
              return <Person 
                click={(event) => this.deletePersonHandler(event, index)}
                key={person.id}
                changed={(event) => this.nameChangeHandler(event, person)}
                name={person.name} 
                age={person.age}/>
            }
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons List</button>
          {
            // this.state.showPersons ? persons : null
            persons
          }
        </header>
      </div>
    );
  
    // better to use .bind than the arrow function to pass data using methods

    // not the most efficient way to toggle display or use conditional logic
    /* {(this.state.showPersons) ? <div>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age} 
          change={this.nameChangeHandler}
          click={this.switchNameHandler.bind(this, "FooBar!")}/>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}>I'm a dog!</Person>            
      </div> : ""} */

  }
}

export default App;

// ******************************
// End of classic React Way of working
// ******************************


// ******************************
// 16.8 + using Hooks - Functional Components as opposed to class based components
// ******************************

// hooks are the new way of working with React, but the classical way is the default way
// hooks may mutate in the future, the API is not as solid as perceived
// it is good to know both forms.
// import React, { useState } from 'react';
// import './App.css';
// import Person from './Person/Person';

// const App = (props) => {

//   // hook useState
//   // returns an array of 2 elements
//   // element1 = currentState
//   // element2 = function to update the state to be aware and re-render the component

//   // using destructuring on useState
//   const [personsState, setPersonsState ] = useState({
//     persons: [{
//       name: "Claude",
//       age: 53
//     }, {
//       name: "Nicole",
//       age: 40
//     }, {
//       name: "Schnookums",
//       age: 7,
//       children: "I'm a dog!"
//     }]
//   }); 

//   const switchNameHandler = () => {

//     // beware 
//     // setPersonsState will update the entire personsState.. and as such
//     // you have to ensure your entire state objects are done
//     // best to break down using multiple useState statements and create state "slices".

//     setPersonsState( {persons: [{
//         name: "Nicole", age: 40
//       }, {
//         name: "Claude", age: 53
//       }, {
//         name: "Schnookums", age: 7, children: "I'm a dog!"
//       }]}
//     ); 
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Hi, I'm a React App</h1>
//         <p>This is really working!</p>
//         <button onClick={switchNameHandler}>Switch Name</button>
//         <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
//         <Person name={personsState.persons[1].name} age={personsState.persons[1].age} />
//         <Person name={personsState.persons[2].name} age={personsState.persons[2].age}>I'm a dog!</Person>
//       </header>
//     </div>
//   );
// }

// export default App;

// ******************************
// End of 16.8 + using Hooks - Functional Components as opposed to class based components
// ******************************


// ******************************
// Extra Notes
// ******************************

  // what JSX compiles too.
  // return React.createElement('div', {className: "App"}, React.createElement('h1', null, 'Hi, I'm a React App'));
  // typically we should only have one root element, even though in React JS 16+.. we can be more flexible, also return a JSON
  // best practice is one root element
  

  // components should be in their own folder
  // capitalize the Folder name

  // we created a Person component

// stateful components keep state
// stateless components have no state
// best to create as many stateless component and use statefull components to manage them.
// stateful components are called smart components or container components
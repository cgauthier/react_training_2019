// component lifecycle are only available in class based components (container)
// lifecycle hooks are not to be confused with React Hooks
// React Hooks are new and are related to functional components only.

// ************************
// component creation
// ************************

// 1) constructor (default ES6 class feature, it receives the props and call super(props) for your own logic)
//    set initialState
//    do not use for http requests
//    no async calls or impact performance like unnecesary re-render cyvles

// 2) static getDerivedStateFromProps(props, state) (since React 16.3)
//    whenever your props change for your class, you can sync your state to them
//    do not use for http requests
//    very rare niche case

// 3) render()
//    no async in here

// 4) child component will now render

// 5) componentDidMount() (this is where the call is made when child components are rendered)
//    use this to call an http request
//    do not call setState because you can use this async

// componentWillMount is something which will be deprecated in future releases // use constructor to set state instead


// ************************
// component update
// ************************

// 1) static getDerivedStateFromProps(props, state) (since React 16.3)
//    whenever your props change for your class, you can sync your state to them
//    do not use for http requests
//    this is rarely need this, better ways of doing this 

// 2) shouldComponentUpdate(nextProps, nextState) 
//    you can decide to cancel or continue the process
//    

// 3) render()

// 4) update all child components

// 5) getSnapshotBeforeUpdate(prevProps, prevState)
//    get current scrolling position or other DOM info you need to query and perhaps restore back using the prev data
//    so you have data before update, the update gets done and then this data can be used

// 6) componentDidUpdate()
//    done with the updating
//    here we can make an http request.
//    you have to watch out for infinite loop when making async requests
//    don't do the update with setState with a promise, because that will lead to uncessary re-rendering


import React, { Component } from 'react';
import cls from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

class App extends Component {


  constructor(props) {
    super(props);
    console.log('[App.js]: constructor');
    // initialize your state here and there is no setState available here in the constructor.. 
    this.state = {
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
      showPersons: false,
      showCockpit: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js]: getDerivedStateFromProps', props);
    // return the updated state 
    // for this demo, nothing is updated
    return state;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[App.js]: getSnapshotBeforeUpdate');
    return null;
  }

  componentDidMount() {
    console.log('[App.js]: componentDidMount');
  }

  // state change
  shouldComponentUpdate() {
    console.log('[App.js]: shouldComponentUpdate');    
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js]: componentDidUpdate');
  }

  // in React 16.8, this will cause a warning message
  // we should be using the constructor to set state instead.

  // componentWillMount() {
  //   console.log('[App.js]: componentWillMount');
  // }

  // this is something older and it is unsafe
  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js]: componentWillReceiveProps', props);
  // }


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

  toggleCockpitHandler = (event) => {
    this.setState({showCockpit: !this.state.showCockpit});
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
    
    console.log('[App.js]: render');
    
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
        <WithClass classes={cls.App}>
          <header className="App-header">
            <button onClick={this.toggleCockpitHandler}>Remove Cockpit</button>
            {this.state.showCockpit ? 
            <Cockpit  
              title={this.props.appTitle}
              // persons={this.state.persons} 
              personsLength={this.state.persons.length} 
              clicked={this.togglePersonsHandler}
              showPersons={this.state.showPersons}
            />         
             : null}   
            {persons}
          </header>
        </WithClass>
    );
  
  }
}

export default App;



// When should we update?

// Using shouldComponentUpdate or React.memo should be done selectively.
// either do take some computing cycle, therefore
// when you know a child parent is always going to be updated
// no point in using either doing checks, it will hinder performance


// when you always need to check all props automatically
// instead of using shouldComponentUpdate
// extend PureComponent
// it will automatically imply a shouldComponentUpdate on all props
// see that being extended in Persons.js



// the render() method does not render the actual DOM
// instead, it is a call to process and have React determine what to update

/* 
  1) shouldComponentUpdate() <-- this may prevent a render() call
  2) render() - this will now determine if there are changes to be pushed to the Real DOM as it compares changes to the Virtual DOM
              - the name "render" is basically confusing as it really is more of a function that determines if rendering is required to the real DOM
              - VirtualDOM is basically a copy of the DOM accessible to JavaScript, much faster to parse and compare
                the 'verdict' from using the VirtualDOM is to determine if we do need to update the real DOM and then
                to try and update only as little as possible
    - React actually keeps 2 copies of the Virtual DOM as old future DOM and an internally re-rendering a new "FUTURE" Virtual DOM.
    - it will compare both copies and decide if the REAL browser DOM needs updating and do it as efficiently as possible by only updating areas that require it
    
*/
import React, {Component, PureComponent} from 'react';
import Person from './Person/Person';

//
// class Persons extends Component {
class Persons extends PureComponent {

  // since we don't have an actual state
  // we should not use this
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js]: getDerivedStateFromProps', props);
  //   // return the updated state 
  //   // for this demo, nothing is updated
  //   return state;
  // }

  // only available in class based components.
  // being commmented out, because we are using PureComponent
  /*
  shouldComponentUpdate(nextProps, nextState) {

    // this comparison works because we do copies in App.js of our state objects
    // without that, this would not work here because these are shallow compare and as such the comparing of pointers, not values
    // var shouldUpdate = (nextProps.persons !== this.props.persons);
    var shouldUpdate = false;
    if(
        nextProps.persons !== this.props.persons ||
        nextProps.changed !== this.props.changed ||
        nextProps.clicked !== this.props.clicked
      ) {
        shouldUpdate = true;
      }
    console.log('[Persons.js]: shouldComponentUpdate: ' + shouldUpdate);
    return shouldUpdate;
    
  }
  */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js]: getSnapshotBeforeUpdate');
    // return null;
    return {
      message: "SnapShot!"
    }
  }

  // being able to pass any prevProps and/or prevState allows
  // use to restore a component after an update
  // the return of an object is for demo only
  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log('[Persons.js]: getSnapshotBeforeUpdate');
    console.log(snapShot);
  }

  componentDidMount() {
    console.log('[Persons.js]: componentDidMount');
  }


  // cleaning up code when something is removed
  componentWillUnmount() {
    console.log('[Persons.js]: componentWillUnmount');
  }

  render() {
    console.log('[Persons.js]: rendering...');
    return (
        this.props.persons.map((person, index) => {
            if(person.children) {
              return <Person 
                key={person.id}  
                click={(event) => this.props.clicked(event, index)}
                name={person.name} 
                changed={(event) => this.props.changed(event, person)}
                age={person.age}>{person.children}</Person>
            } else {
              return <Person 
                key={person.id}  
                click={(event) => this.props.clicked(event, index)}
                changed={(event) => this.props.changed(event, person)}
                name={person.name} 
                age={person.age}/>
            }
          })
    );

  }

}

export default Persons;

// was a functional component, now a container/class component

// const persons = (props) => {

//   console.log('[Persons.js]: rendering...');

//     return (
//         props.persons.map((person, index) => {
//             if(person.children) {
//               return <Person 
//                 key={person.id}  
//                 click={(event) => props.clicked(event, index)}
//                 name={person.name} 
//                 changed={(event) => props.changed(event, person)}
//                 age={person.age}>{person.children}</Person>
//             } else {
//               return <Person 
//                 key={person.id}  
//                 click={(event) => props.clicked(event, index)}
//                 changed={(event) => props.changed(event, person)}
//                 name={person.name} 
//                 age={person.age}/>
//             }
//           })
//     );

// }

// export default persons;
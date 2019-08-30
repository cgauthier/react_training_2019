// useEffect combines all the lifeCycles of the container/class components
// functional components in React 16.8 should be named using Capitalize name
// the useEffect hook would not work without modifying
// from const cockpit to const Cockpit.

import React,  { useEffect, useRef } from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {

    const toggleButtonRef = useRef(null);

    // using useEffect to call click on toggleButtonRef

    useEffect(() => {
        console.log("[Cockpit.js]: useEffect");

        toggleButtonRef.current.click();

        const timer = setTimeout(() => {
            alert('Saved data to cloud');
        }, 1000);

        // this will execute when the cockpit is removed
        // think of this as a way to cleanup code 
        // this is a combination of 2 things
        // the empty array
        // this return function
        return () => {
            console.log("[Cockpit.js]: clean up work with useEffect");
            clearTimeout(timer);
        }

    // }, [props.persons]);
    }, []);
    // pass an empty array with no dependencies and it will run only once and never again.
    // if more than one field, then pass an array of them for the same effect

    // can have more than one useEffect

    
    useEffect(() => {
        console.log("[Cockpit.js]: useEffect");

        const timer = setTimeout(() => {
            console.log('Saved data to cloud when props.persons changes');
            clearTimeout(timer);
        }, 1000)

    }, [props.persons]);
    
    // this runs all the time
    useEffect(() => {
        console.log("[Cockpit.js]: useEffect");

        return () => {
            console.log("[Cockpit.js]: clean up work with 2nd useEffect");
        }

    // }, [props.persons]);
    });

    const assignedClasses = [];

    let btnClass = '';
    if(props.showPersons) {
        btnClass = classes.Red;
    }
    // if(props.persons.length <= 2) {
    if(props.personsLength <= 2) {        
        assignedClasses.push(classes.red);
    }
    // if(props.persons.length <= 1) {
    if(props.personsLength <= 1) {        
        assignedClasses.push(classes.bold);
    } 

    return (
        <div className={classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
            ref={toggleButtonRef}
            className={btnClass}
            onClick={props.clicked}>Toggle Persons List</button>
        </div>
    );

}

// React.memo works with functional compponents
// wrapping Cockpit with React.memo will 
// wrap the Component with a memoization algorithm.
// the memoization will allow for increase performance
// over time by eliminating unnecessary update operations.
// this is based on the props we pass in their pure sense
// in the above we will be passsing to the Cockpit, the props.persons.length
// to trigger memoization
// this can be tested when we type into the person's text field
// without React.memo everything gets re-rendered and this can be also seen in the console.log by triggering useEffect(s)
// but with React.memo and checking for the lenght of the props.personsLength directly
// we can see changes only affecting a local area of where the text field is typed and in context with...
export default React.memo(Cockpit);
// export default Cockpit;



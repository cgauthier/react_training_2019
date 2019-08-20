import React, {Component} from 'react';
import './Person.css';
import cls from './Person.css';

class Person extends Component {

    // since we don't have an actual state
    // we should not use this
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Person.js]: getDerivedStateFromProps', props);
    //     // return the updated state 
    //     // for this demo, nothing is updated
    //     return state;
    //   }
    
      shouldComponentUpdate(nextProps, nextState) {
        console.log('[Person.js]: shouldComponentUpdate');
        return true;
      }
      
      getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Person.js]: getSnapshotBeforeUpdate');
        return null;
      }
    
      componentDidUpdate(prevProps, prevState) {
        console.log('[Person.js]: getSnapshotBeforeUpdate');
      }
    
      componentDidMount() {
        console.log('[Person.js]: componentDidMount');
      }
    

    render() {
        console.log('[Person.js]: rendering...');
        const withChildren = (this.props.children) ? <p>{this.props.children}</p> : null;
    
        return (
            <div className={cls.Person} onClick={this.props.click}>
                <p>I'm {this.props.name} and I am {this.props.age} years old!</p>
                {withChildren}
                <input type="text" onChange={this.props.changed} defaultValue={this.props.name}/>
            </div>
        )
    }
}

export default Person;

// was a functional component, now a container/class component

/*
const person = (props) => {
    
    console.log('[Person.js]: rendering...');
    const withChildren = (props.children) ? <p>{props.children}</p> : null;

    return (
        <div className={cls.Person} onClick={props.click}>
            <p>I'm {props.name} and I am {props.age} years old!</p>
            {withChildren}
            <input type="text" onChange={props.changed} defaultValue={props.name}/>
        </div>
    )
}

export default person;
*/


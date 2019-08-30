// import React, {Component} from 'react';
import React, {Component, Fragment} from 'react';
import './Person.css';
// import Auxiliary from '../../../hoc/Auxiliary';
import cls from './Person.css';
import withClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';


// React.Fragment can replace Auxiliary in this example
// we can import it like this
// import React, {Component, Fragment} from 'react';
// and use it in a tag to replace Auxiliary

class Person extends Component {

    // since we don't have an actual state
    // we should not use this
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Person.js]: getDerivedStateFromProps', props);
    //     // return the updated state 
    //     // for this demo, nothing is updated
    //     return state;
    //   }

    
    // Since React 16.3 we can also use createRef 
    // causing errors in 16.8 with componentWillUnmount

    // constructor(props) {
    //     super(props);
    //     this.inputElRef = React.createRef();
    // }


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
        this.inputEl.focus();
        // React 16.3
        // this.inputElRef.focus();
      }
    

    render() {
        console.log('[Person.js]: rendering...');
        const withChildren = (this.props.children) ? <p key='i3' >{this.props.children}</p> : null;
    
        // using a higher order component
        // a better way than using an array and keys
        // to return HTML without a wrapper

        // this is really React.createElement behind the scenes when Auxiliary is evaluated


        // working with ref
        // this works correctly everywhere        
        return (
            // <Auxiliary> 
              <Fragment>
              <div className={cls.Person} onClick={this.props.click}>
                  <p>I'm {this.props.name} and I am {this.props.age} years old!</p>
                  {withChildren}
                  <input 
                    type="text" 
                    ref={(el) => {this.inputEl = el}}
                    // ref={this.inputElRef} 
                    onChange={this.props.changed} 
                    defaultValue={this.props.name}/>
              </div>
             </Fragment>
             // </Auxiliary>
        )        

        // REACT can return adjacent JSX elements
        // as long as we use the 'key' property and the items are in an array
        // in this example.
        // we will put the elements below in an array and create a unique key
        // one of the reasons for this is to avoid being forced to use a 'wrapper' tag
        // this reduces the HTML generated
        // since this is an array, we must use the comma operator to separate the items

        // return [
        //   <div key='i1' className={cls.Person} onClick={this.props.click}>,
        //       <p key='i2' >I'm {this.props.name} and I am {this.props.age} years old!</p>,
        //       {withChildren},
        //       <input key='i4' type="text" onChange={this.props.changed} defaultValue={this.props.name}/>,
        //   </div>
        // ];

        // original
        // return (
        //     <div className={cls.Person} onClick={this.props.click}>
        //         <p>I'm {this.props.name} and I am {this.props.age} years old!</p>
        //         {withChildren}
        //         <input type="text" onChange={this.props.changed} defaultValue={this.props.name}/>
        //     </div>
        // )
    }
}


      // prop-types safe 
      // npm install --save props-types
      // will warn in dev mode
      // useful to ensure better integrity of your code
      // also useful when building a component library to distribute
      // test this by breaking it, change an age value from number to string in App.js

  Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
  };


// export default Person;

// exporting with our dynamic props
export default withClass(Person, cls);

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


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import _concat from "lodash/concat";
import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.ReversedWords=this.ReversedWords.bind(this)  
     this.state = {
      InputString: '',
      skipNumber: '',   
    };
  }
ReversedWords = (InputString) => {
  const splitSentence= _filter(InputString.split("."), val => !_isEmpty(val));
  const newOutputString = [];
  splitSentence.forEach(sentence => {
  const words = sentence.split(" ");
  if (words.length <= 3) {
    let newsentence  = "";
    words.forEach((wording, key) => {
    if (key ===0) {
      newsentence  = wording;
    } else {
      newsentence  = `${newsentence } ${wording}`;
    }
    });
  newOutputString.push(newsentence );} 
  else {
    const lastTwoWord = [];
    const otherWords = [];
    words.forEach((word, key) => {
    if ((key === (words.length - 1)) || (key === (words.length - 2))) {
      lastTwoWord.push(word);
    } else {
      otherWords.push(word);
    }
    console.groupEnd();
  });
  const reversingorder = otherWords.reverse();
  const Outputarray = _concat(reversingorder, lastTwoWord);
  let newsentence  = "";
  Outputarray.forEach((wording, key) => {
  if (key === 0) {
    newsentence  = wording;
  } else {
    newsentence  = `${newsentence } ${wording}`;
  }
});
  newOutputString.push(newsentence );
}
});
let Output = "";
newOutputString.forEach((InputString, key) => {
  if (key ===0 ) {
    Output = InputString;
  } else if (key === (newOutputString.length - 1)) {
    Output = `${Output} .${InputString}`;
  } else {
    Output = `${Output}.${InputString}`;
    }
});
return Output;
}
     
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    const {InputString} = this.state
    const Output = this.ReversedWords(InputString);        
    return (
      <form>
        <div style={{ marginTop: 15 }}>
        <div className="form-group">
        <table border="3" cellSpacing="5" cellPadding="5" align="center">
        <tbody>
        <tr><td><label>Enter Your String: </label></td></tr>
        <tr><td>
        <input                               
          type='text'
          name='InputString'
          value={this.state.InputString}
          onChange={this.myChangeHandler} />
        </td></tr>
        <tr><td><label>Enter Skip Number: </label></td></tr>
        <tr><td>
          <input type="number"  min={0} max={5} 
            name="skipNumber"
            value={this.state.skipNumber}
            onChange={this.myChangeHandler}/>
        </td></tr>
        <tr><td colSpan="2" align="center">
          <button onClick={this.Output}>Reverse</button>
        </td></tr>
        <tr><td>Output</td></tr>
          <br/>
          <br/>
          <tr><td>{InputString}</td></tr>
          <tr><td>{Output}</td></tr>
            </tbody>
            </table>
            </div></div></form>
  );
}
}

ReactDOM.render(<MyForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

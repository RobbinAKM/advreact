import React,{useState,useReducer,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const Checkbox=({children})=>{
  const [checked,setCheck]=useState(true)
  return React.Children.map(children,(child)=>{
    const clone= React.cloneElement(child,{
      checked,
      setCheck
    })
    return clone
  })
}

const Label=({children,setCheck})=>{
  return <h1 onClick={()=>{setCheck(state=>!state)}}>{children}</h1>
}

const Input =({setCheck,checked})=>{
  return <input
  type="checkbox"
  checked={checked}
  onChange={(e)=>{
    setCheck(e.target.checked)
    }}
  />
}

function App() {

  return (
    <div className="App">
     <Checkbox>
      <Label>Welcome</Label>
      <Input/>
     </Checkbox>
       </div>
  );
}

export default App;

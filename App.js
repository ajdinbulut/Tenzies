import React from 'react';
import ReactDOM from 'react-dom/client';
import Die from "./Die"
import {nanoid} from "nanoid"
export default function App() {
  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)

  React.useEffect(()=>{
    const everyHeld = dice.every(die=>die.isHeld)
    const firstValue = dice[0].value
    const everyValue = dice.every(die=>die.value === firstValue)
    if(everyHeld && everyValue){
      setTenzies(true)
      console.log("You won!!")
    }
  },[dice])

  function allNewDice(){
    const newDice = []
    for(let i=0;i<10;i++){
      newDice.push(generateDice())
    }
    return newDice
  }
  function generateDice(){
    return {
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
  }
  function rollNewDice(){
    if(tenzies === false){
      
      setDice(oldDice=> oldDice.map(die=>{
          return die.isHeld === true ?
          {...die} :
          generateDice()
      }))
    }else{
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  const elements = dice.map(die=>{
   return <Die isHeld={die.isHeld} held={() => held(die.id)} key={die.id} value={die.value}/>
  })
  function held(id){
    setDice(oldDice=> oldDice.map(die=>{
      return die.id === id ?
        {...die,isHeld:!die.isHeld} :
        {...die}
    }))
  }
  return (
    <main className='main'>
      <h1>Tenzies</h1>
        <div className='die--container'>
          {elements}
        </div>
        <button className='btn' onClick={rollNewDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}


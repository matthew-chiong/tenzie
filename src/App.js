import React from "react";
import "./App.css";
import Die from "./components/die";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6);
      newDice.push({
        value: randomNumber,
        isHeld: false,
        id: crypto.randomUUID(),
      });
    }
    return newDice;
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  const diceElement = dice.map((die) => (
    <Die
      value={die.value}
      isHeld={die.isHeld}
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function handleClick() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        const randomNumber = Math.ceil(Math.random() * 6);
        return die.isHeld
          ? die
          : { ...die, value: randomNumber, id: crypto.randomUUID() };
      })
    );
  }

  function newGame() {
    setDice(allNewDice());
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const AllValue = dice.every((die) => die.value === firstValue);
    setTenzies(allHeld && AllValue ? true : false);
  }, dice);

  return (
    <main className="app--wrapper">
      {tenzies && <Confetti />}
      <h1 className="game--name">Tenzies</h1>
      <p className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="app">{diceElement}</div>
      <button
        className="roll--button"
        onClick={tenzies ? newGame : handleClick}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;

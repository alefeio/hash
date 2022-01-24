import "./App.scss";
import { useState, useEffect } from "react";

function App() {
  const [player, setPlayer] = useState(1);
  const [victory, setVictory] = useState();
  const [turn, setTurn] = useState();
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [position, setPosition] = useState([]);
  const [correctanswers, setCorrectanswers] = useState([]);
  const [styleLine, setStyleline] = useState('');

  function handlePosition(cell, type) {
    const obj = position;

    const objIndex = obj.findIndex(
      (obj) => obj.cell === cell
    );

    obj[objIndex].type = type;

    setPosition(obj);
  }

  function alterTurn() {
    player === 1 ? setPlayer(2) : setPlayer(1);
    turn === 'x' ? setTurn('o') : setTurn('x');
  }

  function play(cell) {
    player === 1 ? setPlayer1([...player1, cell]) : setPlayer2([...player2, cell]);
    alterTurn();
    console.log('return play: ', player)
  }

  function verify() {
    correctanswers.map(res => {

      const array = player === 1 ? player1 : player2;

      const r = res.filter(r => array.includes(r));
      if (r.length === 3) {
        r[0] === 0 && r[1] === 1 && r[2] === 2 && setStyleline('success');
        r[0] === 3 && r[1] === 4 && r[2] === 5 && setStyleline('success2');
        r[0] === 6 && r[1] === 7 && r[2] === 8 && setStyleline('success3');
        r[0] === 0 && r[1] === 3 && r[2] === 6 && setStyleline('success4');
        r[0] === 1 && r[1] === 4 && r[2] === 7 && setStyleline('success5');
        r[0] === 2 && r[1] === 5 && r[2] === 8 && setStyleline('success6');
        r[0] === 0 && r[1] === 4 && r[2] === 8 && setStyleline('success7');
        r[0] === 2 && r[1] === 4 && r[2] === 6 && setStyleline('success8');
        setVictory(`Player ${player}`);
      }
      console.log('return: ', r)
    });
  }

  useEffect(() => {
    setPosition([
      { cell: 0, type: '' },
      { cell: 1, type: '' },
      { cell: 2, type: '' },
      { cell: 3, type: '' },
      { cell: 4, type: '' },
      { cell: 5, type: '' },
      { cell: 6, type: '' },
      { cell: 7, type: '' },
      { cell: 8, type: '' },
    ]);
    setTurn('x');
    setCorrectanswers([
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ])
  }, []);

  useEffect(() => {
    verify();
  }, [player, player1, player2])

  return (
    <div className="App-header">
      {victory && <div>Victory: {victory}</div>}
      <div className="grid-board">
        {styleLine && <span className={styleLine}></span>}
        {position.map((pos, index) => (
          pos.type
            ?
            <div key={index}><img src={`assets/images/${pos.type}.svg`} /></div>
            :
            <div key={index}>
              {!victory && <button
                onClick={() => { handlePosition(index, turn); play(index) }}
              >
                {' '}
              </button>}
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;

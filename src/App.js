import "./App.scss";
import { useState, useEffect, Fragment } from "react";

function App() {
  const [player, setPlayer] = useState(1);
  const [victory, setVictory] = useState('');
  const [turn, setTurn] = useState('');
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [position, setPosition] = useState([]);
  const [correctanswers, setCorrectanswers] = useState([]);
  const [styleLine, setStyleline] = useState('');
  const [start, setStart] = useState(false);

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
    const array = [cell];

    if (player === 1) {
      setPlayer1([...player1, cell]);
      player1.map(p => array.push(p));
    } else {
      setPlayer2([...player2, cell]);
      player2.map(p => array.push(p));
    }

    array.length >= 3 && verify(array);

    alterTurn();
  }

  function verify(arr) {
    console.log('verify')
    const numberOfMoves = position.filter(p => p.type === '');
    let r = []
    correctanswers.map(res => {
      r = res.filter(r => arr.includes(r));

      if (r.length >= 3) {
        setVictory(`Jogador ${player} venceu!`);
        r[0] === 0 && r[1] === 1 && r[2] === 2 && setStyleline('success');
        r[0] === 3 && r[1] === 4 && r[2] === 5 && setStyleline('success2');
        r[0] === 6 && r[1] === 7 && r[2] === 8 && setStyleline('success3');
        r[0] === 0 && r[1] === 3 && r[2] === 6 && setStyleline('success4');
        r[0] === 1 && r[1] === 4 && r[2] === 7 && setStyleline('success5');
        r[0] === 2 && r[1] === 5 && r[2] === 8 && setStyleline('success6');
        r[0] === 0 && r[1] === 4 && r[2] === 8 && setStyleline('success7');
        r[0] === 2 && r[1] === 4 && r[2] === 6 && setStyleline('success8');
        return false;
      }
      !numberOfMoves.length && setVictory('Deu velha!');
    });
  }

  function getStart() {
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
    setPlayer(1)
    setVictory('')
    setTurn('')
    setPlayer1([])
    setPlayer2([])
    setStyleline('')
    setStart(false)
  }

  useEffect(() => {
    getStart();
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

  return (
    <div className="App-header">
      {victory &&
        <div className="end">
          <h1>{victory}</h1>
          <button className="btn1" onClick={() => getStart()}>Jogar novamente</button>
        </div>
      }
      {start ? <div className="grid-board">
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
      </div> :
        <div className="start">
          <h1>Escolha para começar:</h1>
          <div>
            <img src="assets/images/o.svg" onClick={() => { setTurn('o'); setStart(true) }} />
            <span>ou</span>
            <img src="assets/images/x.svg" onClick={() => { setTurn('x'); setStart(true) }} />
          </div>
        </div>
      }
    </div>
  );
}

export default App;

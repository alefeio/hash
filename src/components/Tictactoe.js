import { useState, useEffect, Fragment } from "react";

function Tictactoe() {
  const [player, setPlayer] = useState(1);
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [position, setPosition] = useState([]);
  const [correctanswers, setCorrectanswers] = useState([]);
  const [styleLine, setStyleline] = useState('');
  const [victory, setVictory] = useState('');
  const [turn, setTurn] = useState('');
  const [gamemode, setGamemode] = useState('');
  const [start, setStart] = useState(false);
  const [block, setBlock] = useState(false);

  // start the game
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
    setGamemode('')
  }

  // save player steps
  function play(cell) {
    const array = [];

    if (player === 1) {
      setPlayer1([...player1, cell]);
      player1.map(p => array.push(p));
    } else {
      setPlayer2([...player2, cell]);
      player2.map(p => array.push(p));
    }

    array.push(cell);

    array.length >= 3 && verify(array);

    alterTurn();
  }

  // fill the cell with the symbol
  function handlePosition(cell) {

    const obj = position;

    const objIndex = obj.findIndex(
      (obj) => obj.cell === cell
    );

    obj[objIndex].type = turn;

    setPosition(obj);

    play(cell);

    if (gamemode === 'computer') setBlock(true)
  }

  // fill the cell with the symbol
  function handlePositionComputer(cell) {

    const obj = position;

    const objIndex = obj.findIndex(
      (obj) => obj.cell === cell
    );

    obj[objIndex].type = turn;

    setPosition(obj);

    play(cell);
  }

  // toggles player and symbol
  function alterTurn() {
    player === 1 ? setPlayer(2) : setPlayer(1);
    turn === 'x' ? setTurn('o') : setTurn('x');
  }

  // checks if there is a win or a draw
  function verify(arr) {
    const numberOfMoves = position.filter(p => p.type === '');
    let condition = false;
    correctanswers.map(res => {
      const r = res.filter(r => arr.includes(r));

      if (r.length === 3) condition = true;

      if (condition) {
        r[0] === 0 && r[1] === 1 && r[2] === 2 && setStyleline('success');
        r[0] === 3 && r[1] === 4 && r[2] === 5 && setStyleline('success2');
        r[0] === 6 && r[1] === 7 && r[2] === 8 && setStyleline('success3');
        r[0] === 0 && r[1] === 3 && r[2] === 6 && setStyleline('success4');
        r[0] === 1 && r[1] === 4 && r[2] === 7 && setStyleline('success5');
        r[0] === 2 && r[1] === 5 && r[2] === 8 && setStyleline('success6');
        r[0] === 0 && r[1] === 4 && r[2] === 8 && setStyleline('success7');
        r[0] === 2 && r[1] === 4 && r[2] === 6 && setStyleline('success8');
        setVictory(`Jogador ${player} venceu!`);
      } else {
        !numberOfMoves.length && !victory && setVictory('Deu velha!');
      }
      return true;
    });
  }

  function playComputer() {
    const adversary = turn === 'o' ? 'x' : 'o'

    if (!victory) {

      if ((position[0].type === turn && position[1].type === turn) && position[2].type === '') {
        console.log('regra 2.1')
        handlePositionComputer(2)
      }
      else if ((position[0].type === turn && position[2].type === turn) && position[1].type === '') {
        console.log('regra 2.2')
        handlePositionComputer(1)
      }
      else if ((position[1].type === turn && position[2].type === turn) && position[0].type === '') {
        console.log('regra 2.3')
        handlePositionComputer(0)
      }
      else if ((position[3].type === turn && position[4].type === turn) && position[5].type === '') {
        console.log('regra 2.4')
        handlePositionComputer(5)
      }
      else if ((position[3].type === turn && position[5].type === turn) && position[4].type === '') {
        console.log('regra 2.5')
        handlePositionComputer(4)
      }
      else if ((position[4].type === turn && position[5].type === turn) && position[3].type === '') {
        console.log('regra 2.6')
        handlePositionComputer(3)
      }
      else if ((position[6].type === turn && position[7].type === turn) && position[8].type === '') {
        console.log('regra 2.7')
        handlePositionComputer(8)
      }
      else if ((position[6].type === turn && position[8].type === turn) && position[7].type === '') {
        console.log('regra 2.8')
        handlePositionComputer(7)
      }
      else if ((position[7].type === turn && position[8].type === turn) && position[6].type === '') {
        console.log('regra 2.9')
        handlePositionComputer(6)
      }
      else if ((position[0].type === turn && position[3].type === turn) && position[6].type === '') {
        console.log('regra 2.10')
        handlePositionComputer(6)
      }
      else if ((position[0].type === turn && position[6].type === turn) && position[3].type === '') {
        console.log('regra 2.11')
        handlePositionComputer(3)
      }
      else if ((position[3].type === turn && position[6].type === turn) && position[0].type === '') {
        console.log('regra 2.12')
        handlePositionComputer(0)
      }
      else if ((position[1].type === turn && position[4].type === turn) && position[7].type === '') {
        console.log('regra 2.13')
        handlePositionComputer(7)
      }
      else if ((position[1].type === turn && position[7].type === turn) && position[4].type === '') {
        console.log('regra 2.14')
        handlePositionComputer(4)
      }
      else if ((position[4].type === turn && position[7].type === turn) && position[1].type === '') {
        console.log('regra 2.15')
        handlePositionComputer(1)
      }
      else if ((position[2].type === turn && position[5].type === turn) && position[8].type === '') {
        console.log('regra 2.16')
        handlePositionComputer(8)
      }
      else if ((position[2].type === turn && position[8].type === turn) && position[5].type === '') {
        console.log('regra 2.17')
        handlePositionComputer(5)
      }
      else if ((position[5].type === turn && position[8].type === turn) && position[2].type === '') {
        console.log('regra 2.18')
        handlePositionComputer(2)
      }
      else if ((position[0].type === turn && position[4].type === turn) && position[8].type === '') {
        console.log('regra 2.19')
        handlePositionComputer(8)
      }
      else if ((position[0].type === turn && position[8].type === turn) && position[4].type === '') {
        console.log('regra 2.20')
        handlePositionComputer(4)
      }
      else if ((position[4].type === turn && position[8].type === turn) && position[0].type === '') {
        console.log('regra 2.21')
        handlePositionComputer(0)
      }
      else if ((position[2].type === turn && position[4].type === turn) && position[6].type === '') {
        console.log('regra 2.22')
        handlePositionComputer(6)
      }
      else if ((position[2].type === turn && position[6].type === turn) && position[4].type === '') {
        console.log('regra 2.23')
        handlePositionComputer(4)
      }
      else if ((position[4].type === turn && position[6].type === turn) && position[2].type === '') {
        console.log('regra 2.24')
        handlePositionComputer(2)
      }

      else if (position[0].type === adversary && position[1].type === adversary && position[2].type === '') {
        console.log('regra 1.1')
        handlePositionComputer(2)
      }
      else if (position[0].type === adversary && position[2].type === adversary && position[1].type === '') {
        console.log('regra 1.2')
        handlePositionComputer(1)
      }
      else if (position[1].type === adversary && position[2].type === adversary && position[0].type === '') {
        console.log('regra 1.3')
        handlePositionComputer(0)
      }
      else if (position[3].type === adversary && position[4].type === adversary && position[5].type === '') {
        console.log('regra 1.4')
        handlePositionComputer(5)
      }
      else if (position[3].type === adversary && position[5].type === adversary && position[4].type === '') {
        console.log('regra 1.5')
        handlePositionComputer(4)
      }
      else if (position[4].type === adversary && position[5].type === adversary && position[3].type === '') {
        console.log('regra 1.6')
        handlePositionComputer(3)
      }
      else if (position[6].type === adversary && position[7].type === adversary && position[8].type === '') {
        console.log('regra 1.7')
        handlePositionComputer(8)
      }
      else if (position[6].type === adversary && position[8].type === adversary && position[7].type === '') {
        console.log('regra 1.8')
        handlePositionComputer(7)
      }
      else if (position[7].type === adversary && position[8].type === adversary && position[6].type === '') {
        console.log('regra 1.9')
        handlePositionComputer(6)
      }
      else if (position[0].type === adversary && position[3].type === adversary && position[6].type === '') {
        console.log('regra 1.10')
        handlePositionComputer(6)
      }
      else if (position[0].type === adversary && position[6].type === adversary && position[3].type === '') {
        console.log('regra 1.11')
        handlePositionComputer(3)
      }
      else if (position[3].type === adversary && position[6].type === adversary && position[0].type === '') {
        console.log('regra 1.12')
        handlePositionComputer(0)
      }
      else if (position[1].type === adversary && position[4].type === adversary && position[7].type === '') {
        console.log('regra 1.13')
        handlePositionComputer(7)
      }
      else if (position[1].type === adversary && position[7].type === adversary && position[4].type === '') {
        console.log('regra 1.14')
        handlePositionComputer(4)
      }
      else if (position[4].type === adversary && position[7].type === adversary && position[1].type === '') {
        console.log('regra 1.15')
        handlePositionComputer(1)
      }
      else if (position[2].type === adversary && position[5].type === adversary && position[8].type === '') {
        console.log('regra 1.16')
        handlePositionComputer(8)
      }
      else if (position[2].type === adversary && position[8].type === adversary && position[5].type === '') {
        console.log('regra 1.17')
        handlePositionComputer(5)
      }
      else if (position[5].type === adversary && position[8].type === adversary && position[2].type === '') {
        console.log('regra 1.18')
        handlePositionComputer(2)
      }
      else if (position[0].type === adversary && position[4].type === adversary && position[8].type === '') {
        console.log('regra 1.19')
        handlePositionComputer(8)
      }
      else if (position[0].type === adversary && position[8].type === adversary && position[4].type === '') {
        console.log('regra 1.20')
        handlePositionComputer(4)
      }
      else if (position[4].type === adversary && position[8].type === adversary && position[0].type === '') {
        console.log('regra 1.21')
        handlePositionComputer(0)
      }
      else if (position[2].type === adversary && position[4].type === adversary && position[6].type === '') {
        console.log('regra 1.22')
        handlePositionComputer(6)
      }
      else if (position[2].type === adversary && position[6].type === adversary && position[4].type === '') {
        console.log('regra 1.23')
        handlePositionComputer(4)
      }
      else if (position[4].type === adversary && position[6].type === adversary && position[2].type === '') {
        console.log('regra 1.24')
        handlePositionComputer(2)
      }

      else if (position[0].type === turn && position[1].type === '' && position[2].type === '') {
        console.log('regra 3.1')
        handlePositionComputer(1)
      }
      else if (position[0].type === turn && position[3].type === '' && position[6].type === '') {
        console.log('regra 3.2')
        handlePositionComputer(6)
      }
      else if (position[0].type === turn && position[4].type === '' && position[8].type === '') {
        console.log('regra 3.3')
        handlePositionComputer(8)
      }
      else if (position[1].type === turn && position[0].type === '' && position[2].type === '') {
        console.log('regra 3.4')
        handlePositionComputer(0)
      }
      else if (position[1].type === turn && position[4].type === '' && position[7].type === '') {
        console.log('regra 3.5')
        handlePositionComputer(4)
      }
      else if (position[2].type === turn && position[0].type === '' && position[1].type === '') {
        console.log('regra 3.6')
        handlePositionComputer(0)
      }
      else if (position[2].type === turn && position[4].type === '' && position[6].type === '') {
        console.log('regra 3.7')
        handlePositionComputer(6)
      }
      else if (position[2].type === turn && position[5].type === '' && position[8].type === '') {
        console.log('regra 3.8')
        handlePositionComputer(8)
      }
      else if (position[3].type === turn && position[0].type === '' && position[6].type === '') {
        console.log('regra 3.9')
        handlePositionComputer(0)
      }
      else if (position[3].type === turn && position[4].type === '' && position[4].type === '') {
        console.log('regra 3.10')
        handlePositionComputer(4)
      }
      else if (position[4].type === turn && position[0].type === '' && position[8].type === '') {
        console.log('regra 3.11')
        handlePositionComputer(0)
      }
      else if (position[4].type === turn && position[1].type === '' && position[7].type === '') {
        console.log('regra 3.12')
        handlePositionComputer(1)
      }
      else if (position[4].type === turn && position[2].type === '' && position[6].type === '') {
        console.log('regra 3.13')
        handlePositionComputer(2)
      }
      else if (position[4].type === turn && position[3].type === '' && position[5].type === '') {
        console.log('regra 3.14')
        handlePositionComputer(3)
      }
      else if (position[5].type === turn && position[2].type === '' && position[8].type === '') {
        console.log('regra 3.15')
        handlePositionComputer(2)
      }
      else if (position[5].type === turn && position[3].type === '' && position[4].type === '') {
        console.log('regra 3.16')
        handlePositionComputer(3)
      }
      else if (position[6].type === turn && position[0].type === '' && position[3].type === '') {
        console.log('regra 3.17')
        handlePositionComputer(0)
      }
      else if (position[6].type === turn && position[2].type === '' && position[4].type === '') {
        console.log('regra 3.18')
        handlePositionComputer(2)
      }
      else if (position[6].type === turn && position[7].type === '' && position[8].type === '') {
        console.log('regra 3.19')
        handlePositionComputer(8)
      }
      else if (position[7].type === turn && position[1].type === '' && position[4].type === '') {
        console.log('regra 3.20')
        handlePositionComputer(4)
      }
      else if (position[7].type === turn && position[6].type === '' && position[8].type === '') {
        console.log('regra 3.21')
        handlePositionComputer(6)
      }
      else if (position[8].type === turn && position[0].type === '' && position[4].type === '') {
        console.log('regra 3.22')
        handlePositionComputer(0)
      }
      else if (position[8].type === turn && position[2].type === '' && position[5].type === '') {
        console.log('regra 3.23')
        handlePositionComputer(2)
      }
      else if (position[8].type === turn && position[6].type === '' && position[7].type === '') {
        console.log('regra 3.24')
        handlePositionComputer(6)
      }

      else if (position[0].type === '' && position[1].type === '' && position[2].type === '') {
        console.log('regra 6.1')
        handlePositionComputer([0,1,2][Math.floor(Math.random() * [0,1,2].length)])
      }
      else if (position[0].type === '' && position[3].type === '' && position[6].type === '') {
        console.log('regra 6.2')
        handlePositionComputer([0,3,6][Math.floor(Math.random() * [0,3,6].length)])
      }
      else if (position[0].type === '' && position[4].type === '' && position[8].type === '') {
        console.log('regra 6.3')
        handlePositionComputer([0,4,8][Math.floor(Math.random() * [0,4,8].length)])
      }
      else if (position[1].type === '' && position[4].type === '' && position[7].type === '') {
        console.log('regra 6.4')
        handlePositionComputer([1,4,7][Math.floor(Math.random() * [1,4,7].length)])
      }
      else if (position[2].type === '' && position[4].type === '' && position[6].type === '') {
        console.log('regra 6.5')
        handlePositionComputer([2,4,6][Math.floor(Math.random() * [2,4,6].length)])
      }
      else if (position[2].type === '' && position[5].type === '' && position[8].type === '') {
        console.log('regra 6.6')
        handlePositionComputer([2,5,8][Math.floor(Math.random() * [2,5,8].length)])
      }
      else if (position[3].type === '' && position[0].type === '' && position[6].type === '') {
        console.log('regra 6.7')
        handlePositionComputer([3,0,6][Math.floor(Math.random() * [3,0,6].length)])
      }
      else if (position[3].type === '' && position[4].type === '' && position[5].type === '') {
        console.log('regra 6.8')
        handlePositionComputer([3,4,5][Math.floor(Math.random() * [3,4,5].length)])
      }
      else if (position[4].type === '' && position[0].type === '' && position[8].type === '') {
        console.log('regra 6.9')
        handlePositionComputer([4,0,8][Math.floor(Math.random() * [4,0,8].length)])
      }
      else if (position[4].type === '' && position[1].type === '' && position[7].type === '') {
        console.log('regra 6.10')
        handlePositionComputer([4,1,7][Math.floor(Math.random() * [4,1,7].length)])
      }
      else if (position[4].type === '' && position[2].type === '' && position[6].type === '') {
        console.log('regra 6.11')
        handlePositionComputer([4,2,6][Math.floor(Math.random() * [4,2,6].length)])
      }
      else if (position[4].type === '' && position[3].type === '' && position[5].type === '') {
        console.log('regra 6.12')
        handlePositionComputer([4,3,5][Math.floor(Math.random() * [4,3,5].length)])
      }
      else if (position[5].type === '' && position[2].type === '' && position[8].type === '') {
        console.log('regra 6.13')
        handlePositionComputer([5,2,8][Math.floor(Math.random() * [5,2,8].length)])
      }
      else if (position[5].type === '' && position[3].type === '' && position[4].type === '') {
        console.log('regra 6.14')
        handlePositionComputer([5,3,4][Math.floor(Math.random() * [5,3,4].length)])
      }
      else if (position[6].type === '' && position[0].type === '' && position[3].type === '') {
        console.log('regra 6.15')
        handlePositionComputer([6,0,3][Math.floor(Math.random() * [6,0,3].length)])
      }
      else if (position[6].type === '' && position[2].type === '' && position[4].type === '') {
        console.log('regra 6.16')
        handlePositionComputer([6,2,4][Math.floor(Math.random() * [6,2,4].length)])
      }
      else if (position[6].type === '' && position[7].type === '' && position[8].type === '') {
        console.log('regra 6.17')
        handlePositionComputer([6,7,8][Math.floor(Math.random() * [6,7,8].length)])
      }
      else if (position[7].type === '' && position[1].type === '' && position[4].type === '') {
        console.log('regra 6.18')
        handlePositionComputer([7,1,4][Math.floor(Math.random() * [7,1,4].length)])
      }
      else if (position[8].type === '' && position[0].type === '' && position[4].type === '') {
        console.log('regra 6.19')
        handlePositionComputer([8,0,4][Math.floor(Math.random() * [8,0,4].length)])
      }
      else if (position[8].type === '' && position[2].type === '' && position[5].type === '') {
        console.log('regra 6.20')
        handlePositionComputer([8,2,5][Math.floor(Math.random() * [8,2,5].length)])
      }

      else if (position[0].type === turn && position[1].type === '') {
        console.log('regra 4.1')
        handlePositionComputer(1)
      }
      else if (position[0].type === turn && position[3].type === '') {
        console.log('regra 4.2')
        handlePositionComputer(3)
      }
      else if (position[0].type === turn && position[4].type === '') {
        console.log('regra 4.3')
        handlePositionComputer(4)
      }
      else if (position[1].type === turn && position[0].type === '') {
        console.log('regra 4.4')
        handlePositionComputer(0)
      }
      else if (position[1].type === turn && position[2].type === '') {
        console.log('regra 4.5')
        handlePositionComputer(2)
      }
      else if (position[1].type === turn && position[4].type === '') {
        console.log('regra 4.6')
        handlePositionComputer(4)
      }
      else if (position[2].type === turn && position[1].type === '') {
        console.log('regra 4.7')
        handlePositionComputer(1)
      }
      else if (position[2].type === turn && position[4].type === '') {
        console.log('regra 4.8')
        handlePositionComputer(4)
      }
      else if (position[2].type === turn && position[5].type === '') {
        console.log('regra 4.9')
        handlePositionComputer(5)
      }
      else if (position[3].type === turn && position[0].type === '') {
        console.log('regra 4.10')
        handlePositionComputer(0)
      }
      else if (position[3].type === turn && position[4].type === '') {
        console.log('regra 4.11')
        handlePositionComputer(4)
      }
      else if (position[3].type === turn && position[6].type === '') {
        console.log('regra 4.12')
        handlePositionComputer(6)
      }
      else if (position[4].type === turn && position[0].type === '') {
        console.log('regra 4.13')
        handlePositionComputer(0)
      }
      else if (position[4].type === turn && position[1].type === '') {
        console.log('regra 4.14')
        handlePositionComputer(1)
      }
      else if (position[4].type === turn && position[2].type === '') {
        console.log('regra 4.15')
        handlePositionComputer(2)
      }
      else if (position[4].type === turn && position[3].type === '') {
        console.log('regra 4.16')
        handlePositionComputer(3)
      }
      else if (position[4].type === turn && position[5].type === '') {
        console.log('regra 4.17')
        handlePositionComputer(5)
      }
      else if (position[4].type === turn && position[6].type === '') {
        console.log('regra 4.18')
        handlePositionComputer(6)
      }
      else if (position[4].type === turn && position[7].type === '') {
        console.log('regra 4.19')
        handlePositionComputer(7)
      }
      else if (position[4].type === turn && position[8].type === '') {
        console.log('regra 4.20')
        handlePositionComputer(8)
      }
      else if (position[5].type === turn && position[2].type === '') {
        console.log('regra 4.21')
        handlePositionComputer(2)
      }
      else if (position[5].type === turn && position[4].type === '') {
        console.log('regra 4.22')
        handlePositionComputer(4)
      }
      else if (position[5].type === turn && position[8].type === '') {
        console.log('regra 4.23')
        handlePositionComputer(8)
      }
      else if (position[6].type === turn && position[3].type === '') {
        console.log('regra 4.24')
        handlePositionComputer(3)
      }
      else if (position[6].type === turn && position[4].type === '') {
        console.log('regra 4.25')
        handlePositionComputer(4)
      }
      else if (position[6].type === turn && position[7].type === '') {
        console.log('regra 4.26')
        handlePositionComputer(7)
      }
      else if (position[7].type === turn && position[4].type === '') {
        console.log('regra 4.27')
        handlePositionComputer(4)
      }
      else if (position[7].type === turn && position[6].type === '') {
        console.log('regra 4.28')
        handlePositionComputer(6)
      }
      else if (position[7].type === turn && position[8].type === '') {
        console.log('regra 4.29')
        handlePositionComputer(8)
      }
      else if (position[8].type === turn && position[4].type === '') {
        console.log('regra 4.30')
        handlePositionComputer(4)
      }
      else if (position[8].type === turn && position[5].type === '') {
        console.log('regra 4.31')
        handlePositionComputer(5)
      }
      else if (position[8].type === turn && position[7].type === '') {
        console.log('regra 4.32')
        handlePositionComputer(7)
      }

      else if (position[0].type === '') {
        console.log('regra 5.1')
        handlePositionComputer(0)
      }
      else if (position[1].type === '') {
        console.log('regra 5.2')
        handlePositionComputer(1)
      }
      else if (position[2].type === '') {
        console.log('regra 5.3')
        handlePositionComputer(2)
      }
      else if (position[3].type === '') {
        console.log('regra 5.4')
        handlePositionComputer(3)
      }
      else if (position[4].type === '') {
        console.log('regra 5.5')
        handlePositionComputer(4)
      }
      else if (position[5].type === '') {
        console.log('regra 5.6')
        handlePositionComputer(5)
      }
      else if (position[6].type === '') {
        console.log('regra 5.7')
        handlePositionComputer(6)
      }
      else if (position[7].type === '') {
        console.log('regra 5.8')
        handlePositionComputer(7)
      }
      else if (position[8].type === '') {
        console.log('regra 5.9')
        handlePositionComputer(8)
      }
    }

    setBlock(false)
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

  useEffect(() => {
    gamemode === 'computer' && player === 2 && setTimeout(() => {
      playComputer()
    }, 1000)
    console.log('teste')
  }, [gamemode === 'computer' && player])

  return (
    <div className="App-header">
      {!start ?
        <div className="start">
          <h1>Escolha para começar:</h1>
          {!gamemode ?
            <div>
              <h2><a onClick={() => setGamemode('computer')}>1 jogador</a></h2>
              <span>ou</span>
              <h2><a onClick={() => setGamemode('multiplayer')}>2 jogadores</a></h2>
            </div>
            :
            <div>
              <img src="assets/images/o.svg" onClick={() => { setTurn('o'); setStart(true) }} />
              <span>ou</span>
              <img src="assets/images/x.svg" onClick={() => { setTurn('x'); setStart(true) }} />
            </div>
          }
        </div>
        :
        <Fragment>
          {victory &&
            <div className="end">
              <h1>{victory}</h1>
              <button className="btn1" onClick={() => getStart()}>Jogar novamente</button>
            </div>
          }
          <div className="grid-board">
            {styleLine && <span className={styleLine}></span>}
            {position.map((pos, index) => (
              pos.type
                ?
                <div key={index}><img src={`assets/images/${pos.type}.svg`} /></div>
                :
                <div key={index}>
                  {!victory && !block &&
                    <button
                      onClick={() => handlePosition(index)}
                    >
                      {''}
                    </button>
                  }
                </div>
            ))}
          </div>
        </Fragment>
      }
    </div>
  );
}

export default Tictactoe;
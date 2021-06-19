import React from 'react';
import './index.css';
// eslint-disable-next-line
import logo from './logo.svg';

//importing images from images folder which is inside src because ModuleScopePlugin is has not been ejected....
import Left from './images/left-arrow.jpg';
import Right from './images/right-arrow.png';
import Leftpress from './images/left-arrow-press.png';
import Rightpress from './images/right-arrow-press.png';


import './App.css';


function Square(props) {

  let winner = props.winner;

  /*if winner-[0-winner_index,1-square_number,2-count,3-point]
    Winner_index is the array of squence of patten for tick tac toe which is selected for winner

    // count will be changing frequently based on selected history move
    // point store the index of the last move
    // when count and point becomes the same that meanas that must be the last move by the player which has created a pattern. 
    // basically its for changing the color of those square which creates a patten.
  
  */

  //checking if winner_index exist or not  
  if (winner[0]) {
    //checking the square's index number  with the winner_index number                           count and point are compare for checking whether it is last move or not
    if ((winner[0][0] === winner[1] || winner[0][1] === winner[1] || winner[0][2] === winner[1]) && (winner[2]===winner[3]&& winner[2]!==0) ) {
      return (
        <button className="square card green" onClick={() => props.click()}>
          {props.value ? props.value : '-'}
        </button>
      );
    } else {
      return (
        <button className="square card" onClick={() => props.click()}>
          {props.value ? props.value : '-'}
        </button>
      );
    }
  }
  else {
    return (
      <button className="square card" onClick={() => props.click()}>
        {props.value ? props.value : '-'}
      </button>
    );
  }
}

//once the winner is decided it will print the winner and 
//also contains the reset button and arrows for moving through the history of the played game using arrow button on thr keyboard
function Winner(props) {

  return (
      <div>
      <h1>{props.value ? props.value + " is the Winner" : null}</h1>
      <div className="red-center">
        <img alt="left" id="left" src={Left} height={60} width={60} onClick={()=>props.onClick[0](2)}/>
        <button  className="button button4" onClick={() => props.reset()}>Reset</button>
        <img alt="right" id="right" src={Right} height={60} width={60} onClick={()=>props.onClick[1](2)}/>
      </div>
    </div>
  );
}

//Deciding the winner based on the pattenr and returning the array which contains the winner and its winning patten.
function winnercheck(square) {
  const lines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [3, 6, 9],
    [2, 5, 8],
    [1, 5, 9],
    [3, 5, 7]
  ]
  for (var i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return [square[a], [a, b, c]];
    }
  }
  return [null, null,];
}

class BoxGame extends React.Component {



  //history- for the record of all the move that happened in a sequence.
  //it will store all state of 9 squares in form of array which has 9 values for one state. 
  //so on for all the other state.
  //winner- it contains 'X' or 'O'.
  //square- it contains the current state of the 9 square.
  //Toggle- for changing thr turns
  //count and point as previously explained , they are for keeping a track of  history move.
  //history_square - for sending the history after the game finishes to render method, it's like  a current history state of 9 square..
  //winner_index - contains the sequence pattern of winner.
  
  constructor(props) {
    super(props);
    this.state = {
      history:[[]],
      winner: null,
      squares: Array(9).fill(null),
      Toggle: true,
      count:0,
      point:0,
      history_square:null,
      winner_index: null,
    };

    //binding the method with this.
    this.handlePress= this.handlePress.bind(this);
    this.handleRelease = this.handleRelease.bind(this);
    this.handleRight =this.handleRight.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
  }

//for movement through the history of the game using arrow key press from keyboard that's why adding adding EventListenr
componentDidMount(){
  document.addEventListener('keydown',this.handlePress);
  document.addEventListener('keyup',this.handleRelease);
}

//removing event listener
componentWillUnmount(){
  document.removeEventListener('keydown',this.handlePress);
  document.removeEventListener('keyup',this.handleRelease);
}

//handling arrowkey press wheather left or right
handlePress(e){
  if(e.key==='ArrowLeft'){
    this.handleLeft(1);
  }
  else if(e.key==='ArrowRight'){
    this.handleRight(1);
  }
}

//changing the image of the arrow on the screen when the key is release.
handleRelease(){
  let right = document.getElementById('right');
  let left = document.getElementById('left');
  left.src = Left;
  right.src = Right;
}

handleRight(i){

  // console.log(this.state.point+" ="+ this.state.count);

  if(this.state.point && i===1){     //i === 1 means input is coming form keydown not the onclick but why different ? -->Async setstate update 
    if(this.state.point!==this.state.count){

      //for changing the image of arrow of the press.
      let right = document.getElementById('right');
      right.src = Rightpress;

      //increasing count for getting the next move that happened  and setting the current history square to reflect the changes on desktop
      this.setState({count:this.state.count+1});
      this.setState({history_square:this.state.history[this.state.count]});
    }
  }

  if(this.state.point && i===2){     //i === 2 means input is coming form  onclick not from keydown of keyboard but why different ? -->Async setstate update &touch screen phone don't have keydown
    if(this.state.point!==this.state.count){
      console.log("R2");
      //for changing the image of arrow of the press.
      let right = document.getElementById('right');
      right.src = Rightpress;

      //increasing count for getting the next move that happened  and setting the current history square to reflect the changes on desktop
      this.setState({count:this.state.count+1});
      this.setState({history_square:this.state.history[this.state.count+1]});

      setTimeout(() => { right.src = Right; }, 200);
      
    }
  }
    // console.log(this.state.point+" =" +this.state.count);
  
}

handleLeft(i){
  
  // console.log(this.state.point+" ="+ this.state.count);

  if(this.state.point && i===1){ //i === 1 means input is coming form keydown not the onclick
    if(this.state.count!==0){
      console.log("L2");
      //for changing the image of arrow of the press.
      let left = document.getElementById('left');
      left.src = Leftpress;

      //decreasing the count for getting the previous move that happened  and setting the current history square to reflect the changes on desktop
      this.setState({count:this.state.count===1?1:this.state.count-1});
      this.setState({history_square:this.state.history[this.state.count]});
    }
  }

    if(this.state.point && i===2){ //i == 2 means input is coming form  onclick not from keydown of keyboard but why different ? -->Async setstate update &touch screen phone don't have keydown
      if(this.state.count!==1){
  
        //for changing the image of arrow of the press.
        let left = document.getElementById('left');
        left.src = Leftpress;
  
        //decreasing the count for getting the previous move that happened  and setting the current history square to reflect the changes on desktop
        this.setState({count:this.state.count===1?1:this.state.count-1});
        this.setState({history_square:this.state.history[this.state.count-1]});

        setTimeout(() => {left.src=Left;}, 200);
      }
    }
    // console.log(this.state.point+" ="+ this.state.count);
}

//for reseting the whole game and also changing the turn between X and O..................
  reset() {
    this.setState({ squares: [Array(10).fill(null)], winner: null, winner_index: null,count:0,point:0,history_square:null,history:[[]] });

  }

//It's a lot of a messy coding here but i will optimize it later
  click(i) {
    let square = this.state.squares;
    let count = this.state.count;
    let history= this.state.history;
   
    //if the winner exist than do not change the value of any square and the turn
    if ((square[i] === 'X' || square[i] === 'O') && this.state.winner) {
      this.setState({squares:square,Toggle: this.state.Toggle });
      return;
    }

    //checking if its X's  turn and if winner does not exist if yes then go inside manage the variable and state 
    else if (this.state.Toggle && !this.state.winner && square[i] !== 'O') {
      square[i] = 'X';
      history.push(square.slice());
      this.setState({ squares: square, Toggle: !this.state.Toggle ,history: history,count:count+1});
    }

    //checking if its Y's turn and if winner does not exist if yes then go inside manage the variable and state
    else if (!this.state.Toggle && !this.state.winner && square[i] !== 'X') {
      square[i] = 'O';
      history.push(square.slice());
      this.setState({ squares: square, Toggle: !this.state.Toggle,history: history,count:count+1});
    }
    
    //checking the if the winner exist or not if winner does not exist then go inside and check if the winning pattern exist or not.
    if (!this.state.winner) {

      let winner_array = winnercheck(square);
      this.setState({ winner: winner_array[0], winner_index: winner_array[1],history_square:square});

      //seting a last move index
      if(winner_array[0]){
        this.setState({point:this.state.count+1});
      }
    }
  }

//setting the 9 square and managing info. for various purpose.
  render() {
    let point=this.state.point;
    let count=this.state.count;
    return (
      <div>
        <div className="container">
          <div className="board-row">
            <Square value={this.state.winner?this.state.history_square[1]:this.state.squares[1]} winner={[this.state.winner_index, 1,count,point]} click={() => this.click(1)} />
            <Square value={this.state.winner?this.state.history_square[2]:this.state.squares[2]} winner={[this.state.winner_index, 2,count,point]} click={() => this.click(2)} />
            <Square value={this.state.winner?this.state.history_square[3]:this.state.squares[3]} winner={[this.state.winner_index, 3,count,point]} click={() => this.click(3)} />
          </div>
          <div className="board-row">
            <Square value={this.state.winner?this.state.history_square[4]:this.state.squares[4]} winner={[this.state.winner_index, 4,count,point]} click={() => this.click(4)} />
            <Square value={this.state.winner?this.state.history_square[5]:this.state.squares[5]} winner={[this.state.winner_index, 5,count,point]} click={() => this.click(5)} />
            <Square value={this.state.winner?this.state.history_square[6]:this.state.squares[6]} winner={[this.state.winner_index, 6,count,point]} click={() => this.click(6)} />
          </div>
          <div className="board-row">
            <Square value={this.state.winner?this.state.history_square[7]:this.state.squares[7]} winner={[this.state.winner_index, 7,count,point]} click={() => this.click(7)} />
            <Square value={this.state.winner?this.state.history_square[8]:this.state.squares[8]} winner={[this.state.winner_index, 8,count,point]} click={() => this.click(8)} />
            <Square value={this.state.winner?this.state.history_square[9]:this.state.squares[9]} winner={[this.state.winner_index, 9,count,point]} click={() => this.click(9)} />
          </div>
        </div>
        <Winner value={this.state.winner} reset={() => this.reset()}  onClick={[this.handleLeft,this.handleRight]}/>
      </div>
    );
  };
}
export default BoxGame;

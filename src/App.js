import React, { useState } from 'react';
import './index.css';
import logo from './logo.svg';
import './App.css';


function Square(props){

  return(
    <button className="square card" onClick={()=>props.click()}>
    {props.value?props.value:'-'}
    </button>
  );
}

function Winner(props){

  return(
    <div>
    <h1>{props.value?props.value+" is the Winner":null}</h1>
    <button className="button button4" onClick={()=>props.reset()}>Reset</button>
    </div>
  );
}


function winnercheck(square){
  const lines = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [3,6,9],
    [2,5,8],
    [1,5,9],
    [3,5,7]
  ]
  for (var i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if(square[a] && square[a]===square[b] && square[a]===square[c]){
      return square[a];
    }
  }
  return null;
}

class BoxGame extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      winner:null,
      squares:[Array(10).fill(null)],
      Toggle:true
    };
    // this.click= this.click.bind(this);
  }
  reset(){
    this.setState({squares:[Array(10).fill(null)],winner:null});

  }

  click(i){
    let square= this.state.squares;
    let count = this.state.count;
    if(square[i]=='X'||square[i]=='O'&& this.state.winner){
      this.setState({squares:square,Toggle:this.state.Toggle});
    }
    else if(this.state.Toggle && !this.state.winner){
      this.setState({squares:square,Toggle:!this.state.Toggle});
      square[i]='X';

    }
    else if(!this.state.Toggle && !this.state.winner){
      this.setState({squares:square,Toggle:!this.state.Toggle});
      square[i]='O';
    }

    if(!this.state.winner){
     this.setState({winner:winnercheck(square)});
    }

  }

render(){
  return(
    <div>
    <div class="container">
    <div className="board-row">
    <Square value={this.state.squares[1]} click={()=>this.click(1)}/>
    <Square value={this.state.squares[2]} click={()=>this.click(2)}/>
    <Square value={this.state.squares[3]} click={()=>this.click(3)}/>    
    </div>
    <div className="board-row">
    <Square value={this.state.squares[4]} click={()=>this.click(4)}/>
    <Square value={this.state.squares[5]} click={()=>this.click(5)}/>
    <Square value={this.state.squares[6]} click={()=>this.click(6)}/>
    </div>
    <div className="board-row">
    <Square value={this.state.squares[7]} click={()=>this.click(7)}/>
    <Square value={this.state.squares[8]} click={()=>this.click(8)}/>
    <Square value={this.state.squares[9]} click={()=>this.click(9)}/>
    </div>
    </div>
    <div className=""><Winner value={this.state.winner} reset={()=>this.reset()}/></div>
    </div>
  );
};


  
}
export default BoxGame;

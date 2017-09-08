
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';

var PLAYERS = [
    {
      name: "Jim Hoskins",
      score: 31,
      id: 1,
    },
    {
      name: "Andrew Chalkley",
      score: 35,
      id: 2,
    },
    {
      name: "Alena Holligan",
      score: 42,
      id: 3,
    },
  ];
  var nextId = 4;

    
  var AddPlayerForm = React.createClass({
    propTypes: {
      onAdd: React.PropTypes.func.isRequired,
    },
    
    getInitialState: function() {
      return {
        name: "",
      };
    },
    
    onNameChange: function(e) {
      this.setState({name: e.target.value});
    },
    
    onSubmit: function(e) {
      e.preventDefault();
    
      this.props.onAdd(this.state.name);
      this.setState({name: ""});
    },
    
    
    render: function() {
      return (
        <div className="add-player-form">
          <form onSubmit={this.onSubmit}>
            <input type="text" value={this.state.name} onChange={this.onNameChange} />
            <input type="submit" value="Add Player" />
          </form>
        </div>
      ); 
    }
  });
    
  var StopWatch = React.createClass({
    getInitialState: function(){
      return ({
        running:false,
        previousTime :0,
        elapsedTime: 0
      })
    },
    componentDidMount: function(){
      this.interval = setInterval(this.tick,100);
    },
    componentWillUnmount : function(){
      clearInterval(this.interval);
    },
    tick: function(){
      if(this.state.running){
        this.state.elapsedTime = Date.now() - this.state.previousTime;
        this.setState(this.state);
      }
    },
    start: function(){
      this.state.running =true;
      this.state.previousTime = Date.now();
      this.setState(this.state);
    },
    stop: function(){
      this.state.running =false;
      this.setState(this.state);
    },
    reset: function(){
      this.state.elapsedTime =  0;
      this.state.previousTime = Date.now();
      this.state.running = false;
      this.setState(this.state);
    },
    render: function(){
        return(
            <div className="stopwatch">
                <h2> Stopwatch</h2>
                <div className="stopwatch-time">{this.state.elapsedTime}</div>
                 {this.state.running ? <button onClick={this.stop}> Stop </button> : <button  onClick={this.start}> Start </button>} 
                <button  onClick={this.reset}> Reset </button>
            </div>  
        )
    }  
  
  });
    
  function Stats(props) {
    var totalPlayers = props.players.length;
    var totalPoints = props.players.reduce(function(total, player){
      return total + player.score;
    }, 0);
    
    return (
      <table className="stats">
        <tbody>
          <tr>
            <td>Players:</td>
            <td>{totalPlayers}</td>
          </tr>
          <tr>
            <td>Total Points:</td>
            <td>{totalPoints}</td>
          </tr>
        </tbody>
      </table>
    )  
  }
    
  Stats.propTypes = {
    players: React.PropTypes.array.isRequired,
  };
  
  function Header(props) {
    return (
      <div className="header">
        <Stats players={props.players}/>
        <h1>{props.title}</h1>
        <StopWatch />
      </div>
    );
  }
  
  Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    players: React.PropTypes.array.isRequired,
  };
  
  function Counter(props) {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={function() {props.onChange(-1);}} > - </button>
        <div className="counter-score"> {props.score} </div>
        <button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
      </div>
    );
  }
    
  Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }
  
  function Player(props) {
    return (
      <div className="player">
        <div className="player-name">
          <a className="remove-player" onClick={props.onRemove}>✖</a>
          {props.name}
        </div>
        <div className="player-score">
          <Counter score={props.score} onChange={props.onScoreChange} />
        </div>
      </div>
    );
  }
  
  Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onScoreChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
  };
  
  
  
  var Application = React.createClass({
    propTypes: {
      title: React.PropTypes.string,
      initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        id: React.PropTypes.number.isRequired,
      })).isRequired,
    },
    
    getDefaultProps: function() {
      return {
        title: "Scoreboard",
      }
    },
    
    getInitialState: function() {
      return {
        players: this.props.initialPlayers,
      };
    },
    
    onScoreChange: function(index, delta) {
      this.state.players[index].score += delta;
      this.setState(this.state);
    },
      
    onPlayerAdd: function(name) {
      this.state.players.push({
        name: name,
        score: 0,
        id: nextId,
      });
      this.setState(this.state);
      nextId += 1;
    },
      
    onRemovePlayer: function(index) {
      this.state.players.splice(index, 1);
      this.setState(this.state);
    },
    
    render: function() {
      return (
        <div className="scoreboard">
          <Header title={this.props.title} players={this.state.players} />
        
          <div className="players">
            {this.state.players.map(function(player, index) {
              return (
                <Player 
                  onScoreChange={function(delta) {this.onScoreChange(index ,delta)}.bind(this)}
                  onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                  name={player.name} 
                  score={player.score} 
                  key={player.id} />
              );
            }.bind(this))}
          </div>
          <AddPlayerForm onAdd={this.onPlayerAdd} />
        </div>
      );
    }
  });  
  
  
  
  ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('root'));

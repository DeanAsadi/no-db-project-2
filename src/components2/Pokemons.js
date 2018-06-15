import axios from "axios";
import React, { Component } from "react";
import Button from "./Button";
import Pokemon from "./Pokemon";

class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      pokemons: [],
      newPokemon: "",
      filter: ""
    };
    // this.deletePersonHandler = this.deletePersonHandler.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:3001/api/pokemons").then(response => {
      this.setState({ pokemons: response.data });
    });
  }

  deletePokemonHandler = id => {
    axios.delete(`http://localhost:3001/api/pokemons/${id}`).then(response => {
      this.setState({ pokemons: response.data });
    });
  };

  updatePokemonHandler = (id, name) => {
    axios
      .put(`http://localhost:3001/api/pokemons/${id}`, { name })
      .then(response => {
        this.setState({ pokemons: response.data, editing: false });
      });
  };

  filterPokemonHandler = e => {
    this.setState({ filter: e.target.value });

    axios
      .get(`http://localhost:3001/api/pokemons/filter/${e.target.value}`)
      .then(response => {
        this.setState({ pokemons: response.data });
      });
  };

  onChangeHandler = e => {
    this.setState({ newPokemon: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state.newPokemon);

    //make request here
    axios
      .post(`http://localhost:3001/api/pokemons`, {
        name: this.state.newPokemon
      })
      .then(response => {
        //clear out input
        console.log(e);
        this.setState({ pokemons: response.data, newPokemon: "" });
      });
  };

  onEditHandler = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    const { pokemons, editing } = this.state;

    const pokemonsDisplay = pokemons.map(pokemon => {
      return (
        <Pokemon
          editing={editing}
          updatePokemon={this.updatePokemonHandler}
          deletePokemon={this.deletePokemonHandler}
          key={pokemon.id}
          obj={pokemon}
        />
      );
    });

    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            value={this.state.newPokemon}
            onChange={this.onChangeHandler}
            type="text"
            placeholder="add new Pokemon"
          />
          <Button>Submit</Button>
        </form>

        <Button clicked={this.onEditHandler}>Update</Button>

        <div style={{ border: "5px solid gray" }}>{pokemonsDisplay}</div>
      </div>
    );
  }
}

export default Pokemons;

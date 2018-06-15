import React, { Component } from "react";
import Button from "./Button";

class Pokemon extends Component {
  state = {
    newName: ""
  };

  onChangeHandler = e => {
    this.setState({ newName: e.target.value });
  };

  render() {
    const { deletePokemon, updatePokemon, editing } = this.props;
    const { name, id } = this.props.obj;
    return (
      <div>
        <div>
          {editing ? (
            <div>
              <input
                value={this.state.newName}
                onChange={this.onChangeHandler}
                type="text"
              />
              <Button clicked={() => updatePokemon(id, this.state.newName)}>
                Update
              </Button>
            </div>
          ) : (
            <p>{name}</p>
          )}
        </div>
        <Button clicked={() => deletePokemon(id)} className="delete">
          Delete
        </Button>
      </div>
    );
  }
}

export default Pokemon;

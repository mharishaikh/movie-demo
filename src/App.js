import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
class App extends Component {

  /**
   * @constructor
   *
   */
  constructor () {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  /**
   * @method handleChange arrow function which call on onChange event
   * and set state of searchField also it bind this because of arrow so we
   * don't need to bind this method into Consturctor with this keyword 
   *
   * @param {event} e event of the change
   */
  handleChange = e => {
    this.setState( { searchField: e.target.value } )
  };

  componentDidMount() {
    fetch( 'https://jsonplaceholder.typicode.com/users' )
      .then( response => response.json() )
      .then( users => this.setState( { monsters: users } ) );
  }

  /**
   * @method render method of react module that render everytime 
   * whenever any changes occuers in App component.
   *
   */
  render() {

    const { monsters, searchField } = this.state;
    const filterdMonsters = monsters.filter( monster => {
      return monster.name.toLowerCase().includes( searchField.toLowerCase() );
    } );

    return (
      <div className="App">
        <h1>Rolodex Monsters</h1>
        <SearchBox
          placeholder='Search monsters here ...'
          handleChange={ this.handleChange }
        />
        <CardList monsters={ filterdMonsters } />
      </div>
    );
  }
}
export default App;

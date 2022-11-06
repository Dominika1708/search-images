import styles from '../styles.module.css'
import React, { Component } from 'react';

export class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(e.currentTarget.elements.search.value);
  };
  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

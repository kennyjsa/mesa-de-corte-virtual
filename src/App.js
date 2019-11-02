import React, { Component } from 'react';

import './App.css';

import SelectMedia from './SelectMedia';
import MediaManager from './MediaManager';
import PlayList from './PlayList/List';
import { Button } from '@blueprintjs/core';

class App extends Component {
  state = {
    addMediaVisible: true,
    list: [],
    mediaSelected: null
  }

  openAddMedia = () => {
    this.setState({ addMediaVisible: true })
  }
  closeAddMedia = () => {
    this.setState({ addMediaVisible: false })
  }
  onAddMedia = (medias) => {
    const list = [...this.state.list, ...medias];

    this.setState({ list, addMediaVisible: false });
  }

  onSelect=(mediaSelected)=>{
    this.setState({ mediaSelected });
  }

  render() {
    const { addMediaVisible } = this.state;

    return (
      <div className="App">
        <header>
          <Button icon="add" onClick={this.openAddMedia}>Mídia</Button>
        </header>

        {addMediaVisible && 
          <SelectMedia onAddMedia={this.onAddMedia} closeAddMedia={this.closeAddMedia} />
        }

        <MediaManager secondary={this.state.mediaSelected} setSecondary={this.onSelect} />


        <PlayList list={this.state.list} onSelect={this.onSelect} />

      </div>
    );
  }
}

export default App;

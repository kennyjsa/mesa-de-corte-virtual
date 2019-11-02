import React, { Component } from 'react';

import './App.css';

import SelectMedia from './SelectMedia';
import MediaManager from './MediaManager';
import PlayList from './PlayList/List';
import { Button } from '@blueprintjs/core';

const { ipcRenderer } = require('electron');

class App extends Component {
  state = {
    addMediaVisible: false,
    list: [],
    mediaSelectedPrimary: null,
    mediaSelectedSecondary: null,
    displays:[]
  }

  componentDidMount(){
    ipcRenderer.on('list-display-reply', (event, arg) => {
      this.setState({ displays: arg });
      console.log('displays', arg)
    });

    ipcRenderer.send('list-display');
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

  setPrimary=(mediaSelected)=>{
    this.setState({ mediaSelectedPrimary:mediaSelected });
  }

  onSelect=(mediaSelected)=>{
    this.setState({ mediaSelectedSecondary: mediaSelected });
  }

  render() {
    const { displays, addMediaVisible } = this.state;

    return (
      <div className="App">
        <header>
          <Button icon="add" onClick={this.openAddMedia}>Mídia</Button>
          <div className="bp3-select">
              <select onChange={this.setDisplay}>
                {displays.map((display, i) => (
                  <option key={display.id} value={display.id}>
                    DISPLAY {i+1} ({display.size.width} x {display.size.height})
                  </option>
                ))}
              </select>
            </div>

        </header>


        {addMediaVisible && 
          <SelectMedia onAddMedia={this.onAddMedia} closeAddMedia={this.closeAddMedia} />
        }

        <MediaManager 
          primary={this.state.mediaSelectedPrimary}
          secondary={this.state.mediaSelectedSecondary}
          setSecondary={this.onSelect}
          setPrimary={this.setPrimary} />


        <PlayList 
          primary={this.state.mediaSelectedPrimary}
          secondary={this.state.mediaSelectedSecondary}        
          list={this.state.list} 
          onSelect={this.onSelect} />

      </div>
    );
  }
}

export default App;

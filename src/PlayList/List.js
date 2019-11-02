import React, { Component } from 'react';
import Thumb from './Thumb';

class PlayList extends Component {
  render() {
    const { list } = this.props;

    if(!list){
        return <h1>Lista Vazia</h1>
    }

    return (
      <div className="play-list">
        {list.map(x=>
            <Thumb key={x.key} item={x} onSelect={this.props.onSelect} />
        )}
      </div>
    );
  }
}

export default PlayList;

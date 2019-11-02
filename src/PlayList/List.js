import React, { Component } from 'react';
import Thumb from './Thumb';

class PlayList extends Component {
  render() {
    const { list, primary, secondary } = this.props;
    const primaryKey = !!primary?primary.key:"";
    const secondaryKey = !!secondary?secondary.key:"";

    if (!list) {
      return <h1>Lista Vazia</h1>
    }

    return (
      <div className="play-list">

        {list.map(x =>
          (
            <div className={"select " +
            (x.key === primaryKey ? "primary": "")+" "+
            (x.key === secondaryKey ? "secondary": "")
          }>
            <Thumb key={x.key} item={x} onSelect={this.props.onSelect} />
          </div>
          )
        )}
      </div>
    );
  }
}

export default PlayList;

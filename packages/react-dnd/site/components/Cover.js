import React, { Component } from 'react';
import './Cover.less';

export default class Cover extends Component {
  render() {
    return (
      <div className="Cover">
        <div className="Cover-header">
          <p className="Cover-description">
            Drag and Drop for React
          </p>
        </div>
      </div>
    );
  }
}
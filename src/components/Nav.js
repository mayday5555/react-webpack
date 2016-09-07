import React from 'react';

var vastio = require('../images/v.png');
const msg = [{text: "index"}, {text: "manage"}, {text: "readme"}, {text: "sss"}, {text: "about"}];

let Nav = React.createClass({

  render() {
    return (
      <div className="nav">
        <img src={vastio} />
        <h1 className="appTitle">ReactJS-Webpack</h1>
        <Navbar items={msg}/>
        <div className="clearfix"></div>
      </div>
    );
  }
});

let Navbar = React.createClass({
  getInitialState() {
    let index = 0;
    const hash = window.location.hash.replace("#", "");
    if(hash !== "") {
      index = this.props.items.findIndex((item, i, list) => {
        return item.text === hash;
      });
    }
    return {index: index === -1 ? 0 : index};
  },

  onChildChange(newIndex) {
    this.setState({index: newIndex});
  },

  render() {
    let node = this.props.items.map((item, index) => {
      return (
        <ToggleCheckBtn
          callParent={this.onChildChange}
          text={item.text}
          key={new Date().getTime() + index}
          dataIndex={index}
          initialChecked={this.state.index === index ? true : false}
        />
      );
    });
    return (
      <ul className="navbar">
        <span className="diliver"></span>
        {node}
      </ul>
    );
  }
});

let ToggleCheckBtn = React.createClass({
  getInitialState() {
    return {checked: this.props.initialChecked}
  },

  handleClick() {
    var newState = !this.state.checked;
    var newIndex = this.props.dataIndex;
    this.setState({checked: newState}, (() => {
      this.props.callParent(newIndex);
    }));
  },

  render() {
    return (
      <li
        className={"nav-item " + (this.state.checked ? "active" : "")}
        onClick={this.handleClick}
      >
        <a
          href={"#" + this.props.text}
          className="nav-btn"
        >
          {this.props.text}
        </a>
        <span className="diliver"></span>
      </li>
    );
  }
});

export default Nav;

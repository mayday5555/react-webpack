import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let InputComponent = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render() {
    return (
    <div className="todoInputWrap">
      <input id="todoInput" type="text" value={this.state.value} placeholder="添加新的待办事项" onChange={this.handleChange} onKeyUp={this.props.addItem}/>
    </div>
    );
  }
});

let Footer = React.createClass({
  render() {
    return (
      <div className="todoFooter">
        <span style={{display: "inline-block",margin: 10}}>已完成：{this.props.complated} / 总数：{this.props.total}</span>
        <a className="control-btn" onClick={this.props.removeAllItem}>全部删除</a>
        <a className="control-btn" onClick={this.props.removeComplatedItem}>删除已完成</a>
        <a className="control-btn" onClick={this.props.toggleAllComplate}>全部完成</a>
        <div className="clearfix"></div>
      </div>
    );
  }
});

let Todo = React.createClass({
  getInitialState() {
    return {
      complate: false
    }
  },

  toggleComplate() {
    this.setState({complate: !this.state.complate});
    return !this.state.complate;
  },

  render() {
    return (
      <div onClick={this.props.onClick} className={"todo" + (this.state.complate ? " complate" : "")}>
        {this.props.item}
        <button className="removeItem" onClick={this.props.removeItem}>删除</button>
      </div>
    );
  }
});

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['Apple', 'Banana', 'Cranberry'],
      complatedNum: 0
    };
  }

  handleAddItem(e) {
    if(e.keyCode === 13) {
      let newItems = [...new Set(this.state.items).add(e.target.value)];
      newItems.unshift(newItems.pop())
      this.setState({
        items: newItems
      });
      this.refs.myInput.setState({value: ''});
    }
  }

  handleRemoveItem(index, e) {
    e.stopPropagation();
    let that = this.refs['item' + index];
    let targetState = that.state.complate;
    let items = this.state.items.filter((item, i) => {
      return i !== index;
    });
    this.setState({
      items: items,
      complatedNum: targetState ? --this.state.complatedNum : this.state.complatedNum
    });
  }

  handleClickItem(index) {
    let that = this.refs['item' + index];
    let targetState = that.toggleComplate();
    if(targetState) {
      this.setState({
        complatedNum: ++this.state.complatedNum
      });
    } else {
      this.setState({
        complatedNum: --this.state.complatedNum
      });
    }
  }

  handleToggleAllComplate() {
    for(let key in this.refs) {
      if(key.indexOf('item') > -1) {
        this.refs[key].setState({
          complate: true
        });
      }
    }
    this.setState({
      complatedNum: this.state.items.length
    });
  }

  handleRemoveAllItem() {
    this.setState({
      items: [],
      complatedNum: 0
    });
  }

  handleRemoveComplatedItem() {
    var unComplated = [];
    for(let key in this.refs) {
      if(key.indexOf("item") > -1) {
        if(!this.refs[key].state.complate) {
          unComplated.push(this.refs[key].props.item);
        }
      }
    }
    this.setState({
      items: unComplated,
      complatedNum: 0
    })
  }

  render() {
    return (
      <div id="todos">
        <InputComponent addItem={this.handleAddItem.bind(this)} ref="myInput"/>
        {
          this.state.items.map((item, i) => {
            return (
              <Todo
                item={item}
                key={item}
                ref={"item" + i}
                onClick={this.handleClickItem.bind(this, i)}
                removeItem={this.handleRemoveItem.bind(this, i)}
              />
            );
          }, this)
        }
        <Footer
          total={this.state.items.length}
          complated={this.state.complatedNum}
          toggleAllComplate={this.handleToggleAllComplate.bind(this)}
          removeAllItem={this.handleRemoveAllItem.bind(this)}
          removeComplatedItem={this.handleRemoveComplatedItem.bind(this)}
        />
      </div>
    );
  }
}

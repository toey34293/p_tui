import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card, Input, Button, Table } from "antd";

var columns1 = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "Y",
    dataIndex: "y",
    key: "y",
  },
];

var x = [],
  y = [],
  tableTag = [];

export default class test extends Component {
  constructor(props) {
    super(props);
    this.Ex = this.Ex.bind(this);
    this.state = {
      nPoints: null,
    };
  }

  async Ex() {
    const url = "http://localhost:8000/test2";
    const response = await fetch(url);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    this.setState({
      nPoints: data.test2.nPoints,
    });
    this.createTableInput(parseInt(this.state.nPoints));
    for (var i = 1; i <= this.state.nPoints; i++) {
      // console.log("data", data.test2.x[i - 1]);
      // console.log("div", document.getElementById("x" + i));
      document.getElementById("x" + i).value = data.test2.x[i - 1];
      document.getElementById("y" + i).value = data.test2.y[i - 1];
    }
    this.forceUpdate();
  }

  createTableInput(n) {
    x = [];
    y = [];
    tableTag = [];
    for (var i = 1; i <= n; i++) {
      x.push(<input id={"x" + i} key={"x" + i} placeholder={"x" + i} />);
      y.push(<input id={"y" + i} key={"y" + i} placeholder={"y" + i} />);
      tableTag.push({
        no: i,
        x: x[i - 1],
        y: y[i - 1],
      });
    }
    console.log(x, y, tableTag);
    this.forceUpdate();
  }

  render() {
    return (
      <div align="center">
        <br />
        <button onClick={this.Ex}>Example</button>
        <br />
        <br />
        <p>Number of points (n)</p>
        <input
          onChange={async (e) => {
            await this.setState({ nPoints: e.target.value });
            this.createTableInput(parseInt(this.state.nPoints));
            this.forceUpdate();
          }}
          value={this.state.nPoints}
          name="nPoints"
          placeholder="Number of points (n)"
        />
        <br />
        <br />
        <Table
          columns={columns1}
          dataSource={tableTag}
          pagination={false}
          bordered={true}
          bodyStyle={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "white",
            overflowY: "scroll",
            minWidth: 120,
            maxHeight: 300,
          }}
        ></Table>
      </div>
    );
  }
}

#!/usr/bin/env node

export class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(i, j) {
    if (!this.adjacencyList[`${i}${j}`]) {
      this.adjacencyList[`${i}${j}`] = [];
      return true;
    }
    return;
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return;
    } else if (
      this.adjacencyList[vertex1].includes(vertex2) ||
      this.adjacencyList[vertex2].includes(vertex1)
    ) {
      return;
    }
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
    return true;
  }

  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return false;
    }
    let i1 = this.adjacencyList[vertex2].indexOf(vertex1);
    let i2 = this.adjacencyList[vertex1].indexOf(vertex2);
    this.adjacencyList[vertex1].splice(i1, 1);
    this.adjacencyList[vertex2].splice(i2, 1);
    return true;
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return undefined;
    }
    let vertexList = this.adjacencyList[vertex];
    for (let i = 0; i < vertexList.length; i++) {
      this.adjacencyList[vertexList[i]] = this.adjacencyList[
        vertexList[i]
      ].filter((v) => v != vertex);
    }
    delete this.adjacencyList[vertex];
    return this;
  }
}

# Graph-Theory-Push-Relabel-Maximum-Flow [![Build Status](https://api.travis-ci.org/prabod/Graph-Theory-Ford-Fulkerson-Maximum-Flow.svg)](https://travis-ci.org/prabod/Graph-Theory-Ford-Fulkerson-Maximum-Flow) [![Dependency Status](https://david-dm.org/prabod/Graph-Theory-Ford-Fulkerson-Maximum-Flow.svg)](https://david-dm.org/prabod/Graph-Theory-Ford-Fulkerson-Maximum-Flow)


> Push-Relabel Algorithm for Maximum Flow Problem

## Introduction

*When a Graph Represent a Flow Network where every edge has a capacity. Also given that two vertices, source 's' and sink 't' in the graph, we can find the maximum possible flow from s to t with having following constraints:*

1. Flow on an edge doesn't exceed the given edge capacity
2. Incoming flow is equal to Outgoing flow for every vertex excluding sink and source

## Algorithm

	* Input: network (G = (V, E), s, t, c)
	* h[s] := |V |
	* for each v ∈ V − {s} do h[v] := 0
	* for each (s, v) ∈ E do f(s, v) := c(s, v)
	* while f is not a feasible flow
		* let c'(u, v) = c(u, v) + f(u, v) − f(v, u) be the capacities of the residual network
		* if there is a vertex v ∈ V − {s, t} and a vertex w ∈ V such that ef (v) > 0, h(v) > h(w), and c'(v, w) > 0 then
			∗ push min{c'(v, w), ef (v)} units of flow on the edge (v, w)
		* else, let v be a vertex such that ef (v) > 0, and set h[v] := h[v] + 1
 	* output f

## Example

*Consider the following graph*

<img src="/images/ford_fulkerson11.png">

*Maximum possible flow in the given graph is 23*

```javascript
var pushRelabel = require('graph-theory-push-relabel');

var graph = [
	[ 0, 16,  13, 0,  0,  0 ],
    [ 0,  0, 10, 12,  0,  0 ],
    [ 0,  4,  0,  0, 14,  0 ],
    [ 0,  0,  9,  0,  0, 20 ],
    [ 0,  0,  0,  7,  0,  4 ],
    [ 0,  0,  0,  0,  0,  0 ]
];

console.log("The maximum possible flow is " +
	pushRelabel.PushRelabel(graph, 0, 5));
```

## Usage

#### `require('graph-theory-push-relabel')( graph, source, sink )`
Compute the maximum flow in a flow network between source node `source` and sink node `sink`.

**Arguments:**
- `graph`: The Graph which representing the flow network
- `source`: source vertex
- `sink`: sink vertex

**Returns:** Returns a number representing the maximum flow.

## License

&copy; 2016 Prabod Rathnayaka. MIT License.

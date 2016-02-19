/**
 * Created by prabod on 2/17/16.
 */
module.exports = function PushRelabel(graph, s, t) {

	if (s < 0 || t < 0 || s > graph.length - 1 || t > graph.length - 1) {
		throw new Error("Push-Relabel-Maximum-Flow :: invalid sink or source");
	}
	if (graph.length === 0) {
		throw new Error("Push-Relabel-Maximum-Flow :: invalid graph");
	}
	var n = graph.length;

	var h = Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0);
	h[s] = n - 1;

	var maxh = Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0);
	var f = [];

	for (var k = 0; k < n; k++) {
		if (graph[k].length !== graph.length) {
			throw new Error("Push-Relabel-Maximum-Flow :: invalid graph. graph needs to be NxN");
		}
		f.push(Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0));
	}

	var e = [];

	for (var i = 0; i < n; ++i) {
		f[s][i] = graph[s][i];
		if (f[s][i] != 0) {
			f[i][s] = -f[s][i];
		}
		e[i] = graph[s][i];

	}
	for (var sz = 0;;) {
		if (sz == 0) {
			for (var i = 0; i < n; ++i) {
				if ((i != s) && (i != t) && (e[i] > 0)) {
					if (sz != 0 && h[i] > h[maxh[0]]) {
						sz = 0;
					}
					maxh[sz++] = i;
				}
			}
		}

		if (sz == 0) {
			break;
		}
		while (sz != 0) {
			var i = maxh[sz - 1];
			var pushed = false;
			for (var j = 0; j < n && e[i] != 0; ++j) {
				if (h[i] == (h[j] + 1) && (graph[i][j] - f[i][j]) > 0) {
					var df = Math.min((graph[i][j] - f[i][j]), e[i]);
					f[i][j] += df;
					f[j][i] -= df;
					e[i] -= df;
					e[j] += df;
					if (e[i] == 0) {
						--sz;
					}
					pushed = true;
				}
			}
			if (!pushed) {
				h[i] = Number.MAX_VALUE;
				for (var j = 0; j < n; ++j) {
					if (h[i] > (h[j] + 1) && (graph[i][j] - f[i][j]) > 0) {
						h[i] = h[j] + 1;
					}
				}
				if (h[i] > h[maxh[0]]) {
					sz = 0;
					break;
				}
			}
		}
	}

	var flow = 0;
	for (var i = 0; i < n; i++) {
		flow += f[s][i];
	}
	return flow;
};

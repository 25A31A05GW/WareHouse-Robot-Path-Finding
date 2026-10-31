/** Min-heap priority queue. Lower numeric priorities are removed first. */
export default class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(value, priority) {
    this.heap.push({ value, priority });
    this.#bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const minimum = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.#sinkDown(0);
    }
    return minimum.value;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  get size() {
    return this.heap.length;
  }

  #bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].priority <= this.heap[index].priority) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  #sinkDown(index) {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      if (left < length && this.heap[left].priority < this.heap[smallest].priority) smallest = left;
      if (right < length && this.heap[right].priority < this.heap[smallest].priority) smallest = right;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

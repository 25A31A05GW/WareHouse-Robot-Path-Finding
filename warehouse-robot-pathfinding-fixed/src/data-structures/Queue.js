/** A simple FIFO queue implemented with an array and a moving head index. */
export default class Queue {
  constructor(items = []) {
    this.items = [...items];
    this.head = 0;
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    this.head += 1;
    if (this.head > 32 && this.head * 2 >= this.items.length) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  peek() {
    return this.isEmpty() ? undefined : this.items[this.head];
  }

  isEmpty() {
    return this.head >= this.items.length;
  }

  get size() {
    return this.items.length - this.head;
  }
}

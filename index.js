class StackOfPlates {
  constructor (capacity) {
    this.capacity = capacity
    this.stacks = [[]]
    this.currentStack = 0
  }

  push (value) {
    let stack = this.stacks[this.currentStack]

    if (stack.length === this.capacity) {
      this.currentStack++

      stack = this.stacks[this.currentStack] || []
      this.stacks[this.currentStack] = stack
    }

    stack.push(value)
  }

  pop () {
    let stack = this.stacks[this.currentStack]

    if (!stack.length && this.currentStack > 0) {
      this.currentStack--
      stack = this.stacks[this.currentStack]
    }

    return stack.pop()
  }
}

const plates = new StackOfPlates(2)
plates.push(1)
plates.push(2)
plates.push(3)
plates.push(4)
plates.push(5)
// console.log(plates)

plates.pop()
plates.pop()
plates.pop()
console.log(plates)
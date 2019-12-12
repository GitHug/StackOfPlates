class StackOfPlates {
  constructor (capacity) {
    this.capacity = capacity
    this.stacks = [new LinkedStack(capacity)]
    this.currentStack = 0
  }

  push (value) {
    let stack = this.stacks[this.currentStack]

    if (stack.isFull()) {
      this.currentStack++

      stack = this.stacks[this.currentStack] || new LinkedStack(this.capacity)
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

  popAt (index) {
    return this.leftShift(index, true)
  }

  leftShift(index, removeTop) {
    const stack = this.stacks[index]
    if (!stack) return 

    let removedItem 
    if (removeTop) removedItem = stack.pop()
    else removedItem = stack.removeBottom()

    if (stack.isEmpty()) {
      delete this.stacks[index]
    } else if (this.stacks.length > index + 1) {
      const value = this.leftShift(index + 1, false)
      stack.push(value)
    }

    return removedItem
  }

  toString () {
    return this.stacks.toString()
  }
}

class LinkedStack {
  constructor (capacity) {
    this.top = null
    this.bottom = null
    this.size = 0
    this.capacity = capacity
  }

  join(above, below) {
    if (below) below.above = above
    if (above) above.below = below
  }

  push (value) {
    if (this.isFull()) return false
    
    const newNode = new LinkedNode(value)
    
    if (this.isEmpty()) {
      this.bottom = newNode
    }

    this.size++
    this.join(newNode, this.top)
    this.top = newNode
    return true
  }

  pop () {
    if (this.isEmpty()) return

    if (this.top === this.bottom) this.removeBottom()

    const node = this.top
    this.top = this.top.below

    this.size--
    return node.value
  }

  removeBottom () {
    if (this.isEmpty()) return
    const node = this.bottom
    this.bottom = this.bottom.above
    if (this.bottom) this.bottom.below = null
    this.size--
    return node.value
  }

  isFull () {
    return this.size === this.capacity
  }

  isEmpty () {
    return !this.size
  }

  toString () {
    const nodes = []
    let node = this.top

    while (node) {
      nodes.push(node)
      node = node.below
    }

    return `[${nodes}]`
  }
}

class LinkedNode {
  constructor (value) {
    this.value = value
    this.above = null
    this.below = null
    this.length = 1
  }

  toString () {
    const { above, value, below } = this

    return `${above && above.value} <- ${value} -> ${below && below.value}`
  }
}

const plates = new StackOfPlates(2)
plates.push(1)
plates.push(2)
plates.push(3)
plates.push(4)
plates.push(5)

console.log(plates.popAt(0))
console.log(plates.popAt(0))


console.log(plates.toString())
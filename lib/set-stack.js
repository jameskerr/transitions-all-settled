export class SetStack {
  constructor() {
    this.map = new Map()
  }

  has(key, item) {
    if (this.map.has(key)) {
      return this.map.get(key).has(item)
    }
    return false
  }

  push(key, item) {
    if (this.map.has(key)) {
      this.map.get(key).add(item)
    } else {
      this.map.set(key, new Set([item]))
    }
  }

  pop(key, item) {
    const set = this.map.get(key)
    if (!set) return
    set.delete(item)
    if (set.size === 0) this.map.delete(key)
  }

  get empty() {
    return this.map.size === 0
  }
}

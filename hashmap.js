function HashMap () {
  const MAX_LOAD_FACTOR = 0.8
  let capacity = 16
  let buckets = new Array(capacity).fill(null).map(() => [])
  let _length = 0

  function hash (key) {
    let hash = 0

    for (let i = 0; i < key.length; i++) {
      const character = key.charCodeAt(i)
      hash = ((hash << 5) - hash) + character
      hash |= 0
      hash = hash % capacity
    }

    return hash
  }

  function set (key, value) {
    manageCapacity()
    
    const index = hash(key)

    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds')
    }

    const objectWithKey = _findObjectInBucket(key, index)
    if (objectWithKey !== undefined) {
      _remove(objectWithKey, index)
    }
    buckets[index].push({ key, value })

    _length++
  }

  function get (key) {
    const index = hash(key)
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds')
    }

    const object = _findObjectInBucket(key, index)

    if (object === undefined) {
      return null
    } else {
      return object.value
    }
  }

  function _remove (object, bucketIndex) {
    const listIndex = buckets[bucketIndex].indexOf(object)

    if (listIndex === -1) {
      throw new Error('Key not found in specified bucket')
    }

    buckets[bucketIndex].splice(listIndex, 1)
    _length--
  }

  function remove (key) {
    const index = hash(key)
    const object = _findObjectInBucket(key, index)
    _remove(object, index)
  }

  function has (key) {
    const index = hash(key)
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds')
    }

    return buckets[index].find(obj => obj.key === key) !== undefined
  }

  function clear () {
    _length = 0
    buckets = new Array(capacity).fill(null).map(() => [])
  }

  function manageCapacity () {
    if (isOverloaded()) {
      increaseCapacity()
    }
  }

  function isOverloaded () {
    return capacity * MAX_LOAD_FACTOR < _length 
  }

  function increaseCapacity () {
    capacity = capacity * 2
    let objects = _entries().map(obj => {
      let entries = Object.entries(obj)
      return [entries[0][1], entries[1][1]]
    });
    clear()

    for (let i = 0; i < objects.length; i++) {
      set(objects[i][0], objects[i][1])
    }
  }

  const _findObjectInBucket = (key, index) => buckets[index].filter(obj => obj.key === key).at(0)
  const _entries = () => buckets.flat()
  const entries = () => _entries().map(obj => [obj.key, obj.value])
  const values = () => _entries().map(obj => obj.value)
  const keys = () => _entries().map(obj => obj.key)
  const size = () => _length

  return {
    get,
    set,
    has,
    remove,
    size,
    clear,
    entries,
    values,
    keys
  }
}

const data = HashMap()
for (let i = 0; i < 1e6; i++) {
  const key = Math.floor(Math.random() * 1e6).toString()
  data.set(key, 'value')
}
console.log(data.size())

function HashMap () {
  // const LOAD_FACTOR = 0.8
  const capacity = 16
  let buckets = new Array(capacity).fill(null).map(() => [])
  let length = 0

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
    const index = hash(key)

    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds')
    }

    const objectWithKey = _findObjectInBucket(key, index)
    if (objectWithKey !== undefined) {
      _remove(objectWithKey, index)
    }
    buckets[index].push({ key, value })

    length++
  }

  function get (key) {
    const index = hash(key)
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds')
    }

    const object = _findObjectInBucket(key, object)

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
    length--
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
    buckets = new Array(capacity).fill(null).map(() => [])
  }

  const _findObjectInBucket = (key, index) => buckets[index].filter(obj => obj.key === key).at(0)
  const _entries = () => buckets.flat()
  const entries = () => _entries().map(obj => [obj.key, obj.value])
  const values = () => _entries().map(obj => obj.value)
  const keys = () => _entries().map(obj => obj.key)

  return {
    get,
    set,
    has,
    remove,
    length,
    clear,
    entries,
    values,
    keys,
    buckets
  }
}

const data = HashMap()
data.set('thing', 'old')
data.set('asdf', 'awesome')
data.set('d', 'awesome')
data.set('sdfawe', 'awesome')
data.set('yui', 'awesome')
data.set('dsgat', 'awesome')
data.set('jhg', 'awesome')
data.set('thing', 'new')
console.log(data.entries())

function HashMap () {
  // const LOAD_FACTOR = 0.8
  const capacity = 16
  let buckets = new Array(capacity).fill([])
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

    const keyIsTaken = buckets[index].filter(element => element.key === key).length !== 0

    if (keyIsTaken) {
      _remove(key, index)
    }

    buckets[index] = buckets[index].concat([{ key, value }])

    length++
  }

  function get (key) {
    const index = hash(key)
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds')
    }

    const item = buckets[index]
      .filter(element => element.key === key)
      .at(0)

    if (item === undefined) {
      return null
    } else {
      return item.value
    }
  }

  function _remove (key, bucketIndex) {
    const listIndex = buckets[bucketIndex].indexOf(key)
    if (listIndex === -1) {
      throw new Error('Key not found in specified bucket')
    }

    buckets[bucketIndex] = buckets[bucketIndex].splice(listIndex, 1)

    length--
  }

  function remove (key) {
    const index = hash(key)
    _remove(key, index)
  }

  function has (key) {
    const index = hash(key)
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds')
    }

    return buckets[index].find(obj => obj.key === key) !== undefined
  }

  function clear () {
    buckets = new Array(capacity).fill([])
  }

  const entries = () => buckets.flat().map(obj => [obj.key, obj.value])
  const keys = () => buckets.flat().map(obj => obj.key);
  // const values = () => buckets.flat().map(obj => obj.value);

  return {
    get,
    set,
    has,
    remove,
    length,
    clear,
    entries,
    keys,
    // values
  }
}

const data = HashMap()
data.set('thing', 'awesome')
data.set('asdf', 'awesome')
data.set('d', 'awesome')
data.set('sdfawe', 'awesome')
data.set('yui', 'awesome')
data.set('dsgat', 'awesome')
data.set('jhg', 'awesome')
data.set('vb', 'awesome')
console.log(data.keys())

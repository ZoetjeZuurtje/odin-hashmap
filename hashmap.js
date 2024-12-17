function HashMap () {
  // const LOAD_FACTOR = 0.8
  const capacity = 16
  let buckets = new Array(capacity).fill([])
  let entries = 0

  function hash (key) {
    let hashCode = 0

    hashCode = key.charCodeAt(0) % capacity

    return hashCode
  }

  function set (key, value) {
    const index = hash(key)
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bounds')
    }

    const obj = {
      key,
      value
    }
    
    const keyIsTaken = buckets[index].filter(element => element.key === key).length !== 0

    if (keyIsTaken) {
      _remove(key, index)
    }
    
    buckets[index].push(obj)
    entries++
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

    entries--
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

  const length = () => entries

  return {
    get,
    set,
    has,
    remove,
    length,
    clear
  }
}

const data = HashMap()
data.set('thing', 'awesome')
console.log(data.get('thing'))
console.log(data.length());

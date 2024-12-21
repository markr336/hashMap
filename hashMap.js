// console.log('test')
class Node {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.nextNode = null
    }
}

// bucket length = 16
class HashMap {

    constructor(size) {
        this.size = size;
        this.buckets = []
        for (let i = 0; i < this.size; i++) {
            this.buckets.push([null])
        }
    }

    // Number of buckets will double when number of entries exceed the capacity threshold
    increaseBuckets() {
        let currentCapacity = this.buckets.length
        let loadFactor = 0.75
        let capacityThreshold = currentCapacity * loadFactor
        let numberOfEntries = this.length() + 1     // +1 is to show if there's enough buckets for new entry
        // console.log(numberOfEntries)
        if (numberOfEntries > capacityThreshold) {
            console.log('Capacity exceeded')
            console.log('number of buckets before', this.buckets.length)
            const entries = this.entries()
            this.clear()
            for (let i = 0; i < this.size; i++) {
                this.buckets.push([null])
            }
            console.log('number of buckets after', this.buckets.length)
            entries.forEach((entry) => {
                let [key, value] = entry
                this.set(key, value)
            })
            this.size = this.size * 2
        }
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            // hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length
        }

        return hashCode
    } 

    // If a key already exists then the old value is overwritten
    // 1. gets index from hash
    // 2. loop to check 
    set(key, value) {
        this.increaseBuckets()

        const index = this.hash(key)
        let head = this.buckets[index]
        let tail = null

        // Loop stops when head == undefined
        while(head) {
            if (head.key == key) {
                console.log(`${head.value} has been replaced with ${value} for ${key}`)
                head.value = value
                return
            }
            tail = head             // Used to keep track of previous node
            head = head.nextNode
        }

        const newNode = new Node(key, value)

        // tail length == 1 means that it's an empty node which is [null]
        // tail length == undefined means it's not empty
        if (tail.length != 1) {
            tail.nextNode = newNode         // Appends new node
        } else {
            this.buckets[index] = newNode   // New node to bucket
        }

    }

    get(key) {
        const index = this.hash(key)
        let head = this.buckets[index]
        
        while(head) {
            if (head.key == key) {
                return head.value
            }
            head = head.nextNode
        }

        return null
    }

    has(key) {
        const index = this.hash(key)
        let head = this.buckets[index]
        
        while(head) {
            if (head.key == key) {
                return true
            }
            head = head.nextNode
        }

        return false
    }
    
    remove(key) {
        const index = this.hash(key)
        let head = this.buckets[index]
        
        while(head) {
            if (head.key == key) {
                console.log(head.nextNode)
                if (head.nextNode != null) {
                    head.key = head.nextNode.key
                    head.value = head.nextNode.value
                    head.nextNode = head.nextNode.nextNode
                } else {
                    this.buckets[index] = [null]
                }
                return true
            }
            head = head.nextNode
        }

        return false
    }

    length() {
        let numberOfKeys = 0;
        for (let bucket of this.buckets) {
            if (bucket.length != 1) {
                while(bucket) {
                    numberOfKeys++
                    bucket = bucket.nextNode
                }
            } 
        }
        return numberOfKeys
    }

    // For loop instead of for of loop is used because the bucket needs modifed
    clear() {
        // for (let bucket of this.buckets) {
        //     if (bucket.length != 1) {
        //         // bucket = null
        //         console.log(bucket)
        //         bucket = null
        //         console.log(bucket)

        //     }
        // }
        for (let index = 0; index < this.buckets.length; index++) {
            if (this.buckets[index].length != 1) {
                this.buckets[index] = [null]
            }
        }

    }

    keys() {
        let keys = []
        for (let bucket of this.buckets) {
            if (bucket.length != 1) {
                while(bucket) {
                    keys.push(bucket.key)
                    bucket = bucket.nextNode
                }
            } 
        }
        return keys
    }

    values() {
        let values = []
        for (let bucket of this.buckets) {
            if (bucket.length != 1) {
                while(bucket) {
                    values.push(bucket.value)
                    bucket = bucket.nextNode
                }
            } 
        }
        return values
    }

    entries() {
        let entries = []
        let entriesLength = this.length()
        for (let i = 0; i < entriesLength; i++) {
            entries.push([])
        }

        let index = 0;

        for (let bucket of this.buckets) {
            if (bucket.length != 1) {
                while(bucket) {
                    entries[index].push(bucket.key)
                    entries[index].push(bucket.value)
                    bucket = bucket.nextNode
                    index++
                }
            }
        }

        return entries
    }
}

const test = new HashMap(16)

// test.set('apple', 'red')
// test.set('banana', 'yellow')
// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')

// test.set('moon', 'silver')

// test.set('a', 'red')
// test.set('b', 'yellow')
// test.set('c', 'orange')
// test.set('d', 'brown')
// test.set('e', 'gray')
// test.set('f', 'green')
// test.set('g', 'purple')
// test.set('g', 'black')
// test.set('c v cream', 'white')
// test.set('sad', 'blue')
// test.set('bzcz', 'pink')
// test.set('lkl', 'golden')

// test.set('gdasd', 'black')
// test.set('c dasdv cream', 'white')
// test.set('sadasda', 'blue')
// test.set('bzczasdasd', 'pink')
// test.set('lkladasd', 'golden')


// test.set('dsf', 'red')
// test.set('sdfds', 'yellow')
// test.set('asdasd', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')

// test.set('moon', 'silver')

// test.set('afdsfds', 'red')
// test.set('befwef', 'yellow')
// test.set('cfwef', 'orange')
// test.set('dwefwe', 'brown')
// test.set('efwef', 'gray')
// test.set('ffewf', 'green')
// test.set('grbrb', 'purple')
// test.set('gewvve', 'black')
// test.set('cvawev v cream', 'white')
// test.set('sadbraebre', 'blue')
// test.set('bzczbrab', 'pink')
// test.set('lklarbrb', 'golden')

// test.set('gda', 'black')
// test.set('c dasdv ', 'white')
// test.set('sasda', 'blue')
// test.set('bzsdasd', 'pink')
// test.set('lklasd', 'golden')

// console.log('Number of entries', test.length())
// // console.log(test.entries())

// // test.set('moon', 'silver')
// console.log('Current number of buckets', test.buckets.length)
// console.log(test.buckets)

// console.log(test.get('apple'))
// console.log(test.has('lklasd'))
// console.log(test.has('ddd'))
// console.log(test.remove('apple'))
// console.log(test.remove('apple'))
// console.log(test.length())
// // console.log(test.clear())
// // console.log(test.buckets)
// console.log(test.entries())

// Growing hash table
// capacity is the total number of buckets == 16
// load factor when to grow the bucket == 0.75
// When to grow = capacity * load factor = 16 * 0.75 = 12 entries
// after the 12th entry it's time to grow bucket
// console.log('test')
class Node {
    constructor(key) {
        this.key = key
        this.nextNode = null
    }
}

// bucket length = 16
class HashSet {

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
            const entries = this.keys()
            // console.log(entries)
            this.clear()
            for (let i = 0; i < this.size; i++) {
                this.buckets.push([null])
            }
            console.log('number of buckets after', this.buckets.length)
            for (let i = 0; i < entries.length; i++) {
                this.set(entries[i])
            }
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
    set(key) {
        this.increaseBuckets()

        const index = this.hash(key)
        let head = this.buckets[index]
        let tail = null

        // Loop stops when head == undefined
        while(head) {
            tail = head             // Used to keep track of previous node
            head = head.nextNode
        }

        const newNode = new Node(key)

        // tail length == 1 means that it's an empty node which is [null]
        // tail length == undefined means it's not empty
        if (tail.length != 1) {
            tail.nextNode = newNode         // Appends new node
        } else {
            this.buckets[index] = newNode   // New node to bucket
        }

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

}

const test = new HashSet(16)

test.set('apple')
test.set('banana')
test.set('carrot')
test.set('dog')
test.set('elephant')
test.set('frog')
test.set('grape')
test.set('hat')
test.set('ice cream')
test.set('jacket')
test.set('kite')
test.set('lion')

test.set('trousers')


console.log(test.buckets)

console.log(test.has('jack'))
console.log(test.has('kite'))

console.log(test.remove('trousers'))
console.log(test.remove('trousers'))
console.log(test.length())
test.clear()

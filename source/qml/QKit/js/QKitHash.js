/*******************************************************************************
*                                                                              *
*  Hash class implementation.                                                  *
*                                                                              *
*  Copyright (C) 2013 Kirill Chuvilin.                                         *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of the QKit project.                                    *
*  https://github.com/QKit/QKit                                                *
*                                                                              *
*  $QT_BEGIN_LICENSE:LGPL$                                                     *
*                                                                              *
*  GNU Lesser General Public License Usage                                     *
*  This file may be used under the terms of the GNU Lesser General Public      *
*  License version 3.0 as published by the Free Software Foundation and        *
*  appearing in the file LICENSE.LGPL included in the packaging of this file.  *
*  Please review the following information to ensure the GNU Lesser General    *
*  Public License version 3.0 requirements will be met:                        *
*  http://www.gnu.org/licenses/old-licenses/lgpl.html.                         *
*                                                                              *
*  GNU General Public License Usage                                            *
*  Alternatively, this file may be used under the terms of the GNU General     *
*  Public License version 3.0 as published by the Free Software Foundation     *
*  and appearing in the file LICENSE.GPL included in the packaging of this     *
*  file. Please review the following information to ensure the GNU General     *
*  Public License version 3.0 requirements will be met:                        *
*  http://www.gnu.org/copyleft/gpl.html.                                       *
*                                                                              *
*  This file is distributed in the hope that it will be useful, but WITHOUT    *
*  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or       *
*  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for    *
*  more details.                                                               *
*                                                                              *
*  $QT_END_LICENSE$                                                            *
*                                                                              *
*******************************************************************************/

/*!
 * \brief Hash class.
 */
/*!
 * Hash(hashFunction, keyEqualsFunction, valueEqualsFunction)
 * \brief Construct an empty hash.
 * \param hashFunction function to calculate string hash - function(value), if undefined value.toString() will be used
 * \param keyEqualsFunction function, used to compare two keys (true if equal, false otherwise), if undefined strict equality (===) will be used
 * \param valueEqualsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * Hash(other, hashFunction, keyEqualsFunction, valueEqualsFunction)
 * \brief Construct a copy of hash.
 * \param other the hash to copy
 * \param hashFunction function to calculate string hash - function(value), if undefined other's will be used
 * \param keyEqualsFunction function, used to compare two keys (true if equal, false otherwise), if undefined  other's will be used
 * \param valueEqualsFunction function, used to compare two values (true if equal, false otherwise), if undefined  other's will be used
 */
QKit.Hash = function() {
    var hashFunction = QKit.__hashFunction; // default hash function
    var keyEqualsFunction = QKit.__equalsFunction; // default keys compare function
    var valueEqualsFunction = QKit.__equalsFunction; // default values compare function
    if (arguments[0] instanceof QKit.Hash) { // if Hash(other, hashFunction, keyEqualsFunction, valueEqualsFunction)
        var other = arguments[0]; // the other hash
        hashFunction = arguments[1] instanceof Function ? arguments[1] : other.__qkit__hashFunction; // this hash function
        keyEqualsFunction = arguments[2] instanceof Function ? arguments[2] : other.__qkit__keyEqualsFunction; // this keys compare function
        valueEqualsFunction = arguments[3] instanceof Function ? arguments[3] : other.__qkit__valueEqualsFunction; // this values compare function
        if (!(this instanceof QKit.Hash)) return new QKit.Hash(other, hashFunction, keyEqualsFunction, valueEqualsFunction); // create new object if function was called without 'new' operator
        QKit.Hash.superClass.constructor.apply(this); // super class constructor
        var thisData = {}; // this data object
        var otherData = other.__qkit__data; // other data object
        var size = 0; // this size
        for (var otherHashString in otherData) { // for all hash strings of other
            otherData[otherHashString].forEach( // for all items in the array
                function(otherHashItem) { // callback
                    var otherKey = otherHashItem.key; // key of the pair
                    var hashString = hashFunction(otherKey); // the key's hash
                    var thisHashArray = thisData[hashString]; // this data array for the hash string
                    if (thisHashArray === undefined) { // if this contains no keys with the hash
                        thisData[hashString] = [{key: otherKey, values: [otherHashItem.values[otherHashItem.values.length - 1]]}]; // add data array
                        size++; // increase the size
                    } else { // if this contains values with the hash
                        if (thisHashArray.every( // while item isn't associated with the key
                            function(thisHashItem) { // callback
                                if (!keyEqualsFunction(thisHashItem.key, otherKey)) return true; // return if this item isn't associated with the key
                                thisHashItem.key = otherKey; // update the key
                                thisHashItem.values = [otherHashItem.values[otherHashItem.values.length - 1]]; // update the values
                                return false;
                            }
                        )) {// if this doesn't contain an item associated with the key
                            thisHashArray.push({key: otherKey, values: [otherHashItem.values[otherHashItem.values.length - 1]]}); // add the value
                            size++; // increase the size
                        }
                    }
                }
            );
        }
        this.__qkit__data = thisData; // this data object
        this.__qkit__size = size; // this size
    } else { // if Hash(hashFunction, keyEqualsFunction, valueEqualsFunction)
        if (arguments[0] instanceof Function) hashFunction = arguments[0]; // this hash function
        if (arguments[1] instanceof Function) keyEqualsFunction = arguments[1]; // this keys compare function
        if (arguments[2] instanceof Function) valueEqualsFunction = arguments[2]; // this values compare function
        if (!(this instanceof QKit.Hash)) return new QKit.Hash(hashFunction, keyEqualsFunction, valueEqualsFunction); // create new object if function was called without 'new' operator
        QKit.Hash.superClass.constructor.apply(this); // super class constructor
        this.__qkit__data = {}; // internal hash object
        this.__qkit__size = 0; // amount of objects
    }
    this.__qkit__hashFunction = hashFunction; // this hash function
    this.__qkit__keyEqualsFunction = keyEqualsFunction; // this keys compare function
    this.__qkit__valueEqualsFunction = valueEqualsFunction; // this values compare function
}
QKit.Hash.inheritFrom(QKit.Object); // super class


/*!
 * \brief Remove all items from the hash.
 * \return this hash
 */
QKit.Hash.prototype.clear = function() {
    this.__qkit__data = {}; // clear data
    this.__qkit__size = 0; // reset size
    return this;
}


/*!
 * \brief Check a key in the hash.
 * \return true if the hash contains an item with the given key, false otherwise
 * \param key the key to check
 */
QKit.Hash.prototype.contains = function(key) {
    if (key === undefined) return false; // return if key is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // values array for the hash
    if (hashArray === undefined) return false; // return if no values with the hash
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    return hashArray.some(function(hashItem) { return keyEqualsFunction(hashItem.key, key) });
}


/*!
 * \brief Get items count.
 * \return the number of items associated with key
 * \param key the key items associated with (in undefined all items will be count)
 */
QKit.Hash.prototype.count = function(key) {
    if (key === undefined) return this.__qkit__size; // return all items number if key is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // values array for the hash
    if (hashArray === undefined) return 0; // return if no values with the hash
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    var count = 0; // items count
    hashArray.some( // while item associated with the key is not found
        function(hashItem) { // callback
            if (!keyEqualsFunction(hashItem.key, key)) return false; // return if item isn't associated with the key
            count = hashItem.values.length; // update count
            return true;
        }
    );
    return count;
}


/*!
 * \brief Compare this hash with the other one.
 * \return true if both hashes contain the same key-value pairs in the same order, false otherwise
 * \param other the hash to compare with
 */
QKit.Hash.prototype.equals = function(other) {
    if (!(other instanceof QKit.Hash)) return undefined; // return if type is not valid
    var thiskeyEqualsFunction = this.__qkit__keyEqualsFunction; // this keys compare function
    var thisHashFunction = this.__qkit__hashFunction; // this hashFunction
    var thisData = this.__qkit__data; // this data object
    var otherData = other.__qkit__data; // other data object
    for (var otherHashString in otherData) { // for all other hash strings
        if (!otherData[otherHashString].every( // for all keys in other data array
            function(otherHashItem) { // callback
                var otherKey = otherHashItem.key; // other key
                var thisHashArray = thisData[thisHashFunction(otherKey)]; // this data array for the hash string
                if (thisHashArray === undefined) return false; // return if this doesn't contain other key
                if (!thisHashArray.some(function(thisHashItem) { return thiskeyEqualsFunction(thisHashItem.key, otherKey) })) return false; // return if this doesn't contain other key
                return true;
            }
        )) return false; // return if this doesn't contain any other key
    }
    var valueEqualsFunction = this.__qkit__valueEqualsFunction; // values compare function
    var otherkeyEqualsFunction = this.__qkit__keyEqualsFunction; // other keys compare function
    var otherHashFunction = other.__qkit__hashFunction; // other hashFunction
    for (var thisHashString in thisData) { // for all this hash strings
        if (!thisData[thisHashString].every( // for all keys in this data array
            function(thisHashItem) { // callback
                var thisKey = thisHashItem.key; // this key
                var thisValues; // this values assiciated with the key
                var otherValues; // other values assiciated with the key
                var otherHashArray = otherData[otherHashFunction(thisKey)]; // other data array for the hash string
                if (otherHashArray === undefined) return false; // return if this doesn't contain other key
                if (otherHashArray.every( // while other item associated with the key is not found
                    function(otherHashItem) { // callback
                        if (!otherkeyEqualsFunction(otherHashItem.key, thisKey)) return true; // return if item isn't associated with the key
                        thisValues = thisHashItem.values.filter(function() { return true }); // this values assiciated with the key
                        otherValues = otherHashItem.values.filter(function() { return true }); // other values assiciated with the key
                        return false;
                    }
                )) return false; // return if other doesn't contain this key
                var valuesIndex = thisValues.length; // iterator
                if (otherValues.length !== valuesIndex) return false; // return counts of values associated with the key are different
                while (valuesIndex--) if (!valueEqualsFunction(thisValues[valuesIndex], otherValues[valuesIndex])) return false; // return if values are different
                return true;
            }
        )) return false;
    }
    return true;
}


/*!
 * \brief Executes a provided function once per each hash item.
 * \return this hash
 * \param callback function to execute for each element - function(key, value, hash)
 * \param thisArg object to use as this when executing callback
 */
QKit.Hash.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    var items = []; // key-value pairs array
    var data = this.__qkit__data; // this data object
    for (var hashString in data) { // for all hash strings
        data[hashString].forEach( // for each item for the hash string
            function(hashItem) { // callback
                var key = hashItem.key; // key
                hashItem.values.forEach(function(value) { items.push({key: key, value: value}) }); // add all values
            }
        );
    }
    items.forEach(function(item) { callback.apply(thisArg, [item.key, item.value, this]) }, this);
    return this;
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the key, that item's value is replaced with value.
 *   If there are multiple items with the key, the most recently inserted item's value is replaced with value.
 * \return this hash
 * \param key the key
 * \param value the value to insert
*/
QKit.Hash.prototype.insert = function(key, value) {
    if (key === undefined) return false; // return if key is undefined
    if (value === undefined) return false; // return if value is undefined
    var hashString = this.__qkit__hashFunction(key); // key's hash string
    var hashArray = this.__qkit__data[hashString]; // values array for the hash
    if (hashArray === undefined) { // if this doesn't contain keys with the hash
        this.__qkit__data[hashString] = [{key: key, values: [value]}]; // create values array for the hash
        this.__qkit__size++; // increase size
    } else { // if this contains values with the hash
        var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
        if (hashArray.every( // while item isn't associated with the key
            function(hashItem) { // callback
                if (!keyEqualsFunction(hashItem.key, key)) return true; // return if item isn't associated with the key
                hashItem.values[hashItem.values.length - 1] = value; // replace the value
                return false;
            }
        )){ // if this doesn't contain any item associated with the key
            hashArray.push({key: key, values: [value]}); // add the value
            this.__qkit__size++; // increase size
        }
    }
    return this;
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the same key in this hash, this function will simply create a new one.
 * \return this hash
 * \param key the key
 * \param value the value to insert
 */
QKit.Hash.prototype.insertMulti = function(key, value) {
    if (key === undefined) return false; // return if key is undefined
    if (value === undefined) return false; // return if value is undefined
    var hashString = this.__qkit__hashFunction(key); // key's hash string
    var hashArray = this.__qkit__data[hashString]; // values array for the hash
    if (hashArray === undefined) { // if this doesn't contain keys with the hash
        this.__qkit__data[hashString] = [{key: key, values: [value]}]; // create values array for the hash
    } else { // if this contains values with the hash
        var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
        if (hashArray.every( // while item isn't associated with the key
            function(hashItem) { // callback
                if (!keyEqualsFunction(hashItem.key, key)) return true; // return if item isn't associated with the key
                hashItem.values.push(value); // add the value
                return false;
            }
        )){ // if this doesn't contain any item associated with the key
            hashArray.push({key: key, values: [value]}); // add the value
        }
    }
    this.__qkit__size++; // increase size
    return this;
}


/*!
 * \brief Test this hash for emptiness.
 * \return true if this hash contains no items, false otherwise
 */
QKit.Hash.prototype.isEmpty = function() { return this.__qkit__size === 0 }


/*!
 * \brief Get a key associated with the given value.
 * \return the first key with the given value
 * \param value the value to search
 * \param defaultKey key to return if this hash doesn't contain any key associated with the given value
 */
QKit.Hash.prototype.key = function(value, defaultKey) {
    if (value === undefined) return undefined; // return if value is undefined
    var valueEqualsFunction = this.__qkit__valueEqualsFunction; // values compare function
    var data = this.__qkit__data; // data object
    for (var hashString in data) { // for all hash strings
        var key; // key to return
        if (data[hashString].some( // while value isn't found
            function(hashItem) { // callback
                if (!hashItem.values.some(function(thisValue) { return valueEqualsFunction(thisValue, value) })) return false; // return if values associated with the key don't contain the value
                key = hashItem.key; // save the key
                return true;
            }
        )) return key; // return key if value was found
    }
    return defaultKey;
}


/*!
 * \brief Get keys associated with the given value as an array.
 *   Keys that occur multiple times also occur multiple times in the array.
 * \return an instance of Array with keys
 * \param value the value to search, in undefined all keys will be added
 */
QKit.Hash.prototype.keys = function(value) {
    var keys = []; // array with keys
    var valueEqualsFunction = this.__qkit__valueEqualsFunction; // values compare function
    var data = this.__qkit__data; // data object
    for (var hashString in data) { // for all hash strings
        data[hashString].forEach( // for each key for the hash string
            function(hashItem) { // callback
                var key = hashItem.key; // key
                var values = hashItem.values; // values associated with the key
                if (value === undefined) { // if value is undefined
                    values.forEach(function() { keys.push(key) }); // push key for each value
                } else { // if value is defined
                    values.forEach(function(valuesItem) { if (valueEqualsFunction(valuesItem, value)) keys.push(key) }); // push key for each this value equas the value
                }
            }
        );
    }
    return keys;
}


/*!
 * \brief Remove all the items that have the given key.
 * \return the number of items removed
 * \param key the key of items to remove
 */
QKit.Hash.prototype.remove = function(key) {
    if (key === undefined) return undefined; // return if key is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // data array for the hash string
    if (hashArray === undefined) return 0; // return if this doesn't contain the key
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    var removedCount = 0; // count of items to remove
    hashArray.some( // while key isn't found
        function(hashItem, hashIndex) { // callback
            if (!keyEqualsFunction(hashItem.key, key)) return false; // return if item isn't associated with the key
            removedCount = hashItem.values.length; // count of items to remove
            delete hashArray[hashIndex]; // delete items associated with the key
            return true;
        }
    );
    this.__qkit__size -= removedCount; // decrease this size
    return removedCount;
}


/*!
 * \brief Get this hash size.
 * \return the number of (key, value) pairs
 */
QKit.Hash.prototype.size = function() { return this.__qkit__size }


/*!
 * \brief Swap other hash with this hash.
 * \return this hash
 * \param other the hash to swap with
 */
QKit.Hash.prototype.swap = function(other) {
    if (!(other instanceof QKit.Hash)) return undefined; // return if type is not valid
    var temp = this.__qkit__data; // backup this data
    this.__qkit__data = other.__qkit__data; // update this data
    other.__qkit__data = temp; // update other data
    temp = this.__qkit__size; // backup this size
    this.__qkit__size = other.__qkit__size; // update this size
    other.__qkit__size = temp; // update other size
    temp = this.__qkit__hashFunction; // backup this hash function
    this.__qkit__hashFunction = other.__qkit__hashFunction; // update this hash function
    other.__qkit__hashFunction = temp; // update other hash function
    temp = this.__qkit__keyEqualsFunction; // backup this keys compare function
    this.__qkit__keyEqualsFunction = other.__qkit__keyEqualsFunction; // update this keys compare function
    other.__qkit__keyEqualsFunction = temp; // update other keys compare function
    temp = this.__qkit__valueEqualsFunction; // backup this values compare function
    this.__qkit__valueEqualsFunction = other.__qkit__valueEqualsFunction; // update this values compare function
    other.__qkit__valueEqualsFunction = temp; // update other values compare function
    return this;
}


/*!
 * \brief Remove the item with the given key.
 *   If there are multiple items for key in this hash, only the most recently inserted one is removed.
 * \return  the value associated with removed item or undefined if the item does not exist in this hash
 * \param key the key of item to remove
 */
QKit.Hash.prototype.take = function(key) {
    if (key === undefined) return undefined; // return if key is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // data array for the hash string
    if (hashArray === undefined) return undefined; // return if this doesn't contain the key
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    var removedValue = undefined; // removed value
    if (hashArray.some( // while key isn't found
        function(hashItem, hashIndex) { // callback
            if (!keyEqualsFunction(hashItem.key, key)) return false; // return if item isn't associated with the key
            removedValue = hashItem.values.pop(); // take the last item
            if (!hashItem.values.length) delete hashArray[hashIndex]; // delete items associated with the key if no values left
            return true;
        }
    )) this.__qkit__size--; // decrease this size if an item was removed
    return removedValue;
}


/*!
 * \brief Generate an array with the items contained in this hash.
 *    For each key from the most recently inserted to the least recently inserted one.
 * \return generated Array instance
 */
QKit.Hash.prototype.toArray = function() {
    var array = []; // key-value pairs array
    var data = this.__qkit__data; // this data object
    for (var hashString in data) { // for all hash strings
        data[hashString].forEach( // for all keys for the hash string
            function(hashItem) { // callback
                var values = hashItem.values; // values associated with the key
                var valuesIndex = values.length; // iterator
                while (valuesIndex--) { // for all values associated with the key
                    var valuesItem = values[valuesIndex]; // values item
                    if (valuesItem !== undefined) array.push(valuesItem); // add to values if defined
                }
            }
        );
    }
    return array;
}


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
QKit.Hash.prototype.toString = function() {
    var stringParts = ['{']; // parts of string as array
    var data = this.__qkit__data; // this data object
    var firstKey = true; // no keys where added
    for (var hashString in data) { // for all hash strings
        data[hashString].forEach( // for all keys with the hash string
            function(hashItem) { // callback
                if (firstKey) {
                    firstKey = false;
                } else {
                    stringParts.push(',');
                }
                stringParts.push(hashItem.key);
                stringParts.push(':[');
                stringParts.push(hashItem.values.filter(function() { return true }));
                stringParts.push(']');
            }
        )
    }
    stringParts.push('}');
    return stringParts.join('');
}


/*!
 * \brief Get keys associated with the given value as an array.
 *   Keys that occur multiple times in this hash occur only once in the returned array.
 * \return an instance of Array with keys
 * \param value the value to search, in undefined all keys will be added
 */
QKit.Hash.prototype.uniqueKeys = function(value) {
    var keys = []; // array with keys
    var valueEqualsFunction = this.__qkit__valueEqualsFunction; // values compare function
    var data = this.__qkit__data; // data object
    for (var hashString in data) { // for all hash strings
        data[hashString].forEach( // for each key for the hash string
            function(hashItem) { // callback
                var key = hashItem.key; // key
                var values = hashItem.values; // values associated with the key
                if (value === undefined) { // if value is undefined
                    keys.push(key); // add the key
                } else { // if value is defined
                    if (values.some(function(valuesItem) { return valueEqualsFunction(valuesItem, value) })) keys.push(key);; // add the key if this contains value associated with the key
                }
            }
        );
    }
    return keys;
}


/*!
 * \brief Insert all the items in the other hash into this hash.
 *   If a key is common to both hashes, the resulting hash will contain the key multiple times.
 * \return this hash
 * \param other the hash to unite with
 */
QKit.Hash.prototype.unite = function(other) {
    if (!(other instanceof QKit.Hash)) return undefined; // return if type is not valid
    var thiskeyEqualsFunction = this.__qkit__keyEqualsFunction; // this keys compare function
    var thisHashFunction = this.__qkit__hashFunction; // this hashFunction
    var thisData = this.__qkit__data; // this data object
    var otherData = other.__qkit__data; // other data object
    for (var otherHashString in otherData) { // for all other hash strings
        otherData[otherHashString].forEach( // for each other item
            function(otherHashItem) { // callback
                var otherKey = otherHashItem.key; // other key
                var thisHashString = thisHashFunction(otherKey); // this hash string fot the key
                var thisHashArray = thisData[thisHashString]; // this data array for the hash string
                if (thisHashArray === undefined) { // if this doesn't contain hash for other key
                    thisHashArray = []; // create array
                    thisData[thisHashString] = thisHashArray; // add the array to this data object
                }
                var thisValues; // this values associated with the key
                if (!thisHashArray.some( // while this item associated with the key isn't found
                    function(thisHashItem) { // callback
                        if (!thiskeyEqualsFunction(thisHashItem.key, otherKey)) return false; // if this item isn't associated with the key
                        thisValues = thisHashItem.values; // this values associated with the key
                        return true;
                    }
                )) { // if this doesn't contain the key
                    thisValues = [] // create array
                    thisHashArray.push({key: otherKey, values: thisValues}); // add the array to this hash array
                }
                otherHashItem.values.forEach(function(value) { thisValues.push(value) }); // add all other values
            }
        );
    }
    this.__qkit__size += other.__qkit__size; // increase the size
    return this;
}


/*!
 * \brief Get value by key.
 *   If there are multiple items for key in this hash, the value of the most recently inserted one is returned.
 * \return the value associated with the given key or defaultValue
 * \param key the key associated with the value
 * \param defaultValue value to return if this hash doesn't contain any values associated with the given key
 */
QKit.Hash.prototype.value = function(key, defaultValue) {
    if (key === undefined) return undefined; // return if key is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // data array for the hash string
    if (hashArray === undefined) return undefined; // return if this doesn't contain the key
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    var value = undefined; // value
    hashArray.some( // while key isn't found
        function(hashItem, hashIndex) { // callback
            if (!keyEqualsFunction(hashItem.key, key)) return false; // return if item isn't associated with the key
            var values = hashItem.values; // values associated with the key
            value = values[values.length - 1]; // update value
            return true;
        }
    );
    return value;
}


/*!
 * \brief Generate array with values associated with the given key from the most recently inserted to the least recently inserted one.
 * \return generated Array instance
 * \param key the key associated with the values, if undefined values for all the keys will be added
 */
QKit.Hash.prototype.values = function(key) {
    if (key === undefined) return this.toArray(); // return array with all values if key is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // data array for the hash string
    if (hashArray === undefined) return undefined; // return if this doesn't contain the key
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    var keyValues = []; // values
    hashArray.some( // while key isn't found
        function(hashItem) { // callback
            if (!keyEqualsFunction(hashItem.key, key)) return false; // return if item isn't associated with the key
            var values = hashItem.values; // values associated with the key
            var valuesIndex = values.length; // iterator
            while (valuesIndex--) { // for all values associated with the key
                var valuesItem = values[valuesIndex]; // values item
                if (valuesItem !== undefined) keyValues.push(valuesItem); // add to values if defined
            }
            return true;
        }
    );
    return keyValues;
}

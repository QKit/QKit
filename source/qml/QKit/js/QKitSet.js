/*******************************************************************************
*                                                                              *
*  Set class implementation.                                                   *
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
 * \brief Set class.
 */
/*!
 * Set(hashFunction)
 * \brief Construct an empty set.
 * \param hashFunction function to calculate string hash - function(value) (if undefined value.toString() will be used)
 */
/*!
 * Set(array, hashFunction, compareFunction)
 * \brief Construct a set with values from an array.
 * \param array Array instance
 * \param hashFunction function to calculate string hash - function(value) (if undefined value.toString() will be used)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * Set(set, hashFunction, compareFunction)
 * \brief Construct a copy of set.
 * \param set the set to copy
 * \param hashFunction function to calculate string hash - function(value) (if undefined value.id() for Objects and value.toString() for other will be used)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.Set = function() {
    var thisData; // this data object
    var size; // this size
    var hashFunction = function(value) { return value instanceof Object ? value.id() : value.toString(); }; // default hash function
    var compareFunction = function(value1, value2) { return value1 === value2; }; // default compare function
    if (arguments[0] instanceof QKit.Set) { // if Set(set, hashFunction, compareFunction)
        var set = arguments[0]; // the other set
        if (arguments[1] instanceof Function) hashFunction = arguments[1]; // this hash function
        if (arguments[2] instanceof Function) compareFunction = arguments[2]; // this compare function
        if (!(this instanceof QKit.Set)) return new QKit.Set(set, hashFunction, compareFunction); // create new object if function was called without 'new' operator
        QKit.Set.superClass.apply(this); // super class constructor
        thisData = {}; // this data object
        var setData = set.__qkit__data; // set's data object
        size = 0; // this size
        for (var setHash in setData) { // for all hashes of set
            var setHashArray = setData[setHash];  // set's values array for the hash
            var setIndex = setHashArray.length; // iterator
            while (setIndex--) { // for all values in the array
                var value = setHashArray[setIndex]; // value
                var hash = hashFunction(value); // the value's hash
                var hashArray = thisData[hash]; // values array for the hash
                if (hashArray === undefined) { // if this contains no values with the hash
                    thisData[hash] = [value]; // add values array
                    size++; // increase the size
                } else { // if this contains values with the hash
                    var index = hashArray.length; // iterator
                    while (index--) if (compareFunction(hashArray[index], value)) break; // stop if the value was added
                    if (index < 0) { // if the value was not added
                        hashArray.push(value); // add the value
                        size++; // increase the size
                    }
                }
            }
        }
        this.__qkit__data = thisData; // this data object
        this.__qkit__size = size; // this size
    } else if (arguments[0] instanceof Array) { // if Set(array, hashFunction, compareFunction)
        var array = arguments[0]; // the array
        if (arguments[1] instanceof Function) hashFunction = arguments[1]; // this hash function
        if (arguments[2] instanceof Function) compareFunction = arguments[2]; // this compare function
        if (!(this instanceof QKit.Set)) return new QKit.Set(array, hashFunction, compareFunction); // create new object if function was called without 'new' operator
        QKit.Set.superClass.apply(this); // super class constructor
        thisData = {}; // this data object
        size = 0; // this size
        array.forEach( // for each item in the array
            function(value) { // callback
                var hash = hashFunction(value); // the value's hash
                var hashArray = thisData[hash]; // values array for the hash
                if (hashArray === undefined) { // if this contains no values with the hash
                    thisData[hash] = [value]; // add values array
                } else { // if this contains values with the hash
                    var index = hashArray.length; // iterator
                    while (index--) if (compareFunction(hashArray[index], value)) return; // return if the value was added
                    hashArray.push(value); // add the value
                }
                size++; // increase the size
            }
        );
        this.__qkit__data = thisData; // this data object
        this.__qkit__size = size; // this size
    } else { // if Set(hashFunction, compareFunction)
        if (arguments[0] instanceof Function) hashFunction = arguments[0]; // this hash function
        if (arguments[1] instanceof Function) compareFunction = arguments[1]; // this compare function
        if (!(this instanceof QKit.Set)) return new QKit.Set(hashFunction, compareFunction); // create new object if function was called without 'new' operator
        QKit.Set.superClass.apply(this); // super class constructor
        this.__qkit__data = {}; // internal hash object
        this.__qkit__size = 0; // amount of objects
    }
    this.__qkit__hashFunction = hashFunction; // this hash function
    this.__qkit__compareFunction = compareFunction; // this compare function
}
QKit.Set.inheritFrom(QKit.Object); // super class


/*!
 * \brief Remove all items from the set.
 * \return this set
 */
QKit.Set.prototype.clear = function() {
    this.__qkit__data = {}; // clear data
    this.__qkit__size = 0; // reset size
    return this;
}


/*!
 * \brief Check a value in the set.
 * \return true if the set contains value, false otherwise
 * \param value the value to test (if is a set all its values will be checked)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined this compareFunction will be used
 */
QKit.Set.prototype.contains = function(value, compareFunction) {
    if (value === undefined) return false; // return if value is undefined
    if (compareFunction === undefined) compareFunction = this.__qkit__compareFunction; // use this compare function if undefined
    var thisData = this.__qkit__data; // this data object
    var hashFunction = this.__qkit__hashFunction; // this hash function
    var hashArray; // values array for a hash
    var index; // iterator
    if (value instanceof QKit.Set) { // if value is a set
        var valueData = value.__qkit__data; // value's data object
        for (var hash in valueData) { // for all hashes of value
            var valueHashArray = valueData[hash]; // value's values array for the hash
            var valueIndex = valueHashArray.length; // value's iterator
            while (valueIndex--) { // for all values in value's hash array
                var valueValue = valueHashArray[valueIndex]; // value to test
                hashArray = thisData[hashFunction(valueValue)]; // values array for the hash
                if (hashArray === undefined) return false; // return if no values with the hash
                index = hashArray.length; // iterator
                while (index--) if (compareFunction(hashArray[index], valueValue)) break; // stop if value was found
                if (index < 0) return false; // return if value wasn't found
            }
        }
        return true;
    } else { // if value is not a set
        hashArray = thisData[hashFunction(value)]; // values array for the hash
        if (hashArray === undefined) return false; // return if no values with the hash
        index = hashArray.length; // iterator
        if (compareFunction === undefined) { // if compare function is undefined
            while (index--) if (hashArray[index] === value) return true; // return if value was found
        } else { // if compare function is defined
            while (index--) if (compareFunction(hashArray[index], value)) return true; // return if value was found
        }
        return false;
    }
}


/*!
 * \brief Same as size().
 * \return same as size()
 */
QKit.Set.prototype.count = function() { return this.__qkit__size; }


/*!
 * \brief Compare this set with the other one.
 * \return true if this union with the other set equals this
 * \param set the set to compare with
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined this compareFunction will be used
 */
QKit.Set.prototype.equals = function(set, compareFunction) {
    if (!(set instanceof QKit.Set)) return undefined; // return if type is not valid
    if (compareFunction === undefined) compareFunction = this.__qkit__compareFunction; // use this compare function if undefined
    return this.contains(set, compareFunction) && set.contains(this, compareFunction);
}


/*!
 * \brief Executes a provided function once per set item.
 * \return this set
 * \param callback function to execute for each element - function(value, set)
 * \param thisArg object to use as this when executing callback
 */
QKit.Set.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    var values = this.toArray(); // array of values
    var index = values.length; // iterator
    while (index--) callback.apply(thisArg, [values[index], this]); // apply callback function to each value
    return this;
}


/*!
 * \brief Insert value into the set.
 * \return true if an item was actually inserted, false otherwise
 * \param value the value to insert
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined this compareFunction will be used
 */
QKit.Set.prototype.insert = function(value, compareFunction) {
    if (value === undefined) return false; // return if value is undefined
    if (compareFunction === undefined) compareFunction = this.__qkit__compareFunction; // use this compare function if undefined
    var hash = this.__qkit__hashFunction(value); // value's hash
    var hashArray = this.__qkit__data[hash]; // values array for the hash
    if (hashArray === undefined) { // if this doesn't contain values with the hash
        this.__qkit__data[hash] = [value]; // create values array for the hash
    } else { // if this contains values with the hash
        var index = hashArray.length; // iterator
        while (index--) if (compareFunction(hashArray[index], value)) return false; // return if this contains the value
        hashArray.push(value); // insert the value to this
    }
    this.__qkit__size++; // increase size
    return true; // the value was actually removed
}


/*!
 * \brief Remove all items from this set that are not contained in the other set.
 * \return this set
 * \param set the set to intersect with
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined this compareFunction will be used
 */
QKit.Set.prototype.intersect = function(set, compareFunction) {
    if (!(set instanceof QKit.Set)) return undefined; // return if set is not valid
    if (compareFunction === undefined) compareFunction = this.__qkit__compareFunction; // use this compare function if undefined
    var thisData = this.__qkit__data; // this data object
    var setData = set.__qkit__data; // set's data object
    var setHashFunction = set.__qkit__hashFunction; // set's hash function
    for (var hash in thisData) { // for all this hashes
        var hashArray = thisData[hash]; // values array for the hash
        var removedCount = 0; // count of removed values for the hash
        var hashArrayLength = hashArray.length; // length of the array
        for (var index = 0; index < hashArrayLength; index++) { // for all values
            var value = hashArray[index]; // this value
            var setHashArray = setData[setHashFunction(value)]; // set's values array for the value's hash
            if (setHashArray !== undefined) { // if set doesn;t contain values for the value's hash
                var setIndex = setHashArray.length; // set's iterator
                while (setIndex--) if (compareFunction(value, setHashArray[setIndex])) break; // stop if set contains the value
                if (setIndex >= 0) { // if set contains the value
                    if (removedCount > 0) hashArray[index - removedCount] = value; // update one of the previous items
                    continue; // go to the next value
                }
            }
            removedCount++; // increase the count of removed items
        }
        if (removedCount === hashArrayLength) { // if all items were removed
            delete thisData[hash]; // delete hash array
        } else { // if not items were removed
            hashArray.length -= removedCount; // decrese the array's length
        }
        this.__qkit__size -= removedCount; // decrease the size
    }
    return this;
}


/*!
 * \brief Test the set for emptiness.
 * \return true if the set contains no items, false otherwise
 */
QKit.Set.prototype.isEmpty = function() { return this.__qkit__size === 0; }


/*!
 * \brief Remove any occurrence of item value from the set.
 * \return true if an item was actually removed, false otherwise
 * \param value the value to remove
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined this compareFunction will be used
 */
QKit.Set.prototype.remove = function(value, compareFunction) {
    if (value === undefined) return false; // return if value is undefined
    if (compareFunction === undefined) compareFunction = this.__qkit__compareFunction; // use this compare function if undefined
    var thisData = this.__qkit__data; // this data object
    var hash = this.__qkit__hashFunction(value); // value's hash
    var hashArray = thisData[hash]; // values array for the hash
    if (hashArray === undefined) return false; // return if this doesn't contain values for the hash
    var hashArrayLength = hashArray.length; // count of values for the hash
    var removedCount = 0; // count of removed values for the hash
    for (var index = 0; index < hashArrayLength; index++) { // for all indexes
        var hashArrayValue = hashArray[index]; // hash array value
        if (compareFunction(hashArrayValue, value)) { // if value is found
            removedCount++; // increase the count of removed items
        } else { // if value to left
            if (removedCount > 0) hashArray[index - removedCount] = hashArrayValue; // update one of the previous items
        }
    }
    if (removedCount === hashArrayLength) { // if all items were removed
        delete thisData[hash]; // delete hash array
    } else { // if not items were removed
        hashArray.length -= removedCount; // decrese the array's length
    }
    this.__qkit__size -= removedCount; // decrease the size
    return removedCount > 0; // the value was actually removed
}


/*!
 * \brief Get the set size.
 * \return the number of items in the set
 */
QKit.Set.prototype.size = function() { return this.__qkit__size; }


/*!
 * \brief Remove all items from this set that are contained in the other set.
 * \return this set
 * \param set the set to subtract
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined this compareFunction will be used
 */
QKit.Set.prototype.subtract = function(set, compareFunction) {
    if (!(set instanceof QKit.Set)) return undefined; // return if set is not valid
    if (compareFunction === undefined) compareFunction = this.__qkit__compareFunction; // use this compare function if undefined
    var thisData = this.__qkit__data; // this data object
    var setData = set.__qkit__data; // set's data object
    var setHashFunction = set.__qkit__hashFunction; // set's hash function
    for (var hash in thisData) { // for all this hashes
        var hashArray = thisData[hash]; // values array for the hash
        var removedCount = 0; // count of removed values for the hash
        var length = hashArray.length; // length of the array
        for (var index = 0; index < length; index++) { // for all values
            var value = hashArray[index]; // this value
            var setHashArray = setData[setHashFunction(value)]; // set's values array for the value's hash
            if (setHashArray !== undefined) { // if set contains values for the value's hash
                var setIndex = setHashArray.length; // set's iterator
                while (setIndex--) if (compareFunction(value, setHashArray[setIndex])) break; // stop if set contains the value
                if (setIndex >= 0) { // if set contains the value
                    removedCount++; // increase the count of removed items
                    continue; // go to the next value
                }
            }
            if (removedCount > 0) hashArray[index - removedCount] = value; // update one of the previous items
        }
        hashArray.length -= removedCount; // decrese the array's length
        if (hashArray.length === 0) delete thisData[hash]; // delete hash array if all items were removed
        this.__qkit__size -= removedCount; // decrease the size
    }
    return this;
}


/*!
 * \brief Swap other set with this set.
 * \return this set
 * \param set the set to swap with
 */
QKit.Set.prototype.swap = function(set) {
    if (!(set instanceof QKit.Set)) return undefined; // return if type is not valid
    var temp = this.__qkit__data; // backup this data
    this.__qkit__data = set.__qkit__data; // update this data
    set.__qkit__data = temp; // update set's data
    temp = this.__qkit__size; // backup this size
    this.__qkit__size = set.__qkit__size; // update this size
    set.__qkit__size = temp; // update set's size
    temp = this.__qkit__hashFunction; // backup this hash function
    this.__qkit__hashFunction = set.__qkit__hashFunction; // update this hash function
    set.__qkit__hashFunction = temp; // update set's hash function
    temp = this.__qkit__compareFunction; // backup this compare function
    this.__qkit__compareFunction = set.__qkit__compareFunction; // update this compare function
    set.__qkit__compareFunction = temp; // update set's compare function
    return this;
}


/*!
 * \brief Generate an array with the items contained in this set.
 * \return generated Array instance
 */
QKit.Set.prototype.toArray = function() {
    var array = []; // result array
    var thisData = this.__qkit__data; // this data object
    for (var hash in thisData) { // for all hashes
        var hashArray = thisData[hash]; // values array for the hash
        var index = hashArray.length; // iterator
        while (index--) array.push(hashArray[index]); // add values to array
    }
    return array;
}


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
QKit.Set.prototype.toString = function() { return '[' + this.toArray().toString() + ']'; }


/*!
 * \brief Insert each item in the other set that isn't already in this set.
 * \return this set
 * \param set the set to unite with
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined this compareFunction will be used
 */
QKit.Set.prototype.unite = function(set, compareFunction) {
    if (!(set instanceof QKit.Set)) return undefined; // return if set is not valid
    if (compareFunction === undefined) compareFunction = this.__qkit__compareFunction; // use this compare function if undefined
    var thisData = this.__qkit__data; // this data object
    var setData = set.__qkit__data; // set's data object
    var hashFunction = this.__qkit__hashFunction; // this hash function
    var addedCount = 0; // count of added items
    for (var setHash in setData) { // for all set's hashes
        var setHashArray = setData[setHash]; // set's values array for the hash
        var setIndex = setHashArray.length; // set's iterator
        while (setIndex--) { // for all set's values
            var value = setHashArray[setIndex]; // set's value
            var hash = hashFunction(value); // hash for the value
            var hashArray = thisData[hash]; // this values array for the value's hash
            if (hashArray === undefined) { // if this doesn't contain values for the hash
                thisData[hash] = [value]; // create
                addedCount++; // increase added items count
            } else { // if this contains values for the hash
                var index = hashArray.length; // iterator
                while (index--) if (compareFunction(hashArray[index], value)) break; // stop if value is found
                if (index < 0) { // if this doesn't contain the value
                    hashArray.push(value); // add value
                    addedCount++; // increase added items count
                }
            }
        }
    }
    this.__qkit__size += addedCount; // increase the size
    return this;
}


/*!
 * \brief The same as toArray().
 * \return the same as toArray()
 */
QKit.Set.prototype.values = function() { return this.toArray(); }

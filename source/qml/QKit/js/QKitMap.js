/*******************************************************************************
*                                                                              *
*  Map class implementation.                                                   *
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
 * \brief Map class.
 */
/*!
 * Map()
 * \brief Construct an empty map.
 */
/*!
 * Map(map)
 * \brief Construct a copy of map.
 * \param map the map to copy
 */
QKit.Map = function() {
    if (arguments[0] instanceof QKit.Map) { // if Map(map)
        var map = arguments[0]; // the other map
        if (!(this instanceof QKit.Map)) return new QKit.Map(map); // create new object if function was called without 'new' operator
        QKit.Map.superClass.apply(this); // super class constructor
        var mapData = map.__qkit__data; // map's data object
        var thisData = {}; // this data object
        for (var key in mapData) { // for all keys in map
            thisData[key] = mapData[key].slice(0); // copy values array
        }
        this.__qkit__data = thisData; // this data object
        this.__qkit__size = map.__qkit__size; // amount of objects
    } else { // if Map()
        if (!(this instanceof QKit.Map)) return new QKit.Map(); // create new object if function was called without 'new' operator
        QKit.Map.superClass.apply(this); // super class constructor
        this.__qkit__data = {}; // internal hash object
        this.__qkit__size = 0; // number of (key, value) pairs
    }
}
QKit.Map.inheritFrom(QKit.Object); // super class


/*!
 * \brief Remove all items from the map.
 * \return this map
 */
QKit.Map.prototype.clear = function() {
    this.__qkit__data = {}; // clear data
    this.__qkit__size = 0; // reset size
    return this;
}


/*!
 * \brief Check a key in the map.
 * \return true if the map contains an item with the given key, false otherwise
 * \param key the key to check
 */
QKit.Map.prototype.contains = function(key) {
    if (key === undefined) return false; // return if key is undefined
    return this.__qkit__data[key] !== undefined;
}


/*!
 * \brief Get items count.
 * \return the number of items associated with key
 * \param key the key items associated with (in undefined all items will be count)
 */
QKit.Map.prototype.count = function(key) {
    if (key === undefined) return this.__qkit__size; // return all items number if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (keyValues === undefined) return 0; // return if there are no items associated with the key
    return keyValues.length; // return items array length
}


/*!
 * \brief Compare this map with the other one.
 * \return true if both lists contain the same key-value pairs in the same order, false otherwise
 * \param map the map to compare with
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.Map.prototype.equals = function(map, compareFunction) {
    if (!(map instanceof QKit.Map)) return undefined; // return if type is not valid
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var thisData = this.__qkit__data; // this data object
    var mapData = map.__qkit__data; // map's data object
    var key; // key iterator
    for (key in mapData) if (thisData[key] === undefined) return false; // return if this doesn't contain at least one of map's key
    for (key in thisData) { // for all this keys
        var keyValues = thisData[key]; // array of this values associated with the key
        var mapKeyValues = mapData[key]; // array of map's values associated with the key
        if (mapKeyValues === undefined) return false; // return if map doesn't contain items associated with the key
        var index = keyValues.length; // iterator
        if (mapKeyValues.length !== index) return false; // return if counts of aitems associated with the key are different
        while (index--) if (!compareFunction(keyValues[index], mapKeyValues[index])) return false; // return if items are different
    }
    return true;
}


/*!
 * \brief Executes a provided function once per vector element.
 * \return this map
 * \param callback function to execute for each element - function(key, value, map)
 * \param thisArg object to use as this when executing callback
 */
QKit.Map.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    var keys = []; // array of keys
    var values = []; // array of values arrays
    var key; // key iterator
    var thisData = this.__qkit__data; // this data object
    for (key in thisData) { // for all keys
        keys.push(key); // add the key
        values.push(thisData[key].slice(0)); // add a copy of the values array
    }
    var nKeys = keys.length; // number of keys
    for (var iKey =0; iKey < nKeys; iKey++) { // for all keys
        key = keys[iKey]; // key
        var keyValues = values[iKey]; // array of values associated with the key
        var nValues = keyValues.length; // number of values associater with the key
        for (var iValue = 0; iValue < nValues; iValue++) { // for all values
            callback.apply(thisArg, [key, keyValues[iValue], this]); // apply callback function
        }
    }
    return this;
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the key, that item's value is replaced with value.
 *   If there are multiple items with the key, the most recently inserted item's value is replaced with value.
 * \return this map
 * \param key the key
 * \param value the value to insert
 */
QKit.Map.prototype.insert = function(key, value) {
    if (key === undefined) return undefined; // return if key is undefined
    if (value === undefined) value = null; // default value
    var thisData = this.__qkit__data; // this data object
    if (thisData[key] === undefined) { // if there are no items associated with the key
        thisData[key] = [value]; // create new values array
        this.__qkit__size++; // increase the size
    } else { // if there are items associated with the key
        thisData[key][thisData[key].length - 1] = value; // replace the most recently inserted value
    }
    return this;
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the same key in the map, this function will simply create a new one.
 * \return this map
 * \param key the key
 * \param value the value to insert
 */
QKit.Map.prototype.insertMulti = function(key, value) {
    if (key === undefined) return undefined; // return if key is undefined
    if (value === undefined) value = null; // default value
    var thisData = this.__qkit__data; // this data object
    if (thisData[key] === undefined) { // if there are no items associated with the key
        thisData[key] = [value]; // create new values array
    } else { // if there are items associated with the key
        thisData[key].push(value); // add new value to values array
    }
    this.__qkit__size++; // increase the size
    return this;
}


/*!
 * \brief Test the map for emptiness.
 * \return true if the map contains no elements, false otherwise
 */
QKit.Map.prototype.isEmpty = function() { return this.__qkit__size === 0; }


/*!
 * \brief Get a key associated with the given value.
 * \return the first key with the given value or undefined if the map contains no item with the given value
 * \param value the value to search
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.Map.prototype.key = function(value, compareFunction) {
    if (value === undefined) return undefined; // return if value is undefined
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var thisData = this.__qkit__data; // this data object
    for (var key in thisData) { // for all keys
        var keyValues = thisData[key]; // array of values associated with the key
        var iValue = keyValues.length; // value iterator
        while (iValue--) if (compareFunction(keyValues[iValue], value)) return key; // return the key if its values array contains the value
    }
    return undefined; // no key was found
}


/*!
 * \brief Get keys associated with the given value as an array.
 *   Keys that occur multiple times in the map also occur multiple times in the array.
 * \return an instance of Array with keys
 * \param value the value to search (in undefined all keys will be added)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.Map.prototype.keys = function(value, compareFunction) {
    var keys = []; // array with keys
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var thisData = this.__qkit__data; // this data object
    for (var key in thisData) { // for all keys
        var keyValues = thisData[key]; // array of values associated with the key
        var iValue = keyValues.length; // value iterator
        if (value === undefined) { // if value is undefined
            while (iValue--) keys.push(key); // add the key for each value
        } else { // if value is defined
            while (iValue--) if (compareFunction(keyValues[iValue], value)) keys.push(key); // add the key if its values array contains the value
        }
    }
    return keys;
}


/*!
 * \brief Remove all the items that have the given key from the map.
 * \return the number of items removed
 * \param key the key of items to remove
 */
QKit.Map.prototype.remove = function(key) {
    if (key === undefined) return 0; // return if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (keyValues === undefined) return 0; // return if this map doesn't contain the key
    var count = keyValues.lenght; // count of items to be removed
    delete this.__qkit__data[key]; // remove values from this map
    this.__qkit__size -= count; // decrease the size
    return count;
}


/*!
 * \brief Get the map size.
 * \return the number of (key, value) pairs in the map
 */
QKit.Map.prototype.size = function() { return this.__qkit__size; }


/*!
 * \brief Swap other map with this map.
 * \return this map
 * \param map the map to swap with
 */
QKit.Map.prototype.swap = function(map) {
    if (!(map instanceof QKit.Map)) return undefined; // return if type is not valid
    var temp = this.__qkit__data; // backup this data
    this.__qkit__data = map.__qkit__data; // update this data
    map.__qkit__data = temp; // update map data
    temp = this.__qkit__size; // backup this size
    this.__qkit__size = map.__qkit__size; // update this size
    map.__qkit__size = temp; // update map size
    return this;
}


/*!
 * \brief Remove the item with the given key from the map.
 *   If the item does not exist in the map, the function returns undefined.
 *   If there are multiple items for key in the map, only the most recently inserted one is removed and returned.
 * \return  the value associated with removed item
 * \param key the key of item to remove
 */
QKit.Map.prototype.take = function(key) {
    if (key === undefined) return undefined; // return if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (keyValues === undefined) return undefined; // return if key is undefined
    this.__qkit__size--; // decrease the size
    if (keyValues.length > 1) { // if values array contains more than one value
        return keyValues.pop(); // return popped value
    } else { // if values array contains only one value
        var value = keyValues[0]; // the only value of array
        delete this.__qkit__data[key]; // no more items with the key
        return value;
    }
}


/*!
 * \brief Generate an array with the items contained in this set.
 *    For each key from the most recently inserted to the least recently inserted one.
 * \return generated Array instance
 */
QKit.Map.prototype.toArray = function() {
    var thisData = this.__qkit__data; // this data object
    var array = []; // result array
    for (var key in thisData) { // for all keys
        var keyValues = thisData[key]; // array of values associated with the key
        var iValue = keyValues.length; // value iterator
        while (iValue--) array.push(keyValues[iValue]); // add all values to the result array
    }
    return array;
}


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
QKit.Map.prototype.toString = function() {
    var stringParts = ['{']; // parts of string as array
    var thisData = this.__qkit__data; // this data object
    var firstKey = true; // no keys where added
    for (var key in thisData) { // for all keys
        if (firstKey) {
            firstKey = false;
        } else {
            stringParts.push(',');
        }
        stringParts.push(key);
        stringParts.push(':[');
        stringParts.push(thisData[key]);
        stringParts.push(']');
    }
    stringParts.push('}');
    return stringParts.join('');
}


/*!
 * \brief Get keys associated with the given value as an array.
 *   Keys that occur multiple times in the map occur only once in the returned array.
 * \return an instance of Array with keys
 * \param value the value to search (in undefined all keys will be added)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.Map.prototype.uniqueKeys = function(value, compareFunction) {
    var keys = []; // array with keys
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var thisData = this.__qkit__data; // this data object
    for (var key in thisData) { // for all keys
        if (value === undefined) { // if value is undefined
            keys.push(key); // add the key
        } else { // if value is defined
            var keyValues = thisData[key]; // array of values associated with the key
            var iValue = keyValues.length; // value iterator
            while (iValue--) { // for all values in the array
                if (compareFunction(keyValues[iValue], value)) {
                    keys.push(key); // add the key if its values array contains the value
                    break; // stop the cicle
                }
            }
        }
    }
    return keys;
}


/*!
 * \brief Insert all the items in the other map into this map.
 *   If a key is common to both maps, the resulting map will contain the key multiple times.
 * \return this map
 * \param map the map to unite with
 */
QKit.Map.prototype.unite = function(map) {
    if (!(map instanceof QKit.Map)) return; // return if map is not valid
    var thisData = this.__qkit__data; // this data object
    var mapData = map.__qkit__data; // map's data object
    for (var key in mapData) { // for all keys in map
        if (thisData[key] === undefined) { // if this map doesn't contain values associated with the key
            thisData[key] = mapData[key].slice(0); // copy values array
        } else { // if this map contains values associated with the key
            var keyValues = thisData[key]; // array of values associated with the key
            var mapKeyValues = mapData[key]; // array of the map values associated with the key
            var mapIndex = mapKeyValues.lenght; // map's iterator
            var index = keyValues.length + mapIndex; // iterator
            while (mapIndex--) keyValues[index] = mapKeyValues[mapIndex]; // copy all values
        }
    }
    this.__qkit__size += map.__qkit__size; // increase the size
}


/*!
 * \brief Get value by key.
 *   If there are multiple items for key in the map, the value of the most recently inserted one is returned.
 * \return the value associated with the given key or defaultValue
 * \param key the key associated with the value
 * \param defaultValue value to return if the map contains no item with the given key
 */
QKit.Map.prototype.value = function(key, defaultValue) {
    if (key === undefined) return undefined; // return if key is undefined
    if (this.__qkit__data[key] === undefined) return defaultValue; // return default value if the map contains no item with the given key
    return this.__qkit__data[key][this.__qkit__data[key].length - 1]; // return the most recently inserted value
}


/*!
 * \brief Generate array with values associated with the given key from the most recently inserted to the least recently inserted one.
 * \return generated Array instance
 * \param key the key associated with the values (if undefined values for all the keys will be added)
 */
QKit.Map.prototype.values = function(key) {
    if (key === undefined) return this.toArray(); // return arrat with all values if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (keyValues === undefined) return []; // return empty array if the map doesn't contain values associated with the key
    var values = []; // result array of values
    var iValue = keyValues.length; // value iterator
    while (iValue--) values.push(keyValues[iValue]); // add all values to the result array
    return values;
}

/*******************************************************************************
*                                                                              *
*  MultiMap class implementation.                                              *
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
 * \brief MultiMap class.
 */
/*!
 * MultiMap()
 * \brief Construct an empty map.
 */
/*!
 * MultiMap(map)
 * \brief Construct a copy of map.
 * \param map the map to copy
 */
function MultiMap() {
    if (!(this instanceof MultiMap)) { // if function was called without 'new' operator
        if (arguments[0] instanceof Map) { // if MultiMap(map)
            return new MultiMap(arguments[0]); // create new object
        } else { // if MultiMap()
            return new MultiMap(); // create new object
        }
    } else { // if function was called with 'new' operator
        MultiMap.superClass.apply(this, arguments); // super class constructor
    }
}
MultiMap.inheritFrom(Map); // super class


/*!
 * \brief Check a key-value in the map.
 * \return true true if the map contains an item with the given key and the fiven value, false otherwise
 * \param key the key to check
 * \param value the value to check (if undefined only key will be checked)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
MultiMap.prototype.contains = function(key, value, compareFunction) {
    if (key === undefined) return false; // return if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (value === undefined) return keyValues !== undefined; // return array existence if value is undefined
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var iValue = keyValues.length; // value iterator
    while (iValue--) if (compareFunction(keyValues[iValue], value)) return true; // return the true if values array contains the value
    return false; // return false if nothing was found
}


/*!
 * \brief Get items count.
 * \return the number of items associated with key
 * \param key the key items associated with (in undefined all items will be count)
 * \param value the value items associated with (in undefined all items associated with the key will be count)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
MultiMap.prototype.count = function(key, value, compareFunction) {
    if (key === undefined) return this.__qkit__size; // return all items number if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (keyValues === undefined) return 0; // return if there are no items associated with the key
    if (value === undefined) return keyValues.length; // return items array length if value if undefined
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var valuesCount = 0; // total values count
    var iValue = keyValues.length; // value iterator
    while (iValue--) if (compareFunction(keyValues[iValue], value)) valuesCount++; // increase values count if values array contains the value
    return valuesCount; // return total values count
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the same key in the map, this function will simply create a new one.
 * \return this map
 * \param key the key
 * \param value the value to insert
 */
MultiMap.prototype.insert = Map.prototype.insertMulti;


/*!
 * \brief Remove all the items that have the given key and the given value from the map.
 * \return the number of items removed
 * \param key the key of items to remove
 * \param value the value of items to remove (if undefined all items with the given key will be removed)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
MultiMap.prototype.remove = function(key, value, compareFunction) {
    if (key === undefined) return 0; // return if key is undefined
    var keyValues = this.__qkit__data[key]; // array of values associated with the key
    if (keyValues === undefined) return 0; // return if this map doesn't contain the key
    var count = 0; // count of items to be removed
    if (value === undefined) { // if value is undefined
        count = keyValues.lenght; // count of items to be removed
        delete this.__qkit__data[key]; // remove values from this map
    } else { // if value is defined
        if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
        var newKeyValues = []; // filtered values array
        var nValues = keyValues.length; // number of values associated with the key
        for (var iValue = 0; iValue < nValues; iValue++) { // for all values
            if (compareFunction(keyValues[iValue], value)) { // if value to delete
                count++; // increase count of deleted
            } else { // if value to left
                newKeyValues.push(keyValues[iValue]); // add to new array
            }
        }
        if (!newKeyValues.length) { // if all items were removed
            delete this.__qkit__data[key]; // remove values from this map
        } else if (count > 0) { // if some items were removed
            this.__qkit__data[key] = newKeyValues; // update values array
        }
    }
    this.__qkit__size -= count; // decrease the size
    return count;
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the key, that item's value is replaced with value.
 *   If there are multiple items with the key, the most recently inserted item's value is replaced with value.
 * \return this map
 * \param key the key
 * \param value the value to insert
 */
MultiMap.prototype.replace = Map.prototype.insert;

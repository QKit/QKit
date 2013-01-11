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
 * Set()
 * \brief Construct an empty set.
 */
/*!
 * Set(array)
 * \brief Construct a set with values from an array.
 * \param array Array instance
 */
/*!
 * Set(set)
 * \brief Construct a copy of set.
 * \param set the set to copy
 */
function Set() {
    if (arguments[0] instanceof Set) { // if Set(set)
        if (!(this instanceof Set)) return new Set(arguments[0]); // create new object if function was called without 'new' operator
        Set.superClass.apply(this); // super class constructor
        this.__qkit__data = {}; // internal hash object
        for (var value in arguments[0].__qkit__data) this.__qkit__data[value] = null; // copy all values
        this.__qkit__size = arguments[0].__qkit__size; // amount of objects
    } else if (arguments[0] instanceof Array) { // if Set(array)
        if (!(this instanceof Set)) return new Set(arguments[0]); // create new object if function was called without 'new' operator
        Set.superClass.apply(this); // super class constructor
        this.__qkit__data = {}; // internal hash object
        this.__qkit__size = 0; // amount of objects
        var index = arguments[0].length; // iterator
        while (index--) { // for all elements
            var element = arguments[0][index]; // array element
            if ((element !== undefined) && (this.__qkit__data[element] === undefined)) { // if set doesn't contain the element
                this.__qkit__data[element] = null; // add element to hash
                this.__qkit__size++; // increase size
            }
        }
    } else { // if Set()
        if (!(this instanceof Set)) return new Set(); // create new object if function was called without 'new' operator
        Set.superClass.apply(this); // super class constructor
        this.__qkit__data = {}; // internal hash object
        this.__qkit__size = 0; // amount of objects
    }
}
Set.inheritFrom(Object); // super class


/*!
 * \brief Remove all elements from the set.
 */
Set.prototype.clear = function() {
    this.__qkit__data = {}; // clear data
    this.__qkit__size = 0; // reset size
}


/*!
 * \brief Check a value in the set.
 * \return true if the set contains item value, false otherwise
 * \param value value to test (if is a set all its values will be checked)
 */
Set.prototype.contains = function(value) {
    if (value === undefined) return false; // return if value is undefined
    if (value instanceof Set) { // if value is a set
        for (var element in value.__qkit__data) { // for all elements of value
            if (this.__qkit__data[element] === undefined) return false; // return if this set doesn't contain the element
        }
        return true;
    } else { // if value is not a set
        return this.__qkit__data[value] !== undefined;
    }
}


/*!
 * \brief Same as size().
 * \return same as size()
 */
Set.prototype.count = function() { return this.__qkit__size; }


/*!
 * \brief Executes a provided function once per vector element.
 * \param callback function to execute for each element - function(value, set)
 * \param thisArg object to use as this when executing callback
 */
Set.prototype.forEach = function(callback, thisArg) {
    var values = this.values(); // array of values
    var index = values.length; // iterator
    while (index--) callback.apply(thisArg, [values[index], this]); // apply callback function to each value
}


/*!
 * \brief Insert value into the set.
 * \return true if an item was actually inserted, false otherwise
 * \param value the value to insert
 */
Set.prototype.insert = function(value) {
    if (value === undefined) return false; // return if value is undefined
    if (this.__qkit__data[value] !== undefined) return false; // return if this set contains the value
    this.__qkit__data[value] = null; // insert value to the set
    this.__qkit__size++; // increase size
    return true; // the value was axtually removed
}


/*!
 * \brief Remove all items from this set that are not contained in the other set.
 * \return this set
 * \param set the set to intersect with
 */
Set.prototype.intersect = function(set) {
    if (!(set instanceof Set)) return undefined; // return if set is not valid
    for (var value in this.__qkit__data) { // for all values in this set
        if (set.__qkit__data[value] === undefined) { // if set doesn't contain the value
            delete this.__qkit__data[value]; // remove it from this set
            this.__qkit__size--; // decrease size
        }
    }
    return this;
}


/*!
 * \brief Test the set for emptiness.
 * \return true if the set contains no elements, false otherwise
 */
Set.prototype.isEmpty = function() { return this.__qkit__size === 0; }


/*!
 * \brief Remove any occurrence of item value from the set.
 * \return true if an item was actually removed, false otherwise
 * \param value the value to remove
 */
Set.prototype.remove = function(value) {
    if (value === undefined) return false; // return if value is undefined
    if (this.__qkit__data[value] === undefined) return false; // return if this set doesn't contain the value
    delete this.__qkit__data[value]; // remove value from this set
    this.__qkit__size--; // decrease size
    return true; // the value was axtually removed
}


/*!
 * \brief Get the set size.
 * \return the number of items in the set
 */
Set.prototype.size = function() { return this.__qkit__size; }


/*!
 * \brief Remove all items from this set that are contained in the other set.
 * \return this set
 * \param set the set to subtract
 */
Set.prototype.subtract = function(set) {
    if (!(set instanceof Set)) return undefined; // return if set is not valid
    for (var value in this.__qkit__data) { // for all values in this set
        if (set.__qkit__data[value] !== undefined) { // if set contains the value
            delete this.__qkit__data[value]; // remove it from this set
            this.__qkit__size--; // decrease size
        }
    }
    return this;
}


/*!
 * \brief Swap other set with this set.
 * \param set the set to swap with
 */
Set.prototype.swap = function(set) {
    if (!(set instanceof Set)) return; // return if type is not valid
    var temp = this.__qkit__data; // backup this data
    this.__qkit__data = set.__qkit__data; // update this data
    set.__qkit__data = temp; // update set data
    temp = this.__qkit__size; // backup this size
    this.__qkit__size = set.__qkit__size; // update this size
    set.__qkit__size = temp; // update set size
}


/*!
 * \brief Insert each item in the other set that isn't already in this set.
 * \return this set
 * \param set the set to unite with
 */
Set.prototype.unite = function(set) {
    if (!(set instanceof Set)) return undefined; // return if set is not valid
    for (var value in set.__qkit__data) { // for all values in the set
        if (this.__qkit__data[value] === undefined) { // if this set doesn't contain the value
            this.__qkit__data[value] = null; // add it to the set
            this.__qkit__size++; // increase size
        }
    }
    return this;
}


/*!
 * \brief Generate array with values
 * \return generated instance of Array
 */
Set.prototype.values = function() {
    var values = []; // empty array
    for (var value in this.__qkit__data) values.push(value); // add values to array
    return values; // return array
}

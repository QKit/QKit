/*******************************************************************************
*                                                                              *
*  Vector class implementation.                                                *
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
 * \brief Vector class.
 */
/*!
 * Vector(equalsFunction)
 * \brief Construct an empty vector.
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * Vector(array, equalsFunction)
 * \brief Construct a vector with values from an array.
 * \param array Array instance
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * Vector(size, value, equalsFunction)
 * \brief Construct a vector with an initial items.
 * \param size number of items
 * \param value the initial value for each item
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * Vector(other, equalsFunction)
 * \brief Construct a copy of vector.
 * \param other the vector to copy
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.Vector = function() {
    var equalsFunction = QKit.__equalsFunction; // default compare function
    if (arguments[0] instanceof QKit.Vector) { // if Vector(other, equalsFunction)
        var other = arguments[0]; // the other list
        equalsFunction = arguments[1] instanceof Function ? arguments[1] : other.__qkit__equalsFunction; // this values compare function
        if (!(this instanceof QKit.Vector)) return new QKit.Vector(other, equalsFunction); // create new object if function was called without 'new' operator
        QKit.Vector.superClass.constructor.apply(this); // super class constructor
        this.__qkit__data = other.__qkit__data.slice(0); // internal array is copy of other array
    } else if (arguments[0] instanceof Array) { // if Vector(array, equalsFunction)
        var array = arguments[0]; // the array
        if (arguments[1] instanceof Function) equalsFunction = arguments[1]; // this values compare function
        if (!(this instanceof QKit.Vector)) return new QKit.Vector(array, equalsFunction); // create new object if function was called without 'new' operator
        QKit.Vector.superClass.constructor.apply(this); // super class constructor
        this.__qkit__data = array.filter(function() { return true }); // copy all existing elemetns
    } else if (arguments.length < 3) { // if Vector(equalsFunction)
        if (arguments[0] instanceof Function) equalsFunction = arguments[0]; // this values compare function
        if (!(this instanceof QKit.Vector)) return new QKit.Vector(equalsFunction); // create new object if function was called without 'new' operator
        QKit.Vector.superClass.constructor.apply(this); // super class constructor
        this.__qkit__data = []; // internal array
    } else { // if Vector(size, value, equalsFunction)
        var size = Math.floor(arguments[0]); // integer size
        var value = arguments[1] === undefined ? null : arguments[1]; // value
        if (arguments[2] instanceof Function) equalsFunction = arguments[2]; // this values compare function
        if (!(this instanceof QKit.Vector)) return new QKit.Vector(size, value, equalsFunction); // create new object if function was called without 'new' operator
        QKit.Vector.superClass.constructor.apply(this); // super class constructor
        var data = []; // data array of this vector
        while(size-- > 0) data.push(value); // push values
        this.__qkit__data = data; // internal data array
    }
    this.__qkit__equalsFunction = equalsFunction; // this values compare function
}
QKit.Vector.inheritFrom(QKit.Object); // super class


/*!
 * \brief Insert a value at the end of this vector.
 * \return this vector
 * \param value the value to insert
 */
QKit.Vector.prototype.append = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    this.__qkit__data.push(value);
    return this;
}


/*!
 * \brief Get the item in the vector.
 * \return the item at the index position
 * \param index the position index
 */
QKit.Vector.prototype.at = function(index) { return this.__qkit__data[index] }


/*!
 * \brief Remove all the items from the vector.
 * \return this vector
 */
QKit.Vector.prototype.clear = function() {
    this.__qkit__data.length = 0; // clear this data array
    return this;
}


/*!
 * \brief Check that the vector contains the given value.
 * \return true if the vector contains an occurrence of the value, otherwise returns false
 * \param value the value to check
 */
QKit.Vector.prototype.contains = function(value) {
    if (value === undefined) return undefined;
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    return this.__qkit__data.some(function(item) { return equalsFunction(item, value) });
 }


/*!
 * \brief Get the number of items in the vector.
 * \return the number of occurrences of value in the vector
 * \param value value to check, if undefined count of all items will be returned
 */
QKit.Vector.prototype.count = function(value) {
    if (value === undefined) return undefined;
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var count = 0; // total count
    this.__qkit__data.forEach(function(item) { if (equalsFunction(item, value)) count++ }); // increase the count for all items equas the value
    return count;
}


/*!
 * \brief Get internal array. It can be used to access and modify the items in the vector.
 * \return the data array stored in the vector
 */
QKit.Vector.prototype.data = function() { return this.__qkit__data }


/*!
 * \brief Compare the last vector item with the given value.
 * \return true if this vector is not empty and its last item is equal to value, false otherwise
 * \param value value to check
 */
QKit.Vector.prototype.endsWith = function(value) {
    var data = this.__qkit__data; // data array of this vector
    if (data.length < 1) return false; // return if is empty
    return this.__qkit__equalsFunction(data[data.length - 1], value);
}


/*!
 * \brief Compare this vector with the other one.
 * \return true if both vectors contain the same values in the same order, false otherwise
 * \param other the vector to compare with
 */
QKit.Vector.prototype.equals = function(other) {
    if (!(other instanceof QKit.Vector)) return undefined; // return if type is not valid
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var thisData = this.__qkit__data; // this data array
    var otherData = other.__qkit__data; // other data array
    if (thisData.length !== otherData.length) return false; // return false if the sizes are not equal
    return otherData.every(function(otherItem, index) { return equalsFunction(thisData[index], otherItem) });
}


/*!
 * \brief Assign a value to all items in the vector.
 * \return this vector
 * \param value value to assign
 * \param size if not undefined the vector is resized to size size beforehand
 */
QKit.Vector.prototype.fill = function(value, size) {
    if (value === undefined) value = null; // use null by default
    var data = this.__qkit__data; // data array of this vector
    if (size === undefined) { // if size is not defined
        size = data.length; // get size
    } else { // if size is defined
        size = Math.floor(size); // make size integeer
        if (size < 0) return undefined; // return if size is incorrect
    }
    data.length = size; // resize the array
    while (size--) data[size] = value; // set value for each item
    return this;
}


/*!
 * \brief Get the first item.
 * \return the first item in the vector
 */
QKit.Vector.prototype.first = function() { return this.__qkit__data[0] }


/*!
 * \brief Executes a provided function once per each vector item.
 * \return this vector
 * \param callback function to execute for each item - function(value, index, vector)
 * \param thisArg object to use as this when executing callback
 */
QKit.Vector.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    var items = this.__qkit__data.slice(0); // data array copy
    items.forEach(function(item, index) { callback.apply(thisArg, [item, index, this]) }, this); // apply callback function to each item
    return this;
}


/*!
 * \brief Search the value in the vector.
 * \return the index position of the first occurrence of value in the vector, or -1 if no item matched
 * \param value the value to search
 * \param from index position for forward search (first item by default)
 */
QKit.Vector.prototype.indexOf = function(value, from) {
    if (value === undefined) return false; // return of value is undefined
    var data = this.__qkit__data; // data array of this vector
    var dataLength = data.length; // maximum index plus 1
    if (from === undefined) { // if from is undefined
        from = 0; // start from the first item
    } else { // if from is defined
        from = Math.floor(from); // make from integer
        if (from < 0) { // if from is negative
            from += dataLength; // count from last item
            if (from < 0) from = 0; // start from the first item if from is negative
        }
    }
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    for (var index = from - 1; ++index < dataLength;) if (equalsFunction(data[index], value)) return index; // return index if item is found
    return -1; // nothing was found
}


/*!
 * \brief Insert items to the vector.
 * \return this vector
 * \param value the value to insert
 * \param index position of first inserted value after insertion (last by default)
 * \param count the count of values to insert (1 by default)
 */
QKit.Vector.prototype.insert = function(value, index, count) {
    if (value === undefined) value = null; // use null by default
    var data = this.__qkit__data; // data array of this vector
    if (index === undefined) { // if index is not defined
        index = data.length; // insertion at the end of array
    } else { // if index is defined
        index = Math.floor(index); // make index integer
        if (index < 0) { // if index is negative
            index += data.length; // count from last item
            if (index < 0) return undefined; // return if index is negative
        } else if (index > data.length) { // if index is greater than the last position
            return undefined; // return
        }
    }
    if (count === undefined) { // if count is not defined
        count = 1; // insert one value by default
    } else { // if count is defined
        count = Math.floor(count); // make count integer
        if (count < 1) return this; // return if count is not positive
    }
    if (index < data.length) { // if insertion before some item
        var shiftedIndex = index + count; // new index of item at index position
        var i = data.length + count; // iterator
        while (i-- > shiftedIndex) data[i] = data[i - count]; // move all items to be replaced
        i++;
        while (i-- > index) data[i] = value; // set values
    } else { // if insertion at the end
        while (count--) data.push(value); // add count of values
    }
    return this;
}


/*!
 * \brief Test the vector for emptiness.
 * \return true if the vector has size 0, false otherwise
 */
QKit.Vector.prototype.isEmpty = function() { return this.__qkit__data.length < 1 }


/*!
 * \brief Get the last item.
 * \return the last item in the vector
 */
QKit.Vector.prototype.last = function() { return this.__qkit__data[this.__qkit__data.length - 1] }


/*!
 * \brief Search the value in the vector.
 * \return the index position of the last occurrence of value in the vector, or -1 if no item matched
 * \param value the value to search
 * \param from index position for backward search (last item by default)
 */
QKit.Vector.prototype.lastIndexOf = function(value, from) {
    if (value === undefined) return false;
    var thisData = this.__qkit__data; // data array of this vector
    if (from === undefined) { // if from is undefined
        from = thisData.length - 1; // start from the last item
    } else { // if from is defined
        from = Math.floor(from); // make from integer
        if (from < 0) { // if from is negative
            from += thisData.length; // count from last item
            if (from < 0) return; // return if from is negative
        } else if (from >= thisData.length){ // if from greater then the last item index
            from = thisData.length - 1; // start from the last item
        }
    }
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    for (var index = from + 1; index--;) if (equalsFunction(thisData[index], value)) return index; // return index if item is found
    return -1; // nothing was found
}


/*!
 * \brief Copy items from the vector.
 * \return a vector whose items are copied from this vector
 * \param start starting position (0 by default)
 * \param length maximum number of items to copy (by default all items after starting position are copied, if negative items will be copyed in the reverse orger)
 */
QKit.Vector.prototype.mid = function(start, length) {
    var data = this.__qkit__data; // data array of this vector
    if (start === undefined) { // if start position is undefined
        start = 0; // start from the first item
    } else { // if start position is defined
        start = Math.floor(start); // make start integer
        if (start < 0) { // if start position is negative
            start += data.length; // count from the end
            if (start < 0) return undefined; // return if start position is negative
        } else { // if start position is positive
            if (start >= data.length) return undefined; // return if start position is greater than the size
        }
    }
    var mid = new QKit.Vector(); // empty vector
    var index; // iterator
    if (length === undefined) { // if length is undefined
        index = data.length; // to the end of vector
    } else { // if length is defined
        length = Math.floor(length); // make length integer
        if (length === 0) return mid; // return empty vector if length is null
        if (length < 0) { // if length is negative
            index = start + 1; // end at next element
            start = index + length; // start to copy length elements
            if (start < 0) start = 0;
        } else { // if length is positive
            index = start + length; // end position
            if (index > data.length) index = data.length; // end at last element if greater than size
        }
    }
    if (start === index) return mid; // return the empty vector if the is nothing to copy
    var midIndex; // midVector iterator
    var midData = mid.__qkit__data; // data array of midVector
    if (length > 0) { // if copy in direct order
        midIndex = index - start; // midVector iterator
        while (index-- > start) midData[--midIndex] = data[index]; // copy all elements
    } else { // if copy in reverse order
        midIndex = 0; // midVector iterator
        while (index-- > start) midData[midIndex++] = data[index]; // copy all elements
    }
    return mid;
}


/*!
 * \brief Insert a value at the beginning of the vector.
 * \return this vector
 * \param value the value to insert
 */
QKit.Vector.prototype.prepend = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    this.__qkit__data.unshift(value);
    return this;
}


/*!
 * \brief Remove items from the vector.
 * \return this vector
 * \param index position of first item to remove (by default last items will be removed)
 * \param count the count of values to remove (1 by default)
 */
QKit.Vector.prototype.remove = function(index, count) {
    if (count === undefined) { // if count is undefined
        count = 1; // 1 by default
    } else { // if count is defined
        count = Math.floor(count); // make count integer
        if (count < 1) return this; // return if count is not positive
    }
    var data = this.__qkit__data; // data array of this vector
    var dataLength = data.length; // length of data array
    if (index === undefined) { // if index is undefined
        index = dataLength - count; // to remove last items
    } else { // if index is defined
        index = Math.floor(index); // make index integer
    }
    if (index < 0) { // if index is negative
        index += dataLength; // count from last item
        if (index < 0) return undefined; // return if index is negative
    } else if (index >= dataLength) { // if index is greater than the last position
        return undefined; // return
    }
    if (index + count >= dataLength) { // if remove last items
        data.length = index; // decrease length
    } else { // if remove middle items
        var i = dataLength - count; // iterator
        while (i-- > index) data[i] = data[i + count]; // shift items
        data.length -= count; // resize
    }
    return this;
}


/*!
 * \brief Replace the items value.
 * \return this vector
 * \param index valid index position
 * \param value new value for the item
 */
QKit.Vector.prototype.replace = function(index, value) {
    if (index === undefined) return undefined; // return if index is undefined
    if (value === undefined) return undefined; // return if value is undefined
    index = Math.floor(index); // make index integer
    if (index < 0 || index >= this.__qkit__data.length) return undefined; // return if index is not valid
    this.__qkit__data[index] = value; // replace value
    return this;
}


/*!
 * \brief Sets the size of the vector.
 * \return this vector
 * \param size new size
*/
QKit.Vector.prototype.resize = function(size) {
    if (size === undefined) return undefined; // return if size is undefined
    size = Math.floor(size); // make size integer
    var thisData = this.__qkit__data; // data array of this vector
    var difference = size - thisData.length; // size difference
    if (difference > 0) { // if new size is greater than the old
        while (difference--) thisData.push(null); // add null items
    } else { // if new size is lower than the old
        thisData.length = size; // decrease the size
    }
    return this;
}


/*!
 * \brief Get vectors size.
 * \return the number of items in the vector
*/
QKit.Vector.prototype.size = function() { return this.__qkit__data.length }


/*!
 * \brief Compare the first vector item with the given value.
 * \return true if this vector is not empty and its first item is equal to value, false otherwise
 * \param value value to check
 */
QKit.Vector.prototype.startsWith = function(value, equalsFunction) {
    if (this.__qkit__data.length < 1) return false; // return if is empty
    return this.__qkit__equalsFunction(this.__qkit__data[0], value);
}


/*!
 * \brief Swap other vector with this vector.
 * \return this vector
 * \param other the vector to swap with
 */
QKit.Vector.prototype.swap = function(other) {
    if (!(other instanceof QKit.Vector)) return undefined; // return if type is not valid
    var temp = this.__qkit__data; // backup this data
    this.__qkit__data = other.__qkit__data; // update this data
    other.__qkit__data = temp; // update other data
    temp = this.__qkit__equalsFunction; // backup this values compare function
    this.__qkit__equalsFunction = other.__qkit__equalsFunction; // update this values compare function
    other.__qkit__equalsFunction = temp; // update other values compare function
    return this;
}


/*!
 * \brief Generate an array with the data contained in this vector.
 * \return generated Array instance
 */
QKit.Vector.prototype.toArray = function() { return this.__qkit__data.slice(0) }


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
QKit.Vector.prototype.toString = function() { return '[' + this.__qkit__data.toString() + ']' }


/*!
 * \brief Get value by index.
 * \return the value in the vector or defaultValue
 * \param index position of the value
 * \param defaultValue value to return if index is out of the bounds
 */
QKit.Vector.prototype.value = function(index, defaultValue) {
    if (index === undefined) return undefined; // return if index is undefined
    index = Math.floor(index); // make index integer
    if (index < 0 || index >= this.__qkit__data.length) return defaultValue; // return default value if index is not valid
    return this.__qkit__data[index]; // return value from the data array
}

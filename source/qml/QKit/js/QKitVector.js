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
 * Vector()
 * \brief Construct an empty vector.
 */
/*!
 * Vector(array)
 * \brief Construct a vector with values from an array.
 * \param array Array instance
 */
/*!
 * Vector(size, value)
 * \brief Construct a vector with an initial items.
 * \param size number of items
 * \param value the initial value for each item
 */
/*!
 * Vector(vector)
 * \brief Construct a copy of vector.
 * \param vector the vector to copy
 */
function Vector() {
    var thisData; // data array of this vector
    if (arguments[0] instanceof Vector) { // if Vector(vector)
        if (!(this instanceof Vector)) return new Vector(arguments[0]); // create new object if function was called without 'new' operator
        Vector.superClass.apply(this); // super class constructor
        this.__qkit__data = arguments[0].__qkit__data.slice(0); // internal array is copy of vectors array
    } else if (arguments[0] instanceof Array) { // if Vector(array)
        if (!(this instanceof Vector)) return new Vector(arguments[0]); // create new object if function was called without 'new' operator
        Vector.superClass.apply(this); // super class constructor
        var length = arguments[0].length; // length of array
        thisData = []; // data array of this vector
        for (var index = 0; index < length; index++) { // for all items
            var element = arguments[0][index]; // array element
            thisData.push(element === undefined ? null : element);
        }
        this.__qkit__data = thisData; // internal array
    } else if (arguments.length <= 0) { // if Vector()
        if (!(this instanceof Vector)) return new Vector(); // create new object if function was called without 'new' operator
        Vector.superClass.apply(this); // super class constructor
        this.__qkit__data = []; // internal array
    } else { // if Vector(size, value)
        if (!(this instanceof Vector)) return new Vector(arguments[0], arguments[1]); // create new object if function was called without 'new' operator
        Vector.superClass.apply(this); // super class constructor
        thisData = []; // data array of this vector
        var size = Math.floor(arguments[0]); // integer size
        var value = arguments[1] === undefined ? null : arguments[1]; // value
        if (size <= 0) return; // return if size is not positive
        while(size--) thisData.push(value); // push values
        this.__qkit__data = thisData; // internal array
    }
}
Vector.inheritFrom(Object); // super class


/*!
 * \brief Insert a value at the end of this vector.
 * \return this vector
 * \param value the value to insert
 */
Vector.prototype.append = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    this.__qkit__data.push(value);
    return this;
}


/*!
 * \brief Get the item in the vector.
 * \return the item at the index position
 * \param index the position index
 */
Vector.prototype.at = function(index) { return this.__qkit__data[index]; }


/*!
 * \brief Remove all the items from the vector.
 * \return this vector
 */
Vector.prototype.clear = function() {
    this.__qkit__data.length = 0; // clear this data array
    return this;
}


/*!
 * \brief Check that the vector contains the given value.
 * \return true if the vector contains an occurrence of the value, otherwise returns false
 * \param value the value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Vector.prototype.contains = function(value, compareFunction) {
    if (value === undefined) return false;
    var thisData = this.__qkit__data; // data array of this vector
    var index = thisData.length; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        while (index--) if (thisData[index] === value) return true; // return true if item is found
    } else { // in compare function is defined
        while (index--) if (compareFunction(thisData[index], value)) return true; // return true if item is found
    }
    return false; // false if nothing was found
}


/*!
 * \brief Get the number of items in the vector.
 * \return the number of occurrences of value in the vector
 * \param value value to check, if undefined count of all items will be returned
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Vector.prototype.count = function(value, compareFunction) {
    if (value === undefined) return this.__qkit__data.length;
    var count = 0; // total count
    var thisData = this.__qkit__data; // data array of this vector
    var index = thisData.length; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        while (index--) if (thisData[index] === value) count++; // increase count if item is found
    } else { // in compare function is defined
        while (index--) if (compareFunction(thisData[index], value)) count++; // increase count if item is found
    }
    return count;
}


/*!
 * \brief Get internal array. It can be used to access and modify the items in the vector.
 * \return the data array stored in the vector
 */
Vector.prototype.data = function() { return this.__qkit__data; }


/*!
 * \brief Compare the last vector item with the given value.
 * \return true if this vector is not empty and its last item is equal to value, false otherwise
 * \param value value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Vector.prototype.endsWith = function(value, compareFunction) {
    var thisData = this.__qkit__data; // data array of this vector
    if (thisData.length <= 0) return false; // return if is empty
    if (compareFunction === undefined) { // if compare function is undefined
        return thisData[thisData.length - 1] === value;
    } else { // if compare function id defined
        return compareFunction(thisData[thisData.length - 1], value);
    }
}


/*!
 * \brief Compare this vector with the other one.
 * \return true if both vectors contain the same values in the same order, false otherwise
 * \param vector the vector to compare with
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Vector.prototype.equals = function(vector, compareFunction) {
    if (!(vector instanceof Vector)) return undefined; // return if type is not valid
    var thisData = this.__qkit__data; // this data array
    var vectorData = vector.__qkit__data; // vector's data array
    var index = thisData.length; // iterator
    if (index !== vectorData.length) return false; // return false if the sizes are not equal
    if (compareFunction === undefined) { // if compare function is not defined
        while (index--) if (thisData[index] !== vectorData[index]) return false; // return false if some values are not equal
    } else { // if compare function is defined
        while (index--) if (!compareFunction(thisData[index], vectorData[index])) return false; // return false if some values are not equal
    }
    return true; // return true if no differences were found
}


/*!
 * \brief Assign a value to all items in the vector.
 * \return this vector
 * \param value value to assign
 * \param size if not undefined the vector is resized to size size beforehand
 */
Vector.prototype.fill = function(value, size) {
    if (value === undefined) value = null; // use null by default
    var thisData = this.__qkit__data; // data array of this vector
    if (size === undefined) { // if size is not defined
        size = thisData.length; // get size
    } else { // if size is defined
        size = Math.floor(size); // make size integeer
        if (size < 0) return; // return if size is incorrect
    }
    thisData.length = size; // resize the array
    while (size--) thisData[size] = value; // set value for each item
    return this;
}


/*!
 * \brief Get the first item.
 * \return the first item in the vector
 */
Vector.prototype.first = function() { return this.__qkit__data[0]; }


/*!
 * \brief Executes a provided function once per each vector item.
 * \return this vector
 * \param callback function to execute for each item - function(value, index, vector)
 * \param thisArg object to use as this when executing callback
 */
Vector.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    var thisData = this.__qkit__data; // data array of this vector
    var lastIndex = thisData.length - 1; // last index of the data array
    var data = []; // data array reversed copy
    var index = lastIndex + 1; // iterator
    while (index--) data.push(thisData[index]); // add all items to the copy
    index = lastIndex + 1; // to the end of copy
    while (index--) callback.apply(thisArg, [data[index], lastIndex - index, this]); // apply callback function to each item
    return this;
}


/*!
 * \brief Search the value in the vector.
 * \return the index position of the first occurrence of value in the vector, or -1 if no item matched
 * \param value the value to search
 * \param from index position for forward search (first item by default)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Vector.prototype.indexOf = function(value, from, compareFunction) {
    if (value === undefined) return false; // return of value is undefined
    var thisData = this.__qkit__data; // data array of this vector
    if (from === undefined) { // if from is undefined
        from = 0; // start from the first item
    } else { // if from is defined
        from = Math.floor(from); // make from integer
        if (from < 0) { // if from is negative
            from += thisData.length; // count from last item
            if (from < 0) from = 0; // start from the first item if from is negative
        }
    }
    var index = from; // iterator
    var maxIndex = thisData.length; // maximum index plus 1
    if (compareFunction === undefined) { // if compare function is not defined
        for (; index < maxIndex; index++) if (thisData[index] === value) return index; // return index if item is found
    } else { // if compare function is defined
        for (; index < maxIndex; index++) if (compareFunction(thisData[index], value)) return index; // return index if item is found
    }
    return -1; // nothing was found
}


/*!
 * \brief Insert items to the vector.
 * \return this vector
 * \param value the value to insert
 * \param index position of first inserted value after insertion (last by default)
 * \param count the count of values to insert (1 by default)
 */
Vector.prototype.insert = function(value, index, count) {
    if (value === undefined) value = null; // use null by default
    var thisData = this.__qkit__data; // data array of this vector
    if (index === undefined) { // if index is not defined
        index = thisData.length; // insertion at the end of array
    } else { // if index is defined
        index = Math.floor(index); // make index integer
        if (index < 0) { // if index is negative
            index += thisData.length; // count from last item
            if (index < 0) return undefined; // return if index is negative
        } else if (index > thisData.length) { // if index is greater than the last position
            return undefined; // return
        }
    }
    if (count === undefined) { // if count is not defined
        count = 1; // insert one value by default
    } else { // if count is defined
        count = Math.floor(count); // make count integer
        if (count <= 0) return this; // return if count is not positive
    }
    if (index < thisData.length) { // if insertion before some item
        var shiftedIndex = index + count; // new index of item at index position
        var i = thisData.length + count; // iterator
        while (i-- > shiftedIndex) thisData[i] = thisData[i - count]; // move all items to be replaced
        i++;
        while (i-- > index) thisData[i] = value; // set values
    } else { // if insertion at the end
        while (count--) thisData.push(value); // add count of values
    }
    return this;
}


/*!
 * \brief Test the vector for emptiness.
 * \return true if the vector has size 0, false otherwise
 */
Vector.prototype.isEmpty = function() { return this.__qkit__data.length === 0; }


/*!
 * \brief Get the last item.
 * \return the last item in the vector
 */
Vector.prototype.last = function() { return this.__qkit__data[this.__qkit__data.length - 1]; }


/*!
 * \brief Search the value in the vector.
 * \return the index position of the last occurrence of value in the vector, or -1 if no item matched
 * \param value the value to search
 * \param from index position for backward search (last item by default)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Vector.prototype.lastIndexOf = function(value, from, compareFunction) {
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
    var index = from + 1; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        while (index--) if (thisData[index] === value) return index; // return index if imte is found
    } else { // in compare function is defined
        while (index--) if (compareFunction(thisData[index], value)) return index; // return index if item is found
    }
    return -1; // nothing was found
}


/*!
 * \brief Copy items from the vector.
 * \return a vector whose items are copied from this vector
 * \param start starting position (0 by default)
 * \param length maximum number of items to copy (by default all items after starting position are copied, if negative items will be copyed in the reverse orger)
 */
Vector.prototype.mid = function(start, length) {
    var thisData = this.__qkit__data; // data array of this vector
    if (start === undefined) { // if start position is undefined
        start = 0; // start from the first item
    } else { // if start position is defined
        start = Math.floor(start); // make start integer
        if (start < 0) { // if start position is negative
            start += thisData.length; // count from the end
            if (start < 0) return undefined; // return if start position is negative
        } else { // if start position is positive
            if (start >= thisData.length) return undefined; // return if start position is greater than the size
        }
    }
    var midVector = new Vector(); // empty vector
    var index; // iterator
    if (length === undefined) { // if length is undefined
        index = thisData.length; // to the end of vector
    } else { // if length is defined
        length = Math.floor(length); // make length integer
        if (length === 0) return midVector; // return empty vector if length is null
        if (length < 0) { // if length is negative
            index = start + 1; // end at next element
            start = index + length; // start to copy length elements
            if (start < 0) start = 0;
        } else { // if length is positive
            index = start + length; // end position
            if (index > thisData.length) index = thisData.length; // end at last element if greater than size
        }
    }
    if (start === index) return midVector; // return the empty vector if the is nothing to copy
    var midIndex; // midVector iterator
    var midVectorData = midVector.__qkit__data; // data array of midVector
    if (length > 0) { // if copy in direct order
        midIndex = index - start; // midVector iterator
        while (index-- > start) midVectorData[--midIndex] = thisData[index]; // copy all elements
    } else { // if copy in reverse order
        midIndex = 0; // midVector iterator
        while (index-- > start) midVectorData[midIndex++] = thisData[index]; // copy all elements
    }
    return midVector;
}


/*!
 * \brief Insert a value at the beginning of the vector.
 * \return this vector
 * \param value the value to insert
 */
Vector.prototype.prepend = function(value) {
    this.__qkit__data.unshift(value === undefined ? null : value);
    return this;
}


/*!
 * \brief Remove items from the vector.
 * \return this vector
 * \param index position of first item to remove (by default last items will be removed)
 * \param count the count of values to remove (1 by default)
 */
Vector.prototype.remove = function(index, count) {
    if (count === undefined) { // if count is undefined
        count = 1; // 1 by default
    } else { // if count is defined
        count = Math.floor(count); // make count integer
        if (count <= 0) return this; // return if count is not positive
    }
    var thisData = this.__qkit__data; // data array of this vector
    if (index === undefined) { // if index is undefined
        index = thisData.length - count; // to remove last items
    } else { // if index is defined
        index = Math.floor(index); // make index integer
    }
    if (index < 0) { // if index is negative
        index += thisData.length; // count from last item
        if (index < 0) return undefined; // return if index is negative
    } else if (index >= thisData.length) { // if index is greater than the last position
        return undefined; // return
    }
    if (index + count >= thisData.length) { // if remove last items
        thisData.length = index; // decrease length
    } else { // if remove middle items
        var i = thisData.length - count; // iterator
        while (i-- > index) thisData[i] = thisData[i + count]; // shift items
        thisData.length -= count; // resize
    }
    return this;
}


/*!
 * \brief Replace the items value.
 * \return this vector
 * \param index valid index position
 * \param value new value for the item
 */
Vector.prototype.replace = function(index, value) {
    if (index === undefined) return undefined; // return if index is undefined
    index = Math.floor(index); // make index integer
    if (index < 0 || index >= this.__qkit__data.length) return undefined; // return if index is not valid
    this.__qkit__data[index] = value === undefined ? null : value; // replace value
    return this;
}


/*!
 * \brief Sets the size of the vector.
 * \return this vector
 * \param size new size
*/
Vector.prototype.resize = function(size) {
    if (size === undefined) return undefined; // return if size is undefined
    size = Math.floor(size); // make size integer
    var thisData = this.__qkit__data; // data array of this vector
    if (size > thisData.length) { // if new size is greater than the old
        var difference = size - thisData.length; // size difference
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
Vector.prototype.size = function() { return this.__qkit__data.length; }


/*!
 * \brief Compare the first vector item with the given value.
 * \return true if this vector is not empty and its first item is equal to value, false otherwise
 * \param value value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
Vector.prototype.startsWith = function(value, compareFunction) {
    if (this.__qkit__data.length <= 0) return false; // return if is empty
    if (compareFunction === undefined) { // if compare function is undefined
        return this.__qkit__data[0] === value;
    } else { // if compare function id defined
        return compareFunction(this.__qkit__data[0], value);
    }
}


/*!
 * \brief Swap other vector with this vector.
 * \return this vector
 * \param vector the vector to swap with
 */
Vector.prototype.swap = function(vector) {
    if (!(vector instanceof Vector)) return undefined; // return if type is not valid
    var tempData = this.__qkit__data; // backup this data
    this.__qkit__data = vector.__qkit__data; // update this data
    vector.__qkit__data = tempData; // update vector data
    return this;
}


/*!
 * \brief Generate an array with the data contained in this vector.
 * \return generated Array instance
 */
Vector.prototype.toArray = function() { return this.__qkit__data.slice(0); }


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
Vector.prototype.toString = function() { return '[' + this.__qkit__data.toString() + ']'; }


/*!
 * \brief Get value by index.
 * \return the value in the vector or defaultValue
 * \param index position of the value
 * \param defaultValue value to return if index is out of the bounds
 */
Vector.prototype.value = function(index, defaultValue) {
    index = Math.floor(index); // make index integer
    if (index < 0 || index >= this.__qkit__data.length) return defaultValue; // return default value if index is not valid
    return this.__qkit__data[index]; // return value from the data array
}

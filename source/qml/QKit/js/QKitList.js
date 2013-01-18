/*******************************************************************************
*                                                                              *
*  List class implementation.                                                  *
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
 * \brief List class.
 */
/*!
 * List(equalsFunction)
 * \brief Construct an empty list.
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * List(array, equalsFunction)
 * \brief Construct a list with values from an array.
 * \param array Array instance
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * List(other, equalsFunction)
 * \brief Construct a copy of list.
 * \param other the list to copy
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.List = function() {
    var equalsFunction = QKit.__equalsFunction; // default compare function
    var index = 2147483647; // iterator (default first index)
    if (arguments[0] instanceof QKit.List) { // if List(other, equalsFunction)
        var other = arguments[0]; // the other list
        equalsFunction = arguments[1] instanceof Function ? arguments[1] : other.__qkit__equalsFunction; // this values compare function
        if (!(this instanceof QKit.List)) return new QKit.List(other, equalsFunction); // create new object if function was called without 'new' operator
        QKit.List.superClass.constructor.apply(this); // super class constructor
        var otherData = other.__qkit__data; // list's data array
        var firstIndex = other.__qkit__firstIndex; // first item index
        var thisData = []; // this data array
        index = otherData.length; // iterator
        thisData.length = index;
        while (index-- > firstIndex) thisData[index] = otherData[index]; // copy all values
        this.__qkit__data = thisData; // this data array
        this.__qkit__firstIndex = firstIndex; // this first item index
    } else if (arguments[0] instanceof Array) { // if List(array, equalsFunction)
        var array = arguments[0]; // the array
        if (arguments[1] instanceof Function) equalsFunction = arguments[1]; // this values compare function
        if (!(this instanceof QKit.List)) return new QKit.List(array, equalsFunction); // create new object if function was called without 'new' operator
        QKit.List.superClass.constructor.apply(this); // super class constructor
        this.__qkit__firstIndex = index; // index of the first item
        var data = []; // this data array
        data.length = index;
        array.forEach(function(element) { data[index++] = element }, this); // add each item to the list
        this.__qkit__data = data; // this data array
    } else { // if List(equalsFunction)
        if (arguments[0] instanceof Function) equalsFunction = arguments[0]; // this values compare function
        if (!(this instanceof QKit.List)) return new QKit.List(equalsFunction); // create new object if function was called without 'new' operator
        QKit.List.superClass.constructor.apply(this); // super class constructor
        this.__qkit__firstIndex = index; // index of the first item
        this.__qkit__data = []; // values array
        this.__qkit__data.length = index;
    }
    this.__qkit__equalsFunction = equalsFunction; // this values compare function
}
QKit.List.inheritFrom(QKit.Object); // super class


/*!
 * \brief Insert a value at the end of the list.
 * \return this list
 * \param value the value to insert (if is an instance of List al it values will be added)
 */
QKit.List.prototype.append = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    if (value instanceof QKit.List) { // if value is a List instance
        var thisData = this.__qkit__data; // data array of this list
        var valueData = value.__qkit__data; // data array of value list
        var valueFirstIndex = value.__qkit__firstIndex; // first item index of value list
        var valueIndex = valueData.length; // max index for value list
        var thisIndex = thisData.length + valueIndex - valueFirstIndex; // internal index of the first item to append
        while (valueIndex-- > valueFirstIndex) thisData[--thisIndex] = valueData[valueIndex]; // add all items to the list
    } else { // if value is not a List instance
        this.__qkit__data.push(value); // add the value to data array
    }
    return this;
}


/*!
 * \brief Get the item in the list.
 * \return the item at the index position
 * \param index the position index
 */
QKit.List.prototype.at = function(index) { return index === undefined || index < 0 ? undefined : this.__qkit__data[Math.floor(index) + this.__qkit__firstIndex] }


/*!
 * \brief Remove all the items from the list.
 * \return this list
 */
QKit.List.prototype.clear = function() {
    this.__qkit__data.length = this.__qkit__firstIndex;
    return this;
}


/*!
 * \brief Check that the list contains the given value.
 * \return true if the list contains an occurrence of the value, otherwise returns false
 * \param value the value to check
 */
QKit.List.prototype.contains = function(value) {
    if (value === undefined) return false; // return if value is undefined
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var firstIndex = this.__qkit__firstIndex; // first item index of value list
    var data = this.__qkit__data; // data array of this list
    var index = data.length; // iterator
    while (index-- > firstIndex) if (equalsFunction(data[index], value)) return true; // return true if item is found
    return false; // false if nothing was found
}


/*!
 * \brief Get the number of items in the list.
 * \return the number of occurrences of value in the list
 * \param value value to check, if undefined count of all items will be returned
 */
QKit.List.prototype.count = function(value) {
    if (value === undefined) return this.size(); // return the size if value is undefined
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var firstIndex = this.__qkit__firstIndex; // first item index of value list
    var data = this.__qkit__data; // data array of this list
    var count = 0; // total count
    var index = data.length; // iterator
    while (index-- > firstIndex) if (equalsFunction(data[index], value)) count++; // increase count if item is found
    return count;
}


/*!
 * \brief Compare the last list item with the given value.
 * \return true if this list is not empty and its last item is equal to value, false otherwise
 * \param value value to check
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.List.prototype.endsWith = function(value, equalsFunction) {
    var data = this.__qkit__data; // data array of this list
    if (data.length <= this.__qkit__firstIndex) return false; // return if is empty
    return this.__qkit__equalsFunction(data[data.length - 1], value);
}


/*!
 * \brief Compare this list with the other one.
 * \return true if both lists contain the same values in the same order, false otherwise
 * \param other the list to compare with
 */
QKit.List.prototype.equals = function(other) {
    if (!(other instanceof QKit.List)) return undefined; // return if type is not valid
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var thisData = this.__qkit__data; // this data array
    var otherData = other.__qkit__data; // other data array
    var thisFirstIndex = this.__qkit__firstIndex; // this first item index
    var otherFirstIndex = other.__qkit__firstIndex; // other first item index
    var thisIndex = thisData.length; // this iterator
    var otherIndex = otherData.length; // other iterator
    if (thisIndex - thisFirstIndex !== otherIndex - otherFirstIndex) return false; // return false if the sizes are not equal
    for (otherIndex--; thisIndex-- > thisFirstIndex; otherIndex--) if (!equalsFunction(thisData[thisIndex], otherData[otherIndex])) return false; // return false if some values are not equal
    return true; // return true if no differences were found
}


/*!
 * \brief Get the first item.
 * \return the first item in the list
 */
QKit.List.prototype.first = function() { return this.__qkit__data[this.__qkit__firstIndex] }


/*!
 * \brief Executes a provided function once per each list item.
 * \return this list
 * \param callback function to execute for each item - function(value, index, list)
 * \param thisArg object to use as this when executing callback
 */
QKit.List.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    var items = []; // data array reversed copy
    var firstIndex = this.__qkit__firstIndex; // first item index of this list
    var data = this.__qkit__data; // data array of this list
    var index = data.length; // iterator
    while (index-- > firstIndex) items.push(data[index]); // add all items to the copy
    index = items.length; // to the end of copy
    var lastIndex = index - 1; // last index of the data array
    while (index--) callback.apply(thisArg, [items[index], lastIndex - index, this]); // apply callback function to each item
    return this;
}


/*!
 * \brief Search the value in the list.
 * \return the index position of the first occurrence of value in the list, or -1 if no item matched
 * \param value the value to search
 * \param from index position for forward search (first item by default)
 */
QKit.List.prototype.indexOf = function(value, from) {
    if (value === undefined) return undefined; // return of value is undefined
    var data = this.__qkit__data; // data array of this list
    var firstIndex = this.__qkit__firstIndex; // first item index of this list
    if (from === undefined) { // if from is undefined
        from = 0; // start from the first item
    } else { // if from is defined
        from = Math.floor(from); // make from integer
        if (from < 0) { // if from is negative
            from += data.length - firstIndex; // count from last item
            if (from < 0) from = 0; // start from the first item if from is negative
        }
    }
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var maxIndex = data.length; // maximum index plus 1
    for (var index = from + firstIndex; index < maxIndex; index++) if (equalsFunction(data[index], value)) return index - firstIndex; // return index if item is found
    return -1; // nothing was found
}


/*!
 * \brief Insert items to the list.
 * \return this list
 * \param value the value to insert
 * \param index position of first inserted value after insertion (last by default)
 * \param count the count of values to insert (1 by default)
 */
QKit.List.prototype.insert = function(value, index, count) {
    if (value === undefined) value = null; // use null by default
    if (count === undefined) { // if count is not defined
        count = 1; // insert one value by default
    } else { // if count is defined
        count = Math.floor(count); // make count integer
        if (count <= 0) return undefined; // return if count is not positive
    }
    var data = this.__qkit__data; // data array of this list
    var firstIndex = this.__qkit__firstIndex; // first item index of this list
    var size = data.length - firstIndex; // size of the list
    if (index === undefined) { // if index is not defined
        index = size; // insertion at the end of array
    } else { // if index is defined
        index = Math.floor(index); // make index integer
        if (index < 0) { // if index is negative
            index += size; // count from last item
            if (index < 0) return undefined; // return if index is negative
        } else if (index > size) { // if index is greater than the last position
            return undefined; // return
        }
    }
    if (index < size) { // if insertion before some item
        index += firstIndex; // internal index
        var i; // iterator
        if (index - firstIndex < data.length - index) { // if index is closer to the first item
            this.__qkit__firstIndex = firstIndex - count; // new first index
            i = this.__qkit__firstIndex - 1; // iterator
            var insertIndex = index - count - 1; // index of first inserted item
            while (i++ < insertIndex) data[i] = data[i + count]; // move all items to be replaced
            i--;
            while (++i < index) data[i] = value; // set values
        } else { // if index is closer to the last item
            var shiftedIndex = index + count; // new index of item at index position
            i = data.length + count; // iterator
            while (i-- > shiftedIndex) data[i] = data[i - count]; // move all items to be replaced
            i++;
            while (i-- > index) data[i] = value; // set values
        }
    } else { // if insertion at the end
        while (count--) data.push(value); // add count of values
    }
    return this;
}


/*!
 * \brief Test the list for emptiness.
 * \return true if the list has size 0, false otherwise
 */
QKit.List.prototype.isEmpty = function() { return this.__qkit__data.length <= this.__qkit__firstIndex }


/*!
 * \brief Get the last item.
 * \return the last item in the list
 */
QKit.List.prototype.last = function() { return this.__qkit__data[this.__qkit__data.length - 1] }


/*!
 * \brief Search the value in the list.
 * \return the index position of the last occurrence of value in the list, or -1 if no item matched
 * \param value the value to search
 * \param from index position for backward search (last item by default)
 */
QKit.List.prototype.lastIndexOf = function(value, from) {
    if (value === undefined) return false;
    var data = this.__qkit__data; // data array of this list
    var firstIndex = this.__qkit__firstIndex; // first item index of this list
    var size = data.length - firstIndex; // size of the list
    if (from === undefined) { // if from is undefined
        from = size - 1; // start from the last item
    } else { // if from is defined
        from = Math.floor(from); // make from integer
        if (from < 0) { // if from is negative
            from += size; // count from last item
            if (from < 0) return; // return if from is negative
        } else if (from >= size){ // if from greater then the last item index
            from = size - 1; // start from the last item
        }
    }
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var index = from + firstIndex + 1; // iterator
    while (index-- > firstIndex) if (equalsFunction(data[index], value)) return index - firstIndex; // return index if item is found
    return -1; // nothing was found
}


/*!
 * \brief This function is identical to count().
 * \return the number of items in the list
*/
QKit.List.prototype.length = function() { return this.__qkit__data.length - this.__qkit__firstIndex }


/*!
 * \brief Copy items from the list.
 * \return a list whose items are copied from this list
 * \param start starting position (0 by default)
 * \param length maximum number of items to copy (by default all items after starting position are copied, if negative items will be copyed in the reverse orger)
 */
QKit.List.prototype.mid = function(start, length) {
    var data = this.__qkit__data; // data array of this list
    var size = data.length - this.__qkit__firstIndex; // size of the list
    if (start === undefined) { // if start position is undefined
        start = 0; // start from the first item
    } else { // if start position is defined
        start = Math.floor(start); // make start integer
        if (start < 0) { // if start position is negative
            start += size; // count from the end
            if (start < 0) return undefined; // return if start position is negative
        } else { // if start position is positive
            if (start >= size) return undefined; // return if start position is greater than the size
        }
    }
    var mid = new QKit.List(); // empty list
    var index; // iterator
    if (length === undefined) { // if length is undefined
        index = size; // to the end of list
        length = size - start; // number of items to copy
    } else { // if length is defined
        length = Math.floor(length); // make length integer
        if (length === 0) return mid; // return the empty list if length is null
        if (length < 0) { // if length is negative
            index = start + 1; // end at next element
            start = index + length; // start to copy length elements
            if (start < 0) { // if start is negative
                start = 0; // start at the first item
                length = start - index; // number of items to copy
            }
        } else { // if length is positive
            index = start + length; // end position
            if (index > size) { // if index greater than size
                index = size; // end at last element
                length = index - start; // number of items to copy
            }
        }
    }
    if (start === index) return mid; // return the empty list if the is nothing to copy
    start += this.__qkit__firstIndex; // internal start index
    index += this.__qkit__firstIndex; // internal end index
    var midData = mid.__qkit__data; // data array of midList
    var midIndex; // mid list iterator
    if (length > 0) { // if copy in direct order
        midIndex = mid.__qkit__firstIndex + length; // midList iterator
        while (index-- > start) midData[--midIndex] = data[index]; // copy all elements
    } else { // if copy in reverse order
        midIndex = mid.__qkit__firstIndex; // midList iterator
        while (index-- > start) midData[midIndex++] = data[index]; // copy all elements
    }
    return mid;
}


/*!
 * \brief Move an item from one position to another.
 * \return this list
 * \param from start items position
 * \param to finish items position
 */
QKit.List.prototype.move = function(from, to) {
    if (from === undefined) return undefined; // return if the start position is undefined
    if (to === undefined) return undefined; // return if the finith position is undefined
    from = Math.floor(from); // make the start position integer
    to = Math.floor(to); // make the finish position integer
    var data = this.__qkit__data; // data array of this list
    var value; // value to move
    if (from > to) { // if backward moving
        if (to < 0 || from >= data.length - this.__qkit__firstIndex) return undefined; // return if at least one position is out of the bounds
        if (from === to) return this; // return if position doesn't change
        from += this.__qkit__firstIndex; // start position in internal index system
        to += this.__qkit__firstIndex; // finish position in internal index system
        value = data[from]; // value to move
        while (from-- > to) data[from + 1] = data[from]; // shift all the values between start and finish positions
    } else { // if forward moving
        if (from < 0 || to >= data.length - this.__qkit__firstIndex) return undefined; // return if at least one position is out of the bounds
        if (from === to) return this; // return if position doesn't change
        from += this.__qkit__firstIndex; // start position in internal index system
        to += this.__qkit__firstIndex; // finish position in internal index system
        value = data[from]; // value to move
        while (from++ < to) data[from - 1] = data[from]; // shift all the values between start and finish positions
    }
    data[to] = value; // update finish position value
    return this;
}


/*!
 * \brief Insert a value at the beginning of the list.
 * \return this list
 * \param value the value to insert
 */
QKit.List.prototype.prepend = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    this.__qkit__data[--this.__qkit__firstIndex] = value;
    return this;
}


/*!
 * \brief Removes all occurrences of value in the list.
 * \return the number of entries removed
 * \param value the value to remove
 */
QKit.List.prototype.removeAll = function(value) {
    if (value === undefined) return 0; // return of value is undefined
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var data = this.__qkit__data; // data array of this list
    var firstIndex = this.__qkit__firstIndex; // first item index of this list
    var count = 0; // count of removed items
    var index = data.length; // iterator
    while (index-- > firstIndex) { // for all items in the list
        if (equalsFunction(data[index], value)) { // if item to detele
            delete data[index]; // remove the value
            count++; // increase the count of removed
        } else { // if item to leave
            if (count) {
                data[index + count] = data[index]; // shift the value if there are values to remove
                delete data[index]; // remove the value
            }
        }
    }
    this.__qkit__firstIndex += count; // shift the first item index
    return count;
}


/*!
 * \brief Remove the item at the given index position.
 * \return this list
 * \param index valid index position
 */
QKit.List.prototype.removeAt = function(index) { return this.takeAt(index) === undefined ? undefined : this }


/*!
 * \brief Remove the first item in the list.
 * \return this list
 */
QKit.List.prototype.removeFirst = function() { return this.removeAt(0) }


/*!
 * \brief Remove the last item in the list.
 * \return this list
 */
QKit.List.prototype.removeLast = function() { return this.removeAt(this.__qkit__data.length - this.__qkit__firstIndex - 1) }


/*!
 * \brief Remove the first occurrence of the given value in the list.
 * \return true on success, false otherwise
 * \param value the value to delete
 */
QKit.List.prototype.removeOne = function(value) {
    if (value === undefined) return false; // return if value is undefined
    var data = this.__qkit__data; // data array of this list
    var lastIndex = data.length; // index of the last element
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    for (var index = this.__qkit__firstIndex; index < lastIndex; index++) { // for all items
        if (equalsFunction(data[index], value)) { // if item is found
            this.removeAt(index - this.__qkit__firstIndex); // remove the item
            return true; // item was removed
        }
    }
    return false; // no item was removed
}


/*!
 * \brief Replace the items value.
 * \return this list
 * \param index valid index position
 * \param value new value for the item
 */
QKit.List.prototype.replace = function(index, value) {
    if (index === undefined) return undefined; // return if index is undefined
    if (value === undefined) return undefined; // return if value is undefined
    index = Math.floor(index) + this.__qkit__firstIndex; // make index integer and internal
    if (index < this.__qkit__firstIndex || index >= this.__qkit__data.length) return undefined; // return if index is not valid
    this.__qkit__data[index] = value; // replace value
    return this;
}


/*!
 * \brief Get lists size.
 * \return the number of items in the list
*/
QKit.List.prototype.size = function() { return this.__qkit__data.length - this.__qkit__firstIndex }


/*!
 * \brief Compare the first list item with the given value.
 * \return true if this list is not empty and its first item is equal to value, false otherwise
 * \param value value to check
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.List.prototype.startsWith = function(value, equalsFunction) {
    var data = this.__qkit__data; // data array of this list
    if (data.length <= this.__qkit__firstIndex) return false; // return if is empty
    return this.__qkit__equalsFunction(data[this.__qkit__firstIndex], value);
}


/*!
 * swap(list)
 * \brief Swap other list with this list.
 * \return this list
 * \param list the list to swap with
 */
/*!
 * swap(index1, index2)
 * \brief Exchange the items at the given positions.
 * \return this list
 * \param index1 valid index position
 * \param index2 valid index position
 */
QKit.List.prototype.swap = function() {
    var temp; // temp buffer
    if (arguments[0] instanceof QKit.List) { // if swapt(list)
        var other = arguments[0]; // list to swap with
        temp = this.__qkit__data; // backup this data
        this.__qkit__data = other.__qkit__data; // update this data
        other.__qkit__data = temp; // update other data
        temp = this.__qkit__firstIndex; // backup this index of the first item
        this.__qkit__firstIndex = other.__qkit__firstIndex; // update this index of the first item
        other.__qkit__firstIndex = temp; // update other index of the first item
        temp = this.__qkit__equalsFunction; // backup this values compare function
        this.__qkit__equalsFunction = other.__qkit__equalsFunction; // update this values compare function
        other.__qkit__equalsFunction = temp; // update other values compare function
    } else { // if swap(index1, index2)
        if (arguments.length < 2) return undefined; // return if not both indexes are defined
        var index1 = Math.floor(arguments[0]) + this.__qkit__firstIndex; // first internal index
        if (index1 < this.__qkit__firstIndex || index1 >= this.__qkit__data.length) return undefined; // return if index is not valid
        var index2 = Math.floor(arguments[1]) + this.__qkit__firstIndex; // second internal index
        if (index2 < this.__qkit__firstIndex || index2 >= this.__qkit__data.length) return undefined; // return if index is not valid
        temp = this.__qkit__data[index1]; // backup first item value
        this.__qkit__data[index1] = this.__qkit__data[index2]; // update first item value
        this.__qkit__data[index2] = temp; // update second item value
    }
    return this;
}


/*!
 * \brief Remove the item at the given index position.
 * \return value of removed item
 * \param index valid index position
 */
QKit.List.prototype.takeAt = function(index) {
    if (index === undefined) return undefined; // return if position is undefined
    index = Math.floor(index); // make index integer
    var data = this.__qkit__data; // data array of this list
    var firstIndex = this.__qkit__firstIndex; // first item index of this list
    index += firstIndex; // internal index
    var value = data[index]; // value of item to be removed
    if (index - firstIndex < data.length - index) { // if index is closer to the first item
        if (index < 0) return undefined; // return if index is not correct
        while (index-- > firstIndex) data[index + 1] = data[index]; // shift items
        delete data[this.__qkit__firstIndex++]; // delete previous first item and increase index of first item
    } else { // if index is closer to the last item
        var thisLastIndex = data.length; // after last item index
        if (index >= thisLastIndex) return undefined; // return if index is not correct
        while (index++ < thisLastIndex) data[index - 1] = data[index]; // shift items
        data.length--; // decrease data array length
    }
    return value;
}


/*!
 * \brief Remove the first item in the list.
 * \return value of removed item
 */
QKit.List.prototype.takeFirst = function() { return this.takeAt(0) }


/*!
 * \brief Remove the last item in the list.
 * \return value of removed item
 */
QKit.List.prototype.takeLast = function() { return this.takeAt(this.__qkit__data.length - this.__qkit__firstIndex - 1) }


/*!
 * \brief Generate an array with the data contained in this list.
 * \return generated Array instance
 */
QKit.List.prototype.toArray = function() {
    var array = []; // result array
    var data = this.__qkit__data; // data array of this list
    var firstIndex = this.__qkit__firstIndex; // first item index of this list
    var index = data.length; // iterator
    var arrayIndex = index - firstIndex; // array's iterator
    while (index-- > firstIndex) array[--arrayIndex] = data[index]; // copy all values
    return array;
}


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
QKit.List.prototype.toString = function() { return '[' + this.toArray().toString() + ']' }


/*!
 * \brief Get value by index.
 * \return the value in the list or defaultValue
 * \param index position of the value
 * \param defaultValue value to return if index is out of the bounds
 */
QKit.List.prototype.value = function(index, defaultValue) {
    if (index === undefined) return undefined; // return if position is undefined
    index = Math.floor(index) + this.__qkit__firstIndex; // make index integer and internal
    if (index < this.__qkit__firstIndex || index >= this.__qkit__data.length) return defaultValue; // return default value if index is not valid
    return this.__qkit__data[index]; // return value from the data array
}

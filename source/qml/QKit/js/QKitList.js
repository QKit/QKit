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
 * List()
 * \brief Construct an empty list.
 */
/*!
 * List(array)
 * \brief Construct a list with values from an array.
 * \param array Array instance
 */
/*!
 * List(list)
 * \brief Construct a copy of list.
 * \param list the list to copy
 */
function List() {
    var thisData; // this data array
    var index = 2147483647; // iterator (default first index)
    if (arguments[0] instanceof List) { // if List(list)
        var list = arguments[0]; // the other list
        if (!(this instanceof List)) return new List(list); // create new object if function was called without 'new' operator
        List.superClass.apply(this); // super class constructor
        var listData = list.__qkit__data; // list's data array
        var firstIndex = list.__qkit__firstIndex; // first item index
        thisData = []; // this data array
        index = listData.length; // iterator
        thisData.length = index;
        while (index-- > firstIndex) thisData[index] = listData[index]; // copy all values
        this.__qkit__data = thisData; // this data array
        this.__qkit__firstIndex = firstIndex; // this first item index
    } else if (arguments[0] instanceof Array) { // if List(array)
        if (!(this instanceof List)) return new List(arguments[0]); // create new object if function was called without 'new' operator
        List.superClass.apply(this); // super class constructor
        this.__qkit__firstIndex = index; // index of the first item
        thisData = []; // this data array
        thisData.length = index;
        arguments[0].forEach(function(element) { thisData[index++] = element; }, this); // add each item to the list
        this.__qkit__data = thisData; // this data array
    } else { // if List()
        if (!(this instanceof List)) return new List(); // create new object if function was called without 'new' operator
        List.superClass.apply(this); // super class constructor
        this.__qkit__firstIndex = index; // index of the first item
        this.__qkit__data = []; // values array
        this.__qkit__data.length = this.__qkit__firstIndex;
    }
}
List.inheritFrom(Object); // super class


/*!
 * \brief Insert a value at the end of the list.
 * \return this list
 * \param value the value to insert (if is an instance of List al it values will be added)
 */
List.prototype.append = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    var thisData = this.__qkit__data; // data array of this list
    var index = thisData.length; // internal index of the first item to append
    if (value instanceof List) { // if value is a List instance
        var valueData = value.__qkit_data; // data array of value list
        var valueFirstIndex = value.__qkit__firstIndex; // first item index of value list
        var valueIndex = valueData.length; // max index for value list
        index += valueIndex - valueFirstIndex; // max index for this list after append
        while (valueIndex-- > valueFirstIndex) thisData[--index] = valueData[valueIndex]; // add all items to the list
    } else { // if value is not a List instance
        thisData[index] = value; // add the value to data array
    }
    return this;
}


/*!
 * \brief Get the item in the list.
 * \return the item at the index position
 * \param index the position index
 */
List.prototype.at = function(index) { return index === undefined ? undefined : this.__qkit__data[Math.floor(index) + this.__qkit__firstIndex]; }


/*!
 * \brief Remove all the items from the list.
 * \return this list
 */
List.prototype.clear = function() {
    this.__qkit__data.length = this.__qkit__firstIndex;
    return this;
}


/*!
 * \brief Check that the list contains the given value.
 * \return true if the list contains an occurrence of the value, otherwise returns false
 * \param value the value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.contains = function(value, compareFunction) {
    if (value === undefined) return false; // return if value is undefined
    var thisData = this.__qkit__data; // data array of this list
    var valueFirstIndex = value.__qkit__firstIndex; // first item index of value list
    var index = thisData.length; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        while (index-- > valueFirstIndex) if (thisData[index] === value) return true; // return true if item is found
    } else { // in compare function is defined
        while (index-- > valueFirstIndex) if (compareFunction(thisData[index], value)) return true; // return true if item is found
    }
    return false; // false if nothing was found
}


/*!
 * \brief Get the number of items in the list.
 * \return the number of occurrences of value in the list
 * \param value value to check, if undefined count of all items will be returned
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.count = function(value, compareFunction) {
    if (value === undefined) return this.size(); // return the size if value is undefined
    var count = 0; // total count
    var thisData = this.__qkit__data; // data array of this list
    var valueFirstIndex = value.__qkit__firstIndex; // first item index of value list
    var index = thisData.length; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        while (index-- > valueFirstIndex) if (thisData[index] === value) count++; // increase count if item is found
    } else { // in compare function is defined
        while (index-- > valueFirstIndex) if (compareFunction(thisData[index], value)) count++; // increase count if item is found
    }
    return count;
}


/*!
 * \brief Compare the last list item with the given value.
 * \return true if this list is not empty and its last item is equal to value, false otherwise
 * \param value value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.endsWith = function(value, compareFunction) {
    var thisData = this.__qkit__data; // data array of this list
    if (thisData.length <= this.__qkit__firstIndex) return false; // return if is empty
    if (compareFunction === undefined) { // if compare function is undefined
        return thisData[thisData.length - 1] === value;
    } else { // if compare function id defined
        return compareFunction(thisData[thisData.length], value);
    }
}


/*!
 * \brief Compare this list with the other one.
 * \return true if both lists contain the same values in the same order, false otherwise
 * \param list the list to compare with
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.equals = function(list, compareFunction) {
    if (!(list instanceof List)) return undefined; // return if type is not valid
    var thisData = this.__qkit__data; // this data array
    var listData = list.__qkit__data; // list's data array
    var thisFirstIndex = this.__qkit__firstIndex; // this first item index
    var listsFirstIndex = this.__qkit__firstIndex; // list's first item index
    var index = thisData.length; // this iterator
    var listIndex = listData.length; // list's iterator
    if (index - thisFirstIndex !== listIndex - listsFirstIndex) return false; // return false if the sizes are not equal
    if (compareFunction === undefined) { // if compare function is not defined
        for (listIndex--; index-- > thisFirstIndex; listIndex--) if (thisData[index] !== listData[listIndex]) return false; // return false if some values are not equal
    } else { // if compare function is defined
        for (listIndex--; index-- > thisFirstIndex; listIndex--) if (!compareFunction(thisData[index], listData[listIndex])) return false; // return false if some values are not equal
    }
    return true; // return true if no differences were found
}


/*!
 * \brief Get the first item.
 * \return the first item in the list
 */
List.prototype.first = function() { return this.__qkit__data[this.__qkit__firstIndex]; }


/*!
 * \brief Executes a provided function once per each list item.
 * \return this list
 * \param callback function to execute for each item - function(value, index, list)
 * \param thisArg object to use as this when executing callback
 */
List.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    var data = []; // data array reversed copy
    var thisFirstIndex = this.__qkit__firstIndex; // first item index of this list
    var thisData = this.__qkit__data; // data array of this list
    var index = thisData.length; // iterator
    while (index-- > thisFirstIndex) data.push(thisData[index]); // add all items to the copy
    index = data.length; // to the end of copy
    var lastIndex = index - 1; // last index of the data array
    while (index--) callback.apply(thisArg, [data[index], lastIndex - index, this]); // apply callback function to each item
    return this;
}


/*!
 * \brief Search the value in the list.
 * \return the index position of the first occurrence of value in the list, or -1 if no item matched
 * \param value the value to search
 * \param from index position for forward search (first item by default)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.indexOf = function(value, from, compareFunction) {
    if (value === undefined) return false; // return of value is undefined
    var thisData = this.__qkit__data; // data array of this list
    var thisFirstIndex = this.__qkit__firstIndex; // first item index of this list
    if (from === undefined) { // if from is undefined
        from = 0; // start from the first item
    } else { // if from is defined
        from = Math.floor(from); // make from integer
        if (from < 0) { // if from is negative
            from += thisData.length - thisFirstIndex; // count from last item
            if (from < 0) from = 0; // start from the first item if from is negative
        }
    }
    var maxIndex = thisData.length; // maximum index plus 1
    var index = from + thisFirstIndex; // iterator
    if (compareFunction === undefined) { // if compare function is not defined
        for (; index < maxIndex; index++) if (thisData[index] === value) return index - thisFirstIndex; // return index if item is found
    } else { // if compare function is defined
        for (; index < maxIndex; index++) if (compareFunction(thisData[index], value)) return index - thisFirstIndex; // return index if item is found
    }
    return -1; // nothing was found
}


/*!
 * \brief Insert items to the list.
 * \return this list
 * \param value the value to insert
 * \param index position of first inserted value after insertion (last by default)
 * \param count the count of values to insert (1 by default)
 */
List.prototype.insert = function(value, index, count) {
    if (value === undefined) value = null; // use null by default
    if (count === undefined) { // if count is not defined
        count = 1; // insert one value by default
    } else { // if count is defined
        count = Math.floor(count); // make count integer
        if (count <= 0) return undefined; // return if count is not positive
    }
    var thisData = this.__qkit__data; // data array of this list
    var thisFirstIndex = this.__qkit__firstIndex; // first item index of this list
    var thisSize = thisData.length - thisFirstIndex; // size of the list
    if (index === undefined) { // if index is not defined
        index = thisSize; // insertion at the end of array
    } else { // if index is defined
        index = Math.floor(index); // make index integer
        if (index < 0) { // if index is negative
            index += thisSize; // count from last item
            if (index < 0) return undefined; // return if index is negative
        } else if (index > thisSize) { // if index is greater than the last position
            return undefined; // return
        }
    }
    if (index < thisSize) { // if insertion before some item
        index += thisFirstIndex; // internal index
        var i; // iterator
        if (index - thisFirstIndex < thisData.length - index) { // if index is closer to the first item
            this.__qkit__firstIndex = thisFirstIndex - count; // new first index
            i = this.__qkit__firstIndex - 1; // iterator
            var insertIndex = index - count - 1; // index of first inserted item
            while (i++ < insertIndex) thisData[i] = thisData[i + count]; // move all items to be replaced
            i--;
            while (++i < index) thisData[i] = value; // set values
        } else { // if index is closer to the last item
            var shiftedIndex = index + count; // new index of item at index position
            i = thisData.length + count; // iterator
            while (i-- > shiftedIndex) thisData[i] = thisData[i - count]; // move all items to be replaced
            i++;
            while (i-- > index) thisData[i] = value; // set values
        }
    } else { // if insertion at the end
        while (count--) thisData.push(value); // add count of values
    }
    return this;
}


/*!
 * \brief Test the list for emptiness.
 * \return true if the list has size 0, false otherwise
 */
List.prototype.isEmpty = function() { return this.__qkit__data.length <= this.__qkit__firstIndex; }


/*!
 * \brief Get the last item.
 * \return the last item in the list
 */
List.prototype.last = function() { return this.__qkit__data[this.__qkit__data.length - 1]; }


/*!
 * \brief Search the value in the list.
 * \return the index position of the last occurrence of value in the list, or -1 if no item matched
 * \param value the value to search
 * \param from index position for backward search (last item by default)
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.lastIndexOf = function(value, from, compareFunction) {
    if (value === undefined) return false;
    var thisData = this.__qkit__data; // data array of this list
    var thisFirstIndex = this.__qkit__firstIndex; // first item index of this list
    var thisSize = thisData.length - thisFirstIndex; // size of the list
    if (from === undefined) { // if from is undefined
        from = thisSize - 1; // start from the last item
    } else { // if from is defined
        from = Math.floor(from); // make from integer
        if (from < 0) { // if from is negative
            from += thisSize; // count from last item
            if (from < 0) return; // return if from is negative
        } else if (from >= thisSize){ // if from greater then the last item index
            from = thisSize - 1; // start from the last item
        }
    }
    var index = from + thisFirstIndex + 1; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        while (index-- > thisFirstIndex) if (thisData[index] === value) return index - thisFirstIndex; // return index if item is found
    } else { // in compare function is defined
        while (index-- > thisFirstIndex) if (compareFunction(thisData[index], value)) return index - thisFirstIndex; // return index if item is found
    }
    return -1; // nothing was found
}


/*!
 * \brief This function is identical to count().
 * \return the number of items in the list
*/
List.prototype.length = function() { return this.__qkit__data.length - this.__qkit__firstIndex; }


/*!
 * \brief Copy items from the list.
 * \return a list whose items are copied from this list
 * \param start starting position (0 by default)
 * \param length maximum number of items to copy (by default all items after starting position are copied, if negative items will be copyed in the reverse orger)
 */
List.prototype.mid = function(start, length) {
    var thisData = this.__qkit__data; // data array of this list
    var thisSize = thisData.length - this.__qkit__firstIndex; // size of the list
    if (start === undefined) { // if start position is undefined
        start = 0; // start from the first item
    } else { // if start position is defined
        start = Math.floor(start); // make start integer
        if (start < 0) { // if start position is negative
            start += thisSize; // count from the end
            if (start < 0) return undefined; // return if start position is negative
        } else { // if start position is positive
            if (start >= thisSize) return undefined; // return if start position is greater than the size
        }
    }
    var midList = new List(); // empty list
    var index; // iterator
    if (length === undefined) { // if length is undefined
        index = thisSize; // to the end of list
        length = thisSize - start; // number of items to copy
    } else { // if length is defined
        length = Math.floor(length); // make length integer
        if (length === 0) return midList; // return the empty list if length is null
        if (length < 0) { // if length is negative
            index = start + 1; // end at next element
            start = index + length; // start to copy length elements
            if (start < 0) { // if start is negative
                start = 0; // start at the first item
                length = start - index; // number of items to copy
            }
        } else { // if length is positive
            index = start + length; // end position
            if (index > thisSize) { // if index greater than size
                index = thisSize; // end at last element
                length = index - start; // number of items to copy
            }
        }
    }
    if (start === index) return midList; // return the empty list if the is nothing to copy
    start += this.__qkit__firstIndex; // internal start index
    index += this.__qkit__firstIndex; // internal end index
    var midListData = midList.__qkit__data; // data array of midList
    var midIndex; // mid list iterator
    if (length > 0) { // if copy in direct order
        midIndex = midList.__qkit__firstIndex + length; // midList iterator
        while (index-- > start) midListData[--midIndex] = thisData[index]; // copy all elements
    } else { // if copy in reverse order
        midIndex = midList.__qkit__firstIndex; // midList iterator
        while (index-- > start) midListData[midIndex++] = thisData[index]; // copy all elements
    }
    return midList;
}


/*!
 * \brief Move an item from one position to another.
 * \return this list
 * \param from start items position
 * \param to finish items position
 */
List.prototype.move = function(from, to) {
    if (from === undefined) return undefined; // return if the start position is undefined
    if (to === undefined) return undefined; // return if the finith position is undefined
    from = Math.floor(from); // make the start position integer
    to = Math.floor(to); // make the finish position integer
    var thisData = this.__qkit__data; // data array of this list
    var value; // value to move
    if (from > to) { // if backward moving
        if (to < 0 || from >= thisData.length - this.__qkit__firstIndex) return undefined; // return if at least one position is out of the bounds
        if (from === to) return this; // return if position doesn't change
        from += this.__qkit__firstIndex; // start position in internal index system
        to += this.__qkit__firstIndex; // finish position in internal index system
        value = thisData[from]; // value to move
        while (from-- > to) thisData[from + 1] = thisData[from]; // shift all the values between start and finish positions
    } else { // if forward moving
        if (from < 0 || to >= thisData.length - this.__qkit__firstIndex) return undefined; // return if at least one position is out of the bounds
        if (from === to) return this; // return if position doesn't change
        from += this.__qkit__firstIndex; // start position in internal index system
        to += this.__qkit__firstIndex; // finish position in internal index system
        value = thisData[from]; // value to move
        while (from++ < to) thisData[from - 1] = thisData[from]; // shift all the values between start and finish positions
    }
    thisData[to] = value; // update finish position value
    return this;
}


/*!
 * \brief Insert a value at the beginning of the list.
 * \return this list
 * \param value the value to insert
 */
List.prototype.prepend = function(value) {
    this.__qkit__data[--this.__qkit_firstIndex] = value === undefined ? null : value;
    return this;
}


/*!
 * \brief Removes all occurrences of value in the list.
 * \return the number of entries removed
 * \param value the value to remove
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.removeAll = function(value, compareFunction) {
    if (value === undefined) return 0; // return of value is undefined
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var count = 0; // count of removed items
    var thisData = this.__qkit__data; // data array of this list
    var thisFirstIndex = this.__qkit__firstIndex; // first item index of this list
    var index = thisData.length; // iterator
    while (index-- > thisFirstIndex) { // for all items in the list
        if (compareFunction(thisData[index], value)) { // if item to detele
            delete thisData[index]; // remove the value
            count++; // increase the count of removed
        } else { // if item to leave
            if (count) {
                thisData[index + count] = thisData[index]; // shift the value if there are values to remove
                delete thisData[index]; // remove the value
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
List.prototype.removeAt = function(index) { return this.takeAt(index) === undefined ? undefined : this; }


/*!
 * \brief Remove the first item in the list.
 * \return this list
 */
List.prototype.removeFirst = function() { return this.removeAt(0); }


/*!
 * \brief Remove the last item in the list.
 * \return this list
 */
List.prototype.removeLast = function() { return this.removeAt(this.__qkit__data.length - this.__qkit__firstIndex - 1); }


/*!
 * \brief Remove the first occurrence of the given value in the list.
 * \return true on success, false otherwise
 * \param value the value to delete
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.removeOne = function(value, compareFunction) {
    if (value === undefined) return false; // return if value is undefined
    var thisData = this.__qkit__data; // data array of this list
    var lastIndex = thisData.length; // index of the last element
    var index = this.__qkit__firstIndex - 1; // iterator
    if (compareFunction === undefined) { // if compare function if undefined
        while (++index < lastIndex) { // for all items
            if (thisData[index] === value) { // if item is found
                this.removeAt(index - this.__qkit__firstIndex); // remove the item
                return true; // item was removed
            }
        }
    } else { // if compare function is defined
        while (++index < lastIndex) { // for all items
            if (compareFunction(thisData[index], value)) { // if item is found
                this.removeAt(index - this.__qkit__firstIndex); // remove the item
                return true; // item was removed
            }
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
List.prototype.replace = function(index, value) {
    if (index === undefined) return undefined; // return if index is undefined
    index = Math.floor(index) + this.__qkit__firstIndex; // make index integer and internal
    if (index < this.__qkit__firstIndex || index >= this.__qkit__data.length) return undefined; // return if index is not valid
    this.__qkit__data[index] = value === undefined ? null : value; // replace value
    return this;
}


/*!
 * \brief Get lists size.
 * \return the number of items in the list
*/
List.prototype.size = function() { return this.__qkit__data.length - this.__qkit__firstIndex; }


/*!
 * \brief Compare the first list item with the given value.
 * \return true if this list is not empty and its first item is equal to value, false otherwise
 * \param value value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
List.prototype.startsWith = function(value, compareFunction) {
    if (this.__qkit__data.length <= this.__qkit__firstIndex) return false; // return if is empty
    if (compareFunction === undefined) { // if compare function is undefined
        return this.__qkit__data[this.__qkit__firstIndex] === value;
    } else { // if compare function id defined
        return compareFunction(this.__qkit__data[this.__qkit__firstIndex], value);
    }
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
List.prototype.swap = function() {
    var temp; // temp buffer
    if (arguments[0] instanceof List) { // if swapt(list)
        var list = arguments[0]; // list to swap with
        temp = this.__qkit__data; // backup this data
        this.__qkit__data = list.__qkit__data; // update this data
        list.__qkit__data = temp; // update list data
        temp = this.__qkit__firstIndex; // backup this index of the first item
        this.__qkit__firstIndex = list.__qkit__firstIndex; // update this index of the first item
        list.__qkit__firstIndex = temp; // update list index of the first item
    } else { // if swap(index1, index2)
        if (arguments.length < 2) return undefined; // return if not both indexes are defined
        var index1 = Math.floor(arguments[0]) + this.__qkit__firstIndex; // first internal index
        if (index1 <  this.__qkit__firstIndex || index1 >= this.__qkit__data.length) return undefined; // return if index is not valid
        var index2 = Math.floor(arguments[1]) + this.__qkit__firstIndex; // second internal index
        if (index2 <  this.__qkit__firstIndex || index2 >= this.__qkit__data.length) return undefined; // return if index is not valid
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
List.prototype.takeAt = function(index) {
    if (index === undefined) return undefined; // return if position is undefined
    index = Math.floor(index); // make index integer
    var thisData = this.__qkit__data; // data array of this list
    var thisFirstIndex = this.__qkit__firstIndex; // first item index of this list
    index += thisFirstIndex; // internal index
    var value = thisData[index]; // value of item to be removed
    if (index - thisFirstIndex < thisData.length - index) { // if index is closer to the first item
        if (index < 0) return undefined; // return if index is not correct
        while (index-- > thisFirstIndex) thisData[index + 1] = thisData[index]; // shift items
        delete thisData[this.__qkit__firstIndex++]; // delete previous first item and increase index of first item
    } else { // if index is closer to the last item
        var thisLastIndex = thisData.length; // after last item index
        if (index >= thisLastIndex) return undefined; // return if index is not correct
        while (index++ < thisLastIndex) thisData[index - 1] = thisData[index]; // shift items
        thisData.length--; // decrease data array length
    }
    return value;
}


/*!
 * \brief Remove the first item in the list.
 * \return value of removed item
 */
List.prototype.takeFirst = function() { return this.takeAt(0); }


/*!
 * \brief Remove the last item in the list.
 * \return value of removed item
 */
List.prototype.takeLast = function() { return this.takeAt(this.__qkit__data.length - this.__qkit__firstIndex - 1); }


/*!
 * \brief Generate an array with the data contained in this list.
 * \return generated Array instance
 */
List.prototype.toArray = function() {
    var array = []; // result array
    var thisData = this.__qkit__data; // data array of this list
    var thisFirstIndex = this.__qkit__firstIndex; // first item index of this list
    var index = thisData.length; // iterator
    var arrayIndex = index - thisFirstIndex; // array's iterator
    while (index-- > thisFirstIndex) array[--arrayIndex] = thisData[index]; // copy all values
    return array;
}


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
List.prototype.toString = function() { return '[' + this.toArray().toString() + ']'; }


/*!
 * \brief Get value by index.
 * \return the value in the list or defaultValue
 * \param index position of the value
 * \param defaultValue value to return if index is out of the bounds
 */
List.prototype.value = function(index, defaultValue) {
    if (index === undefined) return undefined; // return if position is undefined
    index = Math.floor(index) + this.__qkit__firstIndex; // make index integer and internal
    if (index < this.__qkit__firstIndex || index >= this.__qkit__data.length) return defaultValue; // return default value if index is not valid
    return this.__qkit__data[index]; // return value from the data array
}

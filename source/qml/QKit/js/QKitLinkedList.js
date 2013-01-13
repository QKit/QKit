/*******************************************************************************
*                                                                              *
*  LinkedList class implementation.                                            *
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
 * \brief LinkedList class.
 */
/*!
 * LinkedList()
 * \brief Construct an empty list.
 */
/*!
 * LinkedList(array)
 * \brief Construct a list with values from an array.
 * \param array Array instance
 */
/*!
 * LinkedList(list)
 * \brief Construct a copy of list.
 * \param list the list to copy
 */
function LinkedList() {
    var thisData; // this data array
    var thisSize; // this size
    if (arguments[0] instanceof LinkedList) { // if LinkedList(list)
        var list = arguments[0]; // the other list
        if (!(this instanceof LinkedList)) return new LinkedList(list); // create new object if function was called without 'new' operator
        LinkedList.superClass.apply(this); // super class constructor
        var listData = list.__qkit__data; // list's data array
        var listItem = listData[list.__qkit__firstIndex]; // list's iterator
        if (listItem === null) { // if list is empty
            this.__qkit__data = [null]; // data array
            this.__qkit__firstIndex = 0; // first item index
            this.__qkit__lastIndex = 0; // last item index
            this.__qkit__size = 0; // size of this list
        } else { // if list is not empty
            thisData = [null, {prevIndex: 0, nextIndex: 0, value: listItem.value}]; // this data array
            thisSize = 1; // this size
            for (listItem = listData[listItem.nextIndex]; listItem !== null; listItem = listData[listItem.nextIndex]) { // for all list's items
                thisData[thisSize++].nextIndex = thisSize;
                thisData[thisSize] = {prevIndex: thisSize - 1, nextIndex: 0, value: listItem.value}
            }
            this.__qkit__data = thisData; // this data array
            this.__qkit__firstIndex = 1; // first item index
            this.__qkit__lastIndex = thisSize; // last item index
            this.__qkit__size = thisSize; // size of this list
        }
    } else if (arguments[0] instanceof Array) { // if LinkedList(array)
        var array = arguments[0]; // the array
        if (!(this instanceof LinkedList)) return new LinkedList(array); // create new object if function was called without 'new' operator
        LinkedList.superClass.apply(this); // super class constructor
        thisData = [null]; // this data array
        thisSize = 0; // this size
        array.forEach( // for each item of the array
            function(value) { // callback
                if (thisSize++) thisData[thisSize - 1].nextIndex = thisSize;
                thisData[thisSize] = {prevIndex: thisSize - 1, nextIndex: 0, value: value}
            }
        );
        this.__qkit__data = thisData; // this data array
        this.__qkit__firstIndex = thisSize > 0 ? 1 : 0; // first item index
        this.__qkit__lastIndex = thisSize; // last item index
        this.__qkit__size = thisSize; // size of this list
    } else { // if LinkedList()
        if (!(this instanceof LinkedList)) return new LinkedList(); // create new object if function was called without 'new' operator
        LinkedList.superClass.apply(this); // super class constructor
        this.__qkit__data = [null]; // data array
        this.__qkit__firstIndex = 0; // first item index
        this.__qkit__lastIndex = 0; // last item index
        this.__qkit__size = 0; // size of this list
    }
}
LinkedList.inheritFrom(Object); // super class


/*!
 * \brief Insert a value at the end of this list.
 * \return this list
 * \param value the value to insert (if is an instance of LinkedList al it values will be added)
 */
LinkedList.prototype.append = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    var thisData = this.__qkit__data; // this data array
    if (value instanceof LinkedList) { // if value is a LinkedList instance
        if (!value.__qkit__size) return this; // return if value list is empty
        var valueItem = value.__qkit__firstItem; // value list iterator
        var item = this.__qkit__lastItem; // this list iterator
        if (item === null) { // if this list is empty
            item = {prev: null, next: null, value: valueItem.value}; // new item
            this.__qkit__firstItem = item; // update this first item
            valueItem = valueItem.next; // update iterator
        }
        for (; valueItem !== null; valueItem = valueItem.next) { // for all value's items
            item.next = {prev: item, next: null, value: valueItem.value}; // new item
            item = item.next; // update iterator
        }
        this.__qkit__lastItem = item; // update this last item
        this.__qkit__size += value.__qkit__size; // increase this size
    } else { // if value is not a LinkedList instance
        var newIndex = thisData.length; // index of new item
        thisData[newIndex] = {prevIndex: this.__qkit__lastIndex, nextIndex: 0, value: value}; // new item
        if (this.__qkit__size++) { // if this list is not empty
            thisData[this.__qkit__lastIndex].nextIndex = newIndex;
        } else { // if this list is empty
            this.__qkit__firstIndex = newIndex; // update this first index
        }
        this.__qkit__lastIndex = newIndex; // update this last index
    }
    return this;
}


/*!
 * \brief Remove all the items from the list.
 * \return this list
 */
LinkedList.prototype.clear = function() {
    this.__qkit__data.length = 1; // resize data array
    this.__qkit__firstIndex = 0; // first item index
    this.__qkit__lastIndex = 0; // last item index
    this.__qkit__size = 0; // size of this list
    return this;
}


/*!
 * \brief Check that the list contains the given value.
 * \return true if the list contains an occurrence of the value, otherwise returns false
 * \param value the value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
LinkedList.prototype.contains = function(value, compareFunction) {
    if (value === undefined) return false; // return if value is undefined
    if (!this.__qkit__size) return false; // return if this list is empty
    var thisData = this.__qkit__data; // this data array
    var item; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        for (item = thisData[this.__qkit__firstIndex]; item !== null; item = thisData[item.nextIndex]) { // foa all items
            if (item.value === value) return true; // return true if item is found
        }
    } else { // in compare function is defined
        for (item = thisData[this.__qkit__firstIndex]; item !== null; item = thisData[item.nextIndex]) { // foa all items
            if (compareFunction(item.value, value)) return true; // return true if item is found
        }
    }
    return false; // false if nothing was found
}


/*!
 * \brief Get the number of items in the list.
 * \return the number of occurrences of value in the list
 * \param value value to check, if undefined count of all items will be returned
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
LinkedList.prototype.count = function(value, compareFunction) {
    if (value === undefined) return this.__qkit__size; // return the size if value is undefined
    var count = 0; // total count
    var thisData = this.__qkit__data; // this data array
    var item; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        for (item = thisData[this.__qkit__firstIndex]; item !== null; item = thisData[item.nextIndex]) { // foa all items
            if (item.value === value) count++; // increase the count if item is found
        }
    } else { // in compare function is defined
        for (item = thisData[this.__qkit__firstIndex]; item !== null; item = thisData[item.nextIndex]) { // foa all items
            if (compareFunction(item.value, value)) count++; // increase the count if item is found
        }
    }
    return count;
}


/*!
 * \brief Compare the last list item with the given value.
 * \return true if this list is not empty and its last item is equal to value, false otherwise
 * \param value value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
LinkedList.prototype.endsWith = function(value, compareFunction) {
    if (this.__qkit__size === 0) return false; // return if this list is empty
    if (compareFunction === undefined) { // if compare function is undefined
        return this.__qkit__data[this.__qkit__lastIndex].value === value;
    } else { // if compare function id defined
        return compareFunction(this.__qkit__data[this.__qkit__lastIndex].value, value);
    }
}


/*!
 * \brief Compare this list with the other one.
 * \return true if both lists contain the same values in the same order, false otherwise
 * \param list the list to compare with
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
LinkedList.prototype.equals = function(list, compareFunction) {
    if (!(list instanceof LinkedList)) return undefined; // return if type is not valid
    if (this.__qkit__size !== list.__qkit__size) return false; // return false if the sizes are not equal
    var thisData = this.__qkit__data; // this data array
    var item = thisData[this.__qkit__firstIndex]; // this iterator
    if (item === null) return true; // return true if the lists are empty
    var listData = this.__qkit__data; // this data array
    var listItem = listData[list.__qkit__firstIndex]; // list's iterator
    if (compareFunction === undefined) { // if compare function is not defined
        for (; item !== null; item = thisData[item.nextIndex], listItem = listData[listItem.nextIndex]) if (item.value !== listItem.value) return false; // return false if some values are not equal
    } else { // if compare function is defined
        for (; item !== null; item = thisData[item.nextIndex], listItem = listData[listItem.nextIndex]) if (!compareFunction(item.value, listItem.value)) return false; // return false if some values are not equal
    }
    return true; // return true if no differences were found
}


/*!
 * \brief Get the first item.
 * \return the first item in the list
 */
LinkedList.prototype.first = function() { return this.__qkit__size === 0 ? undefined : this.__qkit__data[this.__qkit__firstIndex].value; }


/*!
 * \brief Executes a provided function once per each list item.
 * \return this list
 * \param callback function to execute for each item - function(value, index, list)
 * \param thisArg object to use as this when executing callback
 */
LinkedList.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    var data = this.toArray(); // this data as Array
    var length = data.length; // data length
    var index = -1; // iterator
    while (++index < length) callback.apply(thisArg, [data[index], index, this]); // apply callback function to each item
    return this;
}


/*!
 * \brief Test the list for emptiness.
 * \return true if the list has size 0, false otherwise
 */
LinkedList.prototype.isEmpty = function() { return this.__qkit__size === 0; }


/*!
 * \brief Get the last item.
 * \return the last item in the list
 */
LinkedList.prototype.last = function() { return this.__qkit__size === 0 ? undefined : this.__qkit__data[this.__qkit__lastIndex].value; }


/*!
 * \brief Insert a value at the beginning of this list.
 * \return this list
 * \param value the value to insert
 */
LinkedList.prototype.prepend = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    var thisData = this.__qkit__data; // this data array
    var newIndex = thisData.length; // index of new item
    thisData[newIndex] = {prevIndex: 0, nextIndex: this.__qkit__firstIndex, value: value}; // new item
    if (this.__qkit__size++) { // if this list is not empty
        thisData[this.__qkit__firstIndex].prevIndex = newIndex;
    } else { // if this list is empty
        this.__qkit__lastIndex = newIndex; // update this first index
    }
    this.__qkit__firstIndex = newIndex; // update this last index
    return this;
}


/*!
 * \brief Removes all occurrences of value in the list.
 * \return the number of entries removed
 * \param value the value to remove
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
LinkedList.prototype.removeAll = function(value, compareFunction) {
    if (value === undefined) return 0; // return of value is undefined
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var count = 0; // count of removed items
    var thisData = this.__qkit__data; // this data array
    var firstIndex = this.__qkit__firstIndex; // iterator of the first item
    while (firstIndex !== 0 && compareFunction(thisData[firstIndex].value, value)) { // for first items with value
        var nextIndex = thisData[firstIndex].nextIndex; // next indexdex
        delete thisData[firstIndex]; // delete item from this data array
        firstIndex = nextIndex; // update iterator
        count++; // increase the count of removed
    }
    this.__qkit__firstIndex = firstIndex // update this first item index
    if (firstIndex === 0) { // if all items were removed
        this.__qkit__lastIndex = 0; // update the last item index
        this.__qkit__size = 0; // no more items
        return count;
    }
    thisData[firstIndex].prevIndex = 0; // the first item doesn't have previous
    var lastIndex = this.__qkit__lastIndex; // iterator of the last item
    while (lastIndex !== 0 && compareFunction(thisData[lastIndex].value, value)) { // for last items with value
        var prevIndex = thisData[lastIndex].prevIndex; // previous index
        delete thisData[lastIndex]; // delete item from this data array
        lastIndex = prevIndex; // update iterator
        count++; // increase the count of removed
    }
    this.__qkit__lastIndex = lastIndex; // update this last item index
    thisData[lastIndex].nextIndex = 0; // the last item doesn't have next
    if (lastIndex === firstIndex) { // if only one item rest
        this.__qkit__size = 1; // update the size
        return count;
    }
    var index = thisData[firstIndex].nextIndex;
    while (index !== lastIndex) { // for all items between first and last
        var item = thisData[index]; // item
        if (compareFunction(item.value, value)) { // if item to remove
            prevIndex = item.prevIndex; // previous item index
            nextIndex = item.nextIndex; // next item index
            thisData[prevIndex].nextIndex = nextIndex;
            thisData[nextIndex].prevIndex = prevIndex;
            delete thisData[index]; // delete item from this data array
            index = nextIndex; // update iterator
            count++; // increase the count of removed
        } else { // if item to left
            index = item.nextIndex; // update iterator
        }
    }
    this.__qkit__size -= count; // decrease the size
    return count;
}


/*!
 * \brief Remove the first item in the list.
 * \return this list
 */
LinkedList.prototype.removeFirst = function() {
    var firstIndex = this.__qkit__firstIndex; // this first item index
    if (firstIndex === 0) return; // return if this list is empty
    var thisData = this.__qkit__data; // this data array
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__firstIndex = thisData[firstIndex].nextIndex; // update this first item index
        thisData[this.__qkit__firstIndex].prevIndex = 0; // the first item doesn't have previous
    } else { // if all elements will be removed
        this.__qkit__firstIndex = 0; // update this first item index
        this.__qkit__lastIndex = 0; // update this last item index
    }
    delete thisData[firstIndex]; // delete item from this data array
    return this;
}


/*!
 * \brief Remove the last item in the list.
 * \return this list
 */
LinkedList.prototype.removeLast = function() {
    var lastIndex = this.__qkit__lastIndex; // this last item index
    if (lastIndex === 0) return; // return if this list is empty
    var thisData = this.__qkit__data; // this data array
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__lastIndex = thisData[lastIndex].prevIndex; // update this last item index
        thisData[this.__qkit__lastIndex].nextIndex = 0; // the last item doesn't have next
    } else { // if all elements will be removed
        this.__qkit__firstIndex = 0; // update this first item index
        this.__qkit__lastIndex = 0; // update this last item index
    }
    delete thisData[lastIndex]; // delete item from this data array
    return this;
}


/*!
 * \brief Remove the first occurrence of the given value in the list.
 * \return true on success, false otherwise
 * \param value the value to delete
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
LinkedList.prototype.removeOne = function(value, compareFunction) {
    if (value === undefined) return undefined; // return if value is undefined
    if (this.__qkit__size === 0) return false; // return if list is empty
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    var thisData = this.__qkit__data; // this data array
    var index = this.__qkit__firstIndex; // iterator
    while (index) { // while item exists
        var item = thisData[index]; // this item
        if (compareFunction(item.value, value)) { // if item to remove
            if (index === this.__qkit__firstIndex) { // if first item
                this.removeFirst(); // remove this first item
            } else if (index === this.__qkit__lastIndex) { // if last item
                this.removeLast(); // remove this last item
            } else { // if middle item
                var prevIndex = item.prevIndex; // previous item index
                var nextIndex = item.nextIndex; // next item index
                thisData[prevIndex].nextIndex = nextIndex;
                thisData[nextIndex].prevIndex = prevIndex;
                delete thisData[index]; // delete item from this data array
                this.__qkit__size--; // decrease the size
            }
            return true; // an item was removed
        }
        index = item.nextIndex; // update iterator
    }
    return false; // no item was removed
}


/*!
 * \brief Get lists size.
 * \return the number of items in the list
*/
LinkedList.prototype.size = function() { return this.__qkit__size; }


/*!
 * \brief Compare the first list item with the given value.
 * \return true if this list is not empty and its first item is equal to value, false otherwise
 * \param value value to check
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
LinkedList.prototype.startsWith = function(value, compareFunction) {
    if (this.__qkit__size === 0) return false; // return if this list is empty
    if (compareFunction === undefined) { // if compare function is undefined
        return this.__qkit__data[this.__qkit__firstIndex].value === value;
    } else { // if compare function id defined
        return compareFunction(this.__qkit__data[this.__qkit__firstIndex].value, value);
    }
}


/*!
 * \brief Swap other list with this list.
 * \return this list
 * \param list the list to swap with
 */
LinkedList.prototype.swap = function(list) {
    if (!(list instanceof LinkedList)) return; // return if type is not valid
    var temp = this.__qkit__data; // backup this data array
    this.__qkit__data = list.__qkit__data; // update this data array
    list.__qkit__data = temp; // update list data array
    temp = this.__qkit__firstIndex; // backup this first item index
    this.__qkit__firstIndex = list.__qkit__firstIndex; // update this first item index
    list.__qkit__firstIndex = temp; // update list first item index
    temp = this.__qkit__lastIndex; // backup this last item index
    this.__qkit__lastIndex = list.__qkit__lastIndex; // update this last item index
    list.__qkit__lastIndex = temp; // update list last item index
    temp = this.__qkit__size; // backup this size
    this.__qkit__size = list.__qkit__lastItem; // update this size
    list.__qkit__size = temp; // update list size
    return this;
}


/*!
 * \brief Remove the first item in the list.
 * \return value of removed item
 */
LinkedList.prototype.takeFirst = function() {
    var firstIndex = this.__qkit__firstIndex; // this first item index
    if (firstIndex === 0) return undefined; // return if this list is empty
    var thisData = this.__qkit__data; // this data array
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__firstIndex = thisData[firstIndex].nextIndex; // update this first item index
        thisData[this.__qkit__firstIndex].prevIndex = 0; // the first item doesn't have previous
    } else { // if all elements will be removed
        this.__qkit__firstIndex = 0; // update this first item index
        this.__qkit__lastIndex = 0; // update this last item index
    }
    var value = thisData[firstIndex].value; // item's value
    delete thisData[firstIndex]; // delete item from this data array
    return value;
}


/*!
 * \brief Remove the last item in the list.
 * \return value of removed item
 */
LinkedList.prototype.takeLast = function() {
    var lastIndex = this.__qkit__lastIndex; // this last item index
    if (lastIndex === 0) return; // return if this list is empty
    var thisData = this.__qkit__data; // this data array
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__lastIndex = thisData[lastIndex].prevIndex; // update this last item index
        thisData[this.__qkit__lastIndex].nextIndex = 0; // the last item doesn't have next
    } else { // if all elements will be removed
        this.__qkit__firstIndex = 0; // update this first item index
        this.__qkit__lastIndex = 0; // update this last item index
    }
    var value = thisData[lastIndex].value; // item's value
    delete thisData[lastIndex]; // delete item from this data array
    return value;
}


/*!
 * \brief Generate an array with the data contained in this list.
 * \return generated Array instance
 */
LinkedList.prototype.toArray = function() {
    var array = []; // result array
    var thisData = this.__qkit__data; // this data array
    for(var item = thisData[this.__qkit__firstIndex]; item !== null; item = thisData[item.nextIndex]) array.push(item.value); // add all values to the array
    return array;
}


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
LinkedList.prototype.toString = function() { return '[' + this.toArray().toString() + ']'; }

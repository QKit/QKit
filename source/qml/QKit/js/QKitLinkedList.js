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
 * LinkedList(equalsFunction)
 * \brief Construct an empty list.
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * LinkedList(array, equalsFunction)
 * \brief Construct a list with values from an array.
 * \param array Array instance
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * LinkedList(other, equalsFunction)
 * \brief Construct a copy of list.
 * \param other the list to copy
 * \param equalsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.LinkedList = function() {
    var equalsFunction = QKit.__equalsFunction; // default compare function
    if (arguments[0] instanceof QKit.LinkedList) { // if LinkedList(other, equalsFunction)
        var other = arguments[0]; // the other list
        equalsFunction = arguments[1] instanceof Function ? arguments[1] : other.__qkit__equalsFunction; // this values compare function
        if (!(this instanceof QKit.LinkedList)) return new QKit.LinkedList(other, equalsFunction); // create new object if function was called without 'new' operator
        QKit.LinkedList.superClass.constructor.apply(this); // super class constructor
        var otherData = other.__qkit__data; // list's data array
        var otherItem = otherData[other.__qkit__firstIndex]; // list's iterator
        if (otherItem === null) { // if list is empty
            this.__qkit__data = [null]; // data array
            this.__qkit__firstIndex = 0; // first item index
            this.__qkit__lastIndex = 0; // last item index
            this.__qkit__size = 0; // size of this list
        } else { // if list is not empty
            var thisData = [null, {prevIndex: 0, nextIndex: 0, value: otherItem.value}]; // this data array
            var thisSize = 1; // this size
            for (otherItem = otherData[otherItem.nextIndex]; otherItem !== null; otherItem = otherData[otherItem.nextIndex]) { // for all list's items
                thisData[thisSize++].nextIndex = thisSize;
                thisData[thisSize] = {prevIndex: thisSize - 1, nextIndex: 0, value: otherItem.value}
            }
            this.__qkit__data = thisData; // this data array
            this.__qkit__firstIndex = 1; // first item index
            this.__qkit__lastIndex = thisSize; // last item index
            this.__qkit__size = thisSize; // size of this list
        }
    } else if (arguments[0] instanceof Array) { // if LinkedList(array, equalsFunction)
        var array = arguments[0]; // the array
        if (arguments[1] instanceof Function) equalsFunction = arguments[1]; // this values compare function
        if (!(this instanceof QKit.LinkedList)) return new QKit.LinkedList(array, equalsFunction); // create new object if function was called without 'new' operator
        QKit.LinkedList.superClass.constructor.apply(this); // super class constructor
        var data = [null]; // this data array
        var size = 0; // this size
        array.forEach( // for each item of the array
            function(value) { // callback
                if (size++) data[size - 1].nextIndex = size;
                data[size] = {prevIndex: size - 1, nextIndex: 0, value: value}
            }
        );
        this.__qkit__data = data; // this data array
        this.__qkit__firstIndex = size > 0 ? 1 : 0; // first item index
        this.__qkit__lastIndex = size; // last item index
        this.__qkit__size = size; // size of this list
    } else { // if LinkedList(equalsFunction)
        if (arguments[0] instanceof Function) equalsFunction = arguments[0]; // this values compare function
        if (!(this instanceof QKit.LinkedList)) return new QKit.LinkedList(equalsFunction); // create new object if function was called without 'new' operator
        QKit.LinkedList.superClass.constructor.apply(this); // super class constructor
        this.__qkit__data = [null]; // data array
        this.__qkit__firstIndex = 0; // first item index
        this.__qkit__lastIndex = 0; // last item index
        this.__qkit__size = 0; // size of this list
    }
    this.__qkit__equalsFunction = equalsFunction; // this values compare function
}
QKit.LinkedList.inheritFrom(QKit.Object); // super class


/*!
 * \brief Insert a value at the end of this list.
 * \return this list
 * \param other the value to insert (if is an instance of LinkedList al it values will be added)
 */
QKit.LinkedList.prototype.append = function(other) {
    if (other === undefined) return undefined; // return if value is undefined
    if (other instanceof QKit.LinkedList) { // if value is a LinkedList instance
        if (!other.__qkit__size) return this; // return if other is empty
        var thisData = this.__qkit__data; // this data array
        var otherData = other.__qkit__data; // other data array
        var thisIndex = this.__qkit__lastIndex; // this last item index
        var thisItem = thisData[thisIndex]; // this iterator
        var otherItem = otherData[other.__qkit__firstIndex]; // other iterator
        if (thisItem === null) { // if this is empty
            thisItem = {prevIndex: 0, nextIndex: 0, value: otherItem.value}; // new item
            thisData.push(thisItem); // add item to this data array
            thisIndex = thisData.length - 1; // index of new item
            this.__qkit__firstIndex = thisIndex; // update this first item index
            otherItem = otherData[otherItem.nextIndex]; // update iterator
        }
        for (; otherItem !== null; otherItem = otherData[otherItem.nextIndex]) { // for all value's items
            thisData.push({prevIndex: thisIndex, nextIndex: 0, value: otherItem.value}); // new item
            thisIndex = thisData.length - 1; // index of new item
            thisItem.nextIndex = thisIndex; // update
            thisItem = thisData[thisIndex]; // update item
        }
        this.__qkit__lastIndex = thisIndex; // update this last item index
        this.__qkit__size += other.__qkit__size; // increase this size
    } else { // if value is not a LinkedList instance
        var data = this.__qkit__data; // this data array
        var index = data.length; // index of new item
        data[index] = {prevIndex: this.__qkit__lastIndex, nextIndex: 0, value: other}; // new item
        if (this.__qkit__size++) { // if this list is not empty
            data[this.__qkit__lastIndex].nextIndex = index;
        } else { // if this list is empty
            this.__qkit__firstIndex = index; // update this first index
        }
        this.__qkit__lastIndex = index; // update this last index
    }
    return this;
}


/*!
 * \brief Remove all the items from the list.
 * \return this list
 */
QKit.LinkedList.prototype.clear = function() {
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
 */
QKit.LinkedList.prototype.contains = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    if (!this.__qkit__size) return false; // return if this list is empty
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var data = this.__qkit__data; // this data array
    for (var item = data[this.__qkit__firstIndex]; item !== null; item = data[item.nextIndex]) { // foa all items
        if (equalsFunction(item.value, value)) return true; // return true if item is found
    }
    return false; // false if nothing was found
}


/*!
 * \brief Get the number of items in the list.
 * \return the number of occurrences of value in the list
 * \param value value to check, if undefined count of all items will be returned
 */
QKit.LinkedList.prototype.count = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    if (!this.__qkit__size) return 0; // return if this list is empty
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var data = this.__qkit__data; // this data array
    var count = 0; // count of items
    for (var item = data[this.__qkit__firstIndex]; item !== null; item = data[item.nextIndex]) { // foa all items
        if (equalsFunction(item.value, value)) count++; // increase count if item is found
    }
    return count; // false if nothing was found
}


/*!
 * \brief Compare the last list item with the given value.
 * \return true if this list is not empty and its last item is equal to value, false otherwise
 * \param value value to check
 */
QKit.LinkedList.prototype.endsWith = function(value) {
    if (this.__qkit__size === 0) return false; // return if this list is empty
    return this.__qkit__equalsFunction(this.__qkit__data[this.__qkit__lastIndex].value, value);
}


/*!
 * \brief Compare this list with the other one.
 * \return true if both lists contain the same values in the same order, false otherwise
 * \param other the list to compare with
 */
QKit.LinkedList.prototype.equals = function(other) {
    if (!(other instanceof QKit.LinkedList)) return undefined; // return if type is not valid
    if (this.__qkit__size !== other.__qkit__size) return false; // return false if the sizes are not equal
    var thisData = this.__qkit__data; // this data array
    var thisItem = thisData[this.__qkit__firstIndex]; // this iterator
    if (thisItem === null) return true; // return true if the lists are empty
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var otherData = this.__qkit__data; // this data array
    var otherItem = otherData[other.__qkit__firstIndex]; // list's iterator
    for (; thisItem !== null; thisItem = thisData[thisItem.nextIndex], otherItem = otherData[otherItem.nextIndex]) if (!equalsFunction(thisItem.value, otherItem.value)) return false; // return false if some values are not equal
    return true; // return true if no differences were found
}


/*!
 * \brief Get the first item.
 * \return the first item in the list
 */
QKit.LinkedList.prototype.first = function() { return this.__qkit__size === 0 ? undefined : this.__qkit__data[this.__qkit__firstIndex].value }


/*!
 * \brief Executes a provided function once per each list item.
 * \return this list
 * \param callback function to execute for each item - function(value, index, list)
 * \param thisArg object to use as this when executing callback
 */
QKit.LinkedList.prototype.forEach = function(callback, thisArg) {
    if (!(callback instanceof Function)) return undefined; // return if callback is not a function
    this.toArray().forEach(function(item, index) { callback.apply(thisArg, [item, index, this]) }, this); // apply callback for each item
    return this;
}


/*!
 * \brief Test the list for emptiness.
 * \return true if the list has size 0, false otherwise
 */
QKit.LinkedList.prototype.isEmpty = function() { return this.__qkit__size === 0 }


/*!
 * \brief Get the last item.
 * \return the last item in the list
 */
QKit.LinkedList.prototype.last = function() { return this.__qkit__size === 0 ? undefined : this.__qkit__data[this.__qkit__lastIndex].value }


/*!
 * \brief Insert a value at the beginning of this list.
 * \return this list
 * \param value the value to insert
 */
QKit.LinkedList.prototype.prepend = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    var data = this.__qkit__data; // this data array
    var newIndex = data.length; // index of new item
    data[newIndex] = {prevIndex: 0, nextIndex: this.__qkit__firstIndex, value: value}; // new item
    if (this.__qkit__size++) { // if this list is not empty
        data[this.__qkit__firstIndex].prevIndex = newIndex;
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
 */
QKit.LinkedList.prototype.removeAll = function(value) {
    if (value === undefined) return 0; // return of value is undefined
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var removedCount = 0; // count of removed items
    var thisData = this.__qkit__data; // this data array
    var firstIndex = this.__qkit__firstIndex; // iterator of the first item
    while (firstIndex !== 0 && equalsFunction(thisData[firstIndex].value, value)) { // for first items with value
        var nextIndex = thisData[firstIndex].nextIndex; // next indexdex
        delete thisData[firstIndex]; // delete item from this data array
        firstIndex = nextIndex; // update iterator
        removedCount++; // increase the count of removed
    }
    this.__qkit__firstIndex = firstIndex // update this first item index
    if (firstIndex === 0) { // if all items were removed
        this.__qkit__lastIndex = 0; // update the last item index
        this.__qkit__size = 0; // no more items
        return removedCount;
    }
    thisData[firstIndex].prevIndex = 0; // the first item doesn't have previous
    var lastIndex = this.__qkit__lastIndex; // iterator of the last item
    while (lastIndex !== 0 && equalsFunction(thisData[lastIndex].value, value)) { // for last items with value
        var prevIndex = thisData[lastIndex].prevIndex; // previous index
        delete thisData[lastIndex]; // delete item from this data array
        lastIndex = prevIndex; // update iterator
        removedCount++; // increase the count of removed
    }
    this.__qkit__lastIndex = lastIndex; // update this last item index
    thisData[lastIndex].nextIndex = 0; // the last item doesn't have next
    if (lastIndex === firstIndex) { // if only one item rest
        this.__qkit__size = 1; // update the size
        return removedCount;
    }
    var index = thisData[firstIndex].nextIndex;
    while (index !== lastIndex) { // for all items between first and last
        var item = thisData[index]; // item
        if (equalsFunction(item.value, value)) { // if item to remove
            prevIndex = item.prevIndex; // previous item index
            nextIndex = item.nextIndex; // next item index
            thisData[prevIndex].nextIndex = nextIndex;
            thisData[nextIndex].prevIndex = prevIndex;
            delete thisData[index]; // delete item from this data array
            index = nextIndex; // update iterator
            removedCount++; // increase the count of removed
        } else { // if item to left
            index = item.nextIndex; // update iterator
        }
    }
    this.__qkit__size -= removedCount; // decrease the size
    return removedCount;
}


/*!
 * \brief Remove the first item in the list.
 * \return this list
 */
QKit.LinkedList.prototype.removeFirst = function() {
    var firstIndex = this.__qkit__firstIndex; // this first item index
    if (firstIndex === 0) return; // return if this list is empty
    var data = this.__qkit__data; // this data array
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__firstIndex = data[firstIndex].nextIndex; // update this first item index
        data[this.__qkit__firstIndex].prevIndex = 0; // the first item doesn't have previous
    } else { // if all elements will be removed
        this.__qkit__firstIndex = 0; // update this first item index
        this.__qkit__lastIndex = 0; // update this last item index
    }
    delete data[firstIndex]; // delete item from this data array
    return this;
}


/*!
 * \brief Remove the last item in the list.
 * \return this list
 */
QKit.LinkedList.prototype.removeLast = function() {
    var lastIndex = this.__qkit__lastIndex; // this last item index
    if (lastIndex === 0) return; // return if this list is empty
    var data = this.__qkit__data; // this data array
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__lastIndex = data[lastIndex].prevIndex; // update this last item index
        data[this.__qkit__lastIndex].nextIndex = 0; // the last item doesn't have next
    } else { // if all elements will be removed
        this.__qkit__firstIndex = 0; // update this first item index
        this.__qkit__lastIndex = 0; // update this last item index
    }
    delete data[lastIndex]; // delete item from this data array
    return this;
}


/*!
 * \brief Remove the first occurrence of the given value in the list.
 * \return true on success, false otherwise
 * \param value the value to delete
 */
QKit.LinkedList.prototype.removeOne = function(value) {
    if (value === undefined) return undefined; // return if value is undefined
    if (this.__qkit__size === 0) return false; // return if list is empty
    var equalsFunction = this.__qkit__equalsFunction; // this values compare function
    var data = this.__qkit__data; // this data array
    var index = this.__qkit__firstIndex; // iterator
    while (index) { // while item exists
        var item = data[index]; // this item
        if (equalsFunction(item.value, value)) { // if item to remove
            if (index === this.__qkit__firstIndex) { // if first item
                this.removeFirst(); // remove this first item
            } else if (index === this.__qkit__lastIndex) { // if last item
                this.removeLast(); // remove this last item
            } else { // if middle item
                var prevIndex = item.prevIndex; // previous item index
                var nextIndex = item.nextIndex; // next item index
                data[prevIndex].nextIndex = nextIndex;
                data[nextIndex].prevIndex = prevIndex;
                delete data[index]; // delete item from this data array
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
QKit.LinkedList.prototype.size = function() { return this.__qkit__size }


/*!
 * \brief Compare the first list item with the given value.
 * \return true if this list is not empty and its first item is equal to value, false otherwise
 * \param value value to check
 */
QKit.LinkedList.prototype.startsWith = function(value) {
    if (this.__qkit__size === 0) return false; // return if this list is empty
    return this.__qkit__equalsFunction(this.__qkit__data[this.__qkit__firstIndex].value, value);
}


/*!
 * \brief Swap other list with this list.
 * \return this list
 * \param other the list to swap with
 */
QKit.LinkedList.prototype.swap = function(other) {
    if (!(other instanceof QKit.LinkedList)) return; // return if type is not valid
    var temp = this.__qkit__data; // backup this data array
    this.__qkit__data = other.__qkit__data; // update this data array
    other.__qkit__data = temp; // update other data array
    temp = this.__qkit__firstIndex; // backup this first item index
    this.__qkit__firstIndex = other.__qkit__firstIndex; // update this first item index
    other.__qkit__firstIndex = temp; // update other first item index
    temp = this.__qkit__lastIndex; // backup this last item index
    this.__qkit__lastIndex = other.__qkit__lastIndex; // update this last item index
    other.__qkit__lastIndex = temp; // update other last item index
    temp = this.__qkit__size; // backup this size
    this.__qkit__size = other.__qkit__size; // update this size
    other.__qkit__size = temp; // update other size
    temp = this.__qkit__equalsFunction; // backup this values compare function
    this.__qkit__equalsFunction = other.__qkit__equalsFunction; // update this values compare function
    other.__qkit__equalsFunction = temp; // update other values compare function
    return this;
}


/*!
 * \brief Remove the first item in the list.
 * \return value of removed item
 */
QKit.LinkedList.prototype.takeFirst = function() {
    var firstIndex = this.__qkit__firstIndex; // this first item index
    if (firstIndex === 0) return undefined; // return if this list is empty
    var data = this.__qkit__data; // this data array
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__firstIndex = data[firstIndex].nextIndex; // update this first item index
        data[this.__qkit__firstIndex].prevIndex = 0; // the first item doesn't have previous
    } else { // if all elements will be removed
        this.__qkit__firstIndex = 0; // update this first item index
        this.__qkit__lastIndex = 0; // update this last item index
    }
    var value = data[firstIndex].value; // item's value
    delete data[firstIndex]; // delete item from this data array
    return value;
}


/*!
 * \brief Remove the last item in the list.
 * \return value of removed item
 */
QKit.LinkedList.prototype.takeLast = function() {
    var lastIndex = this.__qkit__lastIndex; // this last item index
    if (lastIndex === 0) return; // return if this list is empty
    var data = this.__qkit__data; // this data array
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__lastIndex = data[lastIndex].prevIndex; // update this last item index
        data[this.__qkit__lastIndex].nextIndex = 0; // the last item doesn't have next
    } else { // if all elements will be removed
        this.__qkit__firstIndex = 0; // update this first item index
        this.__qkit__lastIndex = 0; // update this last item index
    }
    var value = data[lastIndex].value; // item's value
    delete data[lastIndex]; // delete item from this data array
    return value;
}


/*!
 * \brief Generate an array with the data contained in this list.
 * \return generated Array instance
 */
QKit.LinkedList.prototype.toArray = function() {
    var array = []; // result array
    var data = this.__qkit__data; // data array
    for (var item = data[this.__qkit__firstIndex]; item !== null; item = data[item.nextIndex]) array.push(item.value); // add all values to the array
    return array;
}


/*!
 * \brief This method that is automatically called when the object is to be represented as a text value or when an object is referred to in a manner in which a string is expected.
 * \return one string containing each item separated by commas
 */
QKit.LinkedList.prototype.toString = function() { return '[' + this.toArray().toString() + ']' }

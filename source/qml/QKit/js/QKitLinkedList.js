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
    var item; // iterator
    if (arguments[0] instanceof LinkedList) { // if LinkedList(list)
        var list = arguments[0]; // the other list
        if (!(this instanceof LinkedList)) return new LinkedList(list); // create new object if function was called without 'new' operator
        LinkedList.superClass.apply(this); // super class constructor
        var listItem = list.__qkit__firstItem; // list items iterator
        if (listItem === null) { // if list is empty
            this.clear(); // clear list
        } else { // if list is not empty
            item = {prev: null, next: null, value: listItem.value}; // new item
            this.__qkit__firstItem = item; // this list first item
            for (listItem = listItem.next; listItem !== null; listItem = listItem.next) { // for all list items
                item.next = {prev: item, next: null, value: listItem.value}; // new item in this list
                item = item.next; // go to created item
            }
            this.__qkit__lastItem = item; // this list first item
            this.__qkit__size = list.__qkit__size; // copy list size
        }
    } else if (arguments[0] instanceof Array) { // if LinkedList(array)
        if (!(this instanceof List)) return new LinkedList(arguments[0]); // create new object if function was called without 'new' operator
        LinkedList.superClass.apply(this); // super class constructor
        var size = 0; // the size of this list
        arguments[0].forEach( // for each element of the array
            function(element) { // callback
                if (size++) { // if some items are added
                    item.next = {prev: item, next: null, value: element}; // new item in this list
                    item = item.next; // go to created item
                } else { // if it is the first element
                    item = {prev: null, next: null, value: listItem.value}; // new item
                    this.__qkit__firstItem = item; // this list first item
                }
            }
        );
        if (size) { // if some elements are added
            this.__qkit__lastItem = item; // this list last item
            this.__qkit__size = size; // list size
        } else { // if no elements are added
            this.clear(); // clear list
        }
    } else { // if LinkedList()
        if (!(this instanceof LinkedList)) return new LinkedList(); // create new object if function was called without 'new' operator
        LinkedList.superClass.apply(this); // super class constructor
        this.clear(); // clear list
    }
}
LinkedList.inheritFrom(Object); // super class


/*!
 * \brief Destructor.
 * \param doNotify send destroyed signal or not (true by default)
 */
LinkedList.prototype.destroy = function(doNotify) {
    if (doNotify === undefined || doNotify) this.destroyed(); // destroyed signal
    this.clear(); // clear this list
    LinkedList.superClass.destroy.apply(this, [false]); // super class destructor
}


/*!
 * \brief Insert a value at the end of the list.
 * \param value the value to insert (if is an instance of LinkedList al it values will be added)
 */
LinkedList.prototype.append = function(value) {
    if (value === undefined) return; // return if value is undefined
    if (this.__qkit__size++) { // if this list is not empty
        this.__qkit__lastItem.next = {prev: this.__qkit__lastItem, next: null, value: value}; // new item in this list
        this.__qkit__lastItem = this.__qkit__lastItem.next; // update this list last item
    } else { // if this list is empty
        this.__qkit__firstItem = {prev: null, next: null, value: value}; // new item in this list
        this.__qkit__lastItem = this.__qkit__firstItem; // update this list last item
    }
}


/*!
 * \brief Remove all the items from the list.
 */
LinkedList.prototype.clear = function() {
    if (this.__qkit__firstItem !== undefined) { // if this list is constructed
        var item = this.__qkit__firstItem; // iterator
        while (item !== null) { // while there are items
            var nextItem = item.next; // next item
            delete item.prev; // delete link to previous item
            delete item.next; // delete link to next item
            item = nextItem; // go to next item
        }
    }
    this.__qkit__firstIndex = null; // first item index
    this.__qkit__lastIndex = null; // last item index
    this.__qkit__size = 0; // size of this list
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
    var item; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        for (item = this.__qkit__firstItem; item !== null; item = item.next) { // foa all items
            if (item.value === value) return true; // return true if item is found
        }
    } else { // in compare function is defined
        for (item = this.__qkit__firstItem; item !== null; item = item.next) { // foa all items
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
    var item; // iterator
    if (compareFunction === undefined) { // in compare function is undefined
        for (item = this.__qkit__firstItem; item !== null; item = item.next) { // foa all items
            if (item.value === value) count++; // increase the count if item is found
        }
    } else { // in compare function is defined
        for (item = this.__qkit__firstItem; item !== null; item = item.next) { // foa all items
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
    if (this.__qkit__lastItem === null) return false; // return if this list is empty
    if (compareFunction === undefined) { // if compare function is undefined
        return this.__qkit__lastItem.value === value;
    } else { // if compare function id defined
        return compareFunction(this.__qkit__lastItem.value, value);
    }
}


/*!
 * \brief Get the first item.
 * \return the first item in the list
 */
LinkedList.prototype.first = function() { return this.__qkit__firstItem === null ? undefined : this.__qkit__firstItem.value; }


/*!
 * \brief Executes a provided function once per each list item.
 * \param callback function to execute for each item - function(value, index, list)
 * \param thisArg object to use as this when executing callback
 */
LinkedList.prototype.forEach = function(callback, thisArg) {
    if ((callback === undefined) || !(callback instanceof Function)) return; // return if callback is not a function
    if (!this.__qkit__size) return false; // return if this list is empty
    var data = []; // data array reversed copy
    for (var item = this.__qkit__lastItem; item !== null; item = item.prev) { // foa all items
        data.push(item.value); // add items value to the copy
    }
    var index = data.length; // to the end of copy
    var lastIndex = index - 1; // last index of the data array
    while (index--) callback.apply(thisArg, [data[index], lastIndex - index, this]); // apply callback function to each item
}


/*!
 * \brief Test the list for emptiness.
 * \return true if the list has size 0, false otherwise
 */
LinkedList.prototype.isEmpty = function() { return !this.__qkit__size; }


/*!
 * \brief Get the last item.
 * \return the last item in the list
 */
LinkedList.prototype.last = function() { return this.__qkit__lastItem === null ? undefined : this.__qkit__lastItem.value; }


/*!
 * \brief Insert a value at the beginning of the list.
 * \param value the value to insert
 */
LinkedList.prototype.prepend = function(value) {
    if (value === undefined) return; // return if value is undefined
    if (this.__qkit__size++) { // if this list is not empty
        this.__qkit__firstItem.prev = {prev: null, next: this.__qkit__firstItem, value: value}; // new item in this list
        this.__qkit__firstItem = this.__qkit__firstItem.prev; // update this list first item
    } else { // if this list is empty
        this.__qkit__firstItem = {prev: null, next: null, value: value}; // new item in this list
        this.__qkit__lastItem = this.__qkit__firstItem; // update this list last item
    }
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
    var firstItem = this.__qkit__firstItem; // iterator of the first item
    while (firstItem !== null && compareFunction(firstItem.value, value)) { // for first items with value
        var itemNext = firstItem.next; // next item
        delete firstItem.prev; // delete link to previous item
        delete firstItem.next; // delete link to next item
        firstItem = itemNext; // go to the next item
        count++; // increase the count of removed
    }
    this.__qkit__firstItem = firstItem; // update the first item
    if (firstItem === null) { // if all items were removed
        this.__qkit__lastItem = null; // update the last item
        this.__qkit__size = 0; // no more items
        return count;
    }
    firstItem.prev = null; // the first item doesn't have previous
    var lastItem = this.__qkit__lastItem; // iterator of the last item
    while (lastItem !== null && compareFunction(lastItem.value, value)) { // for last items with value
        var itemPrev = lastItem.prev; // previous item
        delete lastItem.prev; // delete link to previous item
        delete lastItem.next; // delete link to next item
        lastItem = itemPrev; // go to the previous item
        count++; // increase the count of removed
    }
    this.__qkit__lastItem = lastItem; // update the last item
    lastItem.next = null; // the last item doesn't have next
    if (lastItem === firstItem) { // if only one item rest
        this.__qkit__size = 1; // update the size
        return count;
    }
    var item = firstItem.next;
    while (item !== lastItem) { // for all items between first and last
        if (compareFunction(item.value, value)) { // if item to remove
            itemPrev = item.prev; // previous item
            delete item.prev; // delete link to previous item
            itemNext = item.next; // next item
            delete item.next; // delete link to next item
            itemPrev.next = itemNext;
            itemNext.prev = itemPrev;
            item = itemNext; // go to the next item
            count++; // increase the count of removed
        } else { // if item to left
            item = item.next; // next item
        }
    }
    this.__qkit__size -= count; // decrease the size
    return count;
}


/*!
 * \brief Remove the first item in the list.
 */
LinkedList.prototype.removeFirst = function() {
    var firstItem = this.__qkit__firstItem; // this first item
    if (firstItem === null) return; // return if this list is empty
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__firstItem = firstItem.next; // update this first item
        this.__qkit__firstItem.prev = null; // the first item doesn't have previous
    } else { // if all elements will be removed
        this.__qkit__firstItem = null; // update this first item
        this.__qkit__lastItem = null; // update this last item
    }
    delete firstItem.prev; // delete link to previous item
    delete firstItem.next; // delete link to next item
}


/*!
 * \brief Remove the last item in the list.
 */
LinkedList.prototype.removeLast = function() {
    var lastItem = this.__qkit__lastItem; // this last item
    if (lastItem === null) return; // return if this list is empty
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__lastItem = lastItem.prev; // update this last item
        this.__qkit__lastItem.next = null; // the last item doesn't have next
    } else { // if all elements will be removed
        this.__qkit__firstItem = null; // update this first item
        this.__qkit__lastItem = null; // update this last item
    }
    delete lastItem.prev; // delete link to previous item
    delete lastItem.next; // delete link to next item
}


/*!
 * \brief Remove the first occurrence of the given value in the list.
 * \return true on success, false otherwise
 * \param value the value to delete
 * \param compareFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
LinkedList.prototype.removeOne = function(value, compareFunction) {
    if (value === undefined) return false; // return if value is undefined
    if (!this.__qkit__size) return false; // return if list is empty
    if (compareFunction === undefined) compareFunction = function(value1, value2) { return value1 === value2; } // use strict equality if compare function is undefined
    for (var item = this.__qkit__firstItem; item !== null; item = item.next) { // for all items
        if (compareFunction(item.value, value)) { // if item to remove
            if (item === this.__qkit__firstItem) { // if first item
                this.removeFirst(); // remove this first item
            } else if (item === this.__qkit__lastItem) { // if last item
                this.removeLast(); // remove this last item
            } else { // if middle item
                var itemPrev = item.prev; // previous item
                delete item.prev; // delete link to previous item
                var itemNext = item.next; // next item
                delete item.next; // delete link to next item
                itemPrev.next = itemNext;
                itemNext.prev = itemPrev;
            }
            this.__qkit__size--; // decrease the size
            return true; // an item was removed
        }
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
    if (this.__qkit__firstItem === null) return false; // return if this list is empty
    if (compareFunction === undefined) { // if compare function is undefined
        return this.__qkit__firstItem.value === value;
    } else { // if compare function id defined
        return compareFunction(this.__qkit__firstItem.value, value);
    }
}


/*!
 * \brief Swap other list with this list.
 * \param list the list to swap with
 */
LinkedList.prototype.swap(list) = function() {
    if (list instanceof LinkedList) return; // return if type is not valid
    var temp = this.__qkit__firstItem; // backup this first item
    this.__qkit__firstItem = list.__qkit__firstItem; // update this first item
    list.__qkit__firstItem = temp; // update list first item
    temp = this.__qkit__lastItem; // backup this last item
    this.__qkit__lastItem = list.__qkit__lastItem; // update this last item
    list.__qkit__lastItem = temp; // update list last item
    temp = this.__qkit__size; // backup this size
    this.__qkit__size = list.__qkit__lastItem; // update this size
    list.__qkit__size = temp; // update list size
}


/*!
 * \brief Remove the first item in the list.
 * \return value of removed item
 */
LinkedList.prototype.takeFirst = function() {
    var firstItem = this.__qkit__firstItem; // this first item
    if (firstItem === null) return undefined; // return if this list is empty
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__firstItem = firstItem.next; // update this first item
        this.__qkit__firstItem.prev = null; // the first item doesn't have previous
    } else { // if all elements will be removed
        this.__qkit__firstItem = null; // update this first item
        this.__qkit__lastItem = null; // update this last item
    }
    delete firstItem.prev; // delete link to previous item
    delete firstItem.next; // delete link to next item
    return firstItem.value; // return items value
}


/*!
 * \brief Remove the last item in the list.
 * \return value of removed item
 */
LinkedList.prototype.takeLast = function() {
    var lastItem = this.__qkit__lastItem; // this last item
    if (lastItem === null) return; // return if this list is empty
    if (--this.__qkit__size) { // if not all elements will be removed
        this.__qkit__lastItem = lastItem.prev; // update this last item
        this.__qkit__lastItem.next = null; // the last item doesn't have next
    } else { // if all elements will be removed
        this.__qkit__firstItem = null; // update this first item
        this.__qkit__lastItem = null; // update this last item
    }
    delete lastItem.prev; // delete link to previous item
    delete lastItem.next; // delete link to next item
    return lastItem.value; // return items value
}

/*******************************************************************************
*                                                                              *
*  MultiHash class implementation.                                             *
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
 * \brief MultiHash class.
 */
/*!
 * MultiHash(hashFunction, keyEqualsFunction, valueEqualsFunction)
 * \brief Construct an empty hash.
 * \param hashFunction function to calculate string hash - function(value), if undefined value.toString() will be used
 * \param keyEqualsFunction function, used to compare two keys (true if equal, false otherwise), if undefined strict equality (===) will be used
 * \param valueEqualsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
/*!
 * MultiHash(other, hashFunction, keyEqualsFunction, valueEqualsFunction)
 * \brief Construct a copy of hash.
 * \param other the hash to copy
 * \param hashFunction function to calculate string hash - function(value), if undefined value.toString() will be used
 * \param keyEqualsFunction function, used to compare two keys (true if equal, false otherwise), if undefined strict equality (===) will be used
 * \param valueEqualsFunction function, used to compare two values (true if equal, false otherwise), if undefined strict equality (===) will be used
 */
QKit.MultiHash = function() {
    if (arguments[0] instanceof QKit.Hash) { // if MultiHash(other, hashFunction, keyEqualsFunction, valueEqualsFunction)
        var other = arguments[0]; // the other hash
        if (!(this instanceof QKit.MultiHash)) return new QKit.MultiHash(other, arguments[1], arguments[2], arguments[2]); // create new object if function was called without 'new' operator
        QKit.MultiHash.superClass.constructor.apply(this, [arguments[1], arguments[2], arguments[2]]); // super class constructor
        this.unite(other); // add other items to this
    } else { // if MultiHash(hashFunction, keyEqualsFunction, valueEqualsFunction)
        if (!(this instanceof QKit.MultiHash)) return new QKit.MultiHash(arguments[0], arguments[1], arguments[2]); // create new object if function was called without 'new' operator
        QKit.MultiHash.superClass.constructor.apply(this, arguments); // super class constructor
    }
}
QKit.MultiHash.inheritFrom(QKit.Hash); // super class


/*!
 * \brief Check a key-value in this hash.
 * \return true true if this hash contains an item with the given key and the given value, false otherwise
 * \param key the key to check
 * \param value the value to check, if undefined only key will be checked
 */
QKit.MultiHash.prototype.contains = function(key, value) {
    if (key === undefined) return undefined; // return if key is undefined
    if (value === undefined) return QKit.MultiHash.superClass.contains.apply(this, arguments); // return key contains if value is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // values array for the hash
    if (hashArray === undefined) return false; // return if no values with the hash
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    var valueEqualsFunction = this.__qkit__valueEqualsFunction; // values compare function
    var contains = false; // result
    hashArray.some( // for all keys with the hash string
        function(hashItem) { // callback
            if (!keyEqualsFunction(hashItem.key, key)) return false; // return if key isn't found
            contains = hashItem.values.some(function(valuesItem) { return valueEqualsFunction(valuesItem, value) }); // try to find value
            return true;
        }
    );
    return contains;
}


/*!
 * \brief Get items count.
 * \return the number of items associated with key
 * \param key the key items associated with, in undefined all items will be count
 * \param value the value items associated with, if undefined all items associated with the key will be count
 */
QKit.MultiHash.prototype.count = function(key, value) {
    if (key === undefined) return this.__qkit__size; // return total count if key is undefined
    if (value === undefined) return QKit.MultiHash.superClass.count.apply(this, arguments); // return count of all items associated with the key if value is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // values array for the hash
    if (hashArray === undefined) return 0; // return if no values with the hash
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    var valueEqualsFunction = this.__qkit__valueEqualsFunction; // values compare function
    var count = 0; // result
    hashArray.some( // for all keys with the hash string
        function(hashItem) { // callback
            if (!keyEqualsFunction(hashItem.key, key)) return false; // return if key isn't found
            hashItem.values.forEach(function(valuesItem) { if (valueEqualsFunction(valuesItem, value)) count++ }); // increase the count for all items associated with the value
            return true;
        }
    );
    return count;
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the same key in this hash, this function will simply create a new one.
 * \return this hash
 * \param key the key
 * \param value the value to insert
 */
QKit.MultiHash.prototype.insert = QKit.Hash.prototype.insertMulti;


/*!
 * \brief Remove all the items that have the given key and the given value from this hash.
 * \return the number of items removed
 * \param key the key of items to remove
 * \param value the value of items to remove, if undefined all items with the given key will be removed
 */
QKit.MultiHash.prototype.remove = function(key, value) {
    if (key === undefined) return undefined; // return if key is undefined
    if (value === undefined) return QKit.MultiHash.superClass.remove.apply(this, arguments); // remove all items associated with the key if value is undefined
    var hashArray = this.__qkit__data[this.__qkit__hashFunction(key)]; // data array for the hash string
    if (hashArray === undefined) return 0; // return if this doesn't contain the key
    var keyEqualsFunction = this.__qkit__keyEqualsFunction; // keys compare function
    var valueEqualsFunction = this.__qkit__valueEqualsFunction; // values compare function
    var removedCount = 0; // count of items to remove
    hashArray.some( // while key isn't found
        function(hashItem, hashIndex) { // callback
            if (!keyEqualsFunction(hashItem.key, key)) return false; // return if item isn't associated with the key
            var values = hashItem.values; // values associated with the key
            hashItem.values = values.filter(function (valueItem) { return !valueEqualsFunction(valueItem, value) }); // clear from this values equals the value
            if (hashItem.values.length) { // if not all values were removed
                delete hashArray[hashIndex]; // delete items associated with the key
                removedCount = values.length; // count of removed items
            } else { // if all values were removed
                removedCount = values.length - hashItem.values.length; // count of removed items
            }
            return true;
        }
    );
    this.__qkit__size -= removedCount; // decrease this size
    return removedCount;
}


/*!
 * \brief Insert an item with the given key and the given value.
 *   If there is already an item with the key, that item's value is replaced with value.
 *   If there are multiple items with the key, the most recently inserted item's value is replaced with value.
 * \return this hash
 * \param key the key
 * \param value the value to insert
*/
QKit.MultiHash.prototype.replace = QKit.Hash.prototype.insert;

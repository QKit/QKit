/*******************************************************************************
*                                                                              *
*  Library core implementation.                                                *
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
 * \brief Universal inherit function.
 * \param superClass super class
 */
Function.prototype.inheritFrom = function(superClass) {
    var Inheritance = function(){};
    Inheritance.prototype = superClass.prototype;
    this.prototype = new Inheritance();
    this.prototype.constructor = this;
    this.superClass = superClass;
}


/*!
 * \brief Generate a signal method.
 * \return generated signal method
 */
function Signal() {
    if ((this instanceof Signal)) { // if function was called with 'new' operator
        this.__qkit__connections = []; //!< array of connections
    } else { // if function was called without 'new' operator
        var signal = new Signal(); // create new signal
        var func = function() { return signal.emit.apply(signal, arguments); } // create emit function
        func.__qkit__signal = signal; // signal assotiated with function
        func.connect = function() { return signal.connect.apply(signal, arguments); } // connect method
        func.disconnect = function() { return signal.disconnect.apply(signal, arguments); } // disconnect method
        return func;
    }
}


/*!
 * \brief Emit the signal to all connected methods.
 */
Signal.prototype.emit = function() {
    var emitArguments = arguments;
    return this.__qkit__connections.forEach( // for each connection
        function(element, index, array) { // callback function
            element.method.apply(element.receiver, emitArguments); // apply connected method
        },
        this
    );
}


/*!
 * \brief Create a connection from the signal to the function.
 * \return true if the connection succeeds, otherwise false
 * \param method method to connect to
 * \param receiver signal receiver object (null to connect to root object)
 * \param uniqueConnection unique connection or not
 */
Signal.prototype.connect = function(method, receiver, uniqueConnection) {
    if (!(method instanceof Function)) return false; // return if method is not an instance of Function
    if (receiver === undefined) receiver = null; // null receiver by default
    if (uniqueConnection === undefined) uniqueConnection = false; // unique connection false by default
    if (uniqueConnection && this.isConnected(method, receiver)) return false; // return if connection exists
    this.__qkit__connections.push({'method':method, 'receiver':receiver}); // puch method and receiver to connections array
    if (method.__qkit__connectedSignals === undefined) method.__qkit__connectedSignals = {}; // create hash of connected signals if it doesn't exist
    if (method.__qkit__connectedSignals[this] === undefined) method.__qkit__connectedSignals[this] = 0; // create counter of connections
    method.__qkit__connectedSignals[this]++; // increment counter
    return true;
}


/*!
 * \brief Disconnects signal from method in object receiver.
 * \return true if some connections where disconnected, false othervise
 * \param method method to disconnect from (undefined to disconnect all)
 * \param receiver signal receiver object (null for root object, undefined to skip test)
 */
Signal.prototype.disconnect = function(method, receiver) {
    var isThereAnyDisconnect = false; // is there any disconnect or not
    this.__qkit__connections = this.__qkit__connections.filter( // filter connections
        function(element, index, array) { // test function
            var leaveConnection = true; // leave connection by default
            if (method === undefined) { // if remove all
                leaveConnection = false;
            } else if (method !== element.method) { // if method is another
                leaveConnection = true;
            } else if (receiver === undefined) { // if remove all with this method
                leaveConnection = false;
            } else {
                leaveConnection = receiver !== element.receiver; // leave with another receiver
            }
            if (leaveConnection) return true; // do nothing if connection will be leaved
            element.method.__qkit__connectedSignals[this]--; // decrement counter of connections
            if (element.method.__qkit__connectedSignals[this] < 1) delete element.method.__qkit__connectedSignals[this]; // delete counter if no more connections for it
            isThereAnyDisconnect = true; // there is a disconnect
            return false;
        },
        this
    );
    return isThereAnyDisconnect;
}


/*!
 * \brief Test connection signal from method in object receiver.
 * \param method method to connect to
 * \param receiver signal receiver object (null for root object, undefined to skip test)
 */
Signal.prototype.isConnected = function(method, receiver) {
    if (!(method instanceof Function)) return false; // return if method is not an instance of Function
    return this.__qkit__connections.some( // try to find any connection
        function(element) { // test function
            if (method !== element.method) return false; // return if method is the other one
            if (receiver === undefined) return true; // return if there is no need to rest receiver
            return receiver === element.receiver; // true if receiver is the same one
        },
        this
    );
}

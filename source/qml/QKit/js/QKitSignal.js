/*******************************************************************************
*                                                                              *
*  Signal function implementation.                                             *
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
 * \brief Generate a signal method.
 * \return generated signal method
 */
QKit.Signal = function () {
    if (!(this instanceof QKit.Signal)) return new QKit.Signal(); // create new object if function was called without 'new' operator
    this.__qkit__connections = []; // array of connections
}


/*!
 * \brief Emit the signal to all connected methods.
 */
QKit.Signal.prototype.emit = function() {
    var emitArguments = arguments;
    return this.__qkit__connections.forEach( // for each connection
        function(element) { // callback function
            element.method.apply(element.receiver, emitArguments); // apply connected method
        }
    );
}


/*!
 * \brief Create a connection from the signal to the function.
 * \return true if the connection succeeds, otherwise false
 * \param method method to connect to
 * \param receiver signal receiver object (null to connect to root object)
 * \param uniqueConnection unique connection or not
 */
QKit.Signal.prototype.connect = function(method, receiver, uniqueConnection) {
    if (typeof method !== 'function') return undefined; // return if method is not a function
    if (receiver === undefined) receiver = null; // null receiver by default
    if (uniqueConnection === undefined) uniqueConnection = false; // unique connection false by default
    var methodConnectedSignals = method.__qkit__connectedSignals; // method connected signals array
    if (methodConnectedSignals === undefined) { // if the method doesn't have connected signals
        method.__qkit__connectedSignals = [{signal: this, count: 1}]; // create array of connected signals
    } else { // if the method has connected signals
        var methodSignalItem = undefined; // method signal connection item
        methodConnectedSignals.some( // while method connection to this is not found
            function(methodConnectedSignalsItem) { // callback
                if (methodConnectedSignalsItem.signal !== this) return false; // return if is not this signal
                methodSignalItem = methodConnectedSignalsItem; // set this signal item
                return true;
            }
        );
        if (methodSignalItem === undefined) { // if connection doesnt exist
            methodConnectedSignals.push({signal: this, count: 1}); // add connection item
        } else { // if connection exists
            if (uniqueConnection) return false; // return if connection must be unique
            methodSignalItem.count++; // increase count of connections
        }
    }
    this.__qkit__connections.push({method: method, receiver: receiver}); // push method and receiver to connections array
    return true;
}


/*!
 * \brief Disconnects signal from method in object receiver.
 * \return true if some connections where disconnected, false othervise
 * \param method method to disconnect from (undefined to disconnect all)
 * \param receiver signal receiver object (null for root object, undefined to skip test)
 */
QKit.Signal.prototype.disconnect = function(method, receiver) {
    var isThereAnyDisconnect = false; // is there any disconnect or not
    this.__qkit__connections = this.__qkit__connections.filter( // filter connections
        function(element) { // callback
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
            element.method.__qkit__connectedSignals.some( // while method connection to this is not found
                function(methodConnectedSignalsItem, methodConnectedSignalsIndex, methodConnectedSignals) { // callback
                    if (methodConnectedSignalsItem.signal !== this) return false; // return if is not this signal
                    if (!--methodConnectedSignalsItem.count) delete methodConnectedSignals[methodConnectedSignalsIndex]; // delete item if all connections were removed
                    return true;
                }
            )
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
QKit.Signal.prototype.isConnected = function(method, receiver) {
    if (typeof method !== 'function') return false; // return if method is not a function
    return this.__qkit__connections.some( // try to find any connection
        function(element) { // test function
            if (method !== element.method) return false; // return if method is the other one
            if (receiver === undefined) return true; // return if there is no need to rest receiver
            return receiver === element.receiver; // true if receiver is the same one
        }
    );
}

/*******************************************************************************
*                                                                              *
*  Base object class implementation.                                           *
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
 * \brief Base object class.
 */
QKit.Object = function() {
    if (!(this instanceof QKit.Object)) return new QKit.Object(); // create new object if function was called without 'new' operator
    this.__qkit__id = null; // object id
    this.newSignal('destroyed'); // emitted immediately before the object is destroyed
}


/*!
 * \brief Destructor.
 * \param doNotify send destroyed signal or not (true by default)
 */
QKit.Object.prototype.destroy = function(doNotify) {
    if (doNotify === undefined || doNotify) this.destroyed(); // emit destroyed signal
    if (this.__qkit__id !== null) delete QKit.__objects[this.__qkit__id]; // delete from objects array if id is defined
    for (var propertyName in this) { // for all properties
        if (this.hasOwnProperty(propertyName)) { // if own property
            var thisProperty = this[propertyName]; // this property
            if ((thisProperty instanceof QKit.Signal) || (typeof thisProperty === 'function' && thisProperty.__qkit__signal !== undefined)) { // if signal
                thisProperty.disconnect(); // disconnect all connected methods
            } else if (typeof thisProperty === 'function' && thisProperty.__qkit__connectedSignals !== undefined) { // if method with connected signals
                thisProperty.__qkit__connectedSignals.forEach(function(connectedSignalsItem) { connectedSignalsItem.signal.disconnect(thisProperty) }); // disconnect all connected signals
            }
        }
    }
}


/*!
 * \brief Get object id.
 * \return id number
 */
QKit.Object.prototype.id = function() { return this.__qkit__id }


/*!
 * newProperty(propertyName, getter, setter, changedCallback)
 * \brief Create new property.
 * \return true if creation was sucsessfull, false otherwise
 * \param propertyName name of the property
 * \param getter method to get property value - function()
 * \param setter method to set property value - function(value), property will be constant if is undefined
 * \param changedCallback function to call on property change - function(newValue)
 */
/*!
 * newProperty(propertyName, value)
 * \brief Create new property with default getter, setter and signal of change.
 * \return true if creation was sucsessfull, false otherwise
 * \param propertyName name of the property
 * \param value start value
 */
QKit.Object.prototype.newProperty = function(propertyName) {
    if (propertyName === undefined) return undefined; // return if property name is undefined
    if (this.hasOwnProperty(propertyName)) return false; // return if this contains own property with the same name
    if (typeof arguments[1] === 'function') { // if newProperty(propertyName, getter, setter, changedSignal)
        var getter = arguments[1]; // getter method
        this.__defineGetter__(propertyName, getter); // define getter
        var setter = arguments[2]; // setter method
        if (setter !== undefined) { // if not constant property
            if (typeof setter !== 'function') return undefined; // return id setter is not a function
            var changedCallback = arguments[3]; // function to call on property change
            if (changedCallback === undefined) { // if signal is undefined
                this.__defineSetter__(propertyName, setter); // define setter
            } else { // if signal is defined
                if (typeof changedCallback !== 'function') return undefined; // return id setter is not a function
                this.__defineSetter__( // define setter
                    propertyName, // name of property
                    function(value) { // setter function
                        setter.apply(this, [value]); // apply setter
                        changedCallback.apply(this, [value]); // callback
                    }
                );
            }
        }
    } else { // if newProperty(propertyName, value)
        var callbackName = propertyName + 'Changed'; // name of callback function
        if (this.hasOwnProperty(callbackName)) { // if property for callback exists
            if (typeof this[callbackName] !== 'function') return false; // return if callback is not a function
        } else { // if property for callback not exists
            this.newSignal(callbackName); // create new signal
        }
        var value = arguments[1]; // start value
        var fullPropertyName = '__qkit__property__' + propertyName; // full propety name
        this[fullPropertyName] = value; // set property value
        this.newProperty( // create new property
            propertyName, // property name
            function() { return this[fullPropertyName] }, // getter
            function(value) { // setter
                this[fullPropertyName] = value; // update property value
                this[callbackName].apply(this, [value]); // callback
            }
        );
    }
}


/*!
 * \brief Create new signal.
 * \return true if creation was sucsessfull, false otherwise
 * \param signalName name of the signal
 */
QKit.Object.prototype.newSignal = function(signalName) {
    if (signalName === undefined) return undefined; // return if signal name is undefined
    if (this[signalName] !== undefined) return false; // return if this contains own property with the same name
    var signalObject = new QKit.Signal(); // create new signal
    var signalFunction = function() { return signalObject.emit.apply(signalObject, arguments) } // create emit function
    signalFunction.__qkit__signal = signalObject; // associate signal object and function
    signalFunction.connect = QKit.__signalFunctionConnect; // connect method
    signalFunction.disconnect = QKit.__signalFunctionDisconnect; // disconnect method
    this[signalName] = signalFunction; // set this property
    return true;
}
QKit.__signalFunctionConnect = function() { return this.__qkit__signal.connect.apply(this.__qkit__signal, arguments) } // signal connect method
QKit.__signalFunctionDisconnect = function() { return this.__qkit__signal.disconnect.apply(this.__qkit__signal, arguments) } // signal disconnect method

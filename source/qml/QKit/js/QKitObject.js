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
    this.destroyed = QKit.Signal(); // emitted immediately before the object is destroyed
}


/*!
 * \brief Destructor.
 * \param doNotify send destroyed signal or not (true by default)
 */
QKit.Object.prototype.destroy = function(doNotify) {
    if (doNotify === undefined || doNotify) this.destroyed(); // destroyed signal
    if (this.__qkit__id !== null) delete QKit.__objects[this.__qkit__id]; // delete from objects array if id is defined
    for (var propertyName in this) { // for all properties
        if (this.hasOwnProperty(propertyName)) { // if own property
            if (this[propertyName].hasOwnProperty('__qkit__signal')) { // if signal
                this[propertyName].disconnect(); // disconnect all connected methods
            } else if (this[propertyName] instanceof Function && this[propertyName].hasOwnProperty('__qkit__connectedSignals')) { // if method with connected signals
                for (var signalObject in this[propertyName].__qkit__connectedSignals) { // for all connected signals
                    if (this[propertyName].__qkit__connectedSignals.hasOwnProperty(signalObject)) signalObject.disconnect(this[propertyName]); // disconnect signal and method
                }
            }
        }
    }
}


/*!
 * \brief Get object id.
 * \return id number
 */
QKit.Object.prototype.id = function() { return this.__qkit__id; }
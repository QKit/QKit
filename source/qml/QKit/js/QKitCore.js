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

var QKit = { // general QKit object
    __objects: [], //!< array of objects
    __equalsFunction: function(value1, value2) { return value1 === value2 }, // default values compare function
    __hashFunction: function(value) { return value instanceof QKit.Object ? value.id() : value.toString() } // default hash function
}


/*!
 * \brief Universal inherit function.
 * \param superClass super class
 */
Function.prototype.inheritFrom = function(superClass) {
    var Inheritance = function(){};
    Inheritance.prototype = superClass.prototype;
    this.prototype = new Inheritance();
    this.prototype.constructor = this;
    this.superClass = superClass.prototype;
}


/*!
 * \brief Get existing object by id.
 * \return object or null if there is no object with specified id
 * \param id object id
 */
QKit.instance = function(id) { return QKit.__objects[id] }


/*!
 * \brief Create new object.
 * \return object id
 * \param objectClass class of object to create
 * \param constructorArguments array of arguments for constructor
 */
QKit.create = function(objectClass, constructorArguments) {
    var object = eval('QKit.' + objectClass).apply(this, constructorArguments); // create new object
    object.__qkit__id = QKit.__objects.length; // object id
    QKit.__objects.push(object); // add new object to array
    return object.id(); // return id of created object
}


/*!
 * \brief Delete existing object.
 * \param id list id
 */
QKit.destroy = function(id) {
    var object = instance(id); // object by id
    if (object === null) return; // return if not existing
    object.destroy(); // destroy object
}

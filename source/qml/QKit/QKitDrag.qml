/*******************************************************************************
*                                                                              *
*  Drag item implementation.                                                   *
*                                                                              *
*  Copyright (C) 2012 Kirill Chuvilin.                                         *
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

import Qt 4.7

QtObject { //!< transformation params group
    property Item target: null //!< id of the item to drag
    property bool active: false //!< if the target item is currently being dragged
    property int axis: 0 //!< dragging direction (Drag.XAxis, Drag.YAxis, Drag.XandYAxis, 0)
    property real minimumX: -3.4028234663852886e+38 //!< minimum limit how far the target can be dragged horizontally
    property real maximumX: 3.4028234663852886e+38 //!< maximum limit how far the target can be dragged horizontally
    property real minimumY: -3.4028234663852886e+38 //!< minimum limit how far the target can be dragged vertically
    property real maximumY: 3.4028234663852886e+38 //!< maximum limit how far the target can be dragged vertically
    property real minimumRotation: 0 //!< minimum of the Item::rotation property
    property real maximumRotation: 0 //!< maximum of the Item::rotation property
    property real minimumScale: 1 //!< minimum of the Item::scale property
    property real maximumScale: 1 //!< maximum of the Item::scale property
    property real deltaX: 10 //!< single change of position when moving horizontally
    property real deltaY: 10 //!< single change of position when moving vertically
    property real deltaRotation: 10 //!< single change of Item::rotation property
    property real factorScale: 1.2 //!< single change of Item::scale property
 }

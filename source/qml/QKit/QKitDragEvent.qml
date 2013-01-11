/*******************************************************************************
*                                                                              *
*  Drag event object implementation.                                           *
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
    property bool accepted //!<  set it to false to stop handle the gesture
    property real angle //!< the current angle in the range -180 to 180
    property real previousAngle //!< the angle of the previous event
    property real rotation //!< the total rotation since the gesture started (0.0 on start)
    property variant center: {'x': 0, 'y': 0} //!< the current center point
    property variant previousCenter: {'x': 0, 'y': 0} //!< the center point of the previous event
    property variant startCenter: {'x': 0, 'y': 0} //!< the center point when the gesture began
    property variant points: [] //!< the points currently touched
    property variant startPoints: [] //!<  the points touched when the gesture began
    property real scale //!< the current scale factor (1.0 on start)
    property real previousScale //!< the scale factor of the previous event
}

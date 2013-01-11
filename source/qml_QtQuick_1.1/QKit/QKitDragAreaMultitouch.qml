/*******************************************************************************
*                                                                              *
*  DragArea item multitouch implementation.                                    *
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

import QtQuick 1.1

QKitDragAreaSingletouch {
    id: dragArea
    objectName: "QKitDragAreaMultitouch"

    __mouseArea.parent: dragAreaPinchArea

    children: [
        QKitPinchArea {
            id: dragAreaPinchArea
            objectName: dragArea.objectName + ":PinchArea"

            anchors.fill: parent

            onPinchStarted: {
                dragArea.__mouseArea.dragEvent.angle = dragArea.__mouseArea.angle(pinch.point1, pinch.center);
                dragArea.__mouseArea.dragEvent.previousAngle = dragArea.__mouseArea.dragEvent.angle;
                dragArea.__mouseArea.dragEvent.rotation = 0;
                dragArea.__mouseArea.dragEvent.center = {'x': pinch.center.x, 'y': pinch.center.y};
                dragArea.__mouseArea.dragEvent.previousCenter = dragArea.__mouseArea.dragEvent.center;
                dragArea.__mouseArea.dragEvent.startCenter = dragArea.__mouseArea.dragEvent.center;
                dragArea.__mouseArea.dragEvent.points = [{'x': pinch.point1.x, 'y': pinch.point1.y}, {'x': pinch.point2.x, 'y': pinch.point2.y}];
                dragArea.__mouseArea.dragEvent.startPoints = [{'x': pinch.point1.x, 'y': pinch.point1.y}, {'x': pinch.point2.x, 'y': pinch.point2.y}];
                dragArea.__mouseArea.dragEvent.scale = 1;
                dragArea.__mouseArea.dragEvent.previousScale = dragArea.__mouseArea.dragEvent.scale;
                dragArea.__mouseArea.startDrag();
            }
            onPinchUpdated: {
                if (!dragArea.__mouseArea.dragEvent.accepted) {
                    pinch.accepted = false;
                    return;
                }
                if (pinch.pointCount < 2) return;
                dragArea.__mouseArea.dragEvent.previousAngle = dragArea.__mouseArea.dragEvent.angle;
                dragArea.__mouseArea.dragEvent.angle = dragArea.__mouseArea.angle(pinch.point1, pinch.center);
                dragArea.__mouseArea.dragEvent.rotation -= dragArea.__mouseArea.deltaAngle(dragArea.__mouseArea.dragEvent.angle, dragArea.__mouseArea.dragEvent.previousAngle);
                dragArea.__mouseArea.dragEvent.previousCenter = dragArea.__mouseArea.dragEvent.center;
                dragArea.__mouseArea.dragEvent.center = {'x': pinch.center.x, 'y': pinch.center.y};
                dragArea.__mouseArea.dragEvent.points = [{'x': pinch.point1.x, 'y': pinch.point1.y}, {'x': pinch.point2.x, 'y': pinch.point2.y}];
                dragArea.__mouseArea.dragEvent.previousScale = dragArea.__mouseArea.dragEvent.scale;
                dragArea.__mouseArea.dragEvent.scale = pinch.scale;
                dragArea.__mouseArea.updateDrag();
            }
            onPinchFinished: {
                if (!dragArea.__mouseArea.dragEvent.accepted) return;
                dragArea.__mouseArea.finishDrag();
            }
        }
    ]
}

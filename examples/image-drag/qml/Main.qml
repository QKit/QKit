/*******************************************************************************
*                                                                              *
*  Main item implementation.                                                   *
*                                                                              *
*  Copyright (C) 2012 Kirill Chuvilin.                                         *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of an example for the QKit project.                     *
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

import "QKit"
import Qt 4.7

QKitApplication {
    QKitDragArea {
        id: dragArea
        objectName: "DragArea"
        focus: true
        anchors.fill: parent
        drag.target: image
        drag.minimumScale: 0.2 // target scale limit
        drag.maximumScale: 5 // target scale limit
        drag.minimumRotation: -360 // target rotation limit
        drag.maximumRotation: 360 // target rotation limit
        drag.axis: Drag.XandYAxis
        transformCenterX: width / 2
        transformCenterY: 2 * height / 3
//        drag.minimumX:  - image.width / 2
//        drag.maximumX: width - image.width / 2
//        drag.minimumY:  - image.height / 2
//        drag.maximumY: height - image.height / 2

        onDragUpdated: {
            switch (event.points.length) { // touched points number
            case 0: { // drag by keys
                if (event.rotation !== 0 || event.scale !== 1) {
                    centerPoint.x = event.center.x - centerPoint.radius;
                    centerPoint.y = event.center.y - centerPoint.radius;
                    centerPoint.visible = true;
                } else {
                    centerPoint.visible = false;
                }
                break;
            }
            case 1: { // singletouch drag
                if (event.center.x === event.startCenter.x && event.center.y === event.startCenter.y) { // if center transform
                    centerPoint.x = event.center.x - centerPoint.radius;
                    centerPoint.y = event.center.y - centerPoint.radius;
                    centerPoint.visible = true;
                    firstPoint.x = event.points[0].x - firstPoint.radius;
                    firstPoint.y = event.points[0].y - firstPoint.radius;
                    firstPoint.visible = true;
                    secondPoint.x = 2 * dragArea.transformCenterX - event.points[0].x - secondPoint.radius;
                    secondPoint.y = 2 * dragArea.transformCenterY - event.points[0].y - secondPoint.radius;
                    secondPoint.visible = true;
                } else {
                    centerPoint.visible = false;
                    firstPoint.visible = false;
                    secondPoint.visible = false;
                }
                break;
            }
            default: {
                centerPoint.x = event.center.x - centerPoint.radius;
                centerPoint.y = event.center.y - centerPoint.radius;
                centerPoint.visible = true;
                firstPoint.x = event.points[0].x - firstPoint.radius;
                firstPoint.y = event.points[0].y - firstPoint.radius;
                firstPoint.visible = true;
                secondPoint.x = event.points[1].x - secondPoint.radius;
                secondPoint.y = event.points[1].y - secondPoint.radius;
                secondPoint.visible = true;
                break;
            }
            }
        }
        onDragFinished: {
            centerPoint.visible = false;
            firstPoint.visible = false;
            secondPoint.visible = false;
        }
    }

    QKitItem { // drag target
        id: image
        objectName: "Image"
        x: (parent.width - width) / 2 // start poition
        y: (parent.height - height) / 2 // start poition
        width: Math.min(parent.width, parent.height) / 3
        height: width
        QKitImage {
            anchors.left: parent.left
            anchors.top: parent.top
            source: "./image.svg"
            width: parent.width / 2
            height: parent.height / 2
        }
        QKitImage {
            anchors.right: parent.right
            anchors.bottom: parent.bottom
            source: "./image.svg"
            width: parent.width / 2
            height: parent.height / 2
        }
    }

    QKitRectangle { // to view center of drag event
        id: centerPoint
        visible: false
        width: 2 * radius
        height: 2 * radius
        radius: 0.02 * Math.min(parent.width, parent.height)
        color: "#3FFFFFFF"
        border.color: "#7FFF0000"
        border.width: 0.5 * radius
    }
    QKitRectangle { // to view first point
        id: firstPoint
        visible: false
        width: centerPoint.width
        height: centerPoint.height
        radius: centerPoint.radius
        color: "#3FFFFFFF"
        border.color: "#7F0000FF"
        border.width: centerPoint.border.width
    }
    QKitRectangle { // to view virtual second point
        id: secondPoint
        visible: false
        width: centerPoint.width
        height: centerPoint.height
        radius: centerPoint.radius
        color: "#3FFFFFFF"
        border.color: "#7F00FF00"
        border.width: centerPoint.border.width
    }
}

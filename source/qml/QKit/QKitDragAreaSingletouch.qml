/*******************************************************************************
*                                                                              *
*  DragArea item singletouch implementation.                                   *
*                                                                              *
*  Copyright (C) 2012-2013 Kirill Chuvilin.                                    *
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
import "js/QKit.js" as QKit

QKitItem {
    id: dragArea
    objectName: "QKitDragAreaSingletouch"

    default property alias content: dragAreaMouseArea.children //!< default property
    property QKitDrag drag: QKitDrag {} //!< drag settings
    property variant transformCenterX: width / 2 //!< scale and rotation horizontal center position
    property variant transformCenterY: height / 2 //!< scale and rotation vertical center position
    property int moveDownKey: keyController ? keyController.dragMoveDownKey : 0 //!< key for down moving
    property int moveLeftKey: keyController ? keyController.dragMoveLeftKey : 0 //!< key for left moving
    property int moveRightKey: keyController ? keyController.dragMoveRightKey : 0 //!< key for right moving
    property int moveUpKey: keyController ? keyController.dragMoveUpKey : 0 //!< key for up moving
    property int rotateAnticlockwiseKey:  keyController ? keyController.dragRotateAnticlockwiseKey : 0 //!< key for anticlockwize rotation on drag
    property int rotateClockwiseKey:  keyController ? keyController.dragRotateClockwiseKey : 0 //!< key for clockwize rotation on drag
    property int zoomInKey: keyController ? keyController.dragZoomInKey : 0 //!< key for zoom in on drag
    property int zoomOutKey: keyController ? keyController.dragZoomOutKey : 0 //!< key for zoom out on drag
    property alias __mouseArea: dragAreaMouseArea //!< mouse area item

    /*!
     * \brief Signal of gesture start.
     * \param event drag event
     */
    signal dragStarted(variant event)

    /*!
     * \brief Signal of gesture update.
     * \param event drag event
     */
    signal dragUpdated(variant event)

    /*!
     * \brief Signal of gesture finish.
     * \param event drag event
     */
    signal dragFinished(variant event)


    QKitMouseArea {
        id: dragAreaMouseArea
        objectName: dragArea.objectName + ":MouseArea"

        property QKitDragEvent dragEvent: QKitDragEvent {} //!< drag event
        property real startMouseRadius
        property variant startTargetPosition
        property real startTargetRotation
        property real startTargetScale
        property int pressedKeysSetId: QKit.create('Set') //!< set of pressed keys

        /*!
         * \brief Test horizontal position of the limitations.
         * \return nearest suitable value
         */
        function suitableX(x) {
            if (x < dragArea.drag.minimumX) return dragArea.drag.minimumX; // return the lower limit, if less than it
            if (x > dragArea.drag.maximumX) return dragArea.drag.maximumX; // return the upper limit, if more than it
            return x;
        }


        /*!
         * \brief Test vertical position of the limitations.
         * \return nearest suitable value
         */
        function suitableY(y) {
            if (y < dragArea.drag.minimumY) return dragArea.drag.minimumY; // return the lower limit, if less than it
            if (y > dragArea.drag.maximumY) return dragArea.drag.maximumY; // return the upper limit, if more than it
            return y;
        }


        /*!
         * \brief Test scale of the limitations.
         * \return nearest suitable value
         */
        function suitableScale(scale) {
            if (scale < dragArea.drag.minimumScale) return dragArea.drag.minimumScale; // return the lower limit, if less than it
            if (scale > dragArea.drag.maximumScale) return dragArea.drag.maximumScale; // return the upper limit, if more than it
            return scale;
        }


        /*!
         * \brief Test rotation of the limitations.
         * \return nearest suitable value
         */
        function suitableRotation(rotation) {
            if (rotation < dragArea.drag.minimumRotation) return dragArea.drag.minimumRotation; // return the lower limit, if less than it
            if (rotation > dragArea.drag.maximumRotation) return dragArea.drag.maximumRotation; // return the upper limit, if more than it
            return rotation;
        }


        /*!
         * \brief Move the target to the specified position.
         * \return new suitable target position (null if no target specified)
         * \param x horizontal position
         * \param y vertical position
         */
        function moveTo(x, y) {
            if (dragArea.drag.target === null) return null; // return if there is no target
            var newPos = {x: dragAreaMouseArea.suitableX(x), y: dragAreaMouseArea.suitableX(y)}; // new position
            if (dragArea.drag.axis & Drag.XAxis) { // if horizontal moving is available
                dragArea.drag.target.x = newPos.x; // change target position
            } else { // if horizontal moving is not available
                newPos.x = dragArea.drag.target.x; // fix new position
            }
            if (dragArea.drag.axis & Drag.YAxis) { // if vertical moving is available
                dragArea.drag.target.y = newPos.y; // change target position
            } else { // if vertical moving is not available
                newPos.y = dragArea.drag.target.y; // fix new position
            }
            return newPos;
        }


        /*!
         * \brief Move the target in the specified direction.
         * \return new suitable target position (null if no target specified)
         * \param deltaX horizontal change
         * \param deltaY vertical change
         */
        function move(deltaX, deltaY) {
            if (dragArea.drag.target === null) return null; // return if there is no target
            return dragAreaMouseArea.moveTo(dragArea.drag.target.x + deltaX, dragArea.drag.target.y + deltaY);
        }


        /*!
         * \brief Rotate and scale the target to the specified values.
         * \return new suitable target state ({x, y, rotation, scale}, null if no target specified)
         * \param rotation rotation value
         * \param scale scale value
         * \param centerX transform center horizontal position in dragArea coordinate system
         * \param centerX transform center vertical position in dragArea coordinate system
         */
        function centerTransformTo(rotation, scale, centerX, centerY) {
            if (dragArea.drag.target === null) return null; // return if there is no target
            var newRotation = dragAreaMouseArea.suitableRotation(rotation); // new rotation
            var newScale = dragAreaMouseArea.suitableScale(scale); // new scale
            var deltaRotation = newRotation - dragArea.drag.target.rotation; // rotation change
            var factorScale = newScale / dragArea.drag.target.scale; // scale factor
            var cos = Math.cos(Math.PI / 180 * deltaRotation);
            var sin = Math.sin(Math.PI / 180 * deltaRotation);
            var transformCenter = dragArea.mapToItem(dragArea.drag.target.parent, centerX, centerY) // transform center position in target parent coordinate system
            var dX = -transformCenter.x;
            if ((dragArea.drag.target.transformOrigin === Item.Top) || (dragArea.drag.target.transformOrigin === Item.Center) || (dragArea.drag.target.transformOrigin === Item.Bottom)) {
                dX += dragArea.drag.target.width / 2;
            } else if ((dragArea.drag.target.transformOrigin === Item.TopRight) || (dragArea.drag.target.transformOrigin === Item.Right) || (dragArea.drag.target.transformOrigin === Item.BottomRight)) {
                dX += dragArea.drag.target.width;
            }
            var dY = -transformCenter.y;
            if ((dragArea.drag.target.transformOrigin === Item.Left) || (dragArea.drag.target.transformOrigin === Item.Center) || (dragArea.drag.target.transformOrigin === Item.Right)) {
                dY += dragArea.drag.target.height / 2;
            } else if ((dragArea.drag.target.transformOrigin === Item.BottomLeft) || (dragArea.drag.target.transformOrigin === Item.Bottom) || (dragArea.drag.target.transformOrigin === Item.BottomRight)) {
                dY += dragArea.drag.target.height;
            }
            var newX = ((dragArea.drag.target.x + dX) * cos - (dragArea.drag.target.y + dY) * sin) * factorScale - dX; // new target x in target parent coordinate system
            var newY = ((dragArea.drag.target.x + dX) * sin + (dragArea.drag.target.y + dY) * cos) * factorScale - dY; // new target y in target parent coordinate system
            var newPos = dragAreaMouseArea.moveTo(newX, newY);
            dragArea.drag.target.rotation = newRotation;
            dragArea.drag.target.scale = newScale;
            return {x: newPos.x, y: newPos.y, rotation: newRotation, scale: newScale};
        }


        /*!
         * \brief Rotate the target in the specified direction.
         * \return new suitable rotation (null if no target specified)
         * \param deltaRotation rotation change
         * \param factorScale scale factor
         * \param centerX transform center horizontal position in dragArea coordinate system
         * \param centerX transform center vertical position in dragArea coordinate system
         */
        function centerTransform(deltaRotation, factorScale, centerX, centerY) {
            if (dragArea.drag.target === null) return null; // return if there is no target
            return dragArea.centerTransformTo(dragArea.drag.target.rotation + deltaRotation, dragArea.drag.target.scale * factorScale, centerX, centerY);
        }


        /*!
         * \brief Calculate point radius.
         * \return point radius length
         * \param point point x and y coordinates
         * \param center center x and y coordinates
         */
        function radius(point, center) {
            var radiusX = point.x - center.x;
            var radiusY = point.y - center.y;
            return Math.sqrt(radiusX * radiusX + radiusY * radiusY);
        }


        /*!
         * \brief Calculate a point angle.
         * \return point radius angle from -180 to 180
         * \param point point x and y coordinates
         * \param center center x and y coordinates
         */
        function angle(point, center) {
            var radiusX = point.x - center.x;
            var radiusY = point.y - center.y;
            if (radiusX < 0) {
                return - 180 / Math.PI * Math.atan(radiusY / radiusX);
            }
            if (radiusX > 0) {
                if (radiusY > 0) return 180 - 180 / Math.PI * Math.atan(radiusY / radiusX);
                return - 180 - 180 / Math.PI * Math.atan(radiusY / radiusX);
            }
            // radiusX == 0
            if (radiusY < 0) return -90;
            if (radiusY > 0) return 90;
            return 0;
        }


        /*!
         * \brief Calculate the difference between angles.
         * \return the smallest difference in absolute
         * \param angle final angle
         * \param previousAngle start angle
         */
        function deltaAngle(angle, previousAngle) {
            var deltaAngle = angle - previousAngle;
            if (deltaAngle > 180) return deltaAngle - 360;
            if (deltaAngle < -180) return deltaAngle + 360;
            return deltaAngle;
        }


        /*!
         * \brief Get count of pressed keys.
         * \return count of handeled key presses with no releases
         */
        function pressedKeysCount() { return QKit.instance(dragAreaMouseArea.pressedKeysSetId).size(); }


        /*!
         * \brief Srart drag event.
         */
        function startDrag() {
            dragAreaMouseArea.dragEvent.accepted = true;
            dragArea.drag.active = true; // start of dragging
            if (dragArea.drag.target !== null) {
                dragAreaMouseArea.startTargetRotation = dragArea.drag.target.rotation;
                dragAreaMouseArea.startTargetScale = dragArea.drag.target.scale;
            } else {
                dragAreaMouseArea.startTargetRotation = 0;
                dragAreaMouseArea.startTargetScale = 1;
            }
            dragArea.dragStarted(dragAreaMouseArea.dragEvent);
        }


        /*!
         * \brief Update drag event.
         */
        function updateDrag() {
            dragAreaMouseArea.centerTransformTo(dragAreaMouseArea.startTargetRotation + dragAreaMouseArea.dragEvent.rotation, dragAreaMouseArea.startTargetScale * dragAreaMouseArea.dragEvent.scale, dragAreaMouseArea.dragEvent.previousCenter.x, dragAreaMouseArea.dragEvent.previousCenter.y);
            dragAreaMouseArea.move(dragAreaMouseArea.dragEvent.center.x - dragAreaMouseArea.dragEvent.previousCenter.x, dragAreaMouseArea.dragEvent.center.y - dragAreaMouseArea.dragEvent.previousCenter.y);
            dragArea.dragUpdated(dragAreaMouseArea.dragEvent);
        }


        /*!
         * \brief Finish drag event.
         */
        function finishDrag() {
            dragAreaMouseArea.state = "idle";
            dragArea.drag.active = false; // end of dragging
            dragArea.dragFinished(dragAreaMouseArea.dragEvent);
        }

        anchors.fill: parent
        drag.target: null
        state: "idle"
        states: [
            State {name: "idle"},
            State {name: "move"},
            State {name: "center_transform"}
        ]
        onComponentDestruction: QKit.destroy(dragAreaMouseArea.pressedKeysSetId)
        onPressed: {
            dragAreaMouseArea.dragEvent.center = {'x': dragArea.transformCenterX, 'y': dragArea.transformCenterY};
            dragAreaMouseArea.dragEvent.angle = dragAreaMouseArea.angle(mouse, dragAreaMouseArea.dragEvent.center);
            dragAreaMouseArea.dragEvent.points = [{'x': mouse.x, 'y': mouse.y}];
            dragAreaMouseArea.dragEvent.rotation = 0;
            dragAreaMouseArea.dragEvent.scale = 1;
            dragAreaMouseArea.dragEvent.previousAngle = dragAreaMouseArea.dragEvent.angle;
            dragAreaMouseArea.dragEvent.previousCenter = dragAreaMouseArea.dragEvent.center;
            dragAreaMouseArea.dragEvent.previousScale = dragAreaMouseArea.dragEvent.scale;
            dragAreaMouseArea.dragEvent.startCenter = dragAreaMouseArea.dragEvent.center;
            dragAreaMouseArea.dragEvent.startPoints = dragAreaMouseArea.dragEvent.points;
            dragAreaMouseArea.startMouseRadius = dragAreaMouseArea.radius(mouse, dragAreaMouseArea.dragEvent.center);
            dragAreaMouseArea.state = "move"
            dragAreaMouseArea.startDrag();
        }
        onDoubleClicked: {
            if (!dragAreaMouseArea.dragEvent.accepted) return;
            dragAreaMouseArea.state = "center_transform";
            dragAreaMouseArea.dragEvent.center = dragAreaMouseArea.dragEvent.startCenter;
            dragAreaMouseArea.dragEvent.previousCenter = dragAreaMouseArea.dragEvent.startCenter;
            dragAreaMouseArea.updateDrag();
        }
        onPositionChanged: {
            if (!dragAreaMouseArea.dragEvent.accepted) {
                mouse.accepted = false;
                return;
            }
            switch (dragAreaMouseArea.state) {
            case "move": {
                dragAreaMouseArea.dragEvent.previousCenter = dragAreaMouseArea.dragEvent.center;
                dragAreaMouseArea.dragEvent.center = {
                    'x': dragAreaMouseArea.dragEvent.startCenter.x + mouse.x - dragAreaMouseArea.dragEvent.startPoints[0].x,
                    'y': dragAreaMouseArea.dragEvent.startCenter.y + mouse.y - dragAreaMouseArea.dragEvent.startPoints[0].y
                }
                dragAreaMouseArea.dragEvent.points = [{'x': mouse.x, 'y': mouse.y}];
                break;
            }
            case "center_transform": {
                dragAreaMouseArea.dragEvent.previousAngle = dragAreaMouseArea.dragEvent.angle;
                dragAreaMouseArea.dragEvent.previousCenter = dragAreaMouseArea.dragEvent.center;
                dragAreaMouseArea.dragEvent.previousScale = dragAreaMouseArea.dragEvent.scale;
                dragAreaMouseArea.dragEvent.center = {'x': dragArea.transformCenterX, 'y': dragArea.transformCenterY};
                dragAreaMouseArea.dragEvent.angle = dragAreaMouseArea.angle(mouse, dragAreaMouseArea.dragEvent.center);
                dragAreaMouseArea.dragEvent.rotation -= dragAreaMouseArea.deltaAngle(dragAreaMouseArea.dragEvent.angle, dragAreaMouseArea.dragEvent.previousAngle);
                dragAreaMouseArea.dragEvent.points = [{'x': mouse.x, 'y': mouse.y}];
                dragAreaMouseArea.dragEvent.scale = dragAreaMouseArea.radius(mouse, dragAreaMouseArea.dragEvent.center) / dragAreaMouseArea.startMouseRadius;
                break;
            }
            }
            dragAreaMouseArea.updateDrag();
        }
        onReleased: {
            if (!dragAreaMouseArea.dragEvent.accepted) return;
            dragAreaMouseArea.finishDrag()
        }
    }

    Keys.onPressed: {
        var pressedKeysSet = QKit.instance(dragAreaMouseArea.pressedKeysSetId); // pressed keys
        if (pressedKeysSet.size() === 0) { // start of drag
            dragAreaMouseArea.dragEvent.accepted = true;
            dragAreaMouseArea.dragEvent.angle = 0;
            dragAreaMouseArea.dragEvent.center = {'x': dragArea.transformCenterX, 'y': dragArea.transformCenterY};
            dragAreaMouseArea.dragEvent.points = [];
            dragAreaMouseArea.dragEvent.rotation = 0;
            dragAreaMouseArea.dragEvent.scale = 1;
            dragAreaMouseArea.dragEvent.previousAngle = dragAreaMouseArea.dragEvent.angle;
            dragAreaMouseArea.dragEvent.previousCenter = dragAreaMouseArea.dragEvent.center;
            dragAreaMouseArea.dragEvent.previousScale = dragAreaMouseArea.dragEvent.scale;
            dragAreaMouseArea.dragEvent.startCenter = dragAreaMouseArea.dragEvent.center;
            dragAreaMouseArea.dragEvent.startPoints = dragAreaMouseArea.dragEvent.points;
            dragArea.drag.active = true; // start of dragging
            dragAreaMouseArea.startDrag();
        }
        pressedKeysSet.insert(event.key); // add pressed key
        if (!dragAreaMouseArea.dragEvent.accepted) return;
        dragAreaMouseArea.dragEvent.previousAngle = dragAreaMouseArea.dragEvent.angle;
        dragAreaMouseArea.dragEvent.previousCenter = dragAreaMouseArea.dragEvent.center;
        dragAreaMouseArea.dragEvent.previousScale = dragAreaMouseArea.dragEvent.scale;
        switch (event.key) { // by pressed key
        case dragArea.moveDownKey:
            dragAreaMouseArea.dragEvent.center = {'x': dragAreaMouseArea.dragEvent.previousCenter.x, 'y': dragAreaMouseArea.dragEvent.previousCenter.y + dragArea.drag.deltaY}
            break;
        case dragArea.moveLeftKey:
            dragAreaMouseArea.dragEvent.center = {'x': dragAreaMouseArea.dragEvent.previousCenter.x - dragArea.drag.deltaX, 'y': dragAreaMouseArea.dragEvent.previousCenter.y}
            break;
        case dragArea.moveRightKey:
            dragAreaMouseArea.dragEvent.center = {'x': dragAreaMouseArea.dragEvent.previousCenter.x + dragArea.drag.deltaX, 'y': dragAreaMouseArea.dragEvent.previousCenter.y}
            break;
        case dragArea.moveUpKey:
            dragAreaMouseArea.dragEvent.center = {'x': dragAreaMouseArea.dragEvent.previousCenter.x, 'y': dragAreaMouseArea.dragEvent.previousCenter.y - dragArea.drag.deltaY}
            break;
        case dragArea.rotateAnticlockwiseKey:
            dragAreaMouseArea.dragEvent.angle += dragArea.drag.deltaRotation;
            if (dragAreaMouseArea.dragEvent.angle > 180) dragAreaMouseArea.dragEvent.angle -= 360;
            dragAreaMouseArea.dragEvent.rotation -= dragArea.drag.deltaRotation;
            break;
        case dragArea.rotateClockwiseKey:
            dragAreaMouseArea.dragEvent.angle -= dragArea.drag.deltaRotation;
            if (dragAreaMouseArea.dragEvent.angle < -180) dragAreaMouseArea.dragEvent.angle += 360;
            dragAreaMouseArea.dragEvent.rotation += dragArea.drag.deltaRotation;
            break;
        case dragArea.zoomInKey:
            dragAreaMouseArea.dragEvent.scale *= dragArea.drag.factorScale;
            break;
        case dragArea.zoomOutKey:
            dragAreaMouseArea.dragEvent.scale /= dragArea.drag.factorScale;
            break;
        default: return // to not accept event
        }
        event.accepted = true
        dragAreaMouseArea.updateDrag();
    }
    Keys.onReleased: {
        var pressedKeysSet = QKit.instance(dragAreaMouseArea.pressedKeysSetId); // pressed keys
        pressedKeysSet.remove(event.key); // remove the key from pressed
        if (pressedKeysSet.size() > 0) return; // some keys are still pressed
        if (!dragAreaMouseArea.dragEvent.accepted) return;
        dragAreaMouseArea.finishDrag();
    }
}

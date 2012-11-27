/*******************************************************************************
*                                                                              *
*  Image thumbnail item implementation.                                        *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of the QKit project.                                    *
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

QKitItem {
    id: thumbnail
    objectName: "QKitThumbnail"

    property url source // image source
    property int borderWidth: uiController.thumbnailBorderWidth
    property color borderColor: uiController.thumbnailBorderColor
    property color borderColorSelected: uiController.thumbnailBorderColorSelected
    property color backgroundColor: uiController.thumbnailBackgroundColor
    property color backgroundColorSelected: uiController.thumbnailBackgroundColorSelected
    property bool smooth: uiController.thumbnailSmooth
    property bool asynchronous: uiController.thumbnailAsynchronous // loading in separate thread

    QKitRectangle { // background
        id: thumbnailBackground
        objectName: thumbnail.objectName + ":Background"

        visible: thumbnailImage.status == Image.Ready // to view only when image viewed
        anchors.centerIn: parent
        width: thumbnailImage.paintedWidth + border.width
        height: thumbnailImage.paintedHeight + border.width
        border.width: thumbnail.borderWidth
        border.color: thumbnail.borderColor
        color: thumbnail.backgroundColor
        smooth: thumbnail.smooth

        states: [
            State { // on selected or focused
                name: "selected"
                when: thumbnail.enabled && thumbnail.selected
                PropertyChanges {
                    target: thumbnailBackground
                    color: thumbnail.backgroundColorSelected
                    border.color: thumbnail.borderColorSelected
                }
            }
        ]
    }

    QKitImage {
        id: thumbnailImage
        objectName: thumbnail.objectName + ":Image"

        anchors.fill: parent
        anchors.margins: 2 * thumbnail.borderWidth
        fillMode: Image.PreserveAspectFit
        source: thumbnail.source
        smooth: thumbnail.smooth
        asynchronous: thumbnail.asynchronous
    }
}

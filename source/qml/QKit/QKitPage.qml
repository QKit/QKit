/*******************************************************************************
*                                                                              *
*  Page item implementation.                                                   *
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

QKitFocusScope {
    id: page
    objectName: "QKitPage"

    default property alias content: pageWorkspace.children //!< page content
    property Item toolbar: null //!< toolbar item
    property color backgroundColor: uiController.pageBackgroundColor
    property color textColor: uiController.pageTextColor
    property url   texture: uiController.pageTexture
    property alias workspaceClip: pageWorkspace.clip

    // QKit properties
    uiAmbience: "page" // UI ambience

    Rectangle { // background
        anchors.fill: page
        color: page.backgroundColor
    }

    Image { // texture
        anchors.fill: page
        fillMode: Image.Tile
        source: page.texture
    }

    QKitFocusScope {
        id: pageWorkspace
        objectName: page.objectName + ":Workspace"
        anchors.fill: page
        focus: true

        states: [
            State {
                when: page.application.isDesktopOs
                PropertyChanges {
                    target: pageWorkspace
                    anchors.topMargin: page.toolbar ? page.toolbar.height : 0
                }
            },
            State {
                when: !page.application.isDesktopOs && page.application.isLandscapeOrientation
                PropertyChanges {
                    target: pageWorkspace
                    anchors.rightMargin: page.toolbar ? page.toolbar.width : 0
                }
            },
            State {
                when: !page.application.isDesktopOs && page.application.isPortraitOrientation
                PropertyChanges {
                    target: pageWorkspace
                    anchors.bottomMargin: page.toolbar ? page.toolbar.height : 0
                }
            }
        ]
    }

    onKeysPressed: if (toolbar !== null) toolbar.keysPressed(event) // send event first to toolbar if toolbar exists
    onToolbarChanged: if (toolbar !== null) toolbar.parent = page
}

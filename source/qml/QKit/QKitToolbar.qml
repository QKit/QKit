/*******************************************************************************
*                                                                              *
*  Tool bar item implementation.                                               *
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
    id: toolbar
    objectName: "QKitToolBar"

    default property alias content: toolbarDefaultLayout.children // default toolbar content
    property alias tools: toolbarView.model
    property alias defaultTools: toolbarDefaultLayout
    // UI properties
    property int   animationDuration: uiController.toolbarAnimationDuration
    property int   borderWidth: uiController.toolbarBorderWidth
    property color borderColor: uiController.toolbarBorderColor
    property color backgroundColor: uiController.toolbarBackgroundColor
    // key properties
    property int leftButtonPressKey: keyController.toolbarLeftButtonPressKey
    property int rightButtonPressKey: keyController.toolbarRightButtonPressKey
    // QKit properties
    uiAmbience: "toolbar" // UI ambience
    // QML properties
    visible: true // initially opened
    z: 1 // to view ower workspace
    width: toolbar.parent.width
    height: toolbar.parent.height

    Rectangle { // background
        anchors.fill: parent
        color: toolbar.backgroundColor
    }

    QKitListView {
        id: toolbarView
        objectName: toolbar.objectName + ":View"

        property int toolsCount: toolbarView.model !== null ? toolbarView.model.count : 0 // number of tools
        property bool toolbarVisible: toolbar.visible // visible toolbar or not
        property real itemWidth: toolbarView.width // tool item width
        property real itemHeight: toolbarView.height // tool item height
        property bool animationEnabled: false

        property variant leftButton: toolbarView.toolsCount > 0 ? state == "portrait" ? toolbar.tools.children[0] : state == "landskape" ? toolbar.tools.children[toolbarView.toolsCount - 1] : null : null
        property variant rightButton: toolbarView.toolsCount > 0 ? state == "portrait" ? toolbar.tools.children[toolbarView.toolsCount - 1] : state == "landskape" ? toolbar.tools.children[0] : null : null

        anchors.fill: parent
        anchors.margins: spacing
        spacing: 0.1 * Math.min(toolbar.width, toolbar.height);
        orientation: state == "desktop" || state == "portrait" ? ListView.Horizontal : ListView.Vertical
        boundsBehavior: Flickable.StopAtBounds
        model: toolbarDefaultLayout

        states: [
            State {
                name: "desktop"
                when: toolbar.application.isDesktopOs
                PropertyChanges {
                    target: toolbar
                    height: 24
                    x: 0
                    y: toolbarView.toolbarVisible ? 0 : -toolbar.height
                }
                PropertyChanges {
                    target: toolbarBorder
                    width: toolbar.width
                    height: toolbar.borderWidth
                    x: 0
                    y: toolbar.height - toolbar.borderWidth
                }
                PropertyChanges {
                    target: toolbarView
                    itemWidth: toolbarView.itemHeight
                }
            },
            State {
                name: "landskape"
                when: !toolbar.application.isDesktopOs && toolbar.application.isLandscapeOrientation
                PropertyChanges {
                    target: toolbar
                    width: toolbar.height / 6
                    x: toolbarView.toolbarVisible ? toolbar.parent.width - toolbar.width : toolbar.parent.width
                    y: 0
                }
                PropertyChanges {
                    target: toolbarBorder
                    width: toolbar.borderWidth
                    height: toolbar.height
                    x: 0
                    y: 0
                }
                PropertyChanges {
                    target: toolbarView
                    itemHeight: toolbarView.toolsCount > 0 ? (toolbarView.height - (toolbarView.toolsCount - 1) * toolbarView.spacing) / toolbarView.toolsCount : toolbarView.height
                }
            },
            State {
                name: "portrait"
                when: !toolbar.application.isDesktopOs && toolbar.application.isPortraitOrientation
                PropertyChanges {
                    target: toolbar
                    height: toolbar.width / 8
                    x: 0
                    y: toolbarView.toolbarVisible ? toolbar.parent.height - toolbar.height : toolbar.parent.height
                }
                PropertyChanges {
                    target: toolbarBorder
                    width: toolbar.width
                    height: toolbar.borderWidth
                    x: 0
                    y: 0
                }
                PropertyChanges {
                    target: toolbarView
                    itemWidth: toolbarView.toolsCount > 0 ? (toolbarView.width - (toolbarView.toolsCount - 1) * toolbarView.spacing) / toolbarView.toolsCount : toolbarView.width
                }
            }
        ]

        onOrientationChanged: {
            var iItem = 0;
            if (orientation == ListView.Horizontal) {
                while (toolbarView.model.children[iItem]) {
                    toolbarView.model.children[iItem].y = 0;
                    iItem++;
                }
            } else {
                while (toolbarView.model.children[iItem]) {
                    toolbarView.model.children[iItem].x = 0;
                    iItem++;
                }
             }
        }

    }

    QKitToolBarLayout { id: toolbarDefaultLayout }

    Rectangle { // border line
        id: toolbarBorder
        color: toolbar.borderColor
    }

    Behavior on x {
        enabled: toolbarView.animationEnabled
        SequentialAnimation {
            NumberAnimation { duration: toolbar.animationDuration }
            ScriptAction {
                script: {
                    toolbarView.animationEnabled = false;
                    toolbar.visible = toolbarView.toolbarVisible;
                }
            }
        }
    }
    Behavior on y {
        enabled: toolbarView.animationEnabled
        SequentialAnimation {
            NumberAnimation { duration: toolbar.animationDuration }
            ScriptAction {
                script: {
                    toolbarView.animationEnabled = false;
                    toolbar.visible = toolbarView.toolbarVisible;
                }
            }
        }
    }

    onVisibleChanged: {
        if (toolbar.visible && !toolbarView.toolbarVisible) { // if set to visible from invisible
            toolbarView.animationEnabled = true;
            toolbarView.toolbarVisible = true;
        } else if (!toolbar.visible && toolbarView.toolbarVisible) { // if set to invisible from visible
            toolbar.visible = true; // to view animation
            toolbarView.animationEnabled = true;
            toolbarView.toolbarVisible = false;
        }
    }

    onKeysPressed: { // key event handler
        switch (event.key) {
        case toolbar.leftButtonPressKey:
            if (toolbarView.leftButton !== null) toolbarView.leftButton.pressByKey(event);
            break;
        case toolbar.rightButtonPressKey:
            if (toolbarView.rightButton !== null) toolbarView.rightButton.pressByKey(event);
            break;
        default:
            return;
        }
    }
}

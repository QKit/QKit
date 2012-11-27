/*******************************************************************************
*                                                                              *
*  Toolbar item implementation.                                                *
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

QKitRectangle {
    id: toolbar
    objectName: "QKitToolbar"

    default property alias content: toolbarContent.children // toolbar content
    // UI properties
    property int   animationDuration: uiController.toolbarAnimationDuration
    property int   borderWidth: uiController.toolbarBorderWidth
    property color borderColor: uiController.toolbarBorderColor
    // key properties
    property int leftButtonPressKey: keyController.toolbarLeftButtonPressKey
    property int rightButtonPressKey: keyController.toolbarRightButtonPressKey
    // QKit properties
    uiAmbience: "toolbar" // UI ambience
    // QML properties
    enabled: true // initially opened
    anchors.fill: parent
    z: 1 // to view ower other

    resources: [
        Item { // local variables
            id: local
            property variant leftButton: 0
            property variant rightButton: 0
            states: [
                State {
                    name: "opened desktop"
                    when: toolbar.enabled && toolbar.application.isDesktopOs
                    PropertyChanges {
                        target: toolbar
                        visible: true
                        anchors.bottomMargin: toolbar.parent.height - 24
                    }
                    PropertyChanges {
                        target: toolbarContent
                        flow: Grid.LeftToRight
                        columns: toolbarContent.nChildren
                    }
                    PropertyChanges {
                        target: toolbarBorder
                        width: toolbar.width
                        height: toolbar.borderWidth
                        x: 0
                        y: toolbar.height - toolbar.borderWidth
                    }
                },
                State {
                    name: "closed desktop"
                    when: !toolbar.enabled && toolbar.application.isDesktopOs
                    PropertyChanges {
                        target: toolbar
                        visible: false
                        anchors.bottomMargin: toolbar.parent.height
                    }
                    PropertyChanges {
                        target: toolbarBorder
                        width: toolbar.width
                        height: toolbar.borderWidth
                        x: 0
                        y: 0
                    }
                },
                State {
                    name: "opened landskape"
                    when: toolbar.enabled && !toolbar.application.isDesktopOs && toolbar.application.isLandscapeOrientation
                    PropertyChanges {
                        target: toolbar
                        visible: true
                        anchors.leftMargin: toolbar.parent.width - toolbar.parent.height / 6
                    }
                    PropertyChanges {
                        target: toolbarContent
                        flow: Grid.TopToBottom
                        rows: toolbarContent.nChildren
                    }
                    PropertyChanges {
                        target: toolbarBorder
                        width: toolbar.borderWidth
                        height: toolbar.height
                        x: 0
                        y: 0
                    }
                    PropertyChanges {
                        target: local
                        leftButton: toolbarContent.nChildren > 0 ? toolbarContent.children[toolbarContent.nChildren - 1] : 0
                        rightButton: toolbarContent.nChildren > 0 ? toolbarContent.children[0] : 0
                    }
                },
                State {
                    name: "closed landskape"
                    when: !toolbar.enabled && !toolbar.application.isDesktopOs && toolbar.application.isLandscapeOrientation
                    PropertyChanges {
                        target: toolbar
                        visible: false
                        anchors.leftMargin: toolbar.parent.width
                    }
                    PropertyChanges {
                        target: toolbarContent
                        flow: Grid.TopToBottom
                        rows: toolbarContent.nChildren
                    }
                    PropertyChanges {
                        target: toolbarBorder
                        width: toolbar.borderWidth
                        height: toolbar.height
                        x: 0
                        y: 0
                    }
                },
                State {
                    name: "opened portrait"
                    when: toolbar.enabled && !toolbar.application.isDesktopOs && toolbar.application.isPortraitOrientation
                    PropertyChanges {
                        target: toolbar
                        visible: true
                        anchors.topMargin: toolbar.parent.height - toolbar.parent.width / 8
                    }
                    PropertyChanges {
                        target: toolbarContent
                        flow: Grid.LeftToRight
                        columns: toolbarContent.nChildren
                    }
                    PropertyChanges {
                        target: toolbarBorder
                        width: toolbar.width
                        height: toolbar.borderWidth
                        x: 0
                        y: 0
                    }
                    PropertyChanges {
                        target: local
                        leftButton: toolbarContent.nChildren > 0 ? toolbarContent.children[0] : 0
                        rightButton: toolbarContent.nChildren > 0 ? toolbarContent.children[toolbarContent.nChildren - 1] : 0
                    }
                },
                State {
                    name: "closed portrait"
                    when: !toolbar.enabled && !toolbar.application.isDesktopOs && toolbar.application.isPortraitOrientation
                    PropertyChanges {
                        target: toolbar
                        visible: false
                        anchors.topMargin: toolbar.parent.height
                    }
                    PropertyChanges {
                        target: toolbarBorder
                        width: toolbar.width
                        height: toolbar.borderWidth
                        x: 0
                        y: 0
                    }
                }
            ]

            transitions: [
                Transition {
                    from: "closed desktop"
                    to: "opened desktop"
                    SequentialAnimation {
                        PropertyAnimation {
                            target:  toolbar
                            property: "visible"
                            duration: 0
                        }
                        PropertyAnimation {
                            target:  toolbar
                            property: "anchors.bottomMargin"
                            duration: toolbar.animationDuration
                        }
                    }
                },
                Transition {
                    from: "opened desktop"
                    to: "closed desktop"
                    SequentialAnimation {
                        PropertyAnimation {
                            target:  toolbarBorder
                            property: "y"
                            duration: 0
                        }
                        PropertyAnimation {
                            target:  toolbar
                            property: "anchors.bottomMargin"
                            duration: toolbar.animationDuration
                        }
                        PropertyAnimation {
                            target:  toolbar
                            property: "visible"
                            duration: 0
                        }
                    }
                },
                Transition {
                    from: "closed landskape"
                    to: "opened landskape"
                    SequentialAnimation {
                        PropertyAnimation {
                            target:  toolbar
                            property: "visible"
                            duration: 0
                        }
                        PropertyAnimation {
                            target:  toolbar
                            property: "anchors.leftMargin"
                            duration: toolbar.animationDuration
                        }
                    }
                },
                Transition {
                    from: "opened landskape"
                    to: "closed landskape"
                    SequentialAnimation {
                        PropertyAnimation {
                            target:  toolbar
                            property: "anchors.leftMargin"
                            duration: toolbar.animationDuration
                        }
                        PropertyAnimation {
                            target:  toolbar
                            property: "visible"
                            duration: 0
                        }
                        PropertyAnimation {
                            target: toolbarBorder
                            property: "anchors.rightMargin"
                            duration: toolbar.animationDuration
                        }
                    }
                },
                Transition {
                    from: "closed portrait"
                    to: "opened portrait"
                    SequentialAnimation {
                        PropertyAnimation {
                            target:  toolbar
                            property: "visible"
                            duration: 0
                        }
                        PropertyAnimation {
                            target:  toolbar
                            property: "anchors.topMargin"
                            duration: toolbar.animationDuration
                        }
                    }
                },
                Transition {
                    from: "opened portrait"
                    to: "closed portrait"
                    SequentialAnimation {
                        PropertyAnimation {
                            target:  toolbar
                            property: "anchors.topMargin"
                            duration: toolbar.animationDuration
                        }
                        PropertyAnimation {
                            target:  toolbar
                            property: "visible"
                            duration: 0
                        }
                    }
                }
            ]
        }
    ]

    Rectangle { // background
        anchors.fill: parent
        color: uiController.toolbarBackgroundColor
    }

    QKitGrid {
        id: toolbarContent
        objectName: toolbar.objectName + ":Content"

        property int nChildren: 0 // childrent number

        anchors.fill: parent
        anchors.margins: 0.1 * Math.min(toolbar.width, toolbar.height);
        spacing: anchors.margins
        onChildrenChanged: {
            for (nChildren = 0; children[nChildren]; nChildren++); // count all children
        }
    }

    Rectangle { // border line
        id: toolbarBorder
        color: toolbar.borderColor
    }

    onKeysPressed: { // key event handler
        switch (event.key) {
        case toolbar.leftButtonPressKey:
            if (local.leftButton) local.leftButton.pressByKey(event);
            break;
        case toolbar.rightButtonPressKey:
            if (local.rightButton) local.rightButton.pressByKey(event);
            break;
        default:
            return;
        }
    }
}

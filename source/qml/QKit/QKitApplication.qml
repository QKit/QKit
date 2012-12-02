/*******************************************************************************
*                                                                              *
*  Application item implementation.                                            *
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

QKitPage {
    id: qkitApplication
    objectName: "QKitApplication"

    default property alias content: applicationWorkspace.children //!< application content
    property string os: "Desktop" // operating system (Desktop, Harmattan, Fremantle, Symbian S60, Symnian^3)
    property bool isSimulator: os == "Simulator" // operating system
    property bool isDesktopOs: os == "Desktop" // operating system
    property bool isHarmattanOs: os == "Harmattan" // operating system
    property bool isSymbianOS: os == "Symbian" || os == "Symbian S60" || os == "Symbian^3"
    property bool isLandscapeOrientation: width >= height // orientation
    property bool isPortraitOrientation: !isLandscapeOrientation // orientation
    property Item toolBar: null //!< application tool bar
    property alias workspace: applicationWorkspace //!< application workspace
    property bool toolbarOverWorkspace: true

    // QKitPage properties
    tools: null
    // QKit properties
    meta: qkitApplication
    application: qkitApplication
    logController: QKitLogController { } // logging settings
    uiController:  QKitUiController { }  // item with UI settings
    keyController: QKitKeyController { } // item with key settings
    navController: QKitNavController { } // key navigation controllerler
    // QML properties
    focus: true

    QKitFocusScope {
        id: applicationWorkspace
        objectName: qkitApplication.objectName + ":Workspace"

        property bool margeByToolbar: !qkitApplication.toolbarOverWorkspace && qkitApplication.toolBar !== null && qkitApplication.toolBar.visible

        anchors.fill: qkitApplication
        focus: true

        states: [
            State {
                when: qkitApplication.isDesktopOs
                PropertyChanges {
                    target: applicationWorkspace
                    anchors.topMargin: margeByToolbar ? qkitApplication.toolBar.y + qkitApplication.toolBar.height : 0
                }
            },
            State {
                when: !qkitApplication.isDesktopOs && qkitApplication.isLandscapeOrientation
                PropertyChanges {
                    target: applicationWorkspace
                    anchors.rightMargin: margeByToolbar ? qkitApplication.width - qkitApplication.toolBar.x : 0
                }
            },
            State {
                when: !qkitApplication.isDesktopOs && qkitApplication.isPortraitOrientation
                PropertyChanges {
                    target: applicationWorkspace
                    anchors.bottomMargin: margeByToolbar ? qkitApplication.height - qkitApplication.toolBar.y : 0
                }
            }
        ]
    }

    onKeysPressed: if (toolBar !== null) toolBar.keysPressed(event) // send event first to toolbar if toolbar exists
    onToolBarChanged: {
        if (toolBar !== null) {
            toolBar.parent = qkitApplication;
            qkitApplication.tools = toolBar.defaultTools;
        }
    }
}

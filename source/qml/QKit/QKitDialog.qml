/*******************************************************************************
*                                                                              *
*  Dialog item implementation.                                                 *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is part of the QKit project.                                      *
*                                                                              *
*  $QT_BEGIN_LICENSE:GPL$                                                      *
*  You may use this file under the terms of the GNU General Public License     *
*  as published by the Free Software Foundation; version 3 of the License.     *
*                                                                              *
*  This file is distributed in the hope that it will be useful,                *
*  but WITHOUT ANY WARRANTY; without even the implied warranty of              *
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                *
*  GNU General Public License for more details.                                *
*                                                                              *
*  You should have received a copy of the GNU General Public License           *
*  along with this package; if not, write to the Free Software                 *
*  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.   *
*  $QT_END_LICENSE$                                                            *
*                                                                              *
*******************************************************************************/

import Qt 4.7

QKitItem {
    id: dialog
    objectName: "QKitDialog"

    // UI properties
    property int animationDuration: uiController.dialogAnimationDuration
    property color backgroundColor: uiController.dialogBackgroundColor
    // key properties
    property int closeKey: keyController.dialogCloseKey
    // other properties
    property Item contentItem: dialog // item with content
    property bool closeOnBack: true // close dialog on click on back signal or not

    signal opened() // emits on dialog open
    signal closed() // emits on dialog close
    signal back() // emits on back action

    uiAmbience: "dialog" // UI ambience
    enabled: false // initially closed
    visible: enabled // visible only if enabled
    z: 1 // to view ower other

    Rectangle { // background
        id: dialogBackground

        anchors.fill: parent // fill parent when opened
        color: dialog.backgroundColor

        state: (dialog.visible ? "shown" : "hidden")
        states: [
            State {
                name: "shown"
            },
            State {
                name: "hidden"
                PropertyChanges {
                    target: dialogBackground
                    color: "#00000000"
                }
            }
        ]

        transitions: [
            Transition {
                to: "shown"
                SequentialAnimation {
                    ColorAnimation {
                        target:  dialogBackground
                        duration: animationDuration
                    }
                }
            }
        ]
    }

    MouseArea { // for out of bar click test
        anchors.fill: parent
        onClicked: dialog.back() // if clicked, then click if out of dialog element, and back signal generates
    }

    onEnabledChanged: {
        if (enabled) {
            contentItem.forceActiveFocus()
            dialog.opened()
        } else {
            if (parent) parent.forceActiveFocus()
            dialog.closed()
        }
    }

    Keys.onPressed: {
        switch (event.key) {
        case closeKey:
            back();
            break;
        }
        event.accepted = true
    }

    onBack: if (closeOnBack) enabled = false;
}

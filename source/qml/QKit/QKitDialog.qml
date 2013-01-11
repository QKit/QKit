/*******************************************************************************
*                                                                              *
*  Dialog item implementation.                                                 *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
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

QKitFocusScope {
    id: dialog
    objectName: "QKitDialog"

    // UI properties
    property int animationDuration: uiController.dialogAnimationDuration
    property color backgroundColor: uiController.dialogBackgroundColor
    // key properties
    property int backKey: keyController.dialogBackKey
    // other properties
    property bool activeFocusOnOpen: true //!< whether the diialog should gain active focus on open
    property bool closeOnBack: true //!< close dialog on click on back signal or not

    signal open() // emits on dialog open
    signal close() // emits on dialog close
    signal back() // emits on back action

    uiAmbience: "dialog" // UI ambience
    visible: false // initially closed
    z: 1 // to view ower other

    Rectangle { // background
        id: dialogBackground

        anchors.fill: dialog // fill dialog when opened
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
                ColorAnimation {
                    target:  dialogBackground
                    duration: animationDuration
                }
            }
        ]
    }

    MouseArea { // for out of bar click test
        anchors.fill: parent
        onClicked: dialog.back() // if clicked, then click if out of dialog element, and back signal generates
    }

    onKeysPressed: {
        switch (event.key) {
        case backKey:
            dialog.back();
            break;
        default:
            return; // to not accept the event
        }
        event.accepted = true;
    }

    onOpen: {
        visible = true; // show the dialog
        if (dialog.activeFocusOnOpen) dialog.forceActiveFocus();
    }

    onClose: {
        visible = false; // hide the dialog
        focus = false; // disfocus the dialog
    }

    onBack: if (dialog.closeOnBack) dialog.close();
}

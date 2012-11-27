/*******************************************************************************
*                                                                              *
*  Button item implementation.                                                 *
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
    id: button
    objectName: "QKitButton"

    property string text: "" // button text
    // UI properties
    property int borderWidth: uiController ? uiAmbience === "dialog" ? uiController.dialogButtonBorderWidth : uiAmbience === "page" ? uiController.pageButtonBorderWidth : uiAmbience === "toolbar" ? uiController.toolbarButtonBorderWidth : 0 : 0 // width of border
    property color backgroundColor: uiController ?  uiAmbience === "dialog" ? uiController.dialogButtonBackgroundColor : uiAmbience === "page" ? uiController.pageButtonBackgroundColor : uiAmbience === "toolbar" ? uiController.toolbarButtonBackgroundColor :  "#FFFFFF" : "#FFFFFF" // background color
    property color backgroundColorDimmed: uiController ? uiAmbience === "dialog" ? uiController.dialogButtonBackgroundColorDimmed : uiAmbience === "page" ? uiController.pageButtonBackgroundColorDimmed : uiAmbience === "toolbar" ? uiController.toolbarButtonBackgroundColorDimmed : backgroundColor : backgroundColor // background color when button is pressed
    property color backgroundColorSelected: uiController ? uiAmbience === "dialog" ? uiController.dialogButtonBackgroundColorSelected : uiAmbience === "page" ? uiController.pageButtonBackgroundColorSelected : uiAmbience === "toolbar" ? uiController.toolbarButtonBackgroundColorSelected : backgroundColor : backgroundColor // background color when button is selected
    property color borderColor: uiController ?  uiAmbience === "dialog" ? uiController.dialogButtonBorderColor : uiAmbience === "page" ? uiController.pageButtonBorderColor : uiAmbience === "toolbar" ? uiController.toolbarButtonBorderColor :  "#000000" : "#000000" // border color
    property color borderColorDimmed: uiController ? uiAmbience === "dialog" ? uiController.dialogButtonBorderColorDimmed : uiAmbience === "page" ? uiController.pageButtonBorderColorDimmed : uiAmbience === "toolbar" ? uiController.toolbarButtonBorderColorDimmed : borderColor : borderColor // border color when button is pressed
    property color borderColorSelected: uiController ? uiAmbience === "dialog" ? uiController.dialogButtonBorderColorSelected : uiAmbience === "page" ? uiController.pageButtonBorderColorSelected : uiAmbience === "toolbar" ? uiController.toolbarButtonBorderColorSelected : borderColor : borderColor // border color when button is selected
    property color textColor: uiController ?  uiAmbience === "dialog" ? uiController.dialogButtonTextColor : uiAmbience === "page" ? uiController.pageButtonTextColor : uiAmbience === "toolbar" ? uiController.toolbarButtonTextColor : "#000000" : "#000000" // text color
    property color textColorDimmed: uiController ? uiAmbience === "dialog" ? uiController.dialogButtonTextColorDimmed : uiAmbience === "page" ? uiController.pageButtonTextColorDimmed : uiAmbience === "toolbar" ? uiController.toolbarButtonTextColorDimmed : textColor : textColor // text color when button is pressed
    property color textColorSelected: uiController ? uiAmbience === "dialog" ? uiController.dialogButtonTextColorSelected : uiAmbience === "page" ? uiController.pageButtonTextColorSelected : uiAmbience === "toolbar" ? uiController.toolbarButtonTextColorSelected : textColor : textColor // text color when button is selected
    property url imageSource: "" // url to image
    property url imageSourceDimmed: imageSource // url to image when button is pressed
    property url imageSourceSelected: imageSource // url to image when button is selected
    property bool mouseHoverEnabled: uiController ? uiController.mouseHoverEnabled : false // handle mouse hover or not
    // key properties
    property int pressKey: keyController ? uiAmbience === "dialog" ? keyController.dialogButtonPressKey : uiAmbience === "toolbar" ? keyController.toolbarButtonPressKey : keyController.buttonPressKey : 0 // key for press
    // other properties
    property Item textItem: buttonTextItem // item with text
    property Item imageItem: buttonImageItem // item with image
    // QML properties
    smooth: uiController ? uiAmbience === "dialog" ? uiController.dialogButtonSmooth : uiAmbience === "page" ? uiController.pageButtonSmooth : uiAmbience === "toolbar" ? uiController.toolbarButtonSmooth : false : false // do smooth scale or transform
    radius: uiAmbience === "dialog" ? 0.4 * height : uiAmbience === "page" ? 0.4 * height : uiAmbience === "toolbar" ? 0.3 * height : 0 // angle radius
    width: uiController ? uiAmbience === "toolbar" ? button.application.isDesktopOs ? height : parent.flow === Grid.LeftToRight ? (parent.width - (parent.nChildren - 1) * parent.spacing) / parent.nChildren : parent.width : null : null // width
    height: uiController ? uiAmbience === "toolbar" ? parent.flow === Grid.LeftToRight ? parent.height : (parent.height - (parent.nChildren - 1) * parent.spacing) / parent.nChildren : null : null // height
    color: button.backgroundColor
    border.color: button.borderColor
    border.width: button.borderWidth

    signal clicked() // emits when button is clicked
    signal doubleClicked() // emits when button is double clicked
    signal entered() // emits when mouse pointer enters button area
    signal exited() // emits when mouse pointer exits button area
    signal pressAndHold() // emits when button is pressed for a long time
    signal pressed() // emits when button is pressed
    signal pressedChanged() // emits when button pressed state is changes
    signal released() // emits when button is released

    function pressByKey(event) { // press button by particular key
        if (!enabled) return // must be enabled to press
        event.accepted = true;  // the key was handled
        button.forceActiveFocus() // focus on button to handle key release
        local.key = event.key // remember key
        local.pressed = true // press button
        button.pressed() // press signal
    }

    resources: [
        Item { // local variables
            id: local

            property bool pressed: false // pressed or not
            property int key // button was pressed by the key

            states: [
                State { // on pressed or disabled
                    name: "dimmed"
                    when: local.pressed || buttonMouseArea.pressed || !button.enabled
                    PropertyChanges {
                        target: button
                        color: button.backgroundColorDimmed
                        border.color: button.borderColorDimmed
                    }
                    PropertyChanges {
                        target: buttonTextItem
                        color: button.textColorDimmed
                    }
                    PropertyChanges {
                        target: buttonImageItem
                        source: button.imageSourceDimmed
                    }
                },
                State { // on selected or focused
                    name: "selected"
                    when: button.enabled && !local.pressed && (buttonMouseArea.containsMouse || button.selected)
                    PropertyChanges {
                        target: button
                        color: button.backgroundColorSelected
                        borderColor: button.borderColorSelected
                    }
                    PropertyChanges {
                        target: buttonTextItem
                        color: button.textColorSelected
                    }
                    PropertyChanges {
                        target: buttonImageItem
                        source: button.imageSourceSelected
                    }
                }
            ]
        }
    ]

    Row { // button content
        anchors.centerIn: parent
        height: parent.height
        width: childrenRect.width
        Image { // item with image
            id: buttonImageItem

            anchors.verticalCenter: parent.verticalCenter
            source: button.imageSource
//            width: source == "" ? 0 : button.width
//            height: source == "" ? 0 : button.height
//            fillMode: Image.PreserveAspectFit
            scale: Math.min(button.height / sourceSize.height, button.width / sourceSize.width)
            smooth: button.smooth
        }
        Text { // item with text
            id: buttonTextItem

            anchors.verticalCenter: parent.verticalCenter
            text: button.text
            color: button.textColor
            font.pixelSize: 0.5 * parent.height
        }
    }

    MouseArea {
        id: buttonMouseArea

        anchors.fill: button
        hoverEnabled: button.mouseHoverEnabled // handle mouse hover or not
        onClicked: button.clicked()
        onDoubleClicked: button.doubleClicked()
        onEntered: button.entered()
        onExited:  button.exited()
        onPressAndHold: button.pressAndHold()
        onPressed: button.pressed()
        onPressedChanged: button.pressedChanged()
        onReleased: button.released()
    }

    onKeysPressed: if (event.key === button.pressKey) button.pressByKey(event);
    onKeysReleased: {
        if (event.key === local.key) { // if was pressed by that key
            local.key = 0 // forget press key
            local.pressed = false // now not pressed
            button.released() // release signal
            button.clicked() // click signal
            event.accepted = true;
        }
    }
}

/*******************************************************************************
*                                                                              *
*  Abstract button item implementation.                                        *
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

QKitRectangle {
    id: button
    objectName: "QKitAbstractButton"

    property string text: "" // button text
    // UI properties
    property int borderWidth: uiAmbience === "dialog" ? uiController.dialogButtonBorderWidth : uiAmbience === "toolbar" ? uiController.toolbarButtonBorderWidth : null // width of border
    property color backgroundColor: uiAmbience === "dialog" ? uiController.dialogButtonBackgroundColor : uiAmbience === "toolbar" ? uiController.toolbarButtonBackgroundColor : null // background color
    property color backgroundColorDimmed: uiAmbience === "dialog" ? uiController.dialogButtonBackgroundColorDimmed : uiAmbience === "toolbar" ? uiController.toolbarButtonBackgroundColorDimmed : backgroundColor // background color when button is pressed
    property color backgroundColorSelected: uiAmbience === "dialog" ? uiController.dialogButtonBackgroundColorSelected : uiAmbience === "toolbar" ? uiController.toolbarButtonBackgroundColorSelected : backgroundColor // background color when button is selected
    property color borderColor: uiAmbience === "dialog" ? uiController.dialogButtonBorderColor : uiAmbience === "toolbar" ? uiController.toolbarButtonBorderColor : null // border color
    property color borderColorDimmed: uiAmbience === "dialog" ? uiController.dialogButtonBorderColorDimmed : uiAmbience === "toolbar" ? uiController.toolbarButtonBorderColorDimmed : borderColor // border color when button is pressed
    property color borderColorSelected: uiAmbience === "dialog" ? uiController.dialogButtonBorderColorSelected : uiAmbience === "toolbar" ? uiController.toolbarButtonBorderColorSelected : borderColor // border color when button is selected
    property color textColor: uiAmbience === "dialog" ? uiController.dialogButtonTextColor : uiAmbience === "toolbar" ? uiController.toolbarButtonTextColor : null // text color
    property color textColorDimmed: uiAmbience === "dialog" ? uiController.dialogButtonTextColorDimmed : uiAmbience === "toolbar" ? uiController.toolbarButtonTextColorDimmed : textColor // text color when button is pressed
    property color textColorSelected: uiAmbience === "dialog" ? uiController.dialogButtonTextColorSelected : uiAmbience === "toolbar" ? uiController.toolbarButtonTextColorSelected : textColor // text color when button is selected
    property url imageSource: "" // url to image
    property url imageSourceDimmed: imageSource // url to image when button is pressed
    property url imageSourceSelected: imageSource // url to image when button is selected
    property bool mouseHoverEnabled: uiController.mouseHoverEnabled // handle mouse hover or not
    // key properties
    property int pressKey: uiAmbience === "dialog" ? keyController.dialogButtonPressKey : uiAmbience === "toolbar" ? keyController.toolbarButtonPressKey : keyController.buttonPressKey // key for press
    // other properties
    property Item textItem: buttonTextItem // item with text
    property Item imageItem: buttonImageItem // item with image

    smooth: uiAmbience === "dialog" ? uiController.dialogButtonSmooth : uiAmbience === "toolbar" ? uiController.toolbarButtonSmooth : false // do smooth scale or transform
    radius: uiAmbience === "dialog" ? 0.4 * height : uiAmbience === "toolbar" ? 0.3 * height : null // angle radius
    width: uiAmbience === "toolbar" ? uiController.isDesktopOs ? height : parent.flow === Grid.LeftToRight ? (parent.width - (parent.nChildren - 1) * parent.spacing) / parent.nChildren : parent.width : null // width
    height: uiAmbience === "toolbar" ? parent.flow === Grid.LeftToRight ? parent.height : (parent.height - (parent.nChildren - 1) * parent.spacing) / parent.nChildren : null // height

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
        local.key = event.key // remember key
        local.pressed = true // press button
        focus = true // focus on button to handle key release
        button.pressed() // press signal
    }

    color: button.backgroundColor
    border.color: button.borderColor
    border.width: button.borderWidth
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

    Keys.onPressed: {
        switch (event.key) {
        case button.pressKey:
            button.pressByKey(event)
            break
        default:
            return
        }
        event.accepted = true
    }
    Keys.onReleased: {
        switch (event.key) {
        case local.key: // was pressed by that key
            local.key = 0 // forget press key
            local.pressed = false // now not pressed
            button.released() // release signal
            button.clicked() // click signal
            break
        default:
            return
        }
        event.accepted = true
    }
}

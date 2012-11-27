/*******************************************************************************
*                                                                              *
*  Key settings item implementation.                                            *
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

QtObject {
    property int backKey: Qt.Key_Backspace //!< key for back action

    property int navMoveLeftKey: Qt.Key_Left //!< key for left moving in nav items
    property int navMoveRightKey: Qt.Key_Right //!< key for right moving in nav items
    property int navMoveUpKey: Qt.Key_Up //!< key for up moving in nav items
    property int navMoveDownKey: Qt.Key_Down //!< key for down moving in nav items

    property int buttonPressKey: Qt.Key_Select //!< key for button press

    property int dialogBackKey: backKey //!< key for dialog back action
    property int dialogButtonPressKey: buttonPressKey //!< key for dialog button press

    property int dragMoveDownKey: navMoveDownKey //!< key for down moving on drag
    property int dragMoveLeftKey: navMoveLeftKey //!< key for left moving on drag
    property int dragMoveRightKey: navMoveRightKey //!< key for right moving on drag
    property int dragMoveUpKey: navMoveUpKey //!< key for up moving in nav on drag
    property int dragRotateAnticlockwiseKey: Qt.Key_PageUp //!< key for anticlockwize rotation on drag
    property int dragRotateClockwiseKey: Qt.Key_PageDown //!< key for clockwize rotation on drag
    property int dragZoomInKey: Qt.Key_Plus //!< key for zoom in on drag
    property int dragZoomOutKey: Qt.Key_Minus //!< key for zoom out on drag

    property int toolbarLeftButtonPressKey: Qt.Key_Context1 //!< key for left toolbar button
    property int toolbarRightButtonPressKey: Qt.Key_Context2 //!< key for right toolbar button
    property int toolbarButtonPressKey: buttonPressKey //!< key for toolbar button press
}

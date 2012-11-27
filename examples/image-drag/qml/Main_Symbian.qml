/*******************************************************************************
*                                                                              *
*  Main item adapter for Symbian implementation.                               *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of an example for the QKit project.                     *
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

import "QKit"

Main {
    os: "Symbian"
    uiController: QKitUiController {
        mouseHoverEnabled: false
        buttonSmooth: false
        thumbnailSmooth: false
    }
    keyController: QKitKeyController {
        dragMoveDownKey: Qt.Key_8 //!< key for down moving on drag
        dragMoveLeftKey: Qt.Key_4 //!< key for left moving on drag
        dragMoveRightKey: Qt.Key_6 //!< key for right moving on drag
        dragMoveUpKey: Qt.Key_2 //!< key for up moving in nav on drag
        dragRotateAnticlockwiseKey: Qt.Key_1 //!< key for anticlockwize rotation on drag
        dragRotateClockwiseKey: Qt.Key_3 //!< key for clockwize rotation on drag
        dragZoomInKey: Qt.Key_7 //!< key for zoom in on drag
        dragZoomOutKey: Qt.Key_9 //!< key for zoom out on drag
    }
}

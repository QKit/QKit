/*******************************************************************************
*                                                                              *
*  PinchArea item implementation.                                              *
*                                                                              *
*  Copyright (C) 2012 Kirill Chuvilin.                                         *
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

import QtQuick 1.1

PinchArea {
    objectName: "QKitPinchArea"
    // meta data
    property Item meta: parent //!< source of meta data
    property Item application: meta ? meta.application : null //!< application item
    property string uiAmbience: meta ? meta.uiAmbience : "" //!< UI ambience: dialog, page, toolbar
    // controllers
    property QtObject logController: meta ? meta.logController : null //!< logging settings
    property QtObject uiController:  meta ? meta.uiController  : null //!< item with UI settings
    property QtObject keyController: meta ? meta.keyController : null //!< item with key settings
    property QtObject navController: meta ? meta.navController : null //!< key navigation controllerler
    // QKit properties
    property bool selected: activeFocus //!< selected or not
    // signals
    signal componentComplited() // handler for Component.onComplited
    signal keysPressed(variant event) // handler for Keys.onPressed
    signal keysReleased(variant event) // handler for Keys.onReleased
    // handlers
    Component.onCompleted: {
        if (logController && logController.completedLogging) console.log(objectName + " - completed");
        componentComplited();
    }
    Keys.onPressed: keysPressed(event)
    Keys.onReleased: keysReleased(event)
    onActiveFocusChanged: if (logController && logController.activeFocusLogging) console.log(objectName + " - activeFocus changed to " + activeFocus)
    onEnabledChanged: if (logController && logController.enabledLogging) console.log(objectName + " - enabled changed to " + enabled)
    onFocusChanged: if (logController && logController.focusLogging) console.log(objectName + " - focus changed to " + focus)
    onParentChanged: if (logController && logController.parentLogging) console.log(objectName + " - parent changed to " + (parent ? parent.objectName : "[NULL]"))
    onSelectedChanged: if (logController && logController.selectedLogging) console.log(objectName + " - selected changed to " + selected)
}

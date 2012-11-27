/*******************************************************************************
*                                                                              *
*  FocusScope item implementation.                                             *
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

import Qt 4.7

FocusScope {
    id: qkitItem
    objectName: "QKitFocusScope"
    // meta data
    property Item meta: qkitItem.parent //!< source of meta data
    property Item application: qkitItem.meta ? qkitItem.meta.application : null //!< application item
    property string uiAmbience: qkitItem.meta ? qkitItem.meta.uiAmbience : "" //!< UI ambience: dialog, page, toolbar
    // controllers
    property QtObject logController: qkitItem.meta ? qkitItem.meta.logController : null //!< logging settings
    property QtObject uiController:  qkitItem.meta ? qkitItem.meta.uiController  : null //!< item with UI settings
    property QtObject keyController: qkitItem.meta ? qkitItem.meta.keyController : null //!< item with key settings
    property QtObject navController: qkitItem.meta ? qkitItem.meta.navController : null //!< key navigation controllerler
    // QKit properties
    property bool selected: qkitItem.activeFocus //!< selected or not
    // signals
    signal componentCompleted() //!< handler for Component.onComplited
    signal keysPressed(variant event) //!< handler for Keys.onPressed
    signal keysReleased(variant event) //!< handler for Keys.onReleased
    // handlers
    Component.onCompleted: {
        if (qkitItem.logController && qkitItem.logController.completedLogging) console.log(qkitItem.objectName + " - completed");
        qkitItem.componentCompleted();
    }
    Keys.onPressed: qkitItem.keysPressed(event)
    Keys.onReleased: qkitItem.keysReleased(event)
    onActiveFocusChanged: if (qkitItem.logController && qkitItem.logController.activeFocusLogging) console.log(qkitItem.objectName + " - activeFocus changed to " + qkitItem.activeFocus)
    onEnabledChanged: if (qkitItem.logController && qkitItem.logController.enabledLogging) console.log(qkitItem.objectName + " - enabled changed to " + qkitItem.enabled)
    onFocusChanged: if (qkitItem.logController && qkitItem.logController.focusLogging) console.log(qkitItem.objectName + " - focus changed to " + qkitItem.focus)
    onParentChanged: if (qkitItem.logController && qkitItem.logController.parentLogging) console.log(qkitItem.objectName + " - parent changed to " + (qkitItem.parent ? qkitItem.parent.objectName : "[NULL]"))
    onSelectedChanged: if (qkitItem.logController && qkitItem.logController.selectedLogging) console.log(qkitItem.objectName + " - selected changed to " + qkitItem.selected)
}

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

QKitFocusScope {
    id: item
    objectName: "QKitApplication"

    property string os: "Desktop" // operating system (Desktop, Harmattan, Fremantle, Symbian S60, Symnian^3)
    property bool isSimulator: os == "Simulator" // operating system
    property bool isDesktopOs: os == "Desktop" // operating system
    property bool isHarmattanOs: os == "Harmattan" // operating system
    property bool isSymbianOS: os == "Symbian" || os == "Symbian S60" || os == "Symbian^3"
    property bool isLandscapeOrientation: width >= height // orientation
    property bool isPortraitOrientation: !isLandscapeOrientation // orientation

    // QKit properties
    meta: item
    application: item
    uiAmbience: "" // UI ambience
    logController: QKitLogController{} // logging settings
    uiController:  QKitUiController{}  // item with UI settings
    keyController: QKitKeyController{} // item with key settings
    navController: QKitNavController{} // key navigation controllerler
    // QML properties
    focus: true
}

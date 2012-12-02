/*******************************************************************************
*                                                                              *
*  Menu layout item implementation.                                            *
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

QKitMenuItem {
    id: menuLayout
    objectName: "QKitMenuLayout"

    default property alias content: submenuModel.children // submenu content

    QKitFocusScope {
        id: menuLayoutRoot
        objectName: menuLayout.objectName + ":Root"

        visible: false
        width: menuLayout.width
        height: menuLayout.height

        QKitNavListView { // menu view
            id: menuLayoutView
            objectName: menuLayout.objectName + ":View"

            property alias menu: menuLayout.__menu

            focus: true
            anchors.centerIn: parent
            width: menu !== null ? menu.elementWidth : 1
            height: menu !== null ? Math.min(menu.height - 2 * spacing, childrenRect.height) : 1
            spacing: menu !== null ? 0.5 * menu.elementHeight : 1
            keyNavigationWraps: true
            model: VisualItemModel {id: submenuModel}
        }
    }

    onClicked: {
        menuLayoutView.currentIndex = -1; // reset selected item
        __menu.__stack.push(menuLayoutRoot);
    }
}

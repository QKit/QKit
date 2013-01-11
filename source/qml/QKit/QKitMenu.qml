/*******************************************************************************
*                                                                              *
*  Menu item implementation.                                                   *
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

QKitDialog {
    id: menu
    objectName: "QKitMenu"

    default property alias content: menuModel.children // menu content
    property int elementWidth: 0.9 * Math.min(width, height) // width of elements
    property int elementHeight: 0.1 * Math.min(width, height) // height of elements
    property alias __stack: menuStack

    signal elementSelected() // emits on any element select

    closeOnBack: false // to handle back manually

    QKitItemStack {
        id: menuStack
        objectName: menu.objectName + ":Stack"
        anchors.fill: parent
        focus: true

        QKitFocusScope {
            id: menuRoot
            objectName: menu.objectName + ":Root"

            QKitNavListView { // menu view
                id: menuView
                objectName: menuRoot.objectName + ":View"

                property alias menu: menu

                focus: true
                anchors.centerIn: parent
                width: menu.elementWidth
                height: Math.min(parent.height - 2 * spacing, childrenRect.height)
                spacing: 0.5 * menu.elementHeight
                keyNavigationWraps: true
                model: VisualItemModel { id: menuModel }
            }
        }
    }

    onOpen: menuView.currentIndex = -1; // reset selected item
    onClose: {
        while (menuStack.count() > 1) menuStack.pop(); // return to root
    }
    onBack: {
        if (menuStack.count() > 1) {
            menuStack.pop();
        } else {
            menu.close();
        }
    }
}

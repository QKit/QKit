/*******************************************************************************
*                                                                              *
*  Menu item implementation.                                                   *
*                                                                              *
*  Copyright (C) 2012 Kirill Chuvilin.                                         *
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

QKitMenu {
    id: menu

    QKitMenuElement {
        text: qsTr("Back")
        onClicked: menu.back()
    }
    QKitMenuElement {
        text: qsTr("Do nothing")
    }
    QKitSubmenu {
        text: qsTr("Submenu 1")
        QKitMenuElement {
            text: qsTr("Back")
            onClicked: menu.back()
        }
        QKitMenuElement {
            text: qsTr("Quit")
            onClicked: Qt.quit()
        }
    }
    QKitMenuElement {
        text: qsTr("Do nothing")
    }
    QKitSubmenu {
        text: qsTr("Submenu 2")
        QKitMenuElement {
            text: qsTr("Close menu")
            onClicked: menu.close()
        }
        QKitMenuElement {
            text: qsTr("Back")
            onClicked: menu.back()
        }
        QKitSubmenu {
            text: qsTr("Submenu submenu")
            QKitMenuElement {
                text: qsTr("Do nothing")
            }
            QKitMenuElement {
                text: qsTr("Back")
                onClicked: menu.back()
            }
            QKitMenuElement {
                text: qsTr("Quit")
                onClicked: Qt.quit()
            }
        }
    }
    QKitMenuElement {
        text: qsTr("Quit")
        onClicked: Qt.quit()
    }
    QKitMenuElement {
        text: qsTr("Do nothing")
    }
}

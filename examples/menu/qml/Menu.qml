/*******************************************************************************
*                                                                              *
*  Menu item implementation.                                                   *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is part of an example for the QKit project.                       *
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
            onClicked: menu.enabled = false
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

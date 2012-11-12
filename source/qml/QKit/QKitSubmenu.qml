/*******************************************************************************
*                                                                              *
*  Submenu item implementation.                                                *
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

QKitMenuElement {
    id: submenu
    objectName: "QKitSubmenu"

    default property alias content: submenuModel.children // submenu content

    QKitItem {
        id: submenuRoot
        objectName: submenu.objectName + ":Root"

        visible: false
        width: menu.width
        height: menu.height

        QKitNavListView { // menu view
            id: submenuView
            objectName: submenu.objectName + ":View"

            property alias menuItem: submenu.__menuItem

            anchors.centerIn: parent
            width: menu.elementWidth
            height: Math.min(parent.height - 2 * spacing, childrenRect.height)
            spacing: 0.5 * menu.elementHeight
            keyNavigationWraps: true
            model: VisualItemModel {id: submenuModel}
        }

        onActiveFocusChanged: {
            if (activeFocus) {
                submenuView.currentIndex = -1; // reset selected item on open
                submenuView.forceActiveFocus();
            }
        }
    }

    onClicked: {
        __menuItem.__stack.push(submenuRoot);
    }
}

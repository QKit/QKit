/*******************************************************************************
*                                                                              *
*  Dialog item implementation.                                                 *
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

QKitDialog {
    id: menu
    objectName: "QKitMenu"

    default property alias content: menuModel.children // menu content

    property int elementWidth: 0.9 * Math.min(width, height) // width of elements
    property int elementHeight: 0.1 * Math.min(width, height) // height of elements

    contentItem: menuView // item with content

    QKitNavListView { // menu view
        id: menuView
        objectName: menu.objectName + ":View"
        anchors.centerIn: parent
        width: menu.elementWidth
        height: Math.min(parent.height, childrenRect.height)
        spacing: 0.5 * menu.elementHeight
        keyNavigationWraps: true
        model: VisualItemModel {id: menuModel}
    }

    onOpened: menuView.currentIndex = -1 // reset selected item on open
}

/*******************************************************************************
*                                                                              *
*  Main item implementation.                                                   *
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

QKitApplication {
    QKitPage {
        anchors.fill: parent

        QKitButton {
            id: menuButton
            anchors.centerIn: parent
            width: 0.8 * Math.min(parent.width, parent.height)
            height: width / 3
            text: qsTr("Menu")
            onClicked: menu.enabled = true
        }
    }

    onFocusChanged: if (activeFocus) menuButton.forceActiveFocus()

    Menu {
        id: menu
        anchors.fill: parent
    }
}

/*******************************************************************************
*                                                                              *
*  Toolbar item implementation.                                                *
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

QKitToolbar {
    id: toolbar
    QKitToolbarBackButton {
        enabled: toolbar.parent !== rootPage
        onClicked: stack.pop()
    }
    QKitButton {
        enabled: !stack.has(redPage)
        backgroundColor: redPage.backgroundColor
        onClicked: stack.push(redPage)
    }
    QKitButton {
        enabled: !stack.has(greenPage)
        backgroundColor: greenPage.backgroundColor
        onClicked: stack.push(greenPage)
    }
    QKitButton {
        enabled: !stack.has(bluePage)
        backgroundColor: bluePage.backgroundColor
        onClicked: stack.push(bluePage)
    }
    QKitButton {
        enabled: !stack.has(yellowPage)
        backgroundColor: yellowPage.backgroundColor
        onClicked: stack.push(yellowPage)
    }
    QKitButton {
        enabled: !stack.has(magentaPage)
        backgroundColor: magentaPage.backgroundColor
        onClicked: stack.push(magentaPage)
    }
    QKitButton {
        enabled: !stack.has(cyanPage)
        backgroundColor: cyanPage.backgroundColor
        onClicked: stack.push(cyanPage)
    }
}

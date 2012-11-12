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
    QKitItemStack {
        id: stack
        width: parent.width
        height: parent.height

        Page {
            id: rootPage
        }
    }

    Page {
        id: redPage
        backgroundColor: "#FF0000"
    }
    Page {
        id: greenPage
        backgroundColor: "#00FF00"
    }
    Page {
        id: bluePage
        backgroundColor: "#0000FF"
    }
    Page {
        id: yellowPage
        backgroundColor: "#FFFF00"
    }
    Page {
        id: magentaPage
        backgroundColor: "#FF00FF"
    }
    Page {
        id: cyanPage
        backgroundColor: "#00FFFF"
    }
}

/*******************************************************************************
*                                                                              *
*  Main item implementation.                                                   *
*                                                                              *
*  Copyright (C) 2012 Kirill Chuvilin.                                         *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of an example for the QKit project.                     *
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

import "QKit"

QKitApplication {
    toolBar: ToolBar { }

    QKitItemStack {
        id: stack
        width: parent.width
        height: parent.height
        focus: true

        Page { // this page will be added to stack on component creation
            id: rootPage
            objectName: "rootPage"
        }
    }

    Page {
        id: redPage
        objectName: "redPage"
        backgroundColor: "#FF0000"
    }
    Page {
        id: greenPage
        objectName: "greenPage"
        backgroundColor: "#00FF00"
    }
    Page {
        id: bluePage
        objectName: "bluePage"
        backgroundColor: "#0000FF"
    }
    Page {
        id: yellowPage
        objectName: "yellowPage"
        backgroundColor: "#FFFF00"
    }
    Page {
        id: magentaPage
        objectName: "magentaPage"
        backgroundColor: "#FF00FF"
    }
    Page {
        id: cyanPage
        objectName: "cyanPage"
        backgroundColor: "#00FFFF"
    }
}

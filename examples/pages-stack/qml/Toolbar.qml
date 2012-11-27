/*******************************************************************************
*                                                                              *
*  Toolbar item implementation.                                                *
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

QKitToolbar {
    id: toolbar
    QKitToolbarBackButton {
        id: backButton
        enabled: toolbar.parent !== rootPage
        onClicked: stack.pop()
    }
    QKitButton {
        id: redPageButton
        enabled: !stack.has(redPage)
        text: "1"
        textColor: "#000000"
        backgroundColor: redPage.backgroundColor
        onClicked: stack.push(redPage)
    }
    QKitButton {
        id: greenPageButton
        enabled: !stack.has(greenPage)
        text: "2"
        textColor: "#000000"
        backgroundColor: greenPage.backgroundColor
        onClicked: stack.push(greenPage)
    }
    QKitButton {
        id: bluePageButton
        enabled: !stack.has(bluePage)
        text: "3"
        textColor: "#000000"
        backgroundColor: bluePage.backgroundColor
        onClicked: stack.push(bluePage)
    }
    QKitButton {
        id: yellowPageButton
        enabled: !stack.has(yellowPage)
        text: "4"
        textColor: "#000000"
        backgroundColor: yellowPage.backgroundColor
        onClicked: stack.push(yellowPage)
    }
    QKitButton {
        id: magentaPageButton
        enabled: !stack.has(magentaPage)
        text: "5"
        textColor: "#000000"
        backgroundColor: magentaPage.backgroundColor
        onClicked: stack.push(magentaPage)
    }
    QKitButton {
        id: cyanPageButton
        enabled: !stack.has(cyanPage)
        text: "6"
        textColor: "#000000"
        backgroundColor: cyanPage.backgroundColor
        onClicked: stack.push(cyanPage)
    }

    onKeysPressed: {
        switch (event.key) {
        case keyController.backKey:
            backButton.pressByKey(event);
            break;
        case Qt.Key_1:
            redPageButton.pressByKey(event);
            break;
        case Qt.Key_2:
            greenPageButton.pressByKey(event);
            break;
        case Qt.Key_3:
            bluePageButton.pressByKey(event);
            break;
        case Qt.Key_4:
            yellowPageButton.pressByKey(event);
            break;
        case Qt.Key_5:
            magentaPageButton.pressByKey(event);
            break;
        case Qt.Key_6:
            cyanPageButton.pressByKey(event);
            break;
        }
    }
}

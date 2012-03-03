/*******************************************************************************
*                                                                              *
*  Column item with key navigation implementation.                             *
*                                                                              *
*  Copyright (C) 2011 Kirill Chuvilin.                                         *
*  All rights reserved.                                                        *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirik-ch.ru)           *
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

import QtQuick 1.0

QKitColumn {
    objectName: "QKitNavColumn"

    property bool looped: true // firt to last and vice versa
    property int currentIndex: -1 // current active item
    property bool focusOnCurrent: false // highlight current item or not

    Keys.onUpPressed: {
        if (!focusOnCurrent) {
            focusOnCurrent = true
            currentIndex = children.length - 1
        } else {
            var newcurrentIndex = currentIndex - 1
            if (newcurrentIndex >= 0)
                currentIndex = newcurrentIndex
            else if (looped)
                currentIndex = children.length - 1
            else
                currentIndex = 0
        }
    }
    Keys.onDownPressed: {
        if (!focusOnCurrent) {
            focusOnCurrent = true
            currentIndex = 0
        } else {
            var newcurrentIndex = currentIndex + 1
            if (newcurrentIndex <= children.length - 1)
                currentIndex = newcurrentIndex
            else if (looped)
                currentIndex = 0
            else
                currentIndex = children.length - 1
        }
    }

    onVisibleChanged: {
        if (!visible) {
            focusOnCurrent = false
            currentIndex = -1
        }
    }
    onChildrenChanged: {
        focusOnCurrent = false
        currentIndex = -1
    }
    onCurrentIndexChanged: {
        if (focusOnCurrent && currentIndex >= 0)
            children[currentIndex].focus = true
    }
}

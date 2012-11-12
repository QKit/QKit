/*******************************************************************************
*                                                                              *
*  ListView vith key navigation item implementation.                           *
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

QKitListView {
    id: navListView
    objectName: "QKitNavListView"

    property int moveLeftKey: keyController ? keyController.navMoveLeftKey : 0
    property int moveRightKey: keyController ? keyController.navMoveRightKey : 0
    property int moveUpKey: keyController ? keyController.navMoveUpKey : 0
    property int moveDownKey: keyController ? keyController.navMoveDownKey : 0

    function moveCurrentIndexLeft() {
        if (orientation == Qt.Horizontal) {
            switch (layoutDirection) {
            case Qt.LeftToRight:
                if (currentIndex == -1)
                    currentIndex = count - 1
                else
                    decrementCurrentIndex()
                break;
            case Qt.RightToLeft:
                if (currentIndex == -1)
                    currentIndex = 0
                else
                    incrementCurrentIndex()
                break;
            }
        }
    }
    function moveCurrentIndexRight() {
        if (orientation == Qt.Horizontal) {
            switch (layoutDirection) {
            case Qt.LeftToRight:
                if (currentIndex == -1)
                    currentIndex = 0
                else
                    incrementCurrentIndex()
                break;
            case Qt.RightToLeft:
                if (currentIndex == -1)
                    currentIndex = count - 1
                else
                    decrementCurrentIndex()
                break;
            }
        }
    }
    function moveCurrentIndexUp() {
        if (orientation == Qt.Vertical) {
            if (currentIndex == -1)
                currentIndex = count - 1
            else
                decrementCurrentIndex()
        }
    }
    function moveCurrentIndexDown() {
        if (orientation == Qt.Vertical) {
            if (currentIndex == -1)
                currentIndex = 0
            else
                incrementCurrentIndex()
        }
    }
    function highlightCurrentItem() {
        if (currentItem && highlightFollowsCurrentItem) { // if there is selected item
            currentItem.focus = true // focus on it
        } else { // if no selected item
            invisible.focus = true // reset focus from previous item
            navListView.focus = true // set focus to view
        }
    }

    Item { id: invisible; visible: false } // to reset focus

    highlight: navController ? navController.highlight : null // component to use as the highlight
    highlightFollowsCurrentItem: navController ? navController.highlightFollowsCurrentItem : false // whether the highlight is managed by the view
    highlightMoveSpeed: navController ? navController.highlightMoveSpeed : 0 // highlight move animation speed
    highlightMoveDuration: navController ? navController.highlightMoveDuration : 0 // highlight move animation duration
    highlightResizeSpeed: navController ? navController.highlightResizeSpeed : 0 // highlight resize animation speed
    highlightResizeDuration: navController ? navController.highlightResizeDuration : 0 // highlight resize animation duration
    keyNavigationWraps: navController ? navController.keyNavigationWraps : false // whether the list wraps key navigation

    currentIndex: -1 // no selected item

    onHighlightFollowsCurrentItemChanged: highlightCurrentItem()
    onCurrentItemChanged: highlightCurrentItem()
    onModelChanged: currentIndex = -1

    Keys.onLeftPressed: navController.moveCurrentIndexByKey(navListView, event) // standart left key handler
    Keys.onRightPressed: navController.moveCurrentIndexByKey(navListView, event) // standart right key handler
    Keys.onUpPressed: navController.moveCurrentIndexByKey(navListView, event) // standart up key handler
    Keys.onDownPressed: navController.moveCurrentIndexByKey(navListView, event) // standart down key handler
    Keys.onPressed: navController.moveCurrentIndexByKey(navListView, event) // unstandart keys handler
}

/*******************************************************************************
*                                                                              *
*  GridView vith key navigation item implementation.                           *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of the QKit project.                                    *
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

import Qt 4.7

QKitGridView {
    id: navGridView
    objectName: "QKitNavGridView"

    property int moveDownKey: keyController ? keyController.navMoveDownKey : 0 //!< key for down moving
    property int moveLeftKey: keyController ? keyController.navMoveLeftKey : 0 //!< key for left moving
    property int moveRightKey: keyController ? keyController.navMoveRightKey : 0 //!< key for right moving
    property int moveUpKey: keyController ? keyController.navMoveUpKey : 0 //!< key for up moving
    property Item __previousCurrentItem: null // previous current item

    function highlightCurrentItem() {
        if (currentItem !== null && highlightFollowsCurrentItem) { // if there is selected item
            currentItem.focus = true // focus on it
        } else { // if no selected item
            navListView.focus = true // set focus to view
        }
    }

    highlight: navController.highlight // component to use as the highlight
    // todo: remove declaration
    property bool highlightFollowsCurrentItem: navController.highlightFollowsCurrentItem // whether the highlight is managed by the view
//    highlightMoveSpeed: navController.highlightMoveSpeed // highlight move animation speed
    highlightMoveDuration: navController.highlightMoveDuration // highlight move animation duration
//    highlightResizeSpeed: navController.highlightResizeSpeed // highlight resize animation speed
//    highlightResizeDuration: navController.highlightResizeDuration // highlight resize animation duration
    keyNavigationWraps: navController.keyNavigationWraps // whether the list wraps key navigation

    currentIndex: -1 // no selected item

    onHighlightFollowsCurrentItemChanged: highlightCurrentItem()
    onCurrentItemChanged: {
        if (__previousCurrentItem !== null) __previousCurrentItem.focus = false; // deselect previous current item if exists
        __previousCurrentItem = currentItem;
        highlightCurrentItem();
    }
    onModelChanged: currentIndex = -1

    Keys.onLeftPressed: navController.moveCurrentIndexByKey(navGridView, event) // standart left key handler
    Keys.onRightPressed: navController.moveCurrentIndexByKey(navGridView, event) // standart right key handler
    Keys.onUpPressed: navController.moveCurrentIndexByKey(navGridView, event) // standart up key handler
    Keys.onDownPressed: navController.moveCurrentIndexByKey(navGridView, event) // standart down key handler
    Keys.onPressed: navController.moveCurrentIndexByKey(navGridView, event) // unstandart keys handler
}

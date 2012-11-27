/*******************************************************************************
*                                                                              *
*  Item stack item implementation.                                             *
*                                                                              *
*  Copyright (C) 2012 Kirill Chuvilin.                                         *
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

QKitItem {
    id: itemStack

    property int animationDuration: uiController.itemStackAnimationDuration //!< duration of animation
    default property alias __initialItems: itemsStackNotPushed.children //!< content

    /*!
     * \brief Push item to stack.
     * \param item item to push
     */
    function push(item) {
        if (item.parent === itemSrackContainer) return; // do nothing if item already in stack
        var items = itemSrackContainer.items; // items in stack
        items.push(item); // add new item
        itemSrackContainer.items = items; // update items
        itemSrackContainer.pushedItem = item;
        itemsStackHorizontalAnimation.enabled = true;
        itemSrackContainer.x = -itemStack.width;
    }


    /*!
     * \brief Pop item from stack.
     * \return poped item
     */
    function pop() {
        var items = itemSrackContainer.items; // items in stack
        if (items.legnth === 0) return null; // do nothing if no items
        var item = items.pop(); // take last item
        itemSrackContainer.items = items; // update items
        itemSrackContainer.popedItem = item;
        itemsStackHorizontalAnimation.enabled = true;
        itemSrackContainer.x = itemStack.width;
        return item;
    }


    /*!
     * \brief Get items count.
     * \return number of items in stack
     */
    function count() {return itemSrackContainer.itemsCount;}


    /*!
     * \brief Get active item.
     * \return last pushed item
     */
    function activeItem() {return itemSrackContainer.activeItem;}


    /*!
     * \brief Test has the stack an item or not.
     * \return true if item is in the stack, false otherwise
     * \param item item to test
     */
    function has(item) {return item.parent === itemSrackContainer;}

    clip: true

    QKitItem {
        id: itemSrackContainer
        objectName: itemStack.objectName + ":Container"

        property variant items: []; //!< items in stack
        property int itemsCount: itemSrackContainer.count();
        property Item activeItem: null; //!< active item
        property Item pushedItem: null; //!< item to add
        property Item popedItem: null; //!< item to remove
        property bool itemStackComplited: false

        /*!
         * \brief Get items count.
         * \return number of items in stack
         */
        function count() {
            var itmes = itemSrackContainer.items;
            return itmes.length;
        }

        x: 0
        y: 0
        width: itemStack.width
        height: itemStack.height

        Behavior on x {
            id: itemsStackHorizontalAnimation
            SequentialAnimation {
                ScriptAction {
                    script: {
                        itemsStackHorizontalAnimation.enabled = false;
                        if (itemSrackContainer.pushedItem !== null) { // if item was pushed
                            itemSrackContainer.pushedItem.visible = false; // to hide all changes
                            itemSrackContainer.pushedItem.parent = itemSrackContainer;
                            itemSrackContainer.pushedItem.x = itemStack.width;
                            itemSrackContainer.pushedItem.y = 0;
                            itemSrackContainer.pushedItem.width = itemStack.width;
                            itemSrackContainer.pushedItem.height = itemStack.height;
                            itemSrackContainer.pushedItem.visible = true;
                        } else if (itemSrackContainer.popedItem !== null) { // if item was poped
                            if (itemSrackContainer.itemsCount > 0) { // if there are any items
                                var items = itemSrackContainer.items; // items in stack
                                itemSrackContainer.activeItem = items[items.length - 1]; // new active item
                                itemSrackContainer.activeItem.x = -itemStack.width;
                                itemSrackContainer.activeItem.y = 0;
                                itemSrackContainer.activeItem.width = itemStack.width;
                                itemSrackContainer.activeItem.height = itemStack.height;
                                itemSrackContainer.activeItem.visible = true; // show previous active item
                                if (itemSrackContainer.popedItem.activeFocus) {
                                    itemSrackContainer.activeItem.forceActiveFocus(); // focus on new active item
                                } else if (itemSrackContainer.popedItem.focus) {
                                    itemSrackContainer.activeItem.focus = true; // focus on new active item
                                }
                            } else { // if there are no items
                                itemSrackContainer.activeItem = null; // no active item
                                if (itemSrackContainer.popedItem.activeFocus) {
                                    itemSrack.forceActiveFocus(); // focus on stack
                                } else if (itemSrackContainer.popedItem.focus) {
                                    itemSrack.focus = true; // focus on stack
                                }
                            }
                        }
                    }
                }
                NumberAnimation {
                    duration: itemSrackContainer.itemStackComplited && itemSrackContainer.activeItem !== null ? itemStack.animationDuration : 0
                }
                ScriptAction {
                    script: {
                        if (itemSrackContainer.pushedItem !== null) { // if item was pushed
                            if (itemSrackContainer.activeItem !== null) { // if there was item
                                if (itemSrackContainer.activeItem.activeFocus) {
                                    itemSrackContainer.pushedItem.forceActiveFocus(); // focus on new active item
                                } else if (itemSrackContainer.activeItem.focus) {
                                    itemSrackContainer.pushedItem.focus = true; // focus on new active item
                                }
                                itemSrackContainer.activeItem.visible = false; // hide previous active item
                            } else {
                                if (itemStack.activeFocus) {
                                    itemSrackContainer.pushedItem.forceActiveFocus(); // focus on new active item
                                } else if (itemStack.focus) {
                                    itemSrackContainer.pushedItem.focus = true; // focus on new active item
                                }
                            }
                            itemSrackContainer.activeItem = itemSrackContainer.pushedItem; // set new active item
                            itemSrackContainer.pushedItem = null;
                        } else if (itemSrackContainer.popedItem !== null) { // if item was poped
                            itemSrackContainer.popedItem.visible = false; // hide previous active item
                            itemSrackContainer.popedItem.parent = itemsStackNotPushed;
                            itemSrackContainer.popedItem = null;
                        }
                        itemSrackContainer.activeItem.x = 0;
                        itemSrackContainer.activeItem.y = 0;
                        itemSrackContainer.x = 0;
                        itemSrackContainer.y = 0;
                    }
                }
            }
        }
    }

    QKitItem { // container for not pushed items
        id: itemsStackNotPushed
        visible: false
    }

    onWidthChanged: if (itemSrackContainer.activeItem !== null) itemSrackContainer.activeItem.width = itemStack.width; // resize active item if it exists
    onHeightChanged: if (itemSrackContainer.activeItem !== null) itemSrackContainer.activeItem.height = itemStack.height; // resize active item if it exists
    onComponentCompleted: {
        while (__initialItems[0]) itemStack.push(__initialItems[0]); // push each initial item
        itemSrackContainer.itemStackComplited = true;
    }
    onFocusChanged: if (itemStack.focus && itemSrackContainer.activeItem !== null) itemSrackContainer.activeItem.focus = true
    onActiveFocusChanged:  if (itemStack.activeFocus && itemSrackContainer.activeItem !== null) itemSrackContainer.activeItem.forceActiveFocus()
}

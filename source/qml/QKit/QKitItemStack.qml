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

QKitFocusScope {
    id: itemStack

    property int animationDuration: uiController.itemStackAnimationDuration //!< duration of animation
    default property alias __initialItems: itemsStackNotPushed.children //!< content

    /*!
     * \brief Push item to stack.
     * \param item item to push
     */
    function push(item) {
        if (item.parent === itemStackContainer) return; // do nothing if item already in stack
        var items = itemStackContainer.items; // items in stack
        items.push(item); // add new item
        itemStackContainer.items = items; // update items
        itemStackContainer.pushedItem = item;
        itemStackHorizontalAnimation.enabled = true;
        itemStackContainer.x = -itemStack.width;
    }


    /*!
     * \brief Pop item from stack.
     * \return poped item
     */
    function pop() {
        var items = itemStackContainer.items; // items in stack
        if (items.legnth === 0) return null; // do nothing if no items
        var item = items.pop(); // take last item
        itemStackContainer.items = items; // update items
        itemStackContainer.popedItem = item;
        itemStackHorizontalAnimation.enabled = true;
        itemStackContainer.x = itemStack.width;
        return item;
    }


    /*!
     * \brief Get items count.
     * \return number of items in stack
     */
    function count() {return itemStackContainer.itemsCount;}


    /*!
     * \brief Get active item.
     * \return last pushed item
     */
    function activeItem() {return itemStackContainer.activeItem;}


    /*!
     * \brief Test has the stack an item or not.
     * \return true if item is in the stack, false otherwise
     * \param item item to test
     */
    function has(item) {return item.parent === itemStackContainer;}

    clip: true

    QKitItem {
        id: itemStackContainer
        objectName: itemStack.objectName + ":Container"

        property variant items: []; // items in stack
        property int itemsCount: itemStackContainer.count();
        property Item activeItem: null; // active item
        property Item pushedItem: null; // item to add
        property Item popedItem: null; // item to remove
        property bool itemStackComplited: false

        /*!
         * \brief Get items count.
         * \return number of items in stack
         */
        function count() {
            var itmes = itemStackContainer.items;
            return itmes.length;
        }

        x: 0
        y: 0
        width: itemStack.width
        height: itemStack.height

        Behavior on x {
            id: itemStackHorizontalAnimation
            SequentialAnimation {
                ScriptAction {
                    script: {
                        itemStackHorizontalAnimation.enabled = false;
                        if (itemStackContainer.pushedItem !== null) { // if item was pushed
                            itemStackContainer.pushedItem.visible = false; // to hide all changes
                            itemStackContainer.pushedItem.parent = itemStackContainer;
                            itemStackContainer.pushedItem.x = itemStack.width;
                            itemStackContainer.pushedItem.y = 0;
                            itemStackContainer.pushedItem.width = itemStack.width;
                            itemStackContainer.pushedItem.height = itemStack.height;
                            itemStackContainer.pushedItem.visible = true;
                        } else if (itemStackContainer.popedItem !== null) { // if item was poped
                            if (itemStackContainer.itemsCount > 0) { // if there are any items
                                var items = itemStackContainer.items; // items in stack
                                itemStackContainer.activeItem = items[items.length - 1]; // new active item
                                itemStackContainer.activeItem.x = -itemStack.width;
                                itemStackContainer.activeItem.y = 0;
                                itemStackContainer.activeItem.width = itemStack.width;
                                itemStackContainer.activeItem.height = itemStack.height;
                                itemStackContainer.activeItem.visible = true; // show previous active item
                            }
                        }
                    }
                }
                NumberAnimation {
                    duration: itemStackContainer.itemStackComplited && itemStackContainer.activeItem !== null ? itemStack.animationDuration : 0
                }
                ScriptAction {
                    script: {
                        if (itemStackContainer.pushedItem !== null) { // if item was pushed
                            itemStackContainer.pushedItem.focus = true; // focus on new active item
                            if (itemStackContainer.activeItem !== null) { // if there was item
                                itemStackContainer.activeItem.visible = false; // hide previous active item
                            }
                            itemStackContainer.activeItem = itemStackContainer.pushedItem; // set new active item
                            itemStackContainer.pushedItem = null;
                        } else if (itemStackContainer.popedItem !== null) { // if item was poped
                            if (itemStackContainer.activeItem !== null) {
                                itemStackContainer.activeItem.focus = true; // focus on new active item
                            } else {
                                itemStackContainer.focus = true; // focus on container
                            }
                            itemStackContainer.popedItem.visible = false; // hide previous active item
                            itemStackContainer.popedItem.parent = itemsStackNotPushed;
                            itemStackContainer.popedItem = null;
                        }
                        itemStackContainer.activeItem.x = 0;
                        itemStackContainer.activeItem.y = 0;
                        itemStackContainer.x = 0;
                        itemStackContainer.y = 0;
                    }
                }
            }
        }
    }

    QKitItem { // container for not pushed items
        id: itemsStackNotPushed
        visible: false
    }

    onWidthChanged: if (itemStackContainer.activeItem !== null) itemStackContainer.activeItem.width = itemStack.width; // resize active item if it exists
    onHeightChanged: if (itemStackContainer.activeItem !== null) itemStackContainer.activeItem.height = itemStack.height; // resize active item if it exists
    onComponentCompleted: {
        while (__initialItems[0]) itemStack.push(__initialItems[0]); // push each initial item
        itemStackContainer.itemStackComplited = true;
    }
}

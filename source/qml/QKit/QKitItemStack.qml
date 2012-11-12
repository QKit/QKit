/*******************************************************************************
*                                                                              *
*  Item stack item implementation.                                             *
*                                                                              *
*  Copyright (C) 2012 Kirill Chuvilin.                                         *
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

QKitItem {
    id: itemStack

    property int animationDuration: uiController.itemStackAnimationDuration //!< duration of animation
    default property alias __initialItems: notPushed.children // content

    /*!
     * \brief Push item to stack.
     * \param item item to push
     */
    function push(item) {
        if (item.parent === itemsContainer) return; // do nothing if item already added
        var items = itemsContainer.items; // items in stack
        items.push(item); // add new item
        itemsContainer.pushedItem = item; // to process on itemsContainer move
        itemsContainer.items = items; // update items (itemsContainer x changes by binding)
    }

    /*!
     * \brief Pop item from stack.
     * \return poped item
     */
    function pop() {
        var items = itemsContainer.items; // items in stack
        if (items.legnth === 0) return null; // do nothing if no items
        var item = items.pop(); // take last item
        itemsContainer.popedItem = item; // to process on itemsContainer move
        itemsContainer.items = items; // update items (itemsContainer x changes by binding)
        return item;
    }

    /*!
     * \brief Get items count.
     * \return number of items in stack
     */
    function count() {
        var items = itemsContainer.items; // items in stack
        return items.length;
    }


    /*!
     * \brief Test has the stack an item or not.
     * \return true if item is in the stack, false otherwise
     * \param item item to test
     */
    function has(item) {
        return item.parent === itemsContainer;
    }


    /*!
     * \brief Get active item.
     * \return last pushed item
     */
    function activeItem() {
        var items = itemsContainer.items; // items in stack
        if (!items.length) return null; // null, if there are no items
        return items[items.length - 1];
    }

    /*!
     * \brief Set focuse on active item.
     */
    function focuseOnActiveItem() {
        var activeItem = itemStack.activeItem();
        if (activeItem === null) return;
        activeItem.focus = true;
    }

    clip: true

    QKitRow {
        id: itemsContainer

        property variant items: []; //!< items in stack
        property Item pushedItem: null; //!< item to add
        property Item popedItem: null; //!< item to remove

        function handlePushedItem() {
            if (itemsContainer.pushedItem) { // if there is item to add
                itemsContainer.pushedItem.width = itemStack.width;
                itemsContainer.pushedItem.height = itemStack.height;
                itemsContainer.pushedItem.parent = itemsContainer;
                itemsContainer.pushedItem.visible = true;
                itemsContainer.pushedItem.enabled = true;
                itemsContainer.pushedItem = null;
                itemStack.focuseOnActiveItem();
            }
        }


        function handlePopedItem() {
            if (itemsContainer.popedItem) { // if there is item to remove
                itemsContainer.popedItem.visible = false;
                itemsContainer.popedItem.enabled = false;
                itemsContainer.popedItem.parent = notPushed;
                itemsContainer.popedItem = null;
                itemStack.focuseOnActiveItem();
            }
        }

        anchors.top: itemStack.top
        anchors.bottom: itemStack.bottom
        x: (1 - itemStack.count()) * itemStack.width; // to visuasise only last item
        focus: true;

        Behavior on x {
            enabled: (itemsContainer.pushedItem !== null) || (itemsContainer.popedItem !== null) // to animate only on add or remove
            SequentialAnimation {
                ScriptAction {
                    script: itemsContainer.handlePushedItem();
                }
                NumberAnimation {
                    duration: itemStack.count() > 0 ? itemStack.animationDuration : 0
                }
                ScriptAction {
                    script: itemsContainer.handlePopedItem();
                }
            }
        }
    }

    QKitItem {
        id: notPushed
        visible: false
    }

    onWidthChanged: {
        var items = itemsContainer.items; // items in stack
        for (var iItem in items) items[iItem].width = itemStack.width; // change width of all items
    }

    onHeightChanged: {
        var items = itemsContainer.items; // items in stack
        for (var iItem in items) items[iItem].height = itemStack.height; // change height of all items
    }

    Component.onCompleted: {
        while (__initialItems[0]) itemStack.push(__initialItems[0]); // push each initial item
    }
}

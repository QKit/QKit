/*******************************************************************************
*                                                                              *
*  Key navigation controller item implementation.                              *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of the QKit project.                                    *
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

import Qt 4.7

QtObject {
    property Component highlight //!< component to use as the highlight
    property bool highlightFollowsCurrentItem: false //!< whether the highlight is managed by the view
    property real highlightMoveSpeed: 400 //!< highlight move animation speed
    property int  highlightMoveDuration: -1 //!< highlight move animation duration
    property real highlightResizeSpeed: 400 //!< highlight resize animation speed
    property int  highlightResizeDuration: -1 //!< highlight resize animation duration
    property bool keyNavigationWraps: false //!< whether the list wraps key navigation

    /*!
     * \brief Change the navItem's current item, according to the key event.
     * \param navItem item to work with
     * \param event key event
     */
    function moveCurrentIndexByKey(navItem, event) {
        switch (event.key) {
        case navItem.moveLeftKey:
            navItem.highlightFollowsCurrentItem = true;
            navItem.moveCurrentIndexLeft();
            break;
        case navItem.moveRightKey:
            navItem.highlightFollowsCurrentItem = true;
            navItem.moveCurrentIndexRight();
            break;
        case navItem.moveUpKey:
            navItem.highlightFollowsCurrentItem = true;
            navItem.moveCurrentIndexUp();
            break;
        case navItem.moveDownKey:
            navItem.highlightFollowsCurrentItem = true;
            navItem.moveCurrentIndexDown();
            break;
        default:
            return; // to not accept event
        }
        event.accepted = true;
    }
}

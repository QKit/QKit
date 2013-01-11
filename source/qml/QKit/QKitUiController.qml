/*******************************************************************************
*                                                                              *
*  UI settings item implementation.                                            *
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
    property bool buttonSmooth: true //!< use smooth for buttons or not
    property bool mouseHoverEnabled: true //!< handle mouse hover or not

    property int   dialogAnimationDuration: 250
    property color dialogBackgroundColor: "#DF000000"
    property int   dialogButtonBorderWidth: 1
    property bool  dialogButtonSmooth: buttonSmooth //!< use smooth for buttons or not
    property color dialogButtonBackgroundColor: "#BF000000"
    property color dialogButtonBackgroundColorDimmed: "#0FFFFFFF"
    property color dialogButtonBackgroundColorSelected: dialogButtonBackgroundColor
    property color dialogButtonBorderColor: "#7FFFFFFF"
    property color dialogButtonBorderColorDimmed: "#FFFFFF"
    property color dialogButtonBorderColorSelected: "#FFFFFF"
    property color dialogButtonTextColor: dialogButtonBorderColor
    property color dialogButtonTextColorDimmed: dialogButtonBorderColorDimmed
    property color dialogButtonTextColorSelected: dialogButtonBorderColorSelected
    property color dialogTextColor: "#FFFFFF"

    property url iconMToolbarAdd: "images/icon-m-toolbar-add.png"
    property url iconMToolbarAddSelected: "images/icon-m-toolbar-add-selected.png"
    property url iconMToolbarAddDimmed: "images/icon-m-toolbar-add-dimmed.png"
    property url iconMToolbarBack: "images/icon-m-toolbar-back.png"
    property url iconMToolbarBackSelected: "images/icon-m-toolbar-back-selected.png"
    property url iconMToolbarBackDimmed: "images/icon-m-toolbar-back-dimmed.png"
    property url iconMToolbarViewMenu: "images/icon-m-toolbar-view-menu.png"
    property url iconMToolbarViewMenuSelected: "images/icon-m-toolbar-view-menu-selected.png"
    property url iconMToolbarViewMenuDimmed: "images/icon-m-toolbar-view-menu-dimmed.png"
    property url iconMToolbarUp: "images/icon-m-toolbar-up.png"
    property url iconMToolbarUpSelected: "images/icon-m-toolbar-up-selected.png"
    property url iconMToolbarUpDimmed: "images/icon-m-toolbar-up-dimmed.png"

    property int itemStackAnimationDuration: 250 //!< duration of scroll animation

    property color pageBackgroundColor: "#FFFFFF"
    property int   pageButtonBorderWidth: 1
    property bool  pageButtonSmooth: buttonSmooth //!< use smooth for buttons or not
    property color pageButtonBackgroundColor: "#BFFFFFFF"
    property color pageButtonBackgroundColorDimmed: "#0F000000"
    property color pageButtonBackgroundColorSelected: pageButtonBackgroundColor
    property color pageButtonBorderColor: "#7F000000"
    property color pageButtonBorderColorDimmed: "#000000"
    property color pageButtonBorderColorSelected: "#000000"
    property color pageButtonTextColor: pageButtonBorderColor
    property color pageButtonTextColorDimmed: pageButtonBorderColorDimmed
    property color pageButtonTextColorSelected: pageButtonBorderColorSelected
    property color pageTextColor: "#000000"
    property url   pageTexture: "" //!< image to fill page

    property bool  thumbnailAsynchronous: true //!< load in separate thread or not
    property color thumbnailBackgroundColor: "#DFDFDF"
    property color thumbnailBackgroundColorSelected: thumbnailBackgroundColor
    property color thumbnailBorderColor: "#DF7F7F7F"
    property color thumbnailBorderColorSelected: "#0000DF"
    property int   thumbnailBorderWidth: 6
    property bool  thumbnailSmooth: false //!< use smooth for thumbnails or not

    property int   toolbarAnimationDuration: 250
    property color toolbarBackgroundColor: "#7FDFDFDF"
    property color toolbarBorderColor: "#DF7F7F7F"
    property int   toolbarBorderWidth: 1
    property color toolbarButtonBackgroundColor: "#00000000"
    property color toolbarButtonBackgroundColorDimmed: "#3F000000"
    property color toolbarButtonBackgroundColorSelected: toolbarButtonBackgroundColor
    property color toolbarButtonBorderColor: toolbarBorderColor
    property color toolbarButtonBorderColorDimmed: "#FFFFFF"
    property color toolbarButtonBorderColorSelected: "#FFFFFF"
    property int   toolbarButtonBorderWidth: 1
    property bool  toolbarButtonSmooth: buttonSmooth //!< use smooth for buttons or not
    property color toolbarButtonTextColor: toolbarButtonBorderColor
    property color toolbarButtonTextColorDimmed: toolbarButtonBorderColorDimmed
    property color toolbarButtonTextColorSelected: toolbarButtonBorderColorSelected
}

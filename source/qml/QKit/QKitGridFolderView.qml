/*******************************************************************************
*                                                                              *
*  View of folder subfilders and files item implementation.                    *
*                                                                              *
*  Copyright (C) 2012 Kirill Chuvilin.                                         *
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

QKitNavGridView {
    id: folderView

    property variant files // folder files
    property variant dirs // folder dirs
    property int __nDirs: 0 // dirs number

    signal dirClicked(int iDir) // emits when clicked on folder
    signal fileClicked(int iFile) // emits when clicked on file

    function refreshModel() { // refreshes model according to files and dirs properties
        var newModel = []; // true for dir, false for file
        if (dirs) { // if dirs defined
            for (var iDir = 0; dirs[iDir]; iDir++)
                newModel[newModel.length] = true;
            __nDirs = iDir;
        } else {
            __nDirs = 0;
        }
        if (files) { // if files defined
            for (var iFile = 0; files[iFile]; iFile++)
                newModel[newModel.length] = false;
        }
        model = newModel;
    }

    cellWidth: Math.min(1.0 / Math.round(width / 120), 0.5) * width - 0.5
    cellHeight: 1.2 * cellWidth
    keyNavigationWraps: false
    onFilesChanged: refreshModel()
    onDirsChanged: refreshModel()
    delegate: QKitItem {
        width: folderView.cellWidth
        height: folderView.cellHeight
        meta: GridView.view
        Image {
            anchors.fill: parent
            anchors.margins: folderView.model[index] ? 0.1 * parent.height : 0.2 * parent.height
            anchors.bottomMargin: folderView.model[index] ? 0.3 * parent.height : 0.4 * parent.height
            source: folderView.model[index] ? "images/icon-m-common-directory.png" : "images/icon-l-default-application.png"
            fillMode: Image.PreserveAspectFit
        }
        QKitText {
            anchors.fill: parent
            anchors.topMargin: 0.8 * parent.height
            anchors.leftMargin: 0.05 * parent.width
            anchors.rightMargin: 0.05 * parent.width
            text: folderView.model[index] ? folderView.dirs[index] : folderView.files[index - __nDirs]
            font.pixelSize: 0.5 * height
            horizontalAlignment: Text.AlignHCenter
            elide: Text.ElideRight
        }
        Keys.onPressed: {
            if (event.key === keyController.buttonPressKey) {
                if (folderView.model[index])
                    folderView.dirClicked(index)
                else
                    folderView.fileClicked(index - __nDirs)
                event.accepted = true
            }
        }
        MouseArea {
            anchors.fill: parent
            onClicked: {
                if (folderView.model[index])
                    folderView.dirClicked(index)
                else
                    folderView.fileClicked(index - __nDirs)
            }
        }
    }
}

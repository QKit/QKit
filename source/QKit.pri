################################################################################
#                                                                              #
#  QKit items.                                                                 #
#                                                                              #
#  Copyright (C) 2012 Kirill Chuvilin.                                         #
#  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   #
#                                                                              #
#  This file is a part of the QKit project.                                    #
#  https://github.com/QKit/QKit                                                #
#                                                                              #
#  $QT_BEGIN_LICENSE:LGPL$                                                     #
#                                                                              #
#  GNU Lesser General Public License Usage                                     #
#  This file may be used under the terms of the GNU Lesser General Public      #
#  License version 3.0 as published by the Free Software Foundation and        #
#  appearing in the file LICENSE.LGPL included in the packaging of this file.  #
#  Please review the following information to ensure the GNU Lesser General    #
#  Public License version 3.0 requirements will be met:                        #
#  http://www.gnu.org/licenses/old-licenses/lgpl.html.                         #
#                                                                              #
#  GNU General Public License Usage                                            #
#  Alternatively, this file may be used under the terms of the GNU General     #
#  Public License version 3.0 as published by the Free Software Foundation     #
#  and appearing in the file LICENSE.GPL included in the packaging of this     #
#  file. Please review the following information to ensure the GNU General     #
#  Public License version 3.0 requirements will be met:                        #
#  http://www.gnu.org/copyleft/gpl.html.                                       #
#                                                                              #
#  This file is distributed in the hope that it will be useful, but WITHOUT    #
#  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or       #
#  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for    #
#  more details.                                                               #
#                                                                              #
#  $QT_END_LICENSE$                                                            #
#                                                                              #
################################################################################

folder_QKit.source = $$PWD/qml/QKit
folder_QKit.target = ./qml
folder_QKit_QtQuick_1.1.source = $$PWD/qml_QtQuick_1.1/QKit
folder_QKit_QtQuick_1.1.target = ./qml

DEPLOYMENTFOLDERS += folder_QKit
QML_IMPORT_PATH += $$PWD/qml

simulator {
    DEFINES += QKIT_OS_MOBILE
    DEFINES += QKIT_OS_SIMULATOR
    DEPLOYMENTFOLDERS += folder_QKit_QtQuick_1.1
    QML_IMPORT_PATH += $$PWD/qml_QtQuick_1.1
} else:symbian {
    DEFINES += QKIT_OS_MOBILE
    DEFINES += QKIT_OS_SYMBIAN
    contains(QT_VERSION, 4.7.3) {
        DEFINES += QKIT_OS_SYMBIAN_S60
    } else {
        DEFINES += QKIT_OS_SYMBIAN_3
    }
} else:maemo5 {
    DEFINES += QKIT_OS_MOBILE
    DEFINES += QKIT_OS_FREMANTLE
} else:contains(MEEGO_EDITION, harmattan) {
    DEFINES += QKIT_OS_MOBILE
    DEFINES += QKIT_OS_HARMATTAN
    DEPLOYMENTFOLDERS += folder_QKit_QtQuick_1.1
    QML_IMPORT_PATH += $$PWD/qml_QtQuick_1.1
} else:win32 {
    DEFINES += QKIT_OS_DESKTOP
    DEFINES += QKIT_OS_WINDOWS
    DEPLOYMENTFOLDERS += folder_QKit_QtQuick_1.1
    QML_IMPORT_PATH += $$PWD/qml_QtQuick_1.1
} else:unix {
    DEFINES += QKIT_OS_DESKTOP
    DEFINES += QKIT_OS_UNIX
    DEPLOYMENTFOLDERS += folder_QKit_QtQuick_1.1
    QML_IMPORT_PATH += $$PWD/qml_QtQuick_1.1
}

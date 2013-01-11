################################################################################
#                                                                              #
#  QKit menu example.                                                          #
#                                                                              #
#  Copyright (C) 2011-2012 Kirill Chuvilin.                                    #
#  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   #
#                                                                              #
#  This file is a part of an example for the QKit project.                     #
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

# QKit
include(../../source/QKit.pri)

# Add more folders to ship with the application, here
folder_qml.source = qml
folder_qml.target = .
DEPLOYMENTFOLDERS += folder_qml

# Additional import path used to resolve QML modules in Creator's code model
QML_IMPORT_PATH =

symbian {
    TARGET.UID3 = 0xE8E0C101
    DEPLOYMENT.display_name += QKit Menu example
}

# Smart Installer package's UID
# This UID is from the protected range and therefore the package will
# fail to install if self-signed. By default qmake uses the unprotected
# range value if unprotected UID is defined for the application and
# 0x2002CCCF value if protected UID is given to the application
#symbian:DEPLOYMENT.installer_header = 0x2002CCCF

# Allow network access on Symbian
# symbian:TARGET.CAPABILITY += NetworkServices

# If your application uses the Qt Mobility libraries, uncomment the following
# lines and add the respective components to the MOBILITY variable.
# CONFIG += mobility
# MOBILITY +=

# Speed up launching on MeeGo/Harmattan when using applauncherd daemon
CONFIG += qdeclarative-boostable

# Add dependency to Symbian components
# CONFIG += qt-components

# Please do not modify the following two lines. Required for deployment.
# It is fixed qmlapplicationviewer.pri for the correct load deployment folders with absolute paths.
include(../../include/qmlapplicationviewer/qmlapplicationviewer.pri)
qtcAddDeployment()

SOURCES += main.cpp

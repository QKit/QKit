################################################################################
#                                                                              #
#  QKit menu example.                                                          #
#                                                                              #
#  Copyright (C) 2011-2012 Kirill Chuvilin.                                    #
#  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   #
#                                                                              #
#  This file is part of an example for the QKit project.                       #
#                                                                              #
#  $QT_BEGIN_LICENSE:GPL$                                                      #
#  You may use this file under the terms of the GNU General Public License     #
#  as published by the Free Software Foundation; version 3 of the License.     #
#                                                                              #
#  This file is distributed in the hope that it will be useful,                #
#  but WITHOUT ANY WARRANTY; without even the implied warranty of              #
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                #
#  GNU General Public License for more details.                                #
#                                                                              #
#  You should have received a copy of the GNU General Public License           #
#  along with this package; if not, write to the Free Software                 #
#  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.   #
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
    TARGET.UID3 = 0xE8E0C102
    DEPLOYMENT.display_name += QKit Pages stack example
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

/*******************************************************************************
*                                                                              *
*  Main function implementation.                                               *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of an example for the QKit project.                     *
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

#include <QtGui/QApplication>
#include "qmlapplicationviewer.h"

Q_DECL_EXPORT int main(int argc, char *argv[]) {
    QScopedPointer<QApplication> app(createApplication(argc, argv));
    QmlApplicationViewer viewer;
    viewer.setOrientation(QmlApplicationViewer::ScreenOrientationAuto);

    #if defined(QKIT_OS_SIMULATOR)
        viewer.setMainQmlFile(QLatin1String("qml/Main_Simulator.qml"));
        viewer.showFullScreen();
    #elif defined(QKIT_OS_FREMANTLE)
        viewer.setMainQmlFile(QLatin1String("qml/Main_Fremantle.qml"));
        viewer.show();
    #elif defined(QKIT_OS_HARMATTAN)
        viewer.setMainQmlFile(QLatin1String("qml/Main_Harmattan.qml"));
        viewer.showFullScreen();
    #elif defined(QKIT_OS_SYMBIAN)
        #if defined(QKIT_OS_SYMBIAN_3)
            viewer.setMainQmlFile(QLatin1String("qml/Main_Symbian^3.qml"));
        #else
            viewer.setMainQmlFile(QLatin1String("qml/Main_Symbian.qml"));
        #endif
        viewer.showFullScreen();
    #else
        viewer.setMainQmlFile(QLatin1String("qml/Main_Desktop.qml"));
        viewer.show();
    #endif

    return app->exec();
}

/*******************************************************************************
*                                                                              *
*  Main function implementation.                                               *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is part of an example for the QKit project.                       *
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

#include <QtGui/QApplication>
#include "qmlapplicationviewer.h"

Q_DECL_EXPORT int main(int argc, char *argv[]) {
    QScopedPointer<QApplication> app(createApplication(argc, argv));
    QmlApplicationViewer viewer;

#if defined(QKIT_OS_SIMULATOR)
    viewer.setOrientation(QmlApplicationViewer::ScreenOrientationAuto);
    viewer.setMainQmlFile(QLatin1String("qml/Main_simulator.qml"));
    viewer.showFullScreen();
#elif defined(QKIT_OS_FREMANTLE)
    viewer.setOrientation(QmlApplicationViewer::ScreenOrientationAuto);
    viewer.setMainQmlFile(QLatin1String("qml/Main_fremantle.qml"));
    viewer.show();
#elif defined(QKIT_OS_HARMATTAN)
    viewer.setOrientation(QmlApplicationViewer::ScreenOrientationAuto);
    viewer.setMainQmlFile(QLatin1String("qml/Main_harmattan.qml"));
    viewer.showFullScreen();
#elif defined(QKIT_OS_SYMBIAN)
    viewer.setOrientation(QmlApplicationViewer::ScreenOrientationAuto);
    viewer.setMainQmlFile(QLatin1String("qml/Main_symbian.qml"));
    viewer.showFullScreen();
#else
    viewer.setMainQmlFile(QLatin1String("qml/Main_desktop.qml"));
    viewer.show();
#endif

    return app->exec();
}

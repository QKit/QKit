/*******************************************************************************
*                                                                              *
*  Button item for dialogs implementation.                                     *
*                                                                              *
*  Copyright (C) 2011 Kirill Chuvilin.                                         *
*  All rights reserved.                                                        *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirik-ch.ru)           *
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

QKitButton {
    objectName: "QKitDialogButton"

    radius: 0.4 * height
    // UI properties
    borderWidth: uiController.dialogButtonBorderWidth
    smooth: uiController.dialogButtonSmooth
    backgroundColor: uiController.dialogButtonBackgroundColor // background color
    backgroundColorDimmed: uiController.dialogButtonBackgroundColorDimmed // background color when button is pressed
    backgroundColorSelected: uiController.dialogButtonBackgroundColorSelected // background color when button is selected
    borderColor: uiController.dialogButtonBorderColor // border color
    borderColorDimmed: uiController.dialogButtonBorderColorDimmed // border color when button is pressed
    borderColorSelected: uiController.dialogButtonBorderColorSelected // border color when button is selected
    textColor: uiController.dialogButtonTextColor // text color
    textColorDimmed: uiController.dialogButtonTextColorDimmed // text color when button is pressed
    textColorSelected: uiController.dialogButtonTextColorSelected // text color when button is selected
    mouseHoverEnabled: uiController.mouseHoverEnabled // handle mouse hover or not
    // key properties
    pressKey: keyController.dialogButtonPressKey // key for press
}

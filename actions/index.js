import { Composer } from 'grammy'
import addTarif from './addTarif.js'
import cancel from './cancel.js'
import answerToUserAsk from './answerToUserAsk.js'
import settingsBan from './settingsBan.js'
import settingsAdmin from './settingsAdmin.js'

const composer = new Composer()

composer.use(addTarif, cancel, answerToUserAsk, settingsBan, settingsAdmin)

export default composer

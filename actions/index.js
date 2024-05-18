import { Composer } from 'grammy'
import addTarif from './addTarif.js'
import cancel from './cancel.js'
import answerToUserAsk from './answerToUserAsk.js'
import settingsBan from './settingsBan.js'
import settingsAdmin from './settingsAdmin.js'
import selectTarifForAdmin from './selectTarifForAdmin.js'
import showPriceAtTarif from './showPriceAtTarif.js'

const composer = new Composer()

composer.use(
	addTarif,
	cancel,
	answerToUserAsk,
	settingsBan,
	settingsAdmin,
	selectTarifForAdmin,
	showPriceAtTarif
)

export default composer

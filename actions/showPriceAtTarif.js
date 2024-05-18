import { Composer } from 'grammy'
import { Config } from '../models/Config.js'

const composer = new Composer()

composer.callbackQuery('showPriceAtTarif', async ctx => {
	const value = await Config.findByPk(1)
	if (value.showPriceAtTarif) {
		await Config.update({ showPriceAtTarif: false }, { where: { id: 1 } })
	} else {
		await Config.update({ showPriceAtTarif: 1 }, { where: { id: 1 } })
	}
})

export default composer

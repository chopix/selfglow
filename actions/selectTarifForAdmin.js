import { Composer } from 'grammy'
import { Tarif } from '../models/Tarif.js'

const composer = new Composer()

composer.on('callback_query', async (ctx, next) => {
	if (ctx.callbackQuery.data.includes('selectTarifForAdmin')) {
		const tarifId = ctx.callbackQuery.data.split(' ')[1]
		const tarif = await Tarif.findByPk(tarifId)
		console.log(tarif)
	} else await next()
})

export default composer

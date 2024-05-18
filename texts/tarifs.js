import { Composer, InlineKeyboard } from 'grammy'
import { Tarif } from '../models/Tarif.js'

const composer = new Composer()

composer.hears('💰 Тарифы', async ctx => {
	// const inline = new InlineKeyboard().text('➕ Тариф', 'addTarif')
	const tarifs = await Tarif.findAll()
	const pairs = []
	tarifs.forEach(e => {
		const currency = e.currency.substr(2)
		pairs.push([`${e.name} - ${e.price}${currency}`, String(e.id)])
	})
	pairs.push(['✅ Отображать цену в названии тарифа', 'showPriceAtTarif'])
	pairs.push(['➕ Тариф', 'addTarif'])
	let keyboard = []
	pairs.forEach((pair, i) => {
		let buttonText = i >= pairs.length - 2 ? pair[0] : `${pair[0]}`
		let row = []

		if (pair[1] === 'addTarif' || pair[1] === 'showPriceAtTarif') {
			row.push({
				text: buttonText,
				callback_data: `${pair[1]}`,
			})
		} else {
			row.push({
				text: buttonText,
				callback_data: `selectTarifForAdmin ${pair[1]}`,
			})
		}

		keyboard.push(row)
	})

	await ctx.reply('Список ваших категорий и тарифов', {
		reply_markup: {
			inline_keyboard: keyboard,
		},
	})
})

export default composer

import { Tarif } from '../models/Tarif.js'
import { Config } from './../models/Config.js'

export async function getAllTarifs(ctx) {
	const tarifs = await Tarif.findAll()
	const pairs = []
	const value = await Config.findByPk(1)
	tarifs.forEach(e => {
		const currency = e.currency.substr(2)
		if (value.showPriceAtTarif) {
			pairs.push([`${e.name} - ${e.price}${currency}`, String(e.id)])
		} else {
			pairs.push([`${e.name}`, String(e.id)])
		}
	})
	let keyboard = []
	pairs.forEach((pair, i) => {
		let buttonText = i >= pairs.length - 2 ? pair[0] : `${pair[0]}`
		let row = []
		row.push({
			text: buttonText,
			callback_data: `selectTarif ${pair[1]}`,
		})
		keyboard.push(row)
	})
	await ctx.reply(`<b>Выберите желаемый для вас тарифный план:</b>`, {
		reply_markup: {
			inline_keyboard: keyboard,
		},
	})
}

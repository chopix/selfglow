import { Tarif } from '../models/Tarif.js'
import { InlineKeyboard } from 'grammy'
import { Resource } from '../models/Resource.js'

function minutesToMonthsAndDays(totalMinutes) {
	const minutesInDay = 24 * 60
	const minutesInMonth = 30 * minutesInDay

	const totalDays = Math.floor(totalMinutes / minutesInDay)
	const months = Math.floor(totalDays / 30)
	const days = totalDays % 30
	if (!days) {
		return `${months} месяцев`
	}

	return `${months} месяцев ${days} дней`
}

export async function sendCurrentEditingTarif(ctx) {
	const tarifId = ctx.session.editingTarifId
	const tarif = await Tarif.findByPk(tarifId)
	const currency = tarif.currency.split(' ')[1]
	const botInfo = await ctx.api.getMe()
	const inline = new InlineKeyboard()
		.text(`📝 Название`, `tarifName`)
		.text(`📝 Цена`, `tarifPrice`)
		.row()
		.text(`📝 Валюта`, `tarifCurrency`)
		.text(`📝 Продолжительность`, `tarifTime`)
		.row()
		.text(`📝 Описание`, `tarifDescription`)
		.text(`📝 Название в чеке`, `tarifReceiptName`)
		.row()
		.text(`📝 Текст при успешной покупке`, `tarifSuccess`)
		.row()
		.text(`🗑 Удалить`, `tarifDelete`)
		.text(`🔙 Назад`, `tarifBack`)
		.row()
	const resource = await Resource.findByPk(tarif.resourceId)
	await ctx.reply(
		`<b>Название тарифа:</b> ${tarif.name}
<b>Название в чеке:</b> ${tarif.receiptName}
<b>Цена:</b> ${tarif.price} ${currency}
<b>Начало подписки:</b> время покупки
<b>Продолжительность:</b> ${minutesToMonthsAndDays(tarif.time)}

<b>Ресурсы:</b> ${resource.resourceName}
<b>Прямая ссылка:</b> https://t.me/${botInfo.username}?start=tarif${tarif.id}
<b>Текст при успешной покупке:</b> ${tarif.successText}
<b>Описание тарифа:</b> ${
			tarif.description === null ? 'Нету' : tarif.description
		}`,
		{
			reply_markup: inline,
		}
	)
}

import { Composer, InlineKeyboard } from 'grammy'
import { Tarif } from './../models/Tarif.js'
import { Subscriber } from '../models/Subscriber.js'
import { User } from '../models/User.js'
import { Resource } from './../models/Resource.js'
import { Payment } from './../models/Payment.js'
import 'dotenv/config'
import crypto from 'crypto'
import qs from 'qs'
import { Buffer } from 'buffer'
import axios from 'axios'

const composer = new Composer()

function minutesToMonthsAndDays(totalMinutes) {
	const minutesInDay = 24 * 60
	const minutesInMonth = 30 * minutesInDay

	const totalDays = Math.floor(totalMinutes / minutesInDay)
	const months = Math.floor(totalDays / 30)
	const days = totalDays % 30
	if (!days) {
		return `${months} месяцев`
	} else if (!months) {
		return `${days} дней`
	}

	return `${months} месяцев ${days} дней`
}

composer.callbackQuery(/selectTarif/, async ctx => {
	const tarifId = ctx.callbackQuery.data.split(' ')[1]
	ctx.session.payingTarifId = tarifId
	const tarif = await Tarif.findByPk(tarifId)
	const currency = tarif.currency.split(' ')[1]

	const resource = await Resource.findByPk(tarif.resourceId)
	const payment = await Payment.create({
		tarifId: tarif.id,
		tgId: ctx.from.id,
	})
	const currencyForLink = tarif.currency.split(' ')[1].toLowerCase()
	let link
	if (tarif.payment === 2) {
		link = `https://sonyakononova.payform.ru/?order_id=${payment.id}&products[0][price]=${tarif.price}&products[0][quantity]=1&products[0][name]=${tarif.name}&do=pay&paid_content=Оплата тарифа&urlNotification=${process.env.WEBHOOK_URL}&currency=${currencyForLink}`
	} else if (tarif.payment === 1) {
		link = `https://sk-academy.payform.ru/?order_id=${payment.id}&products[0][price]=${tarif.price}&products[0][quantity]=1&products[0][name]=${tarif.name}&do=pay&paid_content=Оплата тарифа&urlNotification=${process.env.WEBHOOK_URL}&currency=${currencyForLink}`
	}

	const inline = new InlineKeyboard().url('Оплатить', link)
	await ctx.reply(
		`<b>Название тарифа:</b> ${tarif.name}
<b>Цена:</b> ${tarif.price} ${currency}
<b>Продолжительность:</b> ${minutesToMonthsAndDays(tarif.time)}

<b>Ресурсы:</b> ${resource.resourceName}
<b>Описание тарифа:</b> ${
			tarif.description === null ? 'Нету' : tarif.description
		}`,
		{
			reply_markup: inline,
		}
	)
})

// function createHmacSignature(data, key) {
// 	const hmac = crypto.createHmac('sha256', key)
// 	hmac.update(JSON.stringify(data))
// 	return hmac.digest('hex')
// }

// const flattenData = data => {
// 	const result = {}
// 	for (const key in data) {
// 		if (Array.isArray(data[key])) {
// 			data[key].forEach((item, index) => {
// 				for (const subKey in item) {
// 					result[`${key}[${index}][${subKey}]`] = item[subKey]
// 				}
// 			})
// 		} else {
// 			result[key] = data[key]
// 		}
// 	}
// 	return result
// }

// composer.callbackQuery('payTarif', async ctx => {
// 	const user = await User.findOne({ where: { tgId: ctx.from.id } })
// 	const tarif = await Tarif.findByPk(ctx.session.payingTarifId)
// 	const resource = await Resource.findByPk(tarif.resourceId)
// 	const payment = await Payment.create({
// 		tarifId: tarif.id,
// 		tgId: ctx.from.id,
// 	})
// 	const currency = tarif.currency.split(' ')[1].toLowerCase()
// 	const link = `https://sonyakononova.payform.ru/?order_id=${payment.id}&products[0][price]=${tarif.price}&products[0][quantity]=1&products[0][name]=${tarif.name}&do=pay&paid_content=Оплата тарифа&urlNotification=${process.env.WEBHOOK_URL}&currency=${currency}`
// 	console.log(link)
// 	//	https:demo.payform.ru/?order_id=test&customer_phone=79998887755&products[0][price]=2000&products[0][quantity]=1&products[0][name]=Обучающие материалы&customer_extra=Полная оплата курса&do=pay
// 	// console.log(await getPaymentLink(payment.id, 500))
// 	// const data = {
// 	// 	order_id: payment.id,
// 	// 	currency: 'rub',
// 	// 	demo_mode: '1',
// 	// 	order_sum: '123',
// 	// 	products: [
// 	// 		{
// 	// 			sku: tarif.id,
// 	// 			name: 'товар 1',
// 	// 			price: '123',
// 	// 			quantity: '99',
// 	// 		},
// 	// 	],
// 	// }
// 	// data.signature = createHmacSignature(data, shopSecret)
// 	// const flattenedData = flattenData(data)
// 	// // Build the URL with query parameters
// 	// const queryString = new URLSearchParams(flattenedData).toString()
// 	// const link = `${shopLink}?${queryString}`

// 	// console.log(link)
// 	// const invite = await ctx.api.createChatInviteLink(resource.resourceId, {
// 	// 	member_limit: 1,
// 	// })
// 	// const days = Math.floor(tarif.time / 1440)
// 	// await ctx.reply('Вы успешно оплатили тариф')
// 	// await ctx.reply(`Ссылка на ресурс - ${invite.invite_link}`)
// 	// await Subscriber.create({
// 	// 	userId: user.id,
// 	// 	tarifId: ctx.session.payingTarifId,
// 	// 	remaining: days,
// 	// })
// })

export default composer

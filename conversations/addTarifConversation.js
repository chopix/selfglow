import { InlineKeyboard } from 'grammy'
import mainMenuFunction from './../functions/mainMenuFunction.js'
import { Tarif } from '../models/Tarif.js'

export const addTarifConversation = async (conversation, ctx) => {
	try {
		const inline = new InlineKeyboard().text('❌ Отмена', 'cancel')
		await ctx.reply(
			'<b>Добавление нового тарифа</b>\n\nОтправьте боту название тарифа',
			{
				reply_markup: inline,
			}
		)
		const name = await conversation.waitFor(['message:text', 'callback_query'])
		if (
			name.update.callback_query &&
			name.update.callback_query.data &&
			name.update.callback_query.data === 'cancel'
		) {
			return mainMenuFunction(ctx)
		}
		const currencyInline = new InlineKeyboard()
			.text('🇷🇺 RUB', '🇷🇺 RUB')
			.text('💵 USD', '💵 USD')
			.text('💶 EUR', '💶 EUR')
			.text('🇷🇺 💷', '🇷🇺 💷')
			.row()
			.text('❌ Отмена', 'cancel')
		await ctx.reply(
			`Название тарифа - ${name.message.text}\n\nВыберите валюту для тарифа, или сделайте тариф бесплатным`,
			{ reply_markup: currencyInline }
		)
		const currency = await conversation.waitForCallbackQuery(
			['🇷🇺 RUB', '💵 USD', '💶 EUR', '🇷🇺 💷', 'cancel'],
			{
				otherwise: async ctx => {
					await ctx.reply('Используй клавиатуру!', {
						reply_markup: currencyInline,
					})
				},
			}
		)
		if (currency.match === 'cancel') {
			return mainMenuFunction(ctx)
		}
		await ctx.reply(
			`Название тарифа - ${name.message.text}\nВалюта: ${currency.match}\n\nОтправьте боту цену для тарифа(от 1 ед.):`,
			{ reply_markup: inline }
		)
		const price = await conversation.form.number()
		const daysInline = new InlineKeyboard()
			.text('7 дней', '7')
			.text('14 дней', '14')
			.text('30 дней', '30')
			.row()
			.text('❌ Отмена', 'cancel')
		await ctx.reply(
			`Название тарифа - ${name.message.text}\n\nВведите новый срок действия тарифа в днях или выберите из готовых вариантов ниже 👇`,
			{ reply_markup: daysInline }
		)
		const days = await conversation.waitForCallbackQuery(
			['7', '14', '30', '60', 'cancel'],
			{
				otherwise: async ctx =>
					await ctx.reply('Используй клавиатуру!', {
						reply_markup: daysInline,
					}),
			}
		)
		if (days.match === 'cancel') {
			return mainMenuFunction(ctx)
		}
		const nextInline = new InlineKeyboard()
			.text('➡️ Перейти к настройке ресурсов', 'next')
			.row()
			.text('❌ Отмена', 'cancel')
		await ctx.reply(
			`Название тарифа - ${name.message.text}\nВалюта: ${currency.match}\nСрок действия: ${days.match} дней\n\nЧтобы перейти к добавлению каналов/групп к тарифу, нажмите на кнопку ниже 👇`,
			{
				reply_markup: nextInline,
			}
		)
		const next = await conversation.waitForCallbackQuery(['next', 'cancel'], {
			otherwise: async ctx =>
				await ctx.reply('Используй клавиатуру!', {
					reply_markup: nextInline,
				}),
		})
		if (next.match === 'cancel') {
			return mainMenuFunction(ctx)
		}
		const resourceInline = new InlineKeyboard()
			.text('📈 1 ресурс', '1resource')
			.row()
			.text('📈 2 ресурс', '2resource')
			.row()
			.text('📈 3 ресурс', '3resource')
			.row()
			.text('📈 4 ресурс', '4resource')
			.row()
			.text('❌ Отмена', 'cancel')
		await ctx.reply(
			`Название тарифа - ${name.message.text}\nВалюта: ${currency.match}\nСрок действия: ${days.match} дней\n\nВыберите ресурсы на которые нужно выдать доступ после успешной покупки 👇`,
			{
				reply_markup: resourceInline,
			}
		)
		const resource = await conversation.waitForCallbackQuery(
			['1resource', '2resource', '3resource', '4resource', 'cancel'],
			{
				otherwise: async ctx =>
					await ctx.reply('Используй клавиатуру!', {
						reply_markup: resource,
					}),
			}
		)
		if (resource.match === 'cancel') {
			return mainMenuFunction(ctx)
		}
		const tarif = await Tarif.create({
			name: name.message.text,
			currency: currency.match,
			price: price,
			time: days.match,
		})
		await ctx.reply('Тариф успешно добавлен')
		return mainMenuFunction(ctx)
	} catch (e) {
		console.log(e)
	}
}

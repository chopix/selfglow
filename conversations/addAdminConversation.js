import { User } from '../models/User.js'

import { InlineKeyboard } from 'grammy'
import settingsMenuFunction from '../functions/settingsMenuFunction.js'

export const addAdminConversation = async (conversation, ctx) => {
	try {
		const inline = new InlineKeyboard().text('🔙 Назад', 'banBack').row()
		await ctx.reply(
			'Введите @username или ID пользователя, которому вы хотите выдать админку',
			{
				reply_markup: inline,
			}
		)
		const user = await conversation.waitFor(['message:text', 'callback_query'])
		if (
			user.update.callback_query &&
			user.update.callback_query.data &&
			user.update.callback_query.data === 'banBack'
		) {
			return settingsMenuFunction(ctx)
		}
		let bannedUser
		if (user.message.text.includes('@')) {
			bannedUser = await User.update(
				{ isAdmin: 1 },
				{ where: { username: user.message.text } }
			)
		} else {
			bannedUser = await User.update(
				{ isAdmin: 1 },
				{ where: { tgId: user.message.text } }
			)
		}
		if (!bannedUser[0]) {
			return ctx.reply('Пользователь не найден.', { reply_markup: inline })
		}
		return ctx.reply('Админка успешно выдана.', { reply_markup: inline })
	} catch (e) {
		console.log(e)
	}
}

import { sendCurrentEditingTarif } from '../../functions/sendCurrentEditingTarif.js'
import { Tarif } from '../../models/Tarif.js'
import { InlineKeyboard } from 'grammy'

export const tarifSuccessConversation = async (conversation, ctx) => {
	const inline = new InlineKeyboard().text('Отмена', 'tarifEditingBack')
	await ctx.reply(`Введите новое название при успешной покупке тарифа`, {
		reply_markup: inline,
	})
	const update = await conversation.waitFor(['message:text', 'callback_query'])

	if (update.update.callback_query) {
		if (update.update.callback_query.data === 'tarifEditingBack') {
			await sendCurrentEditingTarif(ctx)
			return
		}
	} else if (update.update.message) {
		await Tarif.update(
			{ successText: update.update.message.text },
			{ where: { id: ctx.session.editingTarifId } }
		)
		return sendCurrentEditingTarif(ctx)
	}
}

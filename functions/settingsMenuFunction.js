import { InlineKeyboard } from 'grammy'

export default async ctx => {
	try {
		const inline = new InlineKeyboard()
			.text('👥 Подписчики', 'settingsSubs')
			.text('📰 Лендинг', 'settingsLanding')
			.row()
			.text('🔗 Админ панель', 'settingsAdminPanel')
			.text('✉️ Ответы от бота', 'settingsAnswers')
			.row()
			.text('🗂 Кнопки', 'settingsButtons')
			.text('🎁 Промокоды', 'settingsPromo')
			.row()
			.text('📊 Статистика', 'settingsStats')
			.text('👥 Реферальная система', 'settingsRefs')
			.row()
			.text('🔨 Блокировка пользователей', 'settingsBan')
			.row()
			.text('✏️ Администраторы', 'settingsAdmin')
			.row()
			.text('💬 Сбор контактов', 'settingsContacts')
			.row()
			.text('⏸ Остановить оплаты', 'settingsPayments')
			.row()
		await ctx.reply(
			`<b>Настройки вашего бота</b>

Подписчики - вся информация о подписчиках и пользователях бота.
Рефералы - партнерская программа для вашего бота
Ответы бота - настройка ответов от бота
Меню в боте - создание кнопок с информацией

Для того, чтобы вернуться обратно в Главное меню, Вы можете отправить команду /start`,
			{ reply_markup: inline }
		)
	} catch (e) {
		console.log(e)
	}
}

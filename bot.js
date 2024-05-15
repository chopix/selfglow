import { Bot, session } from 'grammy'
import { run } from '@grammyjs/runner'
import 'dotenv/config'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import { sequelize } from './config/sequelize.js'
import { FileAdapter } from '@grammyjs/storage-file'
import { conversations } from '@grammyjs/conversations'
import Commands from './commands/index.js'
import Texts from './texts/index.js'
import Actions from './actions/index.js'
import Conversation from './conversations/index.js'
import { limit } from '@grammyjs/ratelimiter'
import { banMiddleware } from './middlewares/banMiddleware.js'

const bot = new Bot(process.env.token)

bot.use(hydrateReply)
bot.use(
	limit({
		timeFrame: 2000,
		limit: 3,
		onLimitExceeded: async ctx => {
			await ctx.reply('Не спамьте!')
		},

		keyGenerator: ctx => {
			return ctx.from?.id.toString()
		},
	})
)
bot.use(
	session({
		initial() {
			return {}
		},
		storage: new FileAdapter({
			dirName: 'sessions',
		}),
	})
)
bot.use(conversations())

bot.api.config.use(parseMode('HTML'))

sequelize.sync()

bot.on('callback_query', async (ctx, next) => {
	await ctx.answerCallbackQuery()
	await next()
})

bot.use(banMiddleware, Conversation, Commands, Texts, Actions)

run(bot)

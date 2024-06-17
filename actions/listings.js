import { Composer } from 'grammy'

const composer = new Composer()

composer.callbackQuery('listingAll', async ctx => {
	ctx.listingType = 1
	await ctx.conversation.enter('sendListingConversation')
})

export default composer

import { User } from '../models/User.js'
import { toHTML } from '@telegraf/entity'

async function markupMessage(ctx, tgId, text, user) {
	let messageText = text.message.text
	let entities = text.message.entities || []

	function replacePlaceholders(placeholder, replacement) {
		if (!replacement) replacement = ''

		const regex = new RegExp(`\\{${placeholder}\\}`, 'g')
		let match
		while ((match = regex.exec(messageText)) !== null) {
			const index = match.index
			const matchLength = match[0].length
			const replacementLength = replacement.length
			const changeInLength = replacementLength - matchLength

			// Replace the placeholder in the message text
			messageText =
				messageText.slice(0, index) +
				replacement +
				messageText.slice(index + matchLength)

			// Update entities
			entities = entities.map(entity => {
				if (entity.offset >= index + matchLength) {
					return {
						...entity,
						offset: entity.offset + changeInLength,
					}
				}
				if (entity.offset >= index && entity.offset < index + matchLength) {
					return {
						...entity,
						length: entity.length + changeInLength,
					}
				}
				return entity
			})

			// Adjust regex lastIndex for next search iteration
			regex.lastIndex = index + replacementLength
		}
	}

	if (user.fullName) {
		replacePlaceholders('full_name', user.fullName)
	} else {
		replacePlaceholders('full_name', '')
	}
	if (user.firstName) {
		replacePlaceholders('first_name', user.firstName)
	} else {
		replacePlaceholders('first_name', '')
	}
	if (user.lastName) {
		replacePlaceholders('last_name', user.lastName)
	} else {
		replacePlaceholders('last_name', '')
	}
	if (user.username) {
		replacePlaceholders('username', user.username)
	} else {
		replacePlaceholders('username', '')
	}
	if (user.tgId) {
		replacePlaceholders('user_id', user.tgId)
	} else {
		replacePlaceholders('user_id', '')
	}

	console.log(messageText)
	console.log(entities)

	const message = toHTML({
		text: messageText,
		entities: entities,
	})

	console.log(message)

	await ctx.api.sendMessage(tgId, message, { parse_mode: 'HTML' })
}

export default async function (ctx, textObject, type) {
	if (type === 1) {
		const users = await User.findAll()
		for (const e of users) {
			await markupMessage(ctx, e.tgId, textObject, e)
		}
	}
}

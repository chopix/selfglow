import { createConversation } from '@grammyjs/conversations'
import { Composer } from 'grammy'
import { addTarifConversation } from './addTarifConversation.js'
import { askUserConversation } from './askUserConversation.js'
import { answerToUserConversation } from './answerToUserConversation.js'
import { banUserConversation } from './banUserConversation.js'
import { unbanUserConversation } from './unbanUserConversation.js'
import { addAdminConversation } from './addAdminConversation.js'
import { deleteAdminConversation } from './deleteAdminConversation.js'

const composer = new Composer()

composer.use(createConversation(addTarifConversation))
composer.use(createConversation(askUserConversation))
composer.use(createConversation(answerToUserConversation))
composer.use(createConversation(banUserConversation))
composer.use(createConversation(unbanUserConversation))
composer.use(createConversation(addAdminConversation))
composer.use(createConversation(deleteAdminConversation))

export default composer

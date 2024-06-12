import { Composer } from 'grammy'
import adminMenu from './adminMenu.js'
import mainMenu from './mainMenu.js'
import tarifs from './tarifs.js'
import askUserText from './askUserText.js'
import documents from './documents.js'
import subscriptions from './subscriptions.js'

const composer = new Composer()

composer.use(adminMenu, mainMenu, tarifs, askUserText, documents, subscriptions)

export default composer

import { Composer } from 'grammy'
import mainMenuFunction from '../functions/mainMenuFunction.js'
import { getAllTarifs } from '../functions/getAllTarifs.js'

const composer = new Composer()

composer.command('start', async ctx => {
	await mainMenuFunction(ctx)
	await getAllTarifs(ctx)
})

export default composer

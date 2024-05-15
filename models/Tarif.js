import { sequelize } from '../config/sequelize.js'
import { DataTypes, Model } from 'sequelize'

export class Tarif extends Model {}
Tarif.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		currency: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		time: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		// category
		// dayStart
		// checkName
		successText: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: '✅ Оплата прошла успешно. Спасибо за покупку!',
		},
		// allowedUsers
	},
	{
		sequelize,
		modelName: 'tarif',
	}
)

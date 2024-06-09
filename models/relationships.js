import { Tarif } from './Tarif.js'
import { User } from './User.js'
import { Subscriber } from './Subscriber.js'
import { Resource } from './Resource.js'

Tarif.hasOne(Subscriber, { foreignKey: 'tarifId', as: 'subscriber' })
User.hasOne(Subscriber, { foreignKey: 'userId', as: 'subscriber' })
Subscriber.belongsTo(Tarif, { foreignKey: 'tarifId', as: 'tarif' })
Subscriber.belongsTo(User, { foreignKey: 'userId', as: 'user' })
Tarif.belongsTo(Resource, { foreignKey: 'resourceId' })
Resource.hasOne(Tarif, { foreignKey: 'resourceId' })

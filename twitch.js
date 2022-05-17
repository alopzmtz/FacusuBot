import { ApiClient } from '@twurple/api/lib'
import { ClientCredentialsAuthProvider } from '@twurple/auth/lib'
import { DirectConnectionAdapter, EnvPortAdapter, EventSubListener } from '@twurple/eventsub/lib'
import { promises as fs } from 'fs'

const clientId = process.env.TWITCH_CLIENT_ID
const clientSecret = process.env.TWITCH_SECRET

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret)
const apiClient = new ApiClient( {authProvider})

const listener = new EventSubListener({
    apiClient,
    adapter: new EnvPortAdapter({
        hostName: ''
    })
})
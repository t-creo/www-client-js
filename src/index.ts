import axios, { AxiosInstance } from 'axios'

export interface Health {
    status: 'UP'
}

export interface Credibility {
  credibility: number
}

export interface TextCredibilityWeights {
  weightSpam: number
  weightBadWords: number
  weightMisspelling: number
}

export interface TweetCredibilityWeights extends TextCredibilityWeights {
  weightText: number
  weightSocial: number
  weightUser: number
}

export interface TwitterUser {
  name: string
  verified: boolean
  yearJoined: number
  followersCount: number
  friendsCount: number
}

export interface Tweet {
  text: Text
  user: TwitterUser
}

export interface Text {
  text: string
  lang: Language
}
export type Language = 'es' | 'en' | 'fr'

export default class WorldWhiteWebClient {
    client: AxiosInstance

    constructor(baseUrl: string = "http://world-white-web.herokuapp.com") {
        this.client = axios.create({
            baseURL: baseUrl
        })
    }

    async getHealth() : Promise<Health> {
        try {
            const response = await this.client.get('/health')
            return response.data
        } catch (e) {
            throw e
        }
    }

}

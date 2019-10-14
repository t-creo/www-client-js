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
  text: PlainText
  user: TwitterUser
}

export interface PlainText {
  text: string
  lang: Language
}

export type Language = 'es' | 'en' | 'fr'

export default class WorldWhiteWebClient {
  client: AxiosInstance

  constructor(baseUrl: string = 'http://world-white-web.herokuapp.com') {
    this.client = axios.create({
      baseURL: baseUrl
    })
  }

  async getHealth() : Promise<Health> {
    const response = await this.client.get('/health')
    return response.data
  }

  async getPlainTextCredibility(
    weights: TextCredibilityWeights, text: PlainText) : Promise<Credibility> {
    const response = await this.client.get('/calculate/plain-text', {
      params: {
        ...weights, ...text
      }
    })
    return response.data
  }

  async getTwitterUserCredibility(userId: string) : Promise<Credibility> {
    const response = await this.client.get(`/calculate/twitter/user/${userId}`)
    return response.data
  }

  async getTwitterUserCredWithScraping(verified: boolean, yearJoined: number) : Promise<Credibility> {
    const response = await this.client.get(`/calculate/twitter/user/scrape`, {
      params: {
        verified, yearJoined
      }
    })
    return response.data
  }

  async getTwitterSocialCredibility(userId: string, maxFollowers: number) : Promise<Credibility> {
    const response = await this.client.get(`/calculate/twitter/social/${userId}`, {
      params: {
        maxFollowers
      }
    })
    return response.data
  }

  async getTwitterSocialCredWithScraping(
    followersCount: number, friendsCount: number,
    maxFollowers: number) : Promise<Credibility> {
    const response = await this.client.get(`/calculate/twitter/social/scrape`, {
      params: {
        followersCount, friendsCount, maxFollowers
      }
    })
    return response.data
  }

  async getTweetCredibility(
    tweetId: string, textWeights: TextCredibilityWeights,
    tweetWeights: TweetCredibilityWeights, maxFollowers: number) : Promise<Credibility> {
      const response = await this.client.get(`/calculate/twitter/social/scrape`, {
        params: {
          ...textWeights, ...tweetWeights, maxFollowers, tweetId
        }
      })
      return response.data
      }
}

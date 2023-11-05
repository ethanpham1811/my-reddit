import { TStepperData } from '@/constants/types'
import PaymentCheckout from './components/PaymentCheckout'
import PremiumInfo from './components/PremiumInfo'
import PricingInfo from './components/PricingInfo'

import ad1Url from '@/public/ad1.png'
import ad2Url from '@/public/ad2.png'
import ad3Url from '@/public/ad3.png'
import ad4Url from '@/public/ad4.png'

type TPremiumInfoData = {
  title: string
  description: string
  imgUrl: string
}

type TPricingInfoData = {
  title: string
  description: string
  price: number
  benefits: string[]
}

export const componentRegistry: { [key: string]: any } = {
  PremiumInfo,
  PricingInfo,
  PaymentCheckout
}

export const steps: TStepperData[] = [
  {
    stepLabel: 'About premium',
    component: 'PremiumInfo'
  },
  {
    stepLabel: 'Pricing',
    component: 'PricingInfo'
  },
  {
    stepLabel: 'Payment',
    component: 'PaymentCheckout',
    checkStatus: true
  }
]

export const premiumInfoData: TPremiumInfoData[] = [
  {
    title: 'Ad-free Browsing',
    description: 'Enjoy redditing without interruptions from ads',
    imgUrl: ad1Url.src
  },
  {
    title: 'Exclusive Avatar Gear',
    description: 'Outfit your avatar with the best gear and accessories',
    imgUrl: ad2Url.src
  },
  {
    title: 'Members Lounge',
    description: 'Discover all the illuminati secrets in r/lounge',
    imgUrl: ad3Url.src
  },
  {
    title: 'Custom App Icons*',
    description: 'Change your app icon to something more your style',
    imgUrl: ad4Url.src
  }
]

export const pricinginfoData: TPricingInfoData[] = [
  {
    title: 'Pro',
    description: 'A core set of tools to help you earn an income for your creative work from your community.',
    benefits: ['Monthly and annual subscriptions', 'Membership tiers', 'Free trials and special offers', 'Member analytics and insights'],
    price: 15
  },
  {
    title: 'Premium',
    description: 'An enhanced set of tools to help you earn an income for your work and grow your business.',
    benefits: ['Everything from Pro, plus:', 'Dedicated partner manager', 'Team accounts', 'Merch for membership'],
    price: 50
  }
]

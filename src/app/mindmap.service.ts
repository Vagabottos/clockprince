import { Injectable } from '@angular/core';

export enum Quadrant {
  TopLeft = 'topleft',
  TopRight = 'topright',
  BottomLeft = 'bottomleft',
  BottomRight = 'bottomright'
}

type Priority = 'red' | 'gold' | 'black';

interface MindMap {
  [key: string]: {
    quadrant: Quadrant;
    text: string;
    noActionIncrement?: boolean;
    showSearchText?: boolean;
    choices: Array<{ text: string, priority: Priority, dest: keyof MindMap }>
  };
}

@Injectable({
  providedIn: 'root'
})
export class MindmapService {

  public quadrantPlayCardInability: Record<Quadrant, string> = {
    [Quadrant.TopLeft]: 'Game.QuadrantCardPlay.TopLeft',
    [Quadrant.TopRight]: 'Game.QuadrantCardPlay.TopRight',
    [Quadrant.BottomLeft]: 'Game.QuadrantCardPlay.BottomLeft',
    [Quadrant.BottomRight]: 'Game.QuadrantCardPlay.BottomRight'
  };

  public nodes: MindMap = {

    // top left
    OathSupremacy: {
      quadrant: Quadrant.TopLeft,
      text: 'OathSupremacy',
      noActionIncrement: true,
      choices: [
        {
          text: 'Rule Most Sites?',
          priority: 'red',
          dest: 'NeedBanner'
        },
        {
          text: 'Battle Ready? (Rival Site with Fewest)',
          priority: 'gold',
          dest: 'TLBottomTravelCampaign'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TLBottomMuster'
        }
      ]
    },

    TLBottomTravelCampaign: {
      quadrant: Quadrant.TopLeft,
      text: 'TrCmFewestWarbands',
      choices: [
        {
          text: 'BRFewest',
          priority: 'gold',
          dest: 'TLTopTravelCampaign'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TLTravelFavor'
        }
      ]
    },

    TLTopTravelCampaign: {
      quadrant: Quadrant.TopLeft,
      text: 'TrCmFewestWarbands',
      choices: [
        {
          text: 'RuleMostSites',
          priority: 'red',
          dest: 'NeedBanner'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TLTopMuster'
        }
      ]
    },

    TLTravelFavor: {
      quadrant: Quadrant.TopLeft,
      text: 'TrFavor',
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'TLTradeFavor'
        }
      ]
    },

    TLTradeFavor: {
      quadrant: Quadrant.TopLeft,
      text: 'TradeFavor',
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'TLTopMuster'
        }
      ]
    },

    TLBottomMuster: {
      quadrant: Quadrant.TopLeft,
      text: 'Muster',
      choices: [
        {
          text: 'BRFewest',
          priority: 'gold',
          dest: 'TLBottomTravelCampaign'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TLTravelFavor'
        }
      ]
    },

    TLTopMuster: {
      quadrant: Quadrant.TopLeft,
      text: 'Muster',
      choices: [
        {
          text: 'BRFewest',
          priority: 'gold',
          dest: 'TLTopTravelCampaign'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TLTradeFavor'
        }
      ]
    },

    // top right
    OathProtection: {
      quadrant: Quadrant.TopRight,
      text: 'OathProtection',
      noActionIncrement: true,
      choices: [
        {
          text: 'Hold most relics and banners?',
          priority: 'red',
          dest: 'TLTopMuster'
        },
        {
          text: 'Battle Ready? (Holder of most relics)',
          priority: 'gold',
          dest: 'TRTravelCampaignRelic'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TRTravelRelicRight'
        }
      ]
    },

    TRTravelFavor: {
      quadrant: Quadrant.TopRight,
      text: 'TrFavor',
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'TRTradeFavorSecretLeft'
        }
      ]
    },

    TRTradeFavorSecretLeft: {
      quadrant: Quadrant.TopRight,
      text: 'TradeFavorSecret',
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'TRTravelRelicLeft'
        }
      ]
    },

    TRTradeFavorSecretRight: {
      quadrant: Quadrant.TopRight,
      text: 'TradeFavorSecret',
      choices: [
        {
          text: 'CanPayRelic',
          priority: 'gold',
          dest: 'TRExileRecover'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TRTravelFavor'
        }
      ]
    },

    TRTravelRelicLeft: {
      quadrant: Quadrant.TopRight,
      text: 'TrRelic',
      choices: [
        {
          text: 'HoldRelicBanners',
          priority: 'red',
          dest: 'TLTopMuster'
        },
        {
          text: 'CanPayRelic',
          priority: 'gold',
          dest: 'TRExileRecover'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TRMuster'
        }
      ]
    },

    TRTravelRelicRight: {
      quadrant: Quadrant.TopRight,
      text: 'TrRelic',
      choices: [
        {
          text: 'CanPayRelic',
          priority: 'gold',
          dest: 'TRExileRecover'
        },
        {
          text: 'Next',
          priority: 'black',
          dest: 'TRTradeFavorSecretRight'
        }
      ]
    },

    TRMuster: {
      quadrant: Quadrant.TopRight,
      text: 'Muster',
      choices: [
        {
          text: 'BRRelic',
          priority: 'gold',
          dest: 'TRTravelCampaignRelic'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TRTravelFavor'
        }
      ]
    },

    TRTravelCampaignRelic: {
      quadrant: Quadrant.TopRight,
      text: 'TrCmMostRelics',
      choices: [
        {
          text: 'HoldRelicBanners',
          priority: 'red',
          dest: 'TLTopMuster'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TRTravelRelicLeft'
        }
      ]
    },

    TRExileRecover: {
      quadrant: Quadrant.TopRight,
      text: 'ExilePay',
      choices: [
        {
          text: 'HoldRelicBanners',
          priority: 'red',
          dest: 'TLTopMuster'
        },
        {
          text: 'BRRelic',
          priority: 'gold',
          dest: 'TRTravelCampaignRelic'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'TRTradeFavorSecretLeft'
        }
      ]
    },

    // bottom left
    OathDevotion: {
      quadrant: Quadrant.BottomLeft,
      text: 'OathDevotion',
      noActionIncrement: true,
      choices: [
        {
          text: 'Hold DS?',
          priority: 'red',
          dest: 'BLSearch'
        },
        {
          text: 'Battle Ready? (Holder of DS)',
          priority: 'gold',
          dest: 'BLTravelCampaignDS'
        },
        {
          text: 'Can Pay? (Darkest Secret)',
          priority: 'gold',
          dest: 'BLPayDarkestSecret'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'BLTradeSecret'
        }
      ]
    },

    NeedBanner: {
      quadrant: Quadrant.BottomLeft,
      noActionIncrement: true,
      text: 'NeedBanner',
      choices: [
        {
          text: 'BannerDS',
          priority: 'red',
          dest: 'BLTradeSecret'
        },
        {
          text: 'BannerPF',
          priority: 'red',
          dest: 'OathPeople'
        },
        {
          text: 'BannerBoth',
          priority: 'red',
          dest: 'OathPeople'
        }
      ]
    },

    BLTradeSecret: {
      quadrant: Quadrant.BottomLeft,
      text: 'TradeSecret',
      choices: [
        {
          text: 'CanPayDS',
          priority: 'gold',
          dest: 'BLPayDarkestSecret'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BLTravelSecret'
        }
      ]
    },

    BLTravelSecret: {
      quadrant: Quadrant.BottomLeft,
      text: 'TrSecret',
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'BLTradeFavorSecret'
        }
      ]
    },

    BLTradeFavorSecret: {
      quadrant: Quadrant.BottomLeft,
      text: 'TradeFavorSecret',
      choices: [
        {
          text: 'CanPayDS',
          priority: 'gold',
          dest: 'BLPayDarkestSecret'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BLMuster'
        }
      ]
    },

    BLMuster: {
      quadrant: Quadrant.BottomLeft,
      text: 'Muster',
      choices: [
        {
          text: 'BRDS',
          priority: 'gold',
          dest: 'BLTravelCampaignDS'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BLTravelSecret'
        }
      ]
    },

    BLTravelCampaignDS: {
      quadrant: Quadrant.BottomLeft,
      text: 'TrCmDarkestSecret',
      choices: [
        {
          text: 'HoldDS',
          priority: 'red',
          dest: 'BLSearch'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BLTravelSecret'
        }
      ]
    },

    BLSearch: {
      quadrant: Quadrant.BottomLeft,
      text: 'Search',
      showSearchText: true,
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'TLBottomMuster'
        }
      ]
    },

    BLPayDarkestSecret: {
      quadrant: Quadrant.BottomLeft,
      text: 'PayDS',
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'BRSearch'
        }
      ]
    },

    // bottom right
    OathPeople: {
      quadrant: Quadrant.BottomRight,
      text: 'OathPeople',
      noActionIncrement: true,
      choices: [
        {
          text: 'HoldPF',
          priority: 'red',
          dest: 'BRSearch'
        },
        {
          text: 'BRPF',
          priority: 'gold',
          dest: 'BRTravelCampaignPF'
        },
        {
          text: 'CanPayPF',
          priority: 'gold',
          dest: 'BRPayPeoplesFavor'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BRTradeFavor'
        }
      ]
    },

    BRSearch: {
      quadrant: Quadrant.BottomRight,
      text: 'Search',
      showSearchText: true,
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'TRTravelFavor'
        }
      ]
    },

    BRTradeFavor: {
      quadrant: Quadrant.BottomRight,
      text: 'TradeFavor',
      choices: [
        {
          text: 'CanPayPF',
          priority: 'gold',
          dest: 'BRPayPeoplesFavor'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BRTravelFavor'
        }
      ]
    },

    BRTravelFavor: {
      quadrant: Quadrant.BottomRight,
      text: 'TrFavor',
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'BRTradeFavorSecret'
        }
      ]
    },

    BRTradeFavorSecret: {
      quadrant: Quadrant.BottomRight,
      text: 'TradeFavorSecret',
      choices: [
        {
          text: 'CanPayPF',
          priority: 'gold',
          dest: 'BRPayPeoplesFavor'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BRMuster'
        }
      ]
    },

    BRMuster: {
      quadrant: Quadrant.BottomRight,
      text: 'Muster',
      choices: [
        {
          text: 'BRPF',
          priority: 'gold',
          dest: 'BRTravelCampaignPF'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BRTravelFavor'
        }
      ]
    },

    BRTravelCampaignPF: {
      quadrant: Quadrant.BottomRight,
      text: 'TrCmPeoplesFavor',
      choices: [
        {
          text: 'HoldPF',
          priority: 'red',
          dest: 'BLSearch'
        },
        {
          text: 'None',
          priority: 'black',
          dest: 'BRTravelFavor'
        }
      ]
    },

    BRPayPeoplesFavor: {
      quadrant: Quadrant.BottomRight,
      text: 'PayPF',
      choices: [
        {
          text: 'Next',
          priority: 'black',
          dest: 'BRSearch'
        }]
    }
  };

  constructor() { }
}

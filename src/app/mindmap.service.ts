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
    [Quadrant.TopLeft]: 'Gain 2 warbands and 1 tactic',
    [Quadrant.TopRight]: 'Gain 1 warband, 1 favor, and 1 tactic',
    [Quadrant.BottomLeft]: 'Gain 1 warband, 1 secret, and 1 tactic',
    [Quadrant.BottomRight]: 'Gain 2 favor'
  };

  public nodes: MindMap = {

    // top left
    OathSupremacy: {
      quadrant: Quadrant.TopLeft,
      text: 'Oath of Supremacy',
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
      text: 'Travel to and Campaign the rival site with fewest warbands',
      choices: [
        {
          text: 'Battle Ready? (Rival Site with Fewest)',
          priority: 'gold',
          dest: 'TLTopTravelCampaign'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TLTravelFavor'
        }
      ]
    },

    TLTopTravelCampaign: {
      quadrant: Quadrant.TopLeft,
      text: 'Travel to and Campaign the rival site with fewest warbands',
      choices: [
        {
          text: 'Rule Most Sites?',
          priority: 'red',
          dest: 'NeedBanner'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TLTopMuster'
        }
      ]
    },

    TLTravelFavor: {
      quadrant: Quadrant.TopLeft,
      text: 'Travel to the site with the most favor',
      choices: [
        {
          text: 'Next Step',
          priority: 'black',
          dest: 'TLTradeFavor'
        }
      ]
    },

    TLTradeFavor: {
      quadrant: Quadrant.TopLeft,
      text: 'Trade for favor',
      choices: [
        {
          text: 'Next Step',
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
          text: 'Battle Ready? (Rival Site with Fewest)',
          priority: 'gold',
          dest: 'TLBottomTravelCampaign'
        },
        {
          text: 'None of the above',
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
          text: 'Battle Ready? (Rival Site with Fewest)',
          priority: 'gold',
          dest: 'TLTopTravelCampaign'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TLTradeFavor'
        }
      ]
    },

    // top right
    OathProtection: {
      quadrant: Quadrant.TopRight,
      text: 'Oath of Protection',
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
      text: 'Travel to the site with the most favor',
      choices: [
        {
          text: 'Next step',
          priority: 'black',
          dest: 'TRTradeFavorSecretLeft'
        }
      ]
    },

    TRTradeFavorSecretLeft: {
      quadrant: Quadrant.TopRight,
      text: 'Trade for favor and secrets',
      choices: [
        {
          text: 'Next step',
          priority: 'black',
          dest: 'TRTravelRelicLeft'
        }
      ]
    },

    TRTradeFavorSecretRight: {
      quadrant: Quadrant.TopRight,
      text: 'Trade for favor and secrets',
      choices: [
        {
          text: 'Can Pay? (Relic)',
          priority: 'gold',
          dest: 'TRExileRecover'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TRTravelFavor'
        }
      ]
    },

    TRTravelRelicLeft: {
      quadrant: Quadrant.TopRight,
      text: 'Travel to a site with a relic',
      choices: [
        {
          text: 'Hold Most Relics & Banners?',
          priority: 'red',
          dest: 'TLTopMuster'
        },
        {
          text: 'Can Pay? (Relic)',
          priority: 'gold',
          dest: 'TRExileRecover'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TRMuster'
        }
      ]
    },

    TRTravelRelicRight: {
      quadrant: Quadrant.TopRight,
      text: 'Travel to a site with a relic',
      choices: [
        {
          text: 'Can Pay? (Relic)',
          priority: 'gold',
          dest: 'TRExileRecover'
        },
        {
          text: 'Next step',
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
          text: 'Battle Ready? (Holder of most relics)',
          priority: 'gold',
          dest: 'TRTravelCampaignRelic'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TRTravelFavor'
        }
      ]
    },

    TRTravelCampaignRelic: {
      quadrant: Quadrant.TopRight,
      text: 'Travel to and campaign against the holder of the most relics',
      choices: [
        {
          text: 'Hold Most Relics & Banners?',
          priority: 'red',
          dest: 'TLTopMuster'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'TRTravelRelicLeft'
        }
      ]
    },

    TRExileRecover: {
      quadrant: Quadrant.TopRight,
      text: 'Exile may pay secrets as favor',
      choices: [
        {
          text: 'Hold Most Relics & Banners?',
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
          dest: 'TRTradeFavorSecretLeft'
        }
      ]
    },

    // bottom left
    OathDevotion: {
      quadrant: Quadrant.BottomLeft,
      text: 'Oath of Devotion',
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
      text: 'Need a Banner?',
      choices: [
        {
          text: 'Darkest Secret?',
          priority: 'red',
          dest: 'BLTradeSecret'
        },
        {
          text: 'Peoples Favor?',
          priority: 'red',
          dest: 'OathPeople'
        },
        {
          text: 'Both or neither?',
          priority: 'red',
          dest: 'OathPeople'
        }
      ]
    },

    BLTradeSecret: {
      quadrant: Quadrant.BottomLeft,
      text: 'Trade for Secrets',
      choices: [
        {
          text: 'Can Pay? (Darkest Secret)',
          priority: 'gold',
          dest: 'BLPayDarkestSecret'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'BLTravelSecret'
        }
      ]
    },

    BLTravelSecret: {
      quadrant: Quadrant.BottomLeft,
      text: 'Travel to the site with the most secrets',
      choices: [
        {
          text: 'Next step',
          priority: 'black',
          dest: 'BLTradeFavorSecret'
        }
      ]
    },

    BLTradeFavorSecret: {
      quadrant: Quadrant.BottomLeft,
      text: 'Trade favor and secrets',
      choices: [
        {
          text: 'Can Pay? (Darkest Secret)',
          priority: 'gold',
          dest: 'BLPayDarkestSecret'
        },
        {
          text: 'None of the above',
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
          text: 'Battle Ready? (Holder of Darkest Secret)',
          priority: 'gold',
          dest: 'BLTravelCampaignDS'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'BLTravelSecret'
        }
      ]
    },

    BLTravelCampaignDS: {
      quadrant: Quadrant.BottomLeft,
      text: 'Travel to and campaign against the holder of the Darkest Secret',
      choices: [
        {
          text: 'Hold DS?',
          priority: 'red',
          dest: 'BLSearch'
        },
        {
          text: 'None of the above',
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
          text: 'Next Step',
          priority: 'black',
          dest: 'TLBottomMuster'
        }
      ]
    },

    BLPayDarkestSecret: {
      quadrant: Quadrant.BottomLeft,
      text: 'Pay all secrets for the Darkest Secret',
      choices: [
        {
          text: 'Next Step',
          priority: 'black',
          dest: 'BRSearch'
        }
      ]
    },

    // bottom right
    OathPeople: {
      quadrant: Quadrant.BottomRight,
      noActionIncrement: true,
      text: 'Oath of the People',
      choices: [
        {
          text: 'Hold Peoples Favor?',
          priority: 'red',
          dest: 'BRSearch'
        },
        {
          text: 'Battle Ready? (Holder of Peoples Favor)',
          priority: 'gold',
          dest: 'BRTravelCampaignPF'
        },
        {
          text: 'Can Pay? (Peoples Favor)',
          priority: 'gold',
          dest: 'BRPayPeoplesFavor'
        },
        {
          text: 'None of the above',
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
          text: 'Next Step',
          priority: 'black',
          dest: 'TRTravelFavor'
        }
      ]
    },

    BRTradeFavor: {
      quadrant: Quadrant.BottomRight,
      text: 'Trade for favor',
      choices: [
        {
          text: 'Can Pay? (Peoples Favor)',
          priority: 'gold',
          dest: 'BRPayPeoplesFavor'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'BRTravelFavor'
        }
      ]
    },

    BRTravelFavor: {
      quadrant: Quadrant.BottomRight,
      text: 'Travel to the site with the most favor',
      choices: [
        {
          text: 'Next Step',
          priority: 'black',
          dest: 'BRTradeFavorSecret'
        }
      ]
    },

    BRTradeFavorSecret: {
      quadrant: Quadrant.BottomRight,
      text: 'Trade for favor and secrets',
      choices: [
        {
          text: 'Can Pay? (Peoples Favor)',
          priority: 'gold',
          dest: 'BRPayPeoplesFavor'
        },
        {
          text: 'None of the above',
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
          text: 'Battle Ready? (Holder of Peoples Favor)',
          priority: 'gold',
          dest: 'BRTravelCampaignPF'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'BRTravelFavor'
        }
      ]
    },

    BRTravelCampaignPF: {
      quadrant: Quadrant.BottomRight,
      text: 'Travel to and campaign against the holder of the Peoples Favor',
      choices: [
        {
          text: 'Hold Peoples Favor?',
          priority: 'red',
          dest: 'BLSearch'
        },
        {
          text: 'None of the above',
          priority: 'black',
          dest: 'BRTravelFavor'
        }
      ]
    },

    BRPayPeoplesFavor: {
      quadrant: Quadrant.BottomRight,
      text: 'Pay all favor for the Peoples Favor',
      choices: [
        {
          text: 'Next step',
          priority: 'black',
          dest: 'BRSearch'
        }]
    }
  };

  constructor() { }
}

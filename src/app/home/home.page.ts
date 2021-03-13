import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MindmapService, Quadrant } from '../mindmap.service';

enum ViewState {
  StartGame = 'startgame',
  StartTurn = 'startturn',
  ThreatAssess = 'threatassess',
  Search = 'search',
  TakeActions = 'takeactions'
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public language: string;

  public prevState = null;
  public state = {
    viewState: ViewState.StartGame,
    actionNumber: 0,
    currentView: ''
  };

  public friendConspiratorQuadrant = {
    [Quadrant.TopLeft]: 'Game.QuadrantAlignment.Friend',
    [Quadrant.TopRight]: 'Game.QuadrantAlignment.Conspirator',
    [Quadrant.BottomLeft]: 'Game.QuadrantAlignment.Conspirator',
    [Quadrant.BottomRight]: 'Game.QuadrantAlignment.Friend'
  };

  public threatOptions = [
    { text: 'Game.Oath.Supremacy',                  priority: 'red',   dest: 'OathSupremacy',   quad: Quadrant.TopLeft },
    { text: 'Game.Oath.Protection',                 priority: 'red',   dest: 'OathProtection',  quad: Quadrant.TopRight },
    { text: 'Game.Oath.Devotion',                   priority: 'red',   dest: 'OathDevotion',    quad: Quadrant.BottomLeft },
    { text: 'Game.Oath.People',                     priority: 'red',   dest: 'OathPeople',      quad: Quadrant.BottomRight },
    { text: 'Game.Actions.ThreatChange',            priority: 'black', dest: '' }
  ];

  public startGameOptions = [
    { text: 'Game.Oath.Supremacy',  dest: 'OathSupremacy' },
    { text: 'Game.Oath.Protection', dest: 'OathProtection' },
    { text: 'Game.Oath.Devotion',   dest: 'OathDevotion' },
    { text: 'Game.Oath.People',     dest: 'OathPeople' },
  ];

  constructor(
    private translate: TranslateService,
    private alert: AlertController,
    public mindmap: MindmapService
  ) {}

  ngOnInit() {
    this.language = localStorage.getItem('lang');
    if (!this.language) {
      const baseLang = navigator.language || 'en-US';
      if (baseLang.split('-')[0] === 'fr') {
        this.language = 'fr-FR';
      } else {
        this.language = 'en-US';
      }
    }

    this.updateTranslate();

    try {
      const loadState = JSON.parse(localStorage.getItem('state') || '{}');
      this.state = loadState;
    } catch {}

    if (!this.state.viewState) { this.state.viewState = ViewState.StartGame; }
  }

  public languageChange() {
    localStorage.setItem('lang', this.language);

    this.updateTranslate();
  }

  private updateTranslate() {
    this.translate.use(this.language);
  }

  async reset() {
    const alert = await this.alert.create({
      header: this.translate.instant('App.Reset.Title'),
      message: this.translate.instant('App.Reset.Message'),
      buttons: [
        {
          text: this.translate.instant('App.Reset.Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: this.translate.instant('App.Reset.Confirm'),
          role: 'danger',
          handler: () => {
            this.logState();

            this.state.currentView = '';
            this.state.viewState = ViewState.StartGame;

            this.save();
          }
        }
      ]
    });

    await alert.present();
  }

  startGame(dest: string) {
    this.logState();

    this.state.currentView = dest;
    this.state.viewState = ViewState.Search;

    this.save();
  }

  startTurn() {
    this.logState();

    this.state.viewState = ViewState.ThreatAssess;
    this.state.actionNumber = 0;

    this.save();
  }

  threatAssess(dest?: string) {
    this.logState();

    this.state.viewState = ViewState.Search;
    if (dest) {
      this.state.currentView = dest;
    }

    this.save();
  }

  searched() {
    this.logState();

    this.state.viewState = ViewState.TakeActions;

    this.save();
  }

  changeState(dest: string, incrementAction = true) {
    this.logState();

    this.state.currentView = dest;
    this.state.viewState = ViewState.TakeActions;

    if (incrementAction) {
      this.state.actionNumber++;
    }

    this.save();
  }

  endTurn() {
    this.logState();

    this.state.viewState = ViewState.StartTurn;

    this.save();
  }

  logState() {
    this.prevState = { ...this.state };
  }

  save() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  undo() {
    if (!this.prevState) { return; }

    this.state = { ...this.prevState };
    this.prevState = null;
    this.save();
  }
}

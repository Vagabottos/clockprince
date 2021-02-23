import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  public prevState = null;
  public state = {
    viewState: ViewState.StartGame,
    actionNumber: 0,
    currentView: ''
  };

  public friendConspiratorQuadrant = {
    [Quadrant.TopLeft]: 'Friend',
    [Quadrant.TopRight]: 'Conspirator',
    [Quadrant.BottomLeft]: 'Conspirator',
    [Quadrant.BottomRight]: 'Friend'
  };

  public threatOptions = [
    { text: 'Oath of Supremacy',                  priority: 'red',   dest: 'OathSupremacy',   quad: Quadrant.TopLeft },
    { text: 'Oath of Protection',                 priority: 'red',   dest: 'OathProtection',  quad: Quadrant.TopRight },
    { text: 'Oath of Devotion',                   priority: 'red',   dest: 'OathDevotion',    quad: Quadrant.BottomLeft },
    { text: 'Oath of the People',                 priority: 'red',   dest: 'OathPeople',      quad: Quadrant.BottomRight },
    { text: 'Same threat or no threat change',    priority: 'black', dest: '' }
  ];

  public startGameOptions = [
    { text: 'Oath of Supremacy',  dest: 'OathSupremacy' },
    { text: 'Oath of Protection', dest: 'OathProtection' },
    { text: 'Oath of Devotion',   dest: 'OathDevotion' },
    { text: 'Oath of the People', dest: 'OathPeople' },
  ];

  constructor(
    private alert: AlertController,
    public mindmap: MindmapService
  ) {}

  ngOnInit() {
    try {
      const loadState = JSON.parse(localStorage.getItem('state') || '{}');
      this.state = loadState;
    } catch {}

    if (!this.state.viewState) { this.state.viewState = ViewState.StartGame; }
  }

  async reset() {
    const alert = await this.alert.create({
      header: 'Reset Game?',
      message: 'Are you sure you want to reset the Prince\'s state? You can\'t reverse this action.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Yes, Reset',
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

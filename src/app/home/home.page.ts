import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MindmapService } from '../mindmap.service';

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

  public state = {
    viewState: ViewState.StartGame,
    currentView: ''
  };

  public threatOptions = [
    { text: 'Oath of Supremacy',  priority: 'red',   dest: 'OathSupremacy' },
    { text: 'Oath of Protection', priority: 'red',   dest: 'OathProtection' },
    { text: 'Oath of Devotion',   priority: 'red',   dest: 'OathDevotion' },
    { text: 'Oath of the People', priority: 'red',   dest: 'OathPeople' },
    { text: 'No threat change',   priority: 'black', dest: '' }
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
    this.state.currentView = dest;
    this.state.viewState = ViewState.Search;

    this.save();
  }

  startTurn() {
    this.state.viewState = ViewState.ThreatAssess;

    this.save();
  }

  threatAssess(dest?: string) {
    this.state.viewState = ViewState.Search;
    if (dest) {
      this.state.currentView = dest;
    }

    this.save();
  }

  searched() {
    this.state.viewState = ViewState.TakeActions;

    this.save();
  }

  changeState(dest: string) {
    this.state.currentView = dest;
    this.state.viewState = ViewState.TakeActions;

    this.save();
  }

  endTurn() {
    this.state.viewState = ViewState.StartTurn;

    this.save();
  }

  save() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }
}

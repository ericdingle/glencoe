import {customElement} from '@polymer/decorators';
import {PolymerElement, html} from '@polymer/polymer';

var states = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  STOPPED: 'stopped'
};

@customElement('court-app')
class CourtApp extends PolymerElement {
  static get properties() { return {
    time:   {type: Number,  value: 0,              notify: true},
    index:  {type: Number,  value: -1,             notify: true},
    state:  {type: String,  value: states.STOPPED, notify: true},
    active: {type: Boolean, value: false,          notify: true}
  }}

  play() {
    if (this.state == states.STOPPED)
      this._run(1);
    this.state = states.PLAYING;
  }
  pause() {
    this.state = states.PAUSED;
  }
  stop() {
    this.state = states.STOPPED;
  }

  async _run(repetition) {
    if (repetition > this.repetitions)
      return;

    const restLength = repetition == 1 ? 5 : this.restLength;

    this.active = false;
    try {
      await this._countDown(restLength);
    } catch(e) { return; }

    this.active = true;
    const countDown = this._countDown(this.intervalLength);
    const randomIndex = this._randomIndex(this.intervalLength);

    try {
      await Promise.all([countDown, randomIndex]);
    } catch(e) { return; }

    this._run(repetition + 1);
  }

  async _countDown(duration) {
    for (var i = 0; i <= duration; ++i) {
      this.time = duration - i;
      await this._delay(1000);
    }
  }

  async _randomIndex(duration) {
    const d = 1.4;
    for (var i = 0; i < duration; i += 2 * d) {
      this.index = Math.floor(Math.random() * 6);
      await this._delay(d * 1000);
      this.index = -1;
      await this._delay(d * 1000);
    }
  }

  async _delay(duration) {
    await new Promise(resolve => setTimeout(resolve, duration));

    if (this.state == states.PLAYING)
      return;
    if (this.state == states.STOPPED)
      throw undefined;

    await new Promise((resolve, reject) => {
      this.addEventListener('state-changed', (e) => {
        if (e.detail.value == states.PLAYING)
          setTimeout(resolve, 500);
        else if (e.detail.value == states.STOPPED)
          reject();
      });
    });
  }
}

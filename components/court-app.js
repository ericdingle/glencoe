var states = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  STOPPED: 'stopped'
};

function Deferred() {
  const p = this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
  });
  return this;
}

export class CourtApp {
  constructor(settings, callback) {
    this.settings = settings;
    this.callback = callback;

    this.setState(states.STOPPED);
  }

  setState(state) {
    this.state = state;
    this.callback('state', state);

    if (this.deferred) {
      this.deferred.resolve();
      delete this.deferred;
    }
  }

  play() {
    if (this.state == states.STOPPED)
      this._run(1);
    this.setState(states.PLAYING);
  }
  pause() {
    this.setState(states.PAUSED);
  }
  stop() {
    this.setState(states.STOPPED);
  }

  async _run(repetition) {
    if (repetition > this.settings.repetitions)
      return;

    const restLength = repetition == 1 ? 5 : this.settings.restLength;

    this.callback('active', false);
    try {
      await this._countDown(restLength);
    } catch(e) { return; }

    this.callback('active', true);
    const countDown = this._countDown(this.settings.intervalLength);
    const randomIndex = this._randomIndex(this.settings.intervalLength);

    try {
      await Promise.all([countDown, randomIndex]);
    } catch(e) { return; }

    this._run(repetition + 1);
  }

  async _countDown(duration) {
    for (var i = 0; i <= duration; ++i) {
      this.callback('time', duration - i);
      await this._delay(1000);
    }
  }

  async _randomIndex(duration) {
    const d = 1.4;
    for (var i = 0; i < duration; i += 2 * d) {
      this.callback('index', Math.floor(Math.random() * 6));
      await this._delay(d * 1000);
      this.callback('index', -1);
      await this._delay(d * 1000);
    }
  }

  async _delay(duration) {
    await new Promise(resolve => setTimeout(resolve, duration));

    while (this.state == states.PAUSED) {
      if (!this.deferred) this.deferred = new Deferred();
      await this.deferred.promise;
    }

    if (this.state == states.STOPPED)
      throw undefined;
  }
}

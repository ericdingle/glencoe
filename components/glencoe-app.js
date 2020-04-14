import {LitElement, customElement, html} from 'lit-element';
import './court-page.js';
import './settings-page.js';

@customElement('glencoe-app')
class GlencoeApp extends LitElement {
  static get properties() { return {
    page: {type: String},
    settings: {type: Object}
  }}

  constructor() {
    super();
    this.page = 'settings';
    this.settings = {};
  }

  render() {
    if (this.page == 'settings') {
      return html`<settings-page @play="${this.handlePlay}"></settings-page> `;
    } else {
      return html`<court-page @stop="${this.handleStop}"></court-page> `;
    }
  }

  async handlePlay(event) {
    this.page = 'court';
    await this.updateComplete;

    const courtPage = this.shadowRoot.querySelector('court-page');
    courtPage.init(event.detail);
    courtPage.play();
  }
  handleStop() {
    this.page = 'settings';
  }
}

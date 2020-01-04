import { html, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import '@polymer/paper-button/paper-button.js';

import { store } from '../store.js';

import { oneTeamSelected } from '../reducers/team.js';

import { ButtonSharedStyles } from './button-shared-styles.js';
import { SharedStyles } from './shared-styles.js';

class TeamsOptions extends connect(store)(LitElement) {
    static get properties() {
        return { _one_team_selected: { type: Boolean } }
    }

    static get styles() {
        return [ SharedStyles, ButtonSharedStyles ];
    }

    render() {
        return html`
            <paper-button ?hidden=${!this._one_team_selected} raised no ink @click="${this._team_action}" title="teamInfo">Team Info/paper-button>
        `;
    }

    _team_action() {}

    stateChanged(state) {
        this._one_team_selected = oneTeamSelected(state);
    }
}

window.customElements.define('teams-options', TeamsOptions);

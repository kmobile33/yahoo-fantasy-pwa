import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { selectTeam, deselectTeam, getTeamInfo } from '../actions/team.js';

// We are lazy loading its reducer.
import teamsReducer from '../reducers/team.js';
store.addReducers({
  teamsReducer
});

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

class TeamsTable extends connect(store)(LitElement) {
    static get properties() {
        return {
            _teams: { type: Object },
            _loading_status: { type: String },
            _error: { type: String },
            _one_team_selected: { type: Boolean }
         }
    }

    static get styles() {
        return [ SharedStyles, ButtonSharedStyles,
            css`
                paper-checkbox {
                    --paper-checkbox-unchecked-color: var(--app-primary-color);
                }
                paper-checkbox.header {
                    --paper-checkbox-unchecked-color: var(--app-secondary-color);
                    --paper-checkbox-unchecked-background-color: var(--app-section-even-color);
                    --paper-checkbox-checked-color: var(--app-secondary-color);
                }
            `
        ];
    }

    render(){
        switch (this._loading_status) {
            case 'loading':
                return html`
                    <style>
                        p {
                        text-align: center;
                        }
                    </style>
                    <section>
                    <p>Loading...</p>
                    </section>
                `;
            case 'finished':
                if (!this._teams || !Object.keys(this._teams).length) {
                    return html`
                        <style>
                            p { text-align: center; }
                        </style>
                        <p>There are no teams to show.</p>
                    `;
                }
                else {
                    return this._renderTable();
                }
            case 'error':
                return html`
                    <style>
                        p {
                            text-align: center;
                            color: red;
                        }
                    </style>
                    <section>
                    <p>Failed to load teams. Check server connection and reload.</p>
                    <p>${this._error}</p>
                    </section>
                `;
            default:
                throw new Error();
        }
    }

    _renderTable() {
        return html`
            <table class="center">
                <thead>
                    <tr>
                        <th scope="col">
                            <paper-checkbox class=header></paper-checkbox>
                        </th>
                        <th scope="col">Team Name</th>
                        <th scope="col">Team Owner</th>
                        <th scope="col">Waiver Priority</th>
                        <th scope="col">Move Count</th>
                        <th scope="col">Trade Count</th>
                    </tr> 
                </thead>
                <tbody>
                    ${Object.keys(this._teams).map((id) => {
                        const team = this._teams[id];
                        return html`
                            <tr>
                                <td><paper-checkbox ?checked=${team.selected} id="${id}" @change="${this._toggleTeamSelection}"></paper-checkbox></td>
                                <td>${team.name}</td>
                                <td>${team.owner}</td>
                                <td>${team.waiver_priority}</td>
                                <td>${team.move_count}</td>
                                <td>${team.trade_count}</td>
                            </tr>
                            `;
                        })
                    }
                </tbody>
            </table>
        `;
    }

    _toggleTeamSelection(e){
        if (e.target.checked) {
            store.dispatch(selectTeam(e.target.id));
        }
        else {
            store.dispatch(deselectTeam(e.target.id));
        }
    }

    firstUpdated() {
        store.dispatch(getTeamInfo())
    }

    stateChanged(state) {
        this._teams = state.teamsReducer.teams;
        this._loading_status = state.teamsReducer.loading_status;
        this._error = state.teamsReducer.error;
        this._one_team_selected = oneTeamSelected(state);
    }
}

window.customElements.define('teams-table', TeamsTable);

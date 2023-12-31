import { BaseState } from './BaseState.js';
import { applyDMG, calculateAttackDMG } from '../combat.js';


export class EnemyTurnState extends BaseState {
    constructor() {
        super('EnemyTurn');
    }

    enter() {
        super.enter();
        //console.log("In the Enemy Turn State");
    }

    exit() {
        super.exit();
        // logic TBD
    }

    update(enemy, player) {
        super.update();
        let damageThisTurn = calculateAttackDMG(enemy, player);
        applyDMG(player, damageThisTurn);
    }
}

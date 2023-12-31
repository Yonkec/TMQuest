import { DOMCacheGetOrSet } from "./DOMcache.js";
import { openTab } from "./interface.js";
import { buyCoinGen } from "./generators.js";

export const populateDOMEventCache = (player) => {

    //UI Navigation Events
    DOMCacheGetOrSet('tabButtonFight').addEventListener("click", (event) => openTab(event, 'Fight'));
    DOMCacheGetOrSet('tabButtonStrategy').addEventListener("click", (event) => openTab(event, 'Strategy'));
    DOMCacheGetOrSet('tabButtonInventory').addEventListener("click", (event) => openTab(event, 'Inventory'));
    DOMCacheGetOrSet('tabButtonShop').addEventListener("click", (event) => openTab(event, 'Shop'));
    DOMCacheGetOrSet('tabButtonStats').addEventListener("click", (event) => openTab(event, 'Stats'));

    //Generator purchase Events
    DOMCacheGetOrSet('buyCoinGen').addEventListener('click', () => buyCoinGen(player));
    DOMCacheGetOrSet('tabButtonFight').click();
}

export const updateAllOfTheThings = (player, enemy) => {

    //future self - I apologize for not using react or vue
    DOMCacheGetOrSet('coins').innerHTML = player.coins;
    DOMCacheGetOrSet('coinGens').innerHTML = player.coinGens;
    DOMCacheGetOrSet('enemyHP').innerHTML = enemy.health;
    DOMCacheGetOrSet('playerHP').innerHTML = player.health;
    DOMCacheGetOrSet('enemyAP').innerHTML = enemy.armor;
    DOMCacheGetOrSet('playerAP').innerHTML = player.armor;
    DOMCacheGetOrSet('enemyMP').innerHTML = enemy.mana;
    DOMCacheGetOrSet('playerMP').innerHTML = player.mana;
    DOMCacheGetOrSet('totalKills').innerHTML = player.kills;

    let nextCost = Math.floor(10 * Math.pow(1.1,player.coinGens));
    DOMCacheGetOrSet('coinGenCost').innerHTML = nextCost;
    
}
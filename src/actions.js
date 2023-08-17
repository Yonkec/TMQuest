/* eslint-disable no-unused-vars */
import { DOMCacheGetOrSet } from "./DOMcache";

export class ActionQueueManager {
    constructor() {
        this.currentActionIndex = 0;
        this.actionQueue = [];
    }

    populateActionCards() {
        fetch('database/actions.json')
            .then(response => response.json())
            .then(abilityCategories => {
                for (let category in abilityCategories) {
                    for (let ability of abilityCategories[category]) {
                        let card = document.createElement('div');
                        card.className = 'actionCard';
                        card.draggable = true;
                        card.dataset.actionObject = JSON.stringify(ability);
    
                        let title = document.createElement('h2');
                        title.textContent = ability.title;
                        card.appendChild(title);
    
                        let popup = document.createElement('div');
                        popup.className = 'popup';
                        card.appendChild(popup);
    
                        let description = document.createElement('p');
                        description.className = 'description';
                        description.textContent = ability.description;
                        popup.appendChild(description);
    
                        let categoryElem = document.createElement('p');
                        categoryElem.className = 'category';
                        categoryElem.textContent = "[ " + category.charAt(0).toUpperCase() + category.slice(1) + " ]";
                        popup.appendChild(categoryElem);
    
                        DOMCacheGetOrSet('playerActionList').appendChild(card);
                    }
                }
            });    

        let dragged;

        document.addEventListener("dragstart", function(event) {
            dragged = event.target;
            event.target.style.opacity = .5;
        }, false);

        document.addEventListener("dragend", function(event) {
            event.target.style.opacity = "";
        }, false);

        document.querySelector("#playerActionQueue").addEventListener("dragover", (event) => {
            event.preventDefault();
        }, false);

        document.querySelector("#playerActionQueue").addEventListener("drop", (event) => {
            event.preventDefault();

            const clonedNode = dragged.cloneNode(true);
            clonedNode.style.opacity = "";

            let dropTarget = event.target;
            while (dropTarget.id !== 'playerActionQueue' && !dropTarget.classList.contains('actionCard') && !dropTarget.classList.contains('queuedCard')) {
                dropTarget = dropTarget.parentNode;
            }

            if (dropTarget.id === 'playerActionQueue') {
                clonedNode.classList.replace('actionCard', 'queuedCard');
                dropTarget.appendChild(clonedNode);
            } else {
                if (dragged.parentNode.id === 'playerActionQueue') {
                    clonedNode.classList.replace('actionCard', 'queuedCard');
                    dropTarget.parentNode.insertBefore(clonedNode, dropTarget);
                    dropTarget.parentNode.insertBefore(dropTarget, dragged);
                } else {
                    clonedNode.classList.replace('actionCard', 'queuedCard');
                    dropTarget.parentNode.insertBefore(clonedNode, dropTarget.nextSibling);
                }
            }

            if (dragged.parentNode.id === 'playerActionQueue') {
                dragged.parentNode.removeChild(dragged);
            }

            this.updateActionQueue();
            this.currentActionIndex = 0;

        }, false);
    }

    returnNextAction() {
        if (this.actionQueue.length > 0) {
            const currentAction = this.actionQueue[this.currentActionIndex];
            this.currentActionIndex = (this.currentActionIndex + 1) % this.actionQueue.length;
            return currentAction;
        }
    }

    updateActionQueue() {
        this.actionQueue = Array.from(DOMCacheGetOrSet('playerActionQueue').children)
            .filter(child => child.tagName === 'DIV')
            .map(child => JSON.parse(child.dataset.actionObject));
    }    
}
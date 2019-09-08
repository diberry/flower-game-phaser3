import { store } from "../../index";
import { determinePosition } from "../../determinants/determinePosition";
import { pickupPollen, dropPollen } from "../../actions/beeActions";
import { addFlowerToStore } from "../../actions/flowerActions";
import { markTileAsFilled } from "../../actions/tileActions";
import { screenSize } from "../../utils/screenSize";

export function checkForPollen(beeId, flowerId) {
	const storeState = store.getState();
	const beeHasPollen = storeState.bees.byId[beeId].pollen !== null;
	// if no pollen, pick it up
	if (!beeHasPollen) {
		const pollen = storeState.flowers.byId[flowerId].genotype;
		// pollen.id = flowerId;
		store.dispatch(pickupPollen(beeId, pollen, flowerId));
	}

	if (beeHasPollen) {
		// pollinate, from bee pollen
		const bee = storeState.bees.byId[beeId];
		const pollen = bee.pollen;
		const pollenId = bee.pollenId;
		// get currently collided flower
		const flower2 = storeState.flowers.byId[flowerId];
		const allTileIndex = flower2.tileIndex;

		// find nearest available tile index
		let availableTile = storeState.tiles.availableTiles[allTileIndex];

		let counter = allTileIndex - 1;
		while (availableTile === undefined) {
			availableTile = storeState.tiles.availableTiles[counter];
			counter--;
		}

		// if there's room
		if (storeState.tiles.availableTiles.length > 0) {
			// create object with parental info
			const info = {
				parent1: {
					id: pollenId,
					genotype: pollen,
					position: { x: 0, y: 0 }
				},
				parent2: {
					id: flowerId,
					genotype: flower2.genotype,
					position: flower2.position
				},
				posInfo: {
					newPos: { x: availableTile.x, y: availableTile.y },
					tileIndex: availableTile.tileIndex
				}
			};
			store.dispatch(addFlowerToStore(info));
			store.dispatch(markTileAsFilled(availableTile.tileIndex));
			store.dispatch(dropPollen(beeId));
		} else {
			// flower is full
			store.dispatch(dropPollen(beeId));
		}
	}
}

// not being used
// export function beeOnFlowerCollision(beeOnFlower, collider) {
// 	console.log("collision");
// 	console.log(beeOnFlower);
// 	console.log(collider);
// 	console.log(this);
// 	this.bee.setAcceleration(0, 0);

// 	let targetFlowerGraphics = this.add.graphics({
// 		lineStyle: { width: 2, color: 0x00ff00 },
// 		fillStyle: { color: 0xff00ff }
// 	});
// 	this.time.addEvent({
// 		delay: 1000,
// 		callback: function() {
// 			// set the new target randomly
// 			this.flowerToFlyTo = this.flowersOnScreen[
// 				Math.floor(Math.random() * this.flowersOnScreen.length)
// 			];
// 			// sets target debug graphics
// 			targetFlowerGraphics.clear();
// 			this.circle = new Phaser.Geom.Circle(
// 				this.flowerToFlyTo.x,
// 				this.flowerToFlyTo.y,
// 				10
// 			);
// 			targetFlowerGraphics.strokeCircleShape(this.circle);
// 			// remove this collider
// 			//this.physics.world.removeCollider(collider);
// 			// create a new one
// 			// set new object
// 			collider.object2 = this.flowerToFlyTo;
// 		},
// 		callbackScope: this
// 	});
// }
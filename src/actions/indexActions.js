import {
	CHANGE_FLOWER,
	ADD_FLOWER,
	PICKUP_POLLEN,
	DROP_POLLEN,
	BEE_CAN_FLY,
	ADD_RECESSIVE_ALLELE,
	REMOVE_RECESSIVE_ALLELE
} from "../types/actions";

export const changeParentAllele = data => {
	return {
		type: CHANGE_FLOWER,
		data
	};
};

export const addFlower = data => {
	return {
		type: ADD_FLOWER,
		data
	};
};

export const pickupPollen = (beeId, pollen, flowerId) => {
	return {
		type: PICKUP_POLLEN,
		data: { beeId, pollen, flowerId }
	};
};

export const dropPollen = beeId => {
	return {
		type: DROP_POLLEN,
		data: { beeId }
	};
};

export const beeCanFly = bool => {
	return {
		type: BEE_CAN_FLY,
		bool
	};
};

export const addRecessiveAllele = data => {
	return {
		type: ADD_RECESSIVE_ALLELE,
		data
	};
};

export const removeRecessiveAllele = data => {
	return {
		type: REMOVE_RECESSIVE_ALLELE,
		data
	};
};

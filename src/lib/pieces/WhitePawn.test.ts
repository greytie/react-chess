import { addPiece } from '../../components/board/ManagePiece';
import { Coordinates } from '../../types/AlgebraicNotation';
import { BoardState, BoardStateFactory, getDestination } from '../model/BoardState';
import { Team } from '../Team';
import { isLegalPawnMove } from './Pawn';

const boardFactory: BoardStateFactory = new BoardStateFactory();
let state: BoardState;

beforeEach(() => {
    state = boardFactory.createBoardState();
})

describe("white pawn movement from starting position", () => {
    const origin: Coordinates = ['e', 2];

    beforeEach(() => {
        addPiece(state, Team.White, 'pawn', origin);
    });

    it("can move one square forward", () => {
        expect(isLegalPawnMove(state, origin, getDestination(state, origin, { rank: 1 }))).toBe(true);
    });

    it("can move two squares forward at start rank", () => {
        expect(isLegalPawnMove(state, origin, getDestination(state, origin, { rank: 2 }))).toBe(true);
    });
});

describe('white pawn movement after starting postiion', () => {
    const origin: Coordinates = ['e', 3];

    beforeEach(() => {
        addPiece(state, Team.White, 'pawn', origin);
    });

    it("can move one square forward", () => {
        expect(isLegalPawnMove(state, origin, getDestination(state, origin, { rank: 1 }))).toBe(true);
    });

    it("can't move two square forward", () => {
        expect(isLegalPawnMove(state, origin, getDestination(state, origin, { rank: 2 }))).toBe(false);
    });
});

describe('white pawn illegal moves', () => {
    const origin: Coordinates = ['e', 3];

    beforeEach(() => {
        addPiece(state, Team.White, 'pawn', origin);
    });

    it("can't move a square backwards", () => {
        expect(isLegalPawnMove(state, origin, getDestination(state, origin, { rank: -1 }))).toBe(false);
    });

    it("can't move three squares forward", () => {
        expect(isLegalPawnMove(state, origin, getDestination(state, origin, { rank: 3 }))).toBe(false);
    });

    it("can't move to a square on the same rank", () => {
        expect(isLegalPawnMove(state, origin, getDestination(state, origin, { file: 1 }))).toBe(false);
    });
});
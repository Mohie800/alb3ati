import create from "zustand";

const useStore = create((set) => ({
	isUser: false,
	setUser: () => set((state) => ({ ...state, isUser: true })),
	user: {},
	setUserObj: (User) => set((state) => ({ ...state, user: User })),
	roomId: null,
	setRoomId: (id) => set((state) => ({ ...state, roomId: id })),
	joinedPlayers: [],
	setJoinedPlayers: (players) =>
		set((state) => ({ ...state, joinedPlayers: players })),
	game: {},
	setGame: (Game) => set((state) => ({ ...state, game: Game })),
	playerObj: {},
	setPlayerObj: (player) => set((state) => ({ ...state, playerObj: player })),
}));

export default useStore;

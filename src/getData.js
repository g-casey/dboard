import { writable, get } from "svelte/store";
import { gun } from "./stores/LoginStore";

export const posts = new writable([]);
export const comments = new writable([])


//convert gun set node to svelete store
function updateStore(node, store) {
	let list = [];
	node
		.map()
		.once((node) => {
			list.push(node);
			store.set(list);
		}
		);
}

export function getPosts() {
	updateStore(gun.get("posts"), posts);
}

export function getPostComments(post) {
	comments.set([]);
	updateStore(gun.get(post['_']['#'])
		.get("comments"), comments);
};

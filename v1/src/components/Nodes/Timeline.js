import Node from './Node';

class LinkedTimeline {
    constructor() {
        this.root = null; // Start of the timeline (root node)
    }

    setRoot(data) {
        this.root = new Node(data); // Initialize the root node
    }

    addBranch(parentNode, data) {
        const newNode = new Node(data);
        parentNode.addBranch(newNode); // Add a new branch to the parent node
    }

    traverse(node = this.root, depth = 0) {
        if (!node) return;
        console.log(`${'--'.repeat(depth)} Node Data:`, node.data);
        node.branches.forEach(branch => this.traverse(branch, depth + 1));
    }
}

export default LinkedTimeline;
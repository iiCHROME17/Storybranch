import TimelineNode from "./TimelineNode";

class LinkedTimeline {
    constructor() {
        this.root = null; // Start of the timeline (root node)
    }

    setRoot(data) {
        this.root = new TimelineNode(data); // Initialize the root node
    }

    addBranch(parentNode, data, parentDiv) {
        const newNode = new TimelineNode(data, "ARC", 0, 0, parentDiv);
        parentNode.addBranch(newNode); // Add a new branch to the parent node
    }

    traverse(node = this.root, depth = 0) {
        if (!node) return;
        console.log(`${'--'.repeat(depth)} Node Data:`, node.data);
        node.branches.forEach(branch => this.traverse(branch, depth + 1));
    }
}

export default LinkedTimeline;
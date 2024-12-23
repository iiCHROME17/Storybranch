import TimelineNode from "./TimelineNode";

/**
 * Class representing a linked timeline structure. This strucutre replicates a timeline structure.
 * Nodes in a timeline represent events or actions that occur in a sequence.
 * Each node can have multiple branches. These branches represent sub-timelines.
 * Even branches can have their own branches, creating a tree-like structure.
 *
 *
 * To illustrate, consider a story, the timeline structure represents the beginning through to the end of the story.
 * Branch nodes could represent side stories or subplots that occur within the main story but is not part of the main sequence.
 *
 *
 * Losely based on General Tree Data Structure combined with Linked List Data Structures.
 */
class LinkedTimeline {
    /**
     * Create a LinkedTimeline.
     */
    constructor() {
        this.root = null; // Start of the timeline (root node)
    }

    /**
     * Set the root node of the timeline.
     * @param {Object} data - The data for the root node.
     */
    setRoot(data) {
        this.root = new TimelineNode(data); // Initialize the root node
    }

    /**
     * Add a branch node to a parent node.
     * @param {TimelineNode} parentNode - The parent node to which the branch will be added.
     * @param {Object} data - The data for the new branch node.
     * @param {HTMLElement} parentDiv - The parent div element where the node will be rendered.
     */
    addBranch(parentNode, data, parentDiv) {
        const newNode = new TimelineNode(data, "ARC", 0, 0, parentDiv);
        parentNode.addBranch(newNode); // Add a new branch to the parent node
    }

    /**
     * Traverse the timeline and log the data of each node.
     * @param {TimelineNode} [node=this.root] - The node to start traversing from.
     * @param {number} [depth=0] - The current depth of traversal.
     */
    traverse(node = this.root, depth = 0) {
        if (!node) return;
        console.log(`${'--'.repeat(depth)} Node Data:`, node.data);
        node.branches.forEach(branch => this.traverse(branch, depth + 1));
    }
}

export default LinkedTimeline;
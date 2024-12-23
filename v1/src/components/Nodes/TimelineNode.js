/**
 * Class representing a node in the timeline.
 * These are the main nodes that represent a point in the timeline.
 * They can have branches that represent sub-timelines.
 */
class TimelineNode {
    /**
     * Create a TimelineNode.
     * @param {Object} data - The data associated with the node.
     * @param {string} [name="ARC"] - The name of the node.
     * @param {number} [x=0] - The x-coordinate of the node.
     * @param {number} [y=0] - The y-coordinate of the node.
     */
    constructor(data, name = "ARC", x = 0, y = 0) {
        this.name = name;         // Name of the Node
        this.data = data;         // Instance of Data class
        this.prev = null;         // Previous Node in the timeline
        this.next = null;         // Next Node in the timeline
        this.branches = [];       // Array of child Nodes (branches)
        this.x = x;               // X position of the Node
        this.y = y;               // Y position of the Node
        this.parentDiv = null;    // Parent div of the Node Container
    }

    /**
     * Add a branch node to this node.
     * @param {TimelineNode} node - The branch node to add.
     */
    addBranch(node) {
        this.branches.push(node); // Add a new branch to this node
    }

    /**
     * Set the previous node in the timeline.
     * @param {TimelineNode} node - The previous node.
     */
    setPrev(node) {
        this.prev = node; // Set the previous node
    }

    /**
     * Set the next node in the timeline.
     * @param {TimelineNode} node - The next node.
     */
    setNext(node) {
        this.next = node; // Set the next node
    }
}

export default TimelineNode;
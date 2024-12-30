/**
 * Class representing a node in the timeline.
 */
class TimelineNode {
    /**
     * Create a TimelineNode.
     * @param {Object} data - The data associated with the node.
     * @param {string} [name="ARC"] - The name of the node.
     * @param {number} [x=0] - The x-coordinate of the node.
     * @param {number} [y=0] - The y-coordinate of the node.
     * @param {boolean} [isBranch=false] - Whether the node is a branch.
     * @param {TimelineNode} [parent=null] - The parent node.
     */
    constructor(data, name = "ARC", x = 0, y = 0, isBranch = false, parent = null) {
        this.name = name;
        this.caption = name;
        this.data = data;
        this.prev = null;
        this.next = null;
        this.branches = [];
        this.x = x;
        this.y = y;
        this.parentDiv = null;
        this.isBranch = isBranch;
        this.parent = parent; // Add parent property
    }

    /**
     * Add a branch to the node.
     * @param {TimelineNode} node - The node to add as a branch.
     */
    addBranch(node) {
        this.branches.push(node);
    }

    /**
     * Set the previous node.
     * @param {TimelineNode} node - The node to set as previous.
     */
    setPrev(node) {
        this.prev = node;
    }

    /**
     * Set the next node.
     * @param {TimelineNode} node - The node to set as next.
     */
    setNext(node) {
        this.next = node;
    }
}

export default TimelineNode;
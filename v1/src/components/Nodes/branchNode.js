import TimelineNode from './TimelineNode';

/**
 * Class representing a branch node in the timeline.
 * This is a node that represents a branch in the timeline.
 * Can be a child of a main node or another branch node.
 * Cannot exist without a parent node.
 * @extends TimelineNode
 */
class BranchNode extends TimelineNode {
    /**
     * Create a branch node.
     * @param {Object} data - The data for the branch node.
     * @param {string} name - The name of the branch node.
     * @param {number} x - The x-coordinate of the branch node.
     * @param {number} y - The y-coordinate of the branch node.
     * @param {HTMLElement} parentDiv - The parent div element where the node will be rendered.
     */
    constructor(data, name, x, y, parentDiv) {
        super(data, name, x, y, parentDiv);
        this.type = 'BranchNode'; // Set the type of the node to 'BranchNode'
    }
}

export default BranchNode;
class TimelineNode {
    constructor(data, name = "ARC", x = 0, y = 0) {
        this.name = name;         // Name of the Node
        this.data = data;          // Instance of Data class
        this.prev = null;         // Previous Node in the timeline
        this.next = null;         // Next Node in the timeline
        this.branches = [];       // Array of child Nodes (branches)
        this.x = x;               // X position of the Node
        this.y = y;               // Y position of the Node
        this.parentDiv = null;    // Parent div of the Node Container
    }

    addBranch(node) {
        this.branches.push(node); // Add a new branch to this node
    }
    setPrev(node) {
        this.prev = node; // Set the previous node
    }
    setNext(node) {
        this.next = node; // Set the next node
    }
}

export default TimelineNode;


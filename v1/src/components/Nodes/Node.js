class Node {
    constructor(data, name = "ARC", x = 0, y = 0) {
        this.name = name;         // Name of the Node
        this.data = data;         // Instance of Data class
        this.branches = [];       // Array of child Nodes (branches)
        this.x = x;               // X position of the Node
        this.y = y;               // Y position of the Node
    }

    addBranch(node) {
        this.branches.push(node); // Add a new branch to this node
    }
}

export default Node;


/**
 * Class representing world information. World information can be anythin.
 *
 * It could be world lore, history, geography, or any other information about the world.
 */
class WorldInformation {
    /**
     * Create a WorldInformation instance.
     * @param {string} name - The name of the world.
     * @param {string|Object} information - Paragraph or JSON object for world content.
     */
    constructor(name, information) {
        this.name = name;           // Name of the world
        this.information = information; // Paragraph or JSON object for world content
    }
}
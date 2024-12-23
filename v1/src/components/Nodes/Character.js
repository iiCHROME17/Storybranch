/**
 * Class representing a story character.
 */
class Character {
    /**
     * Create a character.
     * @param {string} name - The name of the character.
     * @param {string} biology - The biological description of the character.
     * @param {string} information - Additional information about the character.
     */
    constructor(name, biology, information) {
        this.name = name;           // Name of the character
        this.biology = biology;     // Biological description
        this.information = information; // Additional character info
    }
}

export default Character;
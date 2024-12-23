/**
 * Class representing the data structure for story events, world information, and characters.
 * This is all the data that a single node in the timeline can hold.
 */
class Data {
    /**
     * Create a Data instance.
     */
    constructor() {
        this.storyEvents = [];         // Array of StoryEvent objects
        this.worldInformation = [];    // Array of WorldInformation objects
        this.characterList = [];       // Array of Character objects
    }

    /**
     * Add a story event to the list.
     * @param {Object} storyEvent - The story event to add.
     */
    addStoryEvent(storyEvent) {
        this.storyEvents.push(storyEvent); // Add a story event to the list
    }

    /**
     * Add world information to the list.
     * @param {Object} worldInfo - The world information to add.
     */
    addWorldInformation(worldInfo) {
        this.worldInformation.push(worldInfo); // Add world information to the list
    }

    /**
     * Add a character to the list.
     * @param {Object} character - The character to add.
     */
    addCharacter(character) {
        this.characterList.push(character); // Add a character to the list
    }

    /**
     * Remove a story event from the list.
     * @param {Object} storyEvent - The story event to remove.
     */
    removeStoryEvent(storyEvent) {
        this.storyEvents = this.storyEvents.filter(event => event !== storyEvent);
    }

    /**
     * Remove world information from the list.
     * @param {Object} worldInfo - The world information to remove.
     */
    removeWorldInformation(worldInfo) {
        this.worldInformation = this.worldInformation.filter(info => info !== worldInfo);
    }

    /**
     * Remove a character from the list.
     * @param {Object} character - The character to remove.
     */
    removeCharacter(character) {
        this.characterList = this.characterList.filter(char => char !== character);
    }
}

export default Data;
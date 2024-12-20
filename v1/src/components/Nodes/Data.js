class Data {
    constructor() {
        this.storyEvents = [];         // Array of StoryEvent objects
        this.worldInformation = [];    // Array of WorldInformation objects
        this.characterList = [];       // Array of Character objects
    }

    addStoryEvent(storyEvent) {
        this.storyEvents.push(storyEvent); // Add a story event to the list
    }

    addWorldInformation(worldInfo) {
        this.worldInformation.push(worldInfo); // Add world information to the list
    }

    addCharacter(character) {
        this.characterList.push(character); // Add a character to the list
    }

    removeStoryEvent(storyEvent) {
        this.storyEvents = this.storyEvents.filter(event => event !== storyEvent);
    }
    removeWorldInformation(worldInfo) {
        this.worldInformation = this.worldInformation.filter(info => info !== worldInfo);
    }
    removeCharacter(character) {
        this.characterList = this.characterList.filter(char => char !== character);
    }
}

export default Data;
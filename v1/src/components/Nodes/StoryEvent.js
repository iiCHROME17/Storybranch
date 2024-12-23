/**
 * Class representing a story event. This could be anything from an entire story arc to a single event in the arc.
 * The complexity of this is determined by the user.
 */
class StoryEvent {
    /**
     * Create a story event.
     * @param {number} id - Unique identifier for the event.
     * @param {string} title - Title of the event.
     * @param {string|Object} information - Paragraph or JSON object for event content.
     */
    constructor(id, title, information) {
        this.id = id;                   // Unique identifier for the event
        this.title = title;             // Title of the event
        this.information = information; // Paragraph or JSON object for event content
    }
}

export default StoryEvent;
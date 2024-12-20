class StoryEvent {
    constructor(id, title, information) {
        this.id = id;                   // Unique identifier for the event
        this.title = title;             // Title of the event
        this.information = information  // Paragraph or JSON object for event content
    }
}
export default StoryEvent;
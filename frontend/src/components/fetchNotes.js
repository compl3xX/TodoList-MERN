import axios from 'axios';

const fetchNotes = async () => {
    try {
        const fetchedNote = await axios.get("/api/showtodo");
        return fetchedNote.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default fetchNotes;
let setData = {
    sets : [
        { 
            title : 'Set 1', 
            words : [
                { clue : 'trudno', answer : 'difficult', category : 'adjective' },
                { clue : 'Zaczyna', answer : 'begins', category : 'verb' },
                { clue : 'wiele', answer : 'many', category : 'adjective' },
                { clue : 'Najlepsze', answer : 'best', category : 'adjective' },
                { clue : 'przy tym', answer : 'at the same time', category : 'phrase' },
                { clue : 'slodkim', answer : 'sweet', category : 'adjective' },
                { clue : 'życie', answer : 'life', category : 'noun' },
                { clue : 'ulubonie', answer : 'favourites', category : 'noun' },
                { clue : 'stara sie', answer : 'is trying', category : 'verb' },
                { clue : 'potrawy', answer : 'meals', category : 'noun' },
                { clue : 'lub', answer : 'or', category : 'prepositions' },
                { clue : 'brudne', answer : 'dirty', category : 'adjective' },
                { clue : 'czysty', answer : 'clean', category : 'adjective' },
                { clue : 'zapomniec', answer : 'forget', category : 'verb' }
            ]
        },
        { 
            title : 'Set 2', 
            words : [
                { clue : 'Wiec', answer : 'so', category : 'preposition' },
                { clue : 'Gdy', answer : 'when', category : 'preposition' },
                { clue : 'Niektorzy', answer : 'some', category : 'noun' },
                { clue : 'Prawnie', answer : 'almost', category : 'noun' },
                { clue : 'Niestety', answer : 'unfortunately', category : '' },
                { clue : 'Najbardziej', answer : 'most', category : '' },
                { clue : 'Za', answer : 'behind', category : '' },
                { clue : 'Mokra', answer : 'wet', category : 'adjective' },
                { clue : 'Miły', answer : 'nice', category : 'adjective' },
                { clue : 'Nożem', answer : 'knife', category : 'noun' },
                { clue : 'Może', answer : 'he can', category : 'verb' },
                { clue : 'Doczekać', answer : 'wait', category : 'verb' },
                { clue : 'Całe', answer : 'all', category : '' },
                { clue : 'Dlatego', answer : 'because', category : 'conjunction' },
                { clue : 'Zawsze', answer : 'always', category : 'adverb' },
                { clue : 'Uczyć się', answer : 'learn', category : 'verb' },
                { clue : 'Szybko', answer : 'fast', category : 'adjective' },
                { clue : 'Chcesz', answer : 'you want', category : 'verb' },
                { clue : 'Potem', answer : 'later', category : 'adverb' },
            ]
        }
   ]
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getProgressBarStyle(completed) {
    var color;
    var percent = completed; 

    switch(true) {
        case (completed <= 20) :
            color = '#FFD851';
            break;
        case (completed > 20 && completed <= 40) :
            color = '#FFC151';
            break;
        case (completed > 40 && completed <= 60 ) :
            color = '#FFA051';
            break;
        case (completed > 60 && completed <= 80) :
            color = '#b9e851';
            break;
        case (completed > 80) :
            color = '#75c531';
            break;
        default :
            color = '#FFD851';
            break;
    }
    percent.toString();
    percent += '%';

    return [ color, percent ]
}

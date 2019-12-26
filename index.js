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
                { clue : 'zapomniec', answer : 'forget', category : 'verb' }
            ]
        },
        { 
            title : 'Set 2', 
            words : [
                { clue : 'trudno', answer : 'difficult', category : 'adjective' },
                { clue : 'Zaczyna', answer : 'begins', category : 'verb' },
                { clue : 'wiele', answer : 'many', category : 'adjective' },
                { clue : 'Najlepsze', answer : 'best', category : 'adjective' },
                { clue : 'przy tym', answer : 'at the same time', category : 'phrase' },
                { clue : 'slodkim', answer : 'sweet', category : 'adjective' },
            ]
        }
   ]
}

const state = {
    activePanel : 'action'
}

var list = new Vue({
  el: '#list',
  data: {
    sets : setData.sets,
    activePanel : state
  },
  methods : {
    toggleActive : function () {
       state.activePanel = 'action';
    }
  }
})

var action = new Vue({
  el : '#action',
  data : {
    message : 'Words',
    originalSets : setData.sets[0].words,
    sets : JSON.parse(JSON.stringify(setData.sets[0].words)),
    activeWordIdx : 0,
    activePanel : state,
    stage : 'newWord',
    lessonStatus : 'yellow',
    completed : 0,
    lessonCompleted : false
  },
  methods : {
    nextWord : function (clue) {
        this.stage = 'newWord';
        let idx = this.sets.findIndex(set => set.clue === clue);
        this.sets.splice(idx, 1);

        if (this.sets.length === this.activeWordIdx) {
            this.activeWordIdx = 0;
        }

        this.completed = 100 - ((this.sets.length / this.originalSets.length) * 100);

        switch(true) {
            case (this.completed < 20) :
                this.lessonStatus = '#FFD851';
                break;
            case (this.completed > 20 && this.completed < 40) :
                this.lessonStatus = '#FFC151';
                break;
            case (this.completed > 40 && this.completed < 60 ) :
                this.lessonStatus = '#FFA051';
                break;
            case (this.completed > 60 && this.completed < 80) :
                this.lessonStatus = '#b9e851';
                break;
            case (this.completed > 80) :
                this.lessonStatus = '#75c531';
                break;
        }
        this.completed.toString();
        this.completed += '%';

        if (this.sets.length === 0) { this.lessonCompleted = true; }
    },
    comeBack : function () {
        this.activeWordIdx++;
        this.stage = 'newWord';
    },
    toggleActive : function () {
       state.activePanel = 'list';
    },
    reset : function () {
        this.sets = JSON.parse(JSON.stringify(this.originalSets)); 
        this.activeWordIdx = 0;
        this.lessonCompleted = false;
        this.lessonStatus = '#FFD851';
        this.completed = 0;
    }
  }
})


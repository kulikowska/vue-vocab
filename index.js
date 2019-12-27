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

Vue.component('list', {
  template : '#list',
  data: function () {
    return {
        sets : setData.sets,
        activePanel : state
    }
  },
  methods : {
    toggleActive : function () {
       state.activePanel = 'action';
    }
  }
})

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// At some point separate this out into a single file component, or something other than an inline template
Vue.component('action', {
  template : '#action',
  data: function () {
    return {
        originalSets : setData.sets[0].words,
        sets : shuffle(JSON.parse(JSON.stringify(setData.sets[0].words))),
        wordsRemaining : setData.sets[0].words.length,
        activeWordIdx : 0,

        activePanel : state,
        stage : 'newWord',
        lessonStatus : 'yellow',
        completed : 0,
        lessonCompleted : false,
        answer : '',
        correct : undefined 
    }
  },
  created : function() {
   console.log(this.originalSets, ' words');
   // Shuffle words
   //this.sets = shuffle(this.sets);
  },
  mounted : function() {
     this.$refs.answerInput.focus();
  },
  methods : {
    enterKeyPress : function(event) {
        if (this.answer !== '') {
            if (this.lessonCompleted)     { this.reset(); return }
            if (this.stage === 'newWord') { this.checkAnswer(this.sets[this.activeWordIdx].answer); return }
            if (this.stage === 'next')    { this.nextWord(); return }
        }
    },
    checkAnswer : function(correctAnswer) {
        //console.log('check answer', this.answer, correctAnswer);
        if (correctAnswer === this.answer) {

            this.wordsRemaining--;
            this.completed = 100 - (( this.wordsRemaining / this.originalSets.length) * 100);

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

            this.correct = true;

            if (this.wordsRemaining === 0) { this.lessonCompleted = true }
        } else {
            this.correct = false;
        }

        this.stage = 'next';
    },
    nextWord : function () {
        //console.log(this.sets.length, this.activeWordIdx);

        if (this.activeWordIdx === this.sets.length -1) {
            this.activeWordIdx = 0;
        } else if (this.correct) {
            this.sets.splice(this.activeWordIdx, 1);
        } else if (!this.correct) {
            this.activeWordIdx++;
        }

        //console.log(this.activeWordIdx, ' new active word idx');

        this.stage = 'newWord';
        this.answer = '';
        this.correct = undefined;
    },
    toggleActive : function () {
       state.activePanel = 'list';
    },
    reset : function () {
        Object.assign(this.$data, this.$options.data())
    }
  }
});

new Vue({ el: '#root' })

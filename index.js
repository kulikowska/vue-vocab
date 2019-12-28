Vue.component('list', {
  template : '#list',
  props : ['selectedSet', 'sets'],
  data: function () {
    return {
        //sets : setData.sets,
    }
  },
  created : function() {
    console.log(this.selectedSet, ' props from crated');
    console.log(this.sets, ' sets from created');
  },
})

// At some point separate this out into a single file component, or something other than an inline template
Vue.component('action', {
  template : '#action',
  props : ['selectedSet', 'sets'],
  data: function () {
    return {
        //originalSets : setData.sets[0].words,
        //wordsRemaining : this.sets[this.selectedSet].words.length,
        activeWordIdx : 0,

        stage : 'newWord',
        lessonStatus : 'yellow',
        completed : 0,
        lessonCompleted : false,
        answer : '',
        correct : undefined 
    }
  },
  mounted : function() {
     console.log(this.sets, ' sets');
     this.$refs.answerInput.focus();

     this.originalSets = JSON.parse(JSON.stringify(this.sets));
     this.setsLength = this.sets.length;
     this.wordsRemaining = this.sets.length;

     //this.sets  = shuffle(this.sets);

     /*
     this.$root.$on('setChange', data => {
        this.sets  = shuffle(setData.sets[data].words);

    });
    */
  },
  updated : function() {
    //console.log('updating');
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
            console.log(this.setsLength);

            this.wordsRemaining--;
            //this.completed = 100 - (( this.wordsRemaining / this.originalSets.length) * 100);
            this.completed = 100 - (( this.wordsRemaining / this.setsLength) * 100);

            var progressBar = getProgressBarStyle(this.completed);
            this.lessonStatus = progressBar[0];
            this.completed = progressBar[1];
            this.correct = true;

            if (this.wordsRemaining === 0) { this.lessonCompleted = true }
        } else {
            this.correct = false;
        }

        this.stage = 'next';
    },
    nextWord : function () {

        if (this.activeWordIdx === this.sets.length -1) {
            this.activeWordIdx = 0;
        } else if (this.correct) {
            this.sets.splice(this.activeWordIdx, 1);
        } else if (!this.correct) {
            this.activeWordIdx++;
        }

        this.stage = 'newWord';
        this.answer = '';
        this.correct = undefined;
    },
    reset : function () {
        // think up a better system for this
        console.log(this.originalSets, ' original sets');
        this.sets = this.originalSets;
        this.setsLength = this.sets.length;
        this.wordsRemaining = this.sets.length;

        Object.assign(this.$data, this.$options.data())
    },
  }
});

new Vue({ 
    el: '#root',
    data : {
        activePanel : 'list',
        selectedSet : 0,
        sets : setData.sets
    },
    methods: {
        updateParent(data) {
            this.activePanel = data; 
        },
        selectSet(data) {
            this.selectedSet = data; 
        },
        shuffle : function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    }
})

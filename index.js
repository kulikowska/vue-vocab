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

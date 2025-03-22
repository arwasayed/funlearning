const questions = [
    
   
    {
        image: 'Imges/cat.png',
        question: 'What is this animal called?',
        options: ['Dog', ' Cat', 'Lion', ' Deer'],
        correct: 1
    },
    {
        image: 'Imges/a-cute-cartoon-lion-walking-_10564205.png!w700wp.jpg',
        question: 'Who is the king of the forest?',
        options: [' Elephant', ' Giraffe', ' Lion','Panda'],
        correct: 2
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/3069/3069195.png',
        question: 'Which sea creature has three hearts?',
        options: [' octopus', ' Giraffe','whale','wolf'],
        correct: 0
    },




    {
        image: 'Imges/camel.png',
        question: 'Which animal is called the "Ship of the Desert"?',
        options: [' octopus', ' Cat',' Camel',' Sheep'],
        correct: 2
    },
    {
        image: 'imges/sheep.png',
        question: 'Which animal gives wool?',
        options: ['Dog', 'Duck','whale','Sheep'],
        correct: 3
    }
,
{
    image: 'imges/elephant.png',
    question: 'Which animal has a long trunk?',
    options: ['Elephant', 'Fish','Wolf','Lion'],
    correct: 0
}
,
{
    image: 'imges/fish.png',
    question: ' Which animal lives in water and has fins?',
    options: ['Octopus', 'Fish','Ant','Bat'],
    correct: 1
}
,
{
    image: 'imges/wolf.png',
    question: 'Which animal has the strongest sense of smell?',
    options: ['Sheep', 'Wolf ','Dog','Whale'],
    correct: 1
}

,{
    image: 'imges/dog.png',
    question: 'Which animal is known as "man\'s best friend"?',
    options: [' Sheep ', 'Dog',' Octopus','Fish'],
    correct: 1
}
,
{
    image: 'imges/dug.png',
    question: 'Which animal is known for saying "Quack"?',
    options: ['Fox', 'Cat','whale','Duck'],
    correct: 3
}



    
    
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);

let currentQuestion = 0;
        let score = 0;
         
        let currentAudio = null;

        const emoji = document.querySelector('.emoji-feedback');
        const questionImage = document.getElementById('questionImage');
        const questionText = document.getElementById('questionText');

        const playButton = document.getElementById('playSound');

        function showQuestion() {
            const q = questions[currentQuestion];
            
            questionText.textContent = q.question;
            questionImage.style.display = 'none';
            document.querySelector('.audio-container').style.display = 'none';

            const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        
        if(q.images) {
            button.innerHTML = `
                <img src="${q.images[index]}" class="animal-image">
            `;
        } else {
            button.innerHTML = `
                <span class="emoji">${option.substring(0, 10)}</span>
                <span>${option.substring(10)}</span>
            `;
        }

        if(q.image) {
            questionImage.src = q.image;
            questionImage.style.display = 'block';
        }
        
       
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });




          
        }

       
        function playSound(type) {
            const sounds = {
                correct: new Audio('Sound/rightanswer-95219.mp3'),
                wrong: new Audio('Sound/wrong-answer-129254.mp3')
            };
            sounds[type].play();
        }

        function Final(type) {
            const sounds = {
                correct: new Audio('Sound/Correct-answer-ding-dong-and-applause.mp3'),
                wrong: new Audio('Sound/Game-fail-sound-effect.mp3')
            };
            sounds[type].play();
        }
        function checkAnswer(selected) {
            if(currentAudio) currentAudio.pause();

            const correct = questions[currentQuestion].correct;
            const options = document.querySelectorAll('.option');

            
            if (selected === correct) {
                score += 10;
                document.getElementById('score').textContent = score;
                emoji.textContent = '🎉👍';
                options[selected].style.background = '#32CD32';
                playSound('correct');
            } else {
                emoji.textContent = '❌😢';
                options[selected].style.background = '#FF0000';
                options[correct].style.background = '#32CD32';
                playSound('wrong');
            }

            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    showQuestion();
                    emoji.textContent = '😊';
                    options.forEach(opt => opt.style.background = '#FFD700');
                } else {
                    endQuiz();
                }
            }, 2000);
        }

        function endQuiz() {
            var container = document.querySelector('.container');
            container.classList.add('complete');
            if (score >= 50) {
              container.innerHTML = `
                <h1>Quiz Complete! 🎉</h1>
                <div class="score">Final Score: ${score}</div>
                <button class="option" onclick="location.reload()">🔄Play Again</button>
                <button class="option" onclick="window.location.href='Leason.html'">🏠Back TO Home</button>
              `;
              emoji.textContent = '😊';
              Final('correct');
            } else {
              container.innerHTML = `
                <h1>Quiz Complete! 😥</h1>
                <div class="score">Final Score: ${score}/100</div>
                <button class="option" onclick="location.reload()">🔄Play Again</button>
                <button class="option" onclick="window.location.href='Leason.html'">🏠Back TO Home</button>
              `;
              emoji.textContent = '😢';
              Final('wrong');
            }
        }
        questionImage.onerror = () => {
            questionImage.style.display = 'none';
            questionText.style.marginTop = '40px';
        };

        showQuestion();




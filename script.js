(function() {
    // Configuration
    const BIRTHDAY_MONTH = 3;    // March (0-index: 0=Jan, 1=Feb, 2=Mar)
    const BIRTHDAY_DAY = 0;      // Change to actual birthday
    const FRIEND_NAME = "Laiba";
    
    let isBirthday = false;
    let quizCompleted = false;
    let currentQuestion = 0;
    
    // Quiz Questions (Personalized)
    const questions = [
        {
            text: "What's Laiba's favorite color?",
            options: ["Red", "Yellow", "Pink", "Blue"],
            correct: 2,
            explanation: "We all love Pink color!"
        },
        {
            text: "What's Laiba's favorite thing to do?",
            options: ["Shopping", "Killing", "Eating", "Talking"],
            correct: 0,
            explanation: "It's the little things that mean the most to you!"
        },
        {
            text: "What's Laiba's favorite food?",
            options: ["Fruits", "Vegetables", "Pasta", "KFC"],
            correct: 2,
            explanation: "Do you know how to make Pasta!?"
        }
    ];
    
    // Check birthday
    function checkBirthday() {
        const today = new Date();
        return (today.getMonth() === BIRTHDAY_MONTH && today.getDate() === BIRTHDAY_DAY);
    }
    
    // Countdown Timer
    function updateCountdown() {
        if (isBirthday) return;
        
        const now = new Date();
        let target = new Date();
        target.setMonth(BIRTHDAY_MONTH);
        target.setDate(BIRTHDAY_DAY);
        target.setHours(23, 59, 59, 999);
        
        if (now > target) {
            target.setFullYear(now.getFullYear() + 1);
        } else if (now.getFullYear() !== target.getFullYear()) {
            target.setFullYear(now.getFullYear());
            if (now > target) target.setFullYear(now.getFullYear() + 1);
        }
        
        const diff = target - now;
        if (diff <= 0) {
            activateBirthdayMode();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (86400000)) / (3600000));
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Activate Birthday Mode
    function activateBirthdayMode() {
        isBirthday = true;
        document.getElementById("countdownSection").classList.remove("active");
        document.getElementById("quizSection").classList.add("active");
        startParticles();
        loadQuestion();
    }
    
    // Quiz Functions
    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            completeQuiz();
            return;
        }
        
        const q = questions[currentQuestion];
        document.getElementById("questionText").innerText = q.text;
        document.getElementById("questionCounter").innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
        
        const optionsContainer = document.getElementById("optionsContainer");
        optionsContainer.innerHTML = "";
        
        q.options.forEach((opt, idx) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "quiz-option";
            optionDiv.innerText = opt;
            optionDiv.onclick = () => checkAnswer(idx);
            optionsContainer.appendChild(optionDiv);
        });
        
        document.getElementById("feedbackMessage").innerHTML = "";
    }
    
    function checkAnswer(selected) {
        const q = questions[currentQuestion];
        const feedback = document.getElementById("feedbackMessage");
        
        if (selected === q.correct) {
            feedback.innerHTML = `✓ Correct! ${q.explanation}`;
            feedback.style.background = "#d4edda";
            feedback.style.color = "#155724";
            currentQuestion++;
            
            setTimeout(() => {
                loadQuestion();
            }, 800);
        } else {
            const wrongMessages = [
                "Not quite... try again!",
                "Almost there! Give it another try.",
                "That's not it. Think about what really matters!",
                "Close! One more attempt?"
            ];
            const randomMsg = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
            feedback.innerHTML = `✗ ${randomMsg}`;
            feedback.style.background = "#ffe0e0";
            feedback.style.color = "#c41e3a";
        }
    }
    
    function completeQuiz() {
        quizCompleted = true;
        document.getElementById("quizSection").classList.remove("active");
        document.getElementById("messageSection").classList.add("active");
        createConfetti(200);
        showFloatingMessage("Your message is ready!", 2000);
        displayMessage();
    }
    
    function displayMessage() {
        const messageContainer = document.getElementById("finalMessageContent");
        messageContainer.innerHTML = `
            <p class="greeting">My Dearest ${FRIEND_NAME},</p>
            <p>You did it! You unlocked the magic!</p>
            <p>On your special day, I want you to know that you are truly amazing. Your smile lights up the world, and having known you has been a gift.</p>
            <p>May this year bring you:</p>
            <ul class="wishes-list">
                <li>Endless laughter that makes your heart full</li>
                <li>All the joy you deserve - boundless and beautiful</li>
                <li>Adventures that become cherished memories</li>
                <li>Love that surrounds you everywhere you go</li>
                <li>May Allah bless you with everything you wish for</li>
            </ul>
            <p class="highlight">Thank you for the moments we shared, even though we didn't spend a lot of time together, I appreciated every bit of it. I'm sorry if things didn't always go well, but I hope your day is full of joy and happiness!</p>
            <p><strong>HAPPY BIRTHDAY!</strong></p>
            <p class="signature">With good wishes,<br>Mustafa</p>
        `;
        
        // Add animation to message lines
        const paragraphs = messageContainer.querySelectorAll('p, ul');
        paragraphs.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Particle System
    function startParticles() {
        const container = document.getElementById("particleContainer");
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            const size = 2 + Math.random() * 6;
            particle.style.width = size + "px";
            particle.style.height = size + "px";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDuration = 6 + Math.random() * 12 + "s";
            particle.style.animationDelay = Math.random() * 8 + "s";
            container.appendChild(particle);
        }
    }
    
    // Confetti System
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement("div");
            confetti.style.position = "fixed";
            confetti.style.left = Math.random() * 100 + "%";
            confetti.style.top = "-10px";
            confetti.style.width = Math.random() * 8 + 4 + "px";
            confetti.style.height = Math.random() * 8 + 4 + "px";
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.pointerEvents = "none";
            confetti.style.zIndex = "9999";
            confetti.style.borderRadius = "2px";
            confetti.style.animation = `fallConfetti ${Math.random() * 2 + 2}s linear forwards`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }
    
    // Add confetti animation
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes fallConfetti {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    function showFloatingMessage(msg, duration) {
        const div = document.createElement("div");
        div.innerText = msg;
        div.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            font-weight: bold;
            z-index: 10000;
            white-space: nowrap;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: fadeUp 0.5s ease;
            font-size: 0.9rem;
        `;
        document.body.appendChild(div);
        setTimeout(() => {
            div.style.animation = "fadeDown 0.5s ease";
            setTimeout(() => div.remove(), 500);
        }, duration);
    }
    
    // Add keyframe animations
    const additionalStyles = document.createElement("style");
    additionalStyles.textContent = `
        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        @keyframes fadeDown {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Initialize
    startParticles();
    
    if (checkBirthday()) {
        activateBirthdayMode();
    } else {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
})();

type TQuestions = {
  question: string;
  choices: string[];
};

type TResults = {
  a: string;
  b: string;
  c: string;
};

const questions: TQuestions[] = [
  {
    question:
      "You went to a party last night and when you arrived to school the next day, everybody is talking about something you didn’t do. What will you do?",
    choices: [
      "Avoid everything and go with your friends",
      "Go and talk with the person that started the rumors",
      "Go and talk with the teacher",
    ],
  },
  {
    question: "What quality do you excel the most?",
    choices: ["Empathy", "Curiosity", "Perseverance"],
  },
  {
    question:
      "You are walking down the street when you see an old lady trying to cross, what will you do?",
    choices: [
      "Go and help her",
      "Go for a policeman and ask him to help",
      "Keep walking ahead",
    ],
  },
  {
    question:
      "You had a very difficult day at school, you will maintain a ____ attitude",
    choices: ["Depends on the situation", "Positive", "Negative"],
  },
  {
    question:
      "You are at a party and a friend of yours comes over and offers you a drink, what do you do?",
    choices: [
      "Say no thanks",
      "Drink it until it is finished",
      "Ignore him and get angry at him",
    ],
  },

  {
    question: "You just started in a new school, you will...",
    choices: [
      "Go and talk with the person next to you",
      "Wait until someone comes over you",
      "Not talk to anyone",
    ],
  },
  {
    question: "In a typical Friday, you would like to",
    choices: [
      "Go out with your close friends to eat",
      "Go to a social club and meet more people",
      "Invite one of your friends to your house",
    ],
  },
  {
    question: "Your relationship with your parents is..",
    choices: [
      "I like both equally",
      "I like both equally",
      "I like my Mom the most",
    ],
  },
];

// results
const results: TResults = {
  a: "Empathy: You are emphatic. You see yourself in someone else’s situation before making decisions. You tend to listen to others’ voices.",
  b: "Self-Awareness: You are conscious of your own character, feelings, motives, and desires. The process can be painful but it leads to greater self-awareness.",
  c: "Self-Management: You manage yourself well; You take responsibility for your own behavior and well-being.",
};

const questionContainer = document.getElementById(
  "question-container"
) as HTMLDivElement;

let currentQuestionIndex = 0;
const selectedAnswers: string[] = [];

function loadQuestion(index: number) {
  if (questionContainer) {
    const question = questions[index];

    const questionHTML = `
      <p class="text-lead">${question.question}</p>
      <div class="choices">
        ${question.choices
          .map((text: string, index: number) => {
            return `
            <input type="button" class="btn-choice" data-letter="${String.fromCharCode(
              65 + index
            )}" value="${String.fromCharCode(65 + index)}. )  ${text}" />
          `;
          })
          .join("")}
      </div>
    `;

    questionContainer.innerHTML = questionHTML;

    const btnChoiceButtons = document.querySelectorAll(
      ".btn-choice"
    ) as NodeListOf<HTMLInputElement>;

    btnChoiceButtons.forEach((btn) => {
      btn.addEventListener("click", handleBtnChoiceClick);
    });
  }
}

function handleBtnChoiceClick(event: MouseEvent) {
  const target = event.target as HTMLInputElement;

  if (target.dataset.letter) {
    selectedAnswers.push(target.dataset.letter);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      questionContainer.innerHTML = `
        <p class="text-lead">
          Result.
        </p>
      `;
      countLetters(selectedAnswers);
    }
  }
}

function countLetters(answers: string[]) {
  const count: {
    [key: string]: number;
  } = {};

  answers.forEach((letter) => {
    if (count[letter]) {
      count[letter]++;
    } else {
      count[letter] = 1;
    }
  });

  displayTestResult(count);
}

function displayTestResult(count: { [ket: string]: number }) {
  const resultContainer = document.getElementById(
    "result-container"
  ) as HTMLDivElement;

  if (resultContainer) {
    resultContainer.innerHTML = "";

    const countsArray = Object.entries(count);
    const maxCount = Math.max(...countsArray.map(([_, value]) => value));
    const mostChoosedLetter = countsArray
      .filter(([_, value]) => value === maxCount)
      .map(([key]) => key.toLowerCase());

    let resultText;
    if (mostChoosedLetter.length === 1) {
      const key = mostChoosedLetter[0] as keyof typeof results;
      resultText = results[key];
    } else {
      resultText = results["b"];
    }

    resultContainer.innerHTML = `<p class="text-lead">${resultText}</p>`;
  }
}

loadQuestion(currentQuestionIndex);

export const QuizEvent = {
    RECEIVED_DATA: 0,
    FAILED_RECEIVING_DATA: 1,

    START_QUIZ: 2,
    ANSWER_QUESTION: 3,
    FINISH_QUIZ: 4,

    GO_TO_PREVIOUS_QUESTION: 5,
    GO_TO_NEXT_QUESTION: 6,

    REVIEW_QUIZ: 7,
} as const;

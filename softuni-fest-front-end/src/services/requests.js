import * as api from '../api/api';
const endpoints = {
    categories: 'categories',
    questions: 'questions',
    register: 'users/register',
    login: 'users/login',
    guests: 'guests',
    results: 'results'
};

export const getCategories = async () => {
    return api.get(endpoints.categories);
};

export const createCategory = async tag => {
    return api.post(endpoints.categories, { tag });
};

export const getQuestions = async () => {
    return api.get(endpoints.questions);
};

export const getQuestionsByCategory = async (category) => {
    return api.get(`${endpoints.questions}/${category}`)
}

export const createQuestion = async (
    question,
    answers,
    correctAnswer,
    category
) => {
    return api.post(endpoints.questions, {
        question,
        answers,
        correctAnswer,
        category,
    });
};

export const register = async ({ firstName, lastName, email, password, rePassword, grade, classValue }) => {
    return api.post(endpoints.register, {
        firstName,
        lastName,
        email,
        password,
        rePassword,
        grade,
        class: classValue
    })
}

export const login = async ({ email, password}) => {
    return api.post(endpoints.login, {
        email,
        password,
    })
}

export const setGuestCredentials = async({name, grade, classValue}) =>{
    return api.post(`${endpoints.guests}/setGuestCredentials`, {
        name,
        grade,
        class: classValue
    })
}

export const postResults = async(submission) => {
    return api.post(endpoints.results, {
        categoryId: submission.categoryId,
        correctAnswers: submission.correctAnswers,
        questions: submission.questions
    })
}

export const getResults = async() =>{
    return api.get(endpoints.results)
}
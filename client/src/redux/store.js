import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postReducer from './postSlice';
import projectReducer from './projectSlice';
import doubtReducer from './doubtSlice';
import internshipReducer from './internshipSlice';
import communityReducer from './communitySlice';
import leaderboardReducer from './leaderboardSlice';
import notificationReducer from './notificationSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        projects: projectReducer,
        doubts: doubtReducer,
        internships: internshipReducer,
        communities: communityReducer,
        leaderboard: leaderboardReducer,
        notifications: notificationReducer,
        admin: adminReducer,
    },
});

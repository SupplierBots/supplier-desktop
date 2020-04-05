import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Droplist {
  date: string;
  week: number;
  link: string;
}

export interface DashboardInformation {
  news: string;
  tips: string;
  supportEmail: string;
  contactEmail: string;
}

export interface SelloutTime {
  eu?: string;
  us?: string;
  week: number;
}

interface DashboardState extends DashboardInformation {
  droplists: {
    supreme: Droplist[];
    palace: Droplist[];
  };
  selloutTimes: {
    supreme: SelloutTime;
    palace: SelloutTime;
  };
}

const initialState: DashboardState = {
  news: "Couldn't retreive last message. Please check your connection.",
  tips:
    'We recommend to schedule your task. Bot will be able to preload some resources, which saves time during the drop',
  supportEmail: 'support@safedropbot.com',
  contactEmail: 'business@safedropbot.com',
  droplists: {
    supreme: [
      {
        date: '5th March 20',
        week: 2,
        link: 'https://supremecommunity.com/season/spring-summer2020/droplist/2020-03-05/',
      },
      {
        date: '27th February 20',
        week: 1,
        link: 'https://supremecommunity.com/season/spring-summer2020/droplist/2020-02-27/',
      },
    ],
    palace: [
      {
        date: '13th March 20',
        week: 5,
        link: 'https://palacedrop.com/droplist/palace-spring-2020/week-5',
      },
      {
        date: '6th March 20',
        week: 4,
        link: 'https://palacedrop.com/droplist/palace-spring-2020/week-4',
      },
    ],
  },
  selloutTimes: {
    supreme: {
      week: 1,
    },
    palace: {
      week: 1,
    },
  },
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSupremeDroplists: (state, { payload }: PayloadAction<{ droplists: Droplist[] }>) => {
      state.droplists.supreme = payload.droplists;
    },
    setPalaceDroplists: (state, { payload }: PayloadAction<{ droplists: Droplist[] }>) => {
      state.droplists.palace = payload.droplists;
    },
    setSupremeTimes: (state, { payload }: PayloadAction<{ times: SelloutTime }>) => {
      state.selloutTimes.supreme = payload.times;
    },
    setPalaceTimes: (state, { payload }: PayloadAction<{ times: SelloutTime }>) => {
      state.selloutTimes.palace = payload.times;
    },
    setInformation: (state, { payload }: PayloadAction<{ information: DashboardInformation }>) => {
      const { news, tips, contactEmail, supportEmail } = payload.information;
      state.news = news;
      state.tips = tips;
      state.contactEmail = contactEmail;
      state.supportEmail = supportEmail;
    },
  },
});

export const {
  setSupremeDroplists,
  setPalaceDroplists,
  setInformation,
  setSupremeTimes,
  setPalaceTimes,
} = dashboardSlice.actions;

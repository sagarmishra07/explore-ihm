import { createAsyncThunk } from '@reduxjs/toolkit';
// import { APIUserAuthDetails } from '../../../apis/users';

export const getAuthDetails = createAsyncThunk('auth/getAuthDetails', async () => {
    // const res: any = await APIUserAuthDetails();
    // // console.log('ininin');
    // return res.data;
});

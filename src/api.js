import axios from 'axios';

const subUrl = (urlName, param1, param2) =>
    ({
        hashcode: '/hashcode',
        user: `/user`,
        status: `/status`,
        checkins: `/checkins`,
        checkin: `/checkin`,
        checkinsLast: `/checkins/last`,
        checkinsToday: `/checkins/today`,
        checkinsDate: `/checkins/${param1}`,
        checkinsTermDate: `/checkins/${param1}/${param2}`,
        checkout: `/checkout`,
        checkouts: `/checkouts`,
        checkoutsLast: `/checkouts/last`,
        checkoutsToday: `/checkouts/today`,
        checkoutsDate: `/checkouts/${param1}`,
        checkoutsTermDate: `/checkouts/${param1}/${param2}`,
        workingHoursDay: `/working_hours/day`,
        workingHoursDayDate: `/working_hours/day/${param1}`,
        workingHoursDayTermDate: `/working_hours/day/${param1}/${param2}`,
        workingHoursWeek: `/working_hours/week`,
        workingHoursWeekDate: `/working_hours/week/${param1}`,
        workingHoursWeekTermDate: `/working_hours/week/${param1}/${param2}`,
        workingHoursMonth: `/working_hours/month`,
        workingHoursMonthDate: `/working_hours/month/${param1}`,
        workingHoursMonthTermDate: `/working_hours/month/${param1}/${param2}`,
    }[urlName]);

const baseUrl = process.env.REACT_APP_API_URL;

export const axiosGet = async (urlName, sendData, param1, param2) => {
    try {
        const response = await axios.get(
            `${baseUrl}${subUrl(urlName, param1, param2)}`,
            sendData
        );
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(`get error : ${err}`);
    }
    return null;
};

export const axiosPost = async (urlName, sendData, param1, param2) => {
    try {
        const response = await axios.post(
            `${baseUrl}${subUrl(urlName, param1, param2)}`,
            sendData
        );
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(`post error : ${err}`);
    }
    return null;
};

export const axiosPut = async (urlName, sendData, param1, param2) => {
    console.log(sendData);
    try {
        const response = await axios.put(
            `${baseUrl}${subUrl(urlName, param1, param2)}`,
            sendData
        );
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(`put error : ${err}`);
    }
    return null;
};

export const axiosPatch = async (urlName, sendData, param1, param2) => {
    try {
        const response = await axios.patch(
            `${baseUrl}${subUrl(urlName, param1, param2)}`,
            sendData
        );
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(`patch error : ${err}`);
    }
    return null;
};

export const axiosDelete = async (urlName, sendData, param1, param2) => {
    try {
        const response = await axios.delete(
            `${baseUrl}${subUrl(urlName, param1, param2)}`,
            sendData
        );
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(`delete error : ${err}`);
    }
    return null;
};

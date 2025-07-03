export const TimestampToDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const Time = date.toLocaleString("la-LA", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: false
    });
    return Time;
}
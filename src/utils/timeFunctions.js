export const getSongDuration = (ms) => {
    const timeInSeconds = ms / 1000;
    const totalMinutes = Math.floor(timeInSeconds / 60)
    const totalSeconds = Math.floor(timeInSeconds % 60);

    const minutes = formatTime(totalMinutes);
    const seconds = formatTime(totalSeconds);
    return `${minutes}:${seconds}`
}

const formatTime = (time) => {
    return time > 9 ? time : "0" + time;
}

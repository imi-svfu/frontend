const BASE_URL = "http://127.0.0.1:8000/api/timetable/";

export const SCHEDULES = BASE_URL + "schedules/";

export const WEEK_EVENTS = BASE_URL + "events/get_week_events/";

export const GROUP_LSIT = BASE_URL + "groups/";

export const LECTURER_LIST = BASE_URL + "lecturers/";

export const ROOM_LIST = BASE_URL + "rooms/";

export const GROUP_SCHEDULES = BASE_URL + "schedules/group/"

export const lessonsByGroupId = (groupId) =>
    BASE_URL + "lessons" + "?group=" + groupId

export const scheduleById = (id) => 
    BASE_URL + "schedules/" + id + "/";

export const availableRoomsForSchedule = (groupId, weekDay, pairNum) =>
    BASE_URL + "rooms/get_available/?" + "group_id=" + groupId + "&" + "week_day=" + weekDay + "&" + "pair_num=" + pairNum

export const getLessonHours = (groupId) =>
    BASE_URL + "lessons/hours?group_id=" + groupId

//달력 데이터 전송
import {getCalendarDataService} from "../services/CalendarService.js";

const getCalendarData = async (req, res) => {

    const { eno, year, month } = req.params;

    const data = await getCalendarDataService(eno, year, month);

    res.status(200).json({
        status: 'success',
        data: data
    })
}

export {
    getCalendarData,
}
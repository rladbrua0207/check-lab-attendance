import {atom} from "recoil";
import {format} from "date-fns";

export const selectedCalendarDateAtom = atom({
    key: 'selectedCalendarDate',
    default: format(new Date(),"yyMMdd"),
})
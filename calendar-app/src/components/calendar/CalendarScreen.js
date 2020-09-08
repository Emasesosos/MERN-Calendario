import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment); 

const events = [{
    title: 'Cumpleaños del Jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Emmanuel',
    }
}];

export const CalendarScreen = () => {

    const initialState = localStorage.getItem('lastView') || 'month';
    const [lastView, setLastView] = useState(initialState);

    const onDoubleClick = (e) => {
        console.log(e);
    };

    const onSelect = (e) => {
        console.log(e);
    };

    const onViewChange = (e) => {
        console.log(e);
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        // console.log(event, start, end, isSelected);

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
        
    };

    return (
        <div className="calendar-screen">

            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
                view= { lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal />

        </div>
    );
};

import React, { useState, useMemo, useEffect } from "react";
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  parseISO,
  isEqual,
  isBefore,
} from "date-fns";
import pt from "date-fns/locale/pt-BR";
import { utcToZonedTime } from "date-fns-tz";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import api from "../../services/api";
import { Container, Time } from "./styles";

const ranges = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  const formattedDate = useMemo(() => {
    return format(date, "d 'de' MMMM", { locale: pt });
  }, [date]);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get("/schedules", { params: { date } });
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      setSchedule(
        ranges.map(hour => {
          const time = setMilliseconds(
            setSeconds(setMinutes(setHours(date, hour), 0), 0),
            0
          );
          const timeZoned = utcToZonedTime(time, timezone);
          const appointment = response.data.find(a =>
            isEqual(parseISO(a.date), timeZoned)
          );
          const available = !appointment;
          const past = isBefore(timeZoned, date);
          return {
            hour: format(timeZoned, "HH':00h'"),
            available,
            past,
            text: available ? "Disponível" : appointment.user.name,
          };
        })
      );
    }
    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{formattedDate}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>
      <ul>
        {schedule.map(time => (
          <Time key={time.hour} past={time.past} available={time.available}>
            <strong>{time.hour}</strong>
            <span>{time.text}</span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}

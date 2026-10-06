import React from "react";
import { View } from "react-native";

// Presentation
import { Row, Surface, Typography } from "@presentation/components/common";

const DAYS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const CalendarCard = React.memo(function CalendarCard() {
  const today = React.useMemo(() => new Date(), []);

  const year = today.getFullYear();
  const dayName = DAYS[today.getDay()];

  const day = today.getDate();
  const month = MONTHS[today.getMonth()].toUpperCase();

  return (
    <Surface>
      <Row align="center" justify="space-between">
        <View>
          <Typography color="gray500">{year}</Typography>

          <Typography size={18}>
            {dayName}, {day}
          </Typography>
        </View>

        <Typography size={28} color="green500" style={{ fontWeight: "300" }}>
          {month}
        </Typography>
      </Row>
    </Surface>
  );
});

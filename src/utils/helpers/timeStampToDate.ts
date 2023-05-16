import moment from "moment";

export default function (timestampDate: string) {
  const date = moment(timestampDate);

  const year = +moment(date).format("YYYY");
  const month = +moment(date).format("MM") - 1;
  const day = +moment(date).format("DD");

  return { year, month, day };
}

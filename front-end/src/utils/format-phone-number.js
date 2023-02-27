export default function FormatPhoneNum(number) {
    number.value = number.value.split("-").join("");
    number.value = number.value.replace(/[^0-9-]/g, "");
    number.value = number.value.replace(
      /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/,
      "$1$2$3-$4$5$6-$7$8$9$10"
    );
  }
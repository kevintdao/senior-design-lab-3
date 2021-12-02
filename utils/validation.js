export function checkPoll(title, deadline, slot, block, number, dateList){
  var errorMsg = "";
  if (title === "") {
      errorMsg += "Enter a title!\n"
  }

  if (deadline === "") {
      errorMsg += "Enter a deadline date!\n";
  }
  // since there's only a deadline date, I set the deadline time to be 11:59 PM
  else if (!greaterThanCurrentDate(deadline, "23:59")) {
      errorMsg += "Enter a valid deadline date!\n";
  }

  if (slot.checked && !block.checked) {
      errorMsg += "Make a selection: Number of Blocks or Minutes per Time Slot!\n"
  }

  if (number === "") {
      errorMsg += "Enter a number!\n"
  }

  if (slot.checked && number < 5) {
      errorMsg += "Time Slots must be at least 5 minutes!\n"
  }

  if (dateList.length > 0) {
      for (var i = 0; i < dateList.length; i++) {
          let d = document.getElementById("date-" + i).value;
          let s = document.getElementById("start-" + i).value;
          let e = document.getElementById("end-" + i).value;
          if (d == "" || s == "" || e == "") {
              errorMsg += "Enter valid dates and times!\n";
          }
          else if (s >= e)
          {
              errorMsg += "Start times must be before End times!\n";
          }
      }
  }
  else {
      errorMsg += "Add a date to the poll!\n";
  }
  return errorMsg;
}

function greaterThanCurrentDate(d1, t1) {
    let newDate = new Date();
    let currDay = format(newDate.getDate());
    let currMonth = format(newDate.getMonth() + 1);
    let currYear = newDate.getFullYear();
    let currHours = format(newDate.getHours());
    let currMinutes = format(newDate.getMinutes());

    let d2 = currYear + '-' + currMonth + '-' + currDay;
    let t2 = currHours + ':' + currMinutes;

    if(d1 > d2)
    {
        return true;
    }
    
    if(d1 == d2 && t1 > t2)
    {
        return true;
    }
    
    return false;
}

export function format(input){
    return `${input < 10 ? `0${input}` : input}`;
}
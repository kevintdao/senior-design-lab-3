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
          // start time cannot be same as current time or anytime before that
          else if (!greaterThanCurrentDate(d, s))
          {
              errorMsg += "Invlaid times or dates!\n";
          }
      }
  }
  else {
      errorMsg += "Add a date to the poll!\n";
  }
  return errorMsg;
}
export function splitTime(date, start, end, type, number) {
  let [startHour, startMin] = start.split(':');
  let [endHour, endMin] = end.split(':');
  
  let startTime = startHour * 60 + (startMin - 0);
  let endTime = endHour * 60 + (endMin - 0);

  let blockDuration = endTime - startTime;

  let output = [];
  if(type == 'blocks'){
      let eachBlockDuration = blockDuration / number;
      
      output = createDates(startTime, endTime, eachBlockDuration, number, date);
  }
  else{
      let numOfSlot = blockDuration / number;
      
      output = createDates(startTime, endTime, number, numOfSlot, date);
  }
  return output;
}

export function createDates(startTime, endTime, duration, slots, date){
  let [year, month, day] = date.split('-');

  let output = [];
  for(let i = 0; i < slots; i++){
      let blockStart = startTime + duration * i;
      let blockEnd = startTime + duration * (i + 1);

      let blockStartHour = Math.floor(blockStart / 60);
      let blockStartMin = blockStart - blockStartHour * 60;
      let blockEndHour = Math.floor(blockEnd / 60);
      let blockEndMin = blockEnd - blockEndHour * 60;

      output.push({
          start: new Date(year, month - 1, day, blockStartHour, blockStartMin),
          end: new Date(year, month - 1, day, blockEndHour, blockEndMin)
      });
  }
  return output;
}
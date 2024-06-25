const HEIGHT_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

function CalendarBase({ element }) {
  const hourRowElementsFragment = document.createDocumentFragment();
  
  for (i = 0; i < HOURS_PER_DAY; i++) {
    const hourRowElement = document.createElement('div');
    hourRowElement.classList.add('hourRow');
    hourRowElement.style.height = HEIGHT_PER_HOUR + 'px';

    const hourLabelElement = document.createElement('div');
    hourLabelElement.classList.add('hourLabel');

    if (i < 12) {
      hourLabelElement.innerHTML = i + ':00 AM';
    } else {
      hourLabelElement.innerHTML = (i - 12) + ':00 PM';
    }

    hourRowElement.appendChild(hourLabelElement);
    hourRowElementsFragment.appendChild(hourRowElement);
  }

  element.appendChild(hourRowElementsFragment);
}

function getTimeDifference({ startTime, endTime }) {
  const endDate = new Date();
  endDate.setHours(endTime.split(':')[0], endTime.split(':')[1]);

  const startDate = new Date();
  startDate.setHours(startTime.split(':')[0], startTime.split(':')[1]);

  return endDate - startDate;
}

function getTimeDifferencePerHour({ startTime, endTime }) {
  const timeDifference = getTimeDifference({ endTime, startTime });
  return timeDifference / 3600000;
}

function getLengthFromTop({ startTime }) {
  const [hours, minutes] = startTime.split(':');

  return parseInt((1 + parseInt(hours) + parseFloat(minutes) / 60) * HEIGHT_PER_HOUR);
}

function getZIndex({ endTime }) {
  const [hours, minutes] = endTime.split(':');

  return parseInt(hours) * 60 + parseInt(minutes);
}

function initializeData({ data }) {
  // Sort the data based on startTime
  // if startTime is same then sort based on endTime
  data.sort((x, y) => {
    if (getTimeDifference({ startTime: x.startTime, endTime: y.startTime }) < 0) { return 1; }
    if (getTimeDifference({ startTime: x.startTime, endTime: y.startTime }) > 0) { return -1; }
    if (getTimeDifference({ startTime: x.endTime, endTime: y.endTime }) < 0) { return 1; }
    if (getTimeDifference({ startTime: x.endTime, endTime: y.endTime }) > 0) { return -1; }
  });

  // Using prefix sum find the overlap
  for (let meetingIndex = 0; meetingIndex < data.length; meetingIndex++) {

    if (meetingIndex > 0)
      console.log({ data, startTime: data[meetingIndex].startTime, endTime: data[meetingIndex - 1].endTime, timeDifference: getTimeDifference({ startTime: data[meetingIndex - 1].endTime, endTime: data[meetingIndex].startTime }) });

    if (meetingIndex > 0 &&
      getTimeDifference({ startTime: data[meetingIndex - 1].endTime, endTime: data[meetingIndex].startTime }) < 0
    ) {
      data[meetingIndex]["overlapCount"] = data[meetingIndex - 1]["overlapCount"] + 1
    } else {
      data[meetingIndex]["overlapCount"] = 0;
    }
  }
}

function Meetings({ element, data }) {
  initializeData({ data });

  const meetingRowsFragment = document.createDocumentFragment();

  data.forEach((meeting, index) => {
    const meetingRowElement = document.createElement('div');
    meetingRowElement.classList.add('meeting');

    const timeDifferencePerHour = getTimeDifferencePerHour(meeting)

    meetingRowElement.style.height = HEIGHT_PER_HOUR * (timeDifferencePerHour) + 'px';
    meetingRowElement.style.backgroundColor = meeting.color;
    meetingRowElement.style.top = getLengthFromTop(meeting) + 'px';
    meetingRowElement.style.left = (meeting.overlapCount * 100) + 'px';
    meetingRowElement.style.width = 'calc(100% - ' + (meeting.overlapCount * 100) + 'px)';
    meetingRowElement.style.zIndex = getZIndex(meeting);

    const titleElement = document.createElement('div');
    titleElement.innerHTML = meeting.title;
    const timeElement = document.createElement('div');
    timeElement.innerHTML = meeting.startTime + ' - ' + meeting.endTime;

    meetingRowElement.appendChild(titleElement);
    meetingRowElement.appendChild(timeElement);

    meetingRowsFragment.appendChild(meetingRowElement);
  })

  element.appendChild(meetingRowsFragment)
}
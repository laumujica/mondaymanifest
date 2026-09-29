document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksContainer = document.getElementById('tasks');
    const countdown = document.getElementById('countdown');
    const toggleCountdownBtn = document.getElementById('toggleCountdown');
    const charCount = document.getElementById('charCount');
  
    let countdownInterval;
  
    function updateCountdown() {
      const now = new Date();
      const nextMonday = new Date();
      nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
      nextMonday.setHours(0, 0, 0, 0);
  
      const difference = nextMonday.getTime() - now.getTime();
      const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);
  
      countdown.textContent = `Time until next Monday: ${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds`;
    }
  
    function toggleCountdown() {
      countdown.style.display = countdown.style.display === 'none' ? 'block' : 'none';
    }
  
    function addTask() {
      const taskValue = taskInput.value.trim();
      if (taskValue !== '') {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const taskText = document.createTextNode(taskValue);
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);
        tasksContainer.appendChild(taskDiv);
  
        checkbox.addEventListener('change', function () {
          checkbox.disabled = true;
        });
  
        taskInput.value = '';
        addTaskBtn.disabled = true;
      }
    }
  
    addTaskBtn.addEventListener('click', addTask);
    toggleCountdownBtn.addEventListener('click', toggleCountdown);
  
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  
    const today = new Date().getDay();
    if (today !== 1) {
      addTaskBtn.disabled = true;
    }
  
    taskInput.addEventListener('input', function () {
      const maxLength = parseInt(taskInput.getAttribute('maxlength'));
      const currentLength = taskInput.value.length;
      const remaining = maxLength - currentLength;
      charCount.textContent = remaining;
  
      if (remaining >= 0) {
        addTaskBtn.disabled = false;
      } else {
        addTaskBtn.disabled = true;
      }
    });
  });
  
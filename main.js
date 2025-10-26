document.addEventListener("DOMContentLoaded", function () {
  const keyElement = document.getElementById("key");
  const statusElement = document.getElementById("status");
  const newGameButton = document.getElementById("new-game");
  const keys = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"];
  let currentKeyIndex = 0;

  function updateKeyDisplay() {
    keyElement.textContent = keys[currentKeyIndex];
  }
  function showNotification(message, isError = false) {
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px;
      background: ${isError ? "#f44336" : "#4CAF50"};
      color: white;
      border-radius: 5px;
      z-index: 1000;
      font-family: Arial;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }
  function startNewGame() {
    currentKeyIndex = 0;
    updateKeyDisplay();
    statusElement.textContent = "Начинаем игру! Нажмите первую клавишу.";
    showNotification("Новая игра началась! Нажимайте правильные клавиши.");
  }
  document.addEventListener("keydown", function (event) {
    const pressedKey = event.key.toUpperCase();
    if (pressedKey === keys[currentKeyIndex]) {
      currentKeyIndex++;
      if (currentKeyIndex >= keys.length) {
        statusElement.textContent =
          "Поздравляем! Вы нажали все клавиши правильно!";
        showNotification("Победа! Вы успешно нажали все клавиши!");
        currentKeyIndex = 0;
      } else {
        statusElement.textContent = "Правильно! Следующая клавиша:";
      }

      updateKeyDisplay();
    } else {
      statusElement.textContent = `Ошибка! Вы нажали "${pressedKey}", а нужно "${keys[currentKeyIndex]}". Попробуйте снова.`;
      showNotification(
        `Ошибка! Нужно было нажать "${keys[currentKeyIndex]}".`,
        true
      );
    }
  });
  document.addEventListener("keypress", function (event) {
    event.preventDefault();
  });
  newGameButton.addEventListener("click", startNewGame);
  startNewGame();

  const chartData = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ],
    datasets: [
      {
        label: "Продажи за последний месяц",
        data: [
          150, 220, 180, 200, 250, 300, 280, 350, 400, 380, 420, 450, 500, 550,
          600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200,
          1250, 1300, 1350,
        ],
        backgroundColor: "#2196f3",
        borderColor: "#2196f3",
        borderWidth: 1,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Продажи",
        },
      },
      x: {
        title: {
          display: true,
          text: "Дни месяца",
        },
      },
    },
  };

  const ctx = document.getElementById("sales-chart").getContext("2d");
  const salesChart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions,
  });
});
